/**
 * Dev-only accessibility auditing with axe-core.
 * Uses dynamic import so axe is tree-shaken from production.
 *
 * We intentionally do not use @axe-core/react: it patches class-component
 * lifecycles / findDOMNode, which is unreliable on React 19 + Suspense and
 * produces false page-has-heading-one hits against loading shells.
 */

const AUDIT_DEBOUNCE_MS = 1200;
const SEEN = new Set<string>();

function logViolations(
  violations: Array<{
    id: string;
    impact?: string | null;
    help: string;
    helpUrl: string;
    nodes: Array<{ target: unknown[]; html: string; failureSummary?: string }>;
  }>
): void {
  const fresh = violations.filter((v) => {
    const key = `${v.id}:${v.nodes.map((n) => n.target.join(',')).join('|')}`;
    if (SEEN.has(key)) return false;
    SEEN.add(key);
    return true;
  });

  if (!fresh.length) return;

  console.group('%cNew axe issues', 'color: #d93251; font-weight: bold');
  for (const result of fresh) {
    console.groupCollapsed(
      `%c${result.impact ?? 'unknown'}: %c${result.help} ${result.helpUrl}`,
      'color: #d24700; font-weight: bold',
      'color: inherit; font-weight: normal'
    );
    for (const node of result.nodes) {
      console.warn(node.failureSummary || result.help);
      console.log('HTML:', node.html);
    }
    console.groupEnd();
  }
  console.groupEnd();
}

function hasVisibleHeadingOne(): boolean {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>('h1:not([role]), [role="heading"][aria-level="1"]')
  );
  return headings.some((el) => {
    if (el.getAttribute('aria-hidden') === 'true') return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (style.opacity === '0') return false;
    return true;
  });
}

export async function initAxeAccessibility(): Promise<void> {
  if (!import.meta.env.DEV) return;

  const axe = await import('axe-core');
  let timer: ReturnType<typeof setTimeout> | undefined;

  const runAudit = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(async () => {
      // Wait until a real page heading exists so Suspense fallbacks don't
      // trip page-has-heading-one during lazy route loads.
      if (!hasVisibleHeadingOne()) return;

      try {
        const results = await axe.default.run(document, {
          reporter: 'v2',
        });
        logViolations(results.violations);
      } catch (error) {
        console.warn('axe audit failed', error);
      }
    }, AUDIT_DEBOUNCE_MS);
  };

  console.info(
    '%c♿ axe-core accessibility auditing active — violations will appear in the console.',
    'color: #c14f16; font-weight: bold;'
  );

  const root = document.getElementById('root');
  if (root) {
    const observer = new MutationObserver(runAudit);
    observer.observe(root, { childList: true, subtree: true });
  }

  // Vite hot-updates CSS Modules by patching <style> tags in <head>, which
  // never touches #root — without this, a CSS-only fix never gets re-audited
  // and a stale violation can sit in the console indefinitely.
  const headObserver = new MutationObserver(runAudit);
  headObserver.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  window.addEventListener('hashchange', runAudit);
  runAudit();
}
