import type { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { JobPreferencesProvider, useJobPreferences } from './useJobPreferences';

const wrapper = ({ children }: { children: ReactNode }) => (
  <JobPreferencesProvider>{children}</JobPreferencesProvider>
);

describe('useJobPreferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('throws when used outside a JobPreferencesProvider', () => {
    const { result } = renderHook(() => {
      try {
        return useJobPreferences();
      } catch (err) {
        return err;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
  });

  it('persists saved jobs and searches in localStorage', () => {
    const { result } = renderHook(() => useJobPreferences(), { wrapper });

    act(() => {
      result.current.toggleSavedJob('job-1');
      result.current.saveSearch({
        label: 'Engineer roles',
        query: 'keyword=Engineer',
        frequency: 'daily',
      });
    });

    expect(result.current.savedJobIds).toEqual(['job-1']);
    expect(result.current.savedSearches).toHaveLength(1);

    const { result: reloaded } = renderHook(() => useJobPreferences(), { wrapper });
    expect(reloaded.current.savedJobIds).toEqual(['job-1']);
    expect(reloaded.current.savedSearches[0]?.query).toBe('keyword=Engineer');
  });

  it('removes saved searches and ignores duplicate alerts', () => {
    const { result } = renderHook(() => useJobPreferences(), { wrapper });

    let savedId = '';
    act(() => {
      const saved = result.current.saveSearch({
        label: 'Engineer roles',
        query: 'keyword=Engineer',
        frequency: 'daily',
      });
      savedId = saved.id;
    });

    act(() => {
      const duplicate = result.current.saveSearch({
        label: 'Engineer roles',
        query: 'keyword=Engineer',
        frequency: 'daily',
      });
      expect(duplicate.id).toBe(savedId);
      result.current.removeSearch(savedId);
    });

    expect(result.current.savedSearches).toHaveLength(0);
  });
});
