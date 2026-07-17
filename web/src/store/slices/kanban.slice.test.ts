import { describe, it, expect } from 'vitest';
import kanbanReducer, { updateApplicationStage, addApplication } from './kanbanSlice';

describe('Kanban Slice', () => {
  const initialState = {
    applications: [
      {
        id: 'test-app-1',
        companyName: 'Test Company',
        jobTitle: 'Developer',
        salaryEstimate: '₹10 LPA',
        updatedAt: 'Saved 1d ago',
        stage: 'APPLIED' as const,
      },
    ],
  };

  it('should return initial state', () => {
    const state = kanbanReducer(undefined, { type: 'unknown' });
    expect(state.applications.length).toBeGreaterThan(0);
  });

  it('should handle updateApplicationStage', () => {
    const actual = kanbanReducer(
      initialState,
      updateApplicationStage({ id: 'test-app-1', stage: 'OFFERED' })
    );

    expect(actual.applications[0].stage).toBe('OFFERED');
    expect(actual.applications[0].updatedAt).toBe('Moved just now');
  });

  it('should not update stage if application is not found', () => {
    const actual = kanbanReducer(
      initialState,
      updateApplicationStage({ id: 'non-existent', stage: 'OFFERED' })
    );
    expect(actual).toEqual(initialState);
  });

  it('should handle addApplication', () => {
    const newApp = {
      id: 'test-app-2',
      companyName: 'New Company',
      jobTitle: 'Architect',
      salaryEstimate: '₹20 LPA',
    };

    const actual = kanbanReducer(initialState, addApplication(newApp));

    expect(actual.applications).toHaveLength(2);
    expect(actual.applications[0]).toEqual({
      ...newApp,
      updatedAt: 'Submitted just now',
      stage: 'APPLIED',
    });
  });

  it('should prevent adding duplicate applications', () => {
    const duplicateApp = {
      id: 'test-app-1',
      companyName: 'Test Company Duplicate',
      jobTitle: 'Developer Duplicate',
      salaryEstimate: '₹12 LPA',
    };

    const actual = kanbanReducer(initialState, addApplication(duplicateApp));
    expect(actual.applications).toHaveLength(1);
    expect(actual.applications).toEqual(initialState.applications);
  });
});
