import { describe, expect, it } from 'vitest';
import { toSafeHref } from './sanitizeUrl';

describe('toSafeHref', () => {
  it('passes through http(s) URLs', () => {
    expect(toSafeHref('https://www.credly.com/badges/abc')).toBe(
      'https://www.credly.com/badges/abc'
    );
    expect(toSafeHref('http://example.com')).toBe('http://example.com');
  });

  it('blocks javascript: and data: URLs', () => {
    expect(toSafeHref('javascript:alert(1)')).toBeUndefined();
    expect(toSafeHref('data:text/html,<script>alert(1)</script>')).toBeUndefined();
  });

  it('rejects malformed and empty values', () => {
    expect(toSafeHref('not a url')).toBeUndefined();
    expect(toSafeHref('')).toBeUndefined();
    expect(toSafeHref(undefined)).toBeUndefined();
    expect(toSafeHref(null)).toBeUndefined();
    expect(toSafeHref('   ')).toBeUndefined();
  });
});
