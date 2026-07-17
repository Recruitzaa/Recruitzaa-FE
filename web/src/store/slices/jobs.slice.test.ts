import { describe, it, expect, vi, beforeEach } from 'vitest';
import jobsReducer, { addNewJob, updateJobStatus, deleteJob, type Job } from './jobsSlice';

describe('Jobs Slice', () => {
  const mockJob: Job = {
    id: 'test-123',
    title: 'Software Developer',
    company: 'Google Inc.',
    location: 'Bangalore, KA',
    type: 'Hybrid',
    salary: '₹12,00,000 - ₹20,00,000 LPA',
    postedAt: 'Just now',
    matchScore: 99,
    tags: ['React', 'TypeScript'],
    avatarText: 'GOO',
    avatarColor: '#1A73E8',
    isPriority: true,
    status: 'Active',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should return initial state with default jobs if localStorage is empty', () => {
    // Note: jobs.slice imports initial state which calls loadJobsState() immediately.
    // If we want to test loadJobsState returning value, we can mock localStorage before import,
    // but the slice initial state gets evaluated at import time. We can still verify the default list.
    const state = jobsReducer(undefined, { type: 'unknown' });
    expect(state.jobsList.length).toBeGreaterThan(0);
    expect(state.jobsList[0].title).toBe('Senior React Native Engineer');
  });

  it('should handle addNewJob', () => {
    const initialState = { jobsList: [] };
    const actual = jobsReducer(initialState, addNewJob(mockJob));

    expect(actual.jobsList).toHaveLength(1);
    expect(actual.jobsList[0]).toEqual(mockJob);
  });

  it('should handle updateJobStatus', () => {
    const initialState = {
      jobsList: [mockJob],
    };
    const actual = jobsReducer(initialState, updateJobStatus({ id: 'test-123', status: 'Closed' }));

    expect(actual.jobsList[0].status).toBe('Closed');
  });

  it('should not update status if job is not found', () => {
    const initialState = {
      jobsList: [mockJob],
    };
    const actual = jobsReducer(
      initialState,
      updateJobStatus({ id: 'non-existent', status: 'Closed' })
    );

    expect(actual.jobsList[0].status).toBe('Active');
  });

  it('should handle deleteJob', () => {
    const initialState = {
      jobsList: [mockJob],
    };
    const actual = jobsReducer(initialState, deleteJob('test-123'));

    expect(actual.jobsList).toHaveLength(0);
  });

  it('should handle corrupt localStorage state gracefully', async () => {
    vi.resetModules();
    localStorage.setItem('recruitzaa_jobs', '{invalid_json');
    const freshJobsSlice = await import('./jobsSlice');
    const state = freshJobsSlice.default(undefined, { type: 'unknown' });
    expect(state.jobsList[0].title).toBe('Senior React Native Engineer');
  });
});
