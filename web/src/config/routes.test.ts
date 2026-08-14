import { describe, expect, it } from 'vitest';
import { isSafeInternalPath } from './routes';

describe('isSafeInternalPath', () => {
  it('accepts ordinary internal paths', () => {
    expect(isSafeInternalPath('/candidate/dashboard')).toBe(true);
    expect(isSafeInternalPath('/jobs?keyword=engineer')).toBe(true);
    expect(isSafeInternalPath('/')).toBe(true);
  });

  it('rejects absolute URLs to other origins', () => {
    expect(isSafeInternalPath('https://evil.example.com')).toBe(false);
    expect(isSafeInternalPath('http://evil.example.com/phish')).toBe(false);
  });

  it('rejects protocol-relative URLs', () => {
    expect(isSafeInternalPath('//evil.example.com')).toBe(false);
    expect(isSafeInternalPath('/\\evil.example.com')).toBe(false);
  });

  it('rejects scheme-confusion payloads', () => {
    expect(isSafeInternalPath('/javascript:alert(1)')).toBe(false);
  });

  it('rejects empty, null, or non-rooted values', () => {
    expect(isSafeInternalPath('')).toBe(false);
    expect(isSafeInternalPath(null)).toBe(false);
    expect(isSafeInternalPath(undefined)).toBe(false);
    expect(isSafeInternalPath('candidate/dashboard')).toBe(false);
  });
});
