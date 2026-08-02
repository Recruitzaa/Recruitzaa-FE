import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from './index';
import { addNewJob } from './slices/jobsSlice';
import { updateApplicationStage } from './slices/kanbanSlice';
import { updateCompanyProfile } from './slices/employerProfileSlice';

const mockJob = {
  id: 'job-1',
  title: 'Engineer',
  company: 'Acme',
  location: 'Remote',
  type: 'Full-time',
  salary: '10 LPA',
  postedAt: '2026-07-30',
  matchScore: 90,
  tags: ['React'],
  avatarText: 'AC',
  avatarColor: '#000000',
  isPriority: false,
  description: 'Build features',
  status: 'Active' as const,
};

describe('store persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('hydrates kanban state from localStorage on startup', async () => {
    localStorage.setItem(
      'kanban_state',
      JSON.stringify({
        applications: [],
      })
    );
    vi.resetModules();
    const { store: hydratedStore } = await import('./index');
    expect(hydratedStore.getState().kanban.applications).toEqual([]);
  });

  it('ignores invalid persisted kanban state', async () => {
    localStorage.setItem('kanban_state', '{not-json');
    vi.resetModules();
    const { store: hydratedStore } = await import('./index');
    expect(hydratedStore.getState().kanban.applications.length).toBeGreaterThan(0);
  });

  it('persists kanban, jobs, and employer profile changes via subscribe', () => {
    const applicationId = store.getState().kanban.applications[0]?.id;
    if (applicationId) {
      store.dispatch(updateApplicationStage({ id: applicationId, stage: 'INTERVIEWING' }));
    }
    store.dispatch(addNewJob(mockJob));
    store.dispatch(updateCompanyProfile({ companyName: 'Persisted Employer' }));

    expect(localStorage.getItem('kanban_state')).toContain('applications');
    expect(localStorage.getItem('recruitzaa_jobs')).toContain('Engineer');
    expect(localStorage.getItem('employer_profile_state')).toContain('Persisted Employer');
  });

  it('survives serialization failures without crashing subscribers', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('write failed');
    });

    store.dispatch(updateCompanyProfile({ companyName: 'Broken Write' }));
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save employer profile:', expect.any(Error));
  });
});
