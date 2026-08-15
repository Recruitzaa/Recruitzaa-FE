/**
 * `scrollIntoView({ behavior: 'smooth' })` ignores the user's OS-level
 * `prefers-reduced-motion` setting — that preference only affects CSS
 * `transition`/`animation`, not this JS option. Callers that want an
 * accessible smooth scroll should go through this helper instead of
 * calling `scrollIntoView` directly.
 */
export function scrollToElement(el: Element | null, options?: ScrollIntoViewOptions): void {
  if (!el) return;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  el.scrollIntoView({ ...options, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

export function scrollToElementId(id: string, options?: ScrollIntoViewOptions): void {
  if (typeof document === 'undefined') return;
  scrollToElement(document.getElementById(id), options);
}
