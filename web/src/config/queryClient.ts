import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { store } from '../store';
import { addToast } from '../store/slices/ui.slice';

/** Client errors (4xx) won't succeed on retry — only retry network failures and 5xx. */
const isRetryableError = (error: unknown) => {
  if (!(error instanceof AxiosError)) return true;
  if (!error.response) return true; // network error / timeout
  return error.response.status >= 500;
};

const retry = (failureCount: number, error: unknown) => failureCount < 2 && isRetryableError(error);

const describeError = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const detail = error.response?.data?.detail || error.response?.data?.message;
    if (typeof detail === 'string') return detail;
    if (error.response) return `${fallback} (${error.response.status}).`;
    return `${fallback} Check your connection and try again.`;
  }
  return error instanceof Error ? error.message : fallback;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      retry,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Silent queries opt out of the global error toast when they have
      // their own inline error UI (e.g. a form section that renders its
      // own retry state).
      if (query.meta?.silent) return;
      store.dispatch(
        addToast({ type: 'error', message: describeError(error, 'Failed to load data.') })
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.silent) return;
      store.dispatch(
        addToast({ type: 'error', message: describeError(error, 'Failed to save changes.') })
      );
    },
  }),
});
