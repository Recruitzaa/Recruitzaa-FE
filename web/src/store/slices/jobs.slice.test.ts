import { describe, it, expect, vi, beforeEach } from 'vitest';
import jobsReducer, { addJob, updateJobStatus, deleteJob, type Job } from './jobs.slice';

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

  it('should handle addJob and save to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const initialState = { jobsList: [] };
    const actual = jobsReducer(initialState, addJob(mockJob));

    expect(actual.jobsList).toHaveLength(1);
    expect(actual.jobsList[0]).toEqual(mockJob);
    expect(setItemSpy).toHaveBeenCalledWith('recruitzaa_jobs', JSON.stringify([mockJob]));
  });

  it('should handle updateJobStatus and save to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const initialState = {
      jobsList: [mockJob],
    };
    const actual = jobsReducer(initialState, updateJobStatus({ id: 'test-123', status: 'Closed' }));

    expect(actual.jobsList[0].status).toBe('Closed');
    expect(setItemSpy).toHaveBeenCalledWith(
      'recruitzaa_jobs',
      JSON.stringify([{ ...mockJob, status: 'Closed' }])
    );
  });

  it('should not update status if job is not found', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const initialState = {
      jobsList: [mockJob],
    };
    const actual = jobsReducer(
      initialState,
      updateJobStatus({ id: 'non-existent', status: 'Closed' })
    );

    expect(actual.jobsList[0].status).toBe('Active');
    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('should handle deleteJob and save to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const initialState = {
      jobsList: [mockJob],
    };
    const actual = jobsReducer(initialState, deleteJob('test-123'));

    expect(actual.jobsList).toHaveLength(0);
    expect(setItemSpy).toHaveBeenCalledWith('recruitzaa_jobs', JSON.stringify([]));
  });

  it('should handle localStorage write errors gracefully on addJob', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    const initialState = { jobsList: [] };
    const actual = jobsReducer(initialState, addJob(mockJob));

    expect(actual.jobsList).toHaveLength(1);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save jobs state:', expect.any(Error));
  });

  it('should handle localStorage write errors gracefully on updateJobStatus', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    const initialState = { jobsList: [mockJob] };
    const actual = jobsReducer(initialState, updateJobStatus({ id: 'test-123', status: 'Closed' }));

    expect(actual.jobsList[0].status).toBe('Closed');
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save jobs state:', expect.any(Error));
  });

  it('should handle localStorage write errors gracefully on deleteJob', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota exceeded');
    });

    const initialState = { jobsList: [mockJob] };
    const actual = jobsReducer(initialState, deleteJob('test-123'));

    expect(actual.jobsList).toHaveLength(0);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save jobs state:', expect.any(Error));
  });

  it('should handle corrupt localStorage state gracefully', async () => {
    vi.resetModules();
    localStorage.setItem('recruitzaa_jobs', '{invalid_json');
    const freshJobsSlice = await import('./jobs.slice');
    const state = freshJobsSlice.default(undefined, { type: 'unknown' });
    expect(state.jobsList[0].title).toBe('Senior React Native Engineer');
  });
});
