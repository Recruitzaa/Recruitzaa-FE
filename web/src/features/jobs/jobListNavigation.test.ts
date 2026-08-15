import { describe, expect, it } from 'vitest';

import { isJobListOrigin } from './jobListNavigation';

describe('isJobListOrigin', () => {
  it('accepts public job list paths with query params', () => {
    expect(isJobListOrigin('/jobs')).toBe(true);
    expect(isJobListOrigin('/jobs?workplace=Remote&sort=salary')).toBe(true);
  });

  it('accepts candidate portal job list paths', () => {
    expect(isJobListOrigin('/candidate/jobs', true)).toBe(true);
    expect(isJobListOrigin('/candidate/jobs?sort=recent', true)).toBe(true);
  });

  it('accepts the candidate saved-jobs page as a portal list origin', () => {
    expect(isJobListOrigin('/candidate/saved-jobs', true)).toBe(true);
    expect(isJobListOrigin('/candidate/saved-jobs?tab=searches', true)).toBe(true);
  });

  it('rejects unrelated paths and cross-context origins', () => {
    expect(isJobListOrigin(undefined)).toBe(false);
    expect(isJobListOrigin('/jobs/123')).toBe(false);
    expect(isJobListOrigin('/candidate/jobs')).toBe(false);
    expect(isJobListOrigin('/jobs?workplace=Remote', true)).toBe(false);
  });
});
