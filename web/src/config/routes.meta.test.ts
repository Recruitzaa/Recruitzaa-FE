import { describe, expect, it } from 'vitest';

import { getBreadcrumbTrail, matchRouteMeta } from './routes.meta';

describe('routes.meta', () => {
  it('matches parameterized job detail routes', () => {
    expect(matchRouteMeta('/jobs/abc-123')?.label).toBe('Job details');
  });

  it('builds nested breadcrumb trails with custom labels', () => {
    expect(getBreadcrumbTrail('/jobs/abc-123', 'Staff Engineer')).toEqual([
      { label: 'Jobs', to: '/jobs' },
      { label: 'Staff Engineer', to: undefined },
    ]);
  });

  it('returns no trail for top-level listings', () => {
    expect(getBreadcrumbTrail('/jobs')).toEqual([]);
  });
});
