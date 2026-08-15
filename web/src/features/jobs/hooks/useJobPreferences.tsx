import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { z } from 'zod';
import { safeLocalStorage } from '../../../lib/safeStorage';

const SAVED_JOBS_KEY = 'recruitzaa_saved_job_ids';
const SAVED_SEARCHES_KEY = 'recruitzaa_saved_searches';
const PREFERENCES_EVENT = 'recruitzaa-job-preferences-change';

/** Safety caps so a runaway browser session can't grow these lists forever. */
const MAX_SAVED_JOBS = 200;
const MAX_SAVED_SEARCHES = 50;

export interface SavedSearch {
  id: string;
  label: string;
  query: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;
}

const savedJobIdsSchema = z.array(z.string());
const savedSearchesSchema: z.ZodType<SavedSearch[]> = z.array(
  z.object({
    id: z.string(),
    label: z.string(),
    query: z.string(),
    frequency: z.enum(['daily', 'weekly']),
    createdAt: z.string(),
  })
);

function readValidated<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  const raw = safeLocalStorage.getItem(key);
  if (!raw) return fallback;
  try {
    const result = schema.safeParse(JSON.parse(raw));
    return result.success ? result.data : fallback;
  } catch {
    return fallback;
  }
}

const write = <T,>(key: string, value: T): boolean => {
  const ok = safeLocalStorage.setItem(key, JSON.stringify(value));
  if (ok) window.dispatchEvent(new CustomEvent(PREFERENCES_EVENT));
  return ok;
};

interface JobPreferencesValue {
  savedJobIds: string[];
  savedSearches: SavedSearch[];
  toggleSavedJob: (jobId: string) => void;
  saveSearch: (search: Omit<SavedSearch, 'id' | 'createdAt'>) => SavedSearch;
  removeSearch: (searchId: string) => void;
}

const JobPreferencesContext = createContext<JobPreferencesValue | null>(null);

/**
 * Holds the actual state for job preferences. Mounted exactly once by
 * `JobPreferencesProvider` so every consumer (job cards, listing page,
 * dashboard, saved-jobs page) shares one localStorage read and one
 * `storage`/custom-event subscription instead of duplicating both per card.
 */
function useJobPreferencesState(): JobPreferencesValue {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() =>
    readValidated(SAVED_JOBS_KEY, savedJobIdsSchema, [])
  );
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() =>
    readValidated(SAVED_SEARCHES_KEY, savedSearchesSchema, [])
  );

  useEffect(() => {
    const sync = () => {
      setSavedJobIds(readValidated(SAVED_JOBS_KEY, savedJobIdsSchema, []));
      setSavedSearches(readValidated(SAVED_SEARCHES_KEY, savedSearchesSchema, []));
    };
    window.addEventListener(PREFERENCES_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PREFERENCES_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggleSavedJob = useCallback((jobId: string) => {
    const current = readValidated(SAVED_JOBS_KEY, savedJobIdsSchema, []);
    const next = current.includes(jobId)
      ? current.filter((id) => id !== jobId)
      : [...current, jobId].slice(-MAX_SAVED_JOBS);
    write(SAVED_JOBS_KEY, next);
  }, []);

  const saveSearch = useCallback((search: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    const current = readValidated(SAVED_SEARCHES_KEY, savedSearchesSchema, []);
    const duplicate = current.find(
      (item) => item.query === search.query && item.frequency === search.frequency
    );
    if (duplicate) return duplicate;
    const saved: SavedSearch = {
      ...search,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    write(SAVED_SEARCHES_KEY, [saved, ...current].slice(0, MAX_SAVED_SEARCHES));
    return saved;
  }, []);

  const removeSearch = useCallback((searchId: string) => {
    const current = readValidated(SAVED_SEARCHES_KEY, savedSearchesSchema, []);
    write(
      SAVED_SEARCHES_KEY,
      current.filter((item) => item.id !== searchId)
    );
  }, []);

  return useMemo(
    () => ({ savedJobIds, savedSearches, toggleSavedJob, saveSearch, removeSearch }),
    [savedJobIds, savedSearches, toggleSavedJob, saveSearch, removeSearch]
  );
}

export const JobPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobPreferencesState();
  return <JobPreferencesContext.Provider value={value}>{children}</JobPreferencesContext.Provider>;
};

/** Must be called under `JobPreferencesProvider` (mounted once, near the app root). */
export const useJobPreferences = (): JobPreferencesValue => {
  const ctx = useContext(JobPreferencesContext);
  if (!ctx) {
    throw new Error('useJobPreferences must be used within a JobPreferencesProvider');
  }
  return ctx;
};
