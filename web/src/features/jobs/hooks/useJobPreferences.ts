import { useCallback, useEffect, useState } from 'react';
import { safeLocalStorage } from '../../../lib/safeStorage';

const SAVED_JOBS_KEY = 'recruitzaa_saved_job_ids';
const SAVED_SEARCHES_KEY = 'recruitzaa_saved_searches';
const PREFERENCES_EVENT = 'recruitzaa-job-preferences-change';

export interface SavedSearch {
  id: string;
  label: string;
  query: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;
}

const read = <T>(key: string, fallback: T): T => {
  try {
    const value = safeLocalStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = <T>(key: string, value: T): boolean => {
  const ok = safeLocalStorage.setItem(key, JSON.stringify(value));
  if (ok) window.dispatchEvent(new CustomEvent(PREFERENCES_EVENT));
  return ok;
};

export const useJobPreferences = () => {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => read(SAVED_JOBS_KEY, []));
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() =>
    read(SAVED_SEARCHES_KEY, [])
  );

  useEffect(() => {
    const sync = () => {
      setSavedJobIds(read(SAVED_JOBS_KEY, []));
      setSavedSearches(read(SAVED_SEARCHES_KEY, []));
    };
    window.addEventListener(PREFERENCES_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PREFERENCES_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggleSavedJob = useCallback((jobId: string) => {
    const current = read<string[]>(SAVED_JOBS_KEY, []);
    write(
      SAVED_JOBS_KEY,
      current.includes(jobId) ? current.filter((id) => id !== jobId) : [...current, jobId]
    );
  }, []);

  const saveSearch = useCallback((search: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    const current = read<SavedSearch[]>(SAVED_SEARCHES_KEY, []);
    const duplicate = current.find(
      (item) => item.query === search.query && item.frequency === search.frequency
    );
    if (duplicate) return duplicate;
    const saved = { ...search, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    write(SAVED_SEARCHES_KEY, [saved, ...current]);
    return saved;
  }, []);

  const removeSearch = useCallback((searchId: string) => {
    write(
      SAVED_SEARCHES_KEY,
      read<SavedSearch[]>(SAVED_SEARCHES_KEY, []).filter((item) => item.id !== searchId)
    );
  }, []);

  return { savedJobIds, savedSearches, toggleSavedJob, saveSearch, removeSearch };
};
