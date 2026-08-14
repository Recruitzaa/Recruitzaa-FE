/**
 * Returns `url` only if it parses as an `http:`/`https:` link, otherwise
 * `undefined`. Use before handing any user-supplied string to an `href`
 * (or similar navigable) attribute — form-level validation can reject bad
 * input on save, but data written before that validation existed, or
 * anything from an external import, still needs a render-time guard against
 * `javascript:`/`data:` URLs.
 */
export function toSafeHref(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = new URL(trimmed);
    return ['http:', 'https:'].includes(parsed.protocol) ? trimmed : undefined;
  } catch {
    return undefined;
  }
}
