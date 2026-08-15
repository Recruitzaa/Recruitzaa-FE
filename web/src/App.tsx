import { Suspense, useEffect, useRef } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from './components/ui/Toast/ToastContainer';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { store } from './store';
import { queryClient } from './config/queryClient';
import { Spinner } from './components/ui/Spinner/Spinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';
import { JobPreferencesProvider } from './features/jobs/hooks/useJobPreferences';
import { ThemeProvider } from './hooks/useTheme';

const LoadingSpinner = () => (
  <main
    className="flex h-screen w-screen flex-col items-center justify-center bg-slate-50 dark:bg-brand-surface"
    aria-label="Loading Recruitzaa"
    tabIndex={-1}
  >
    <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
      <Spinner className="w-12 h-12 text-brand-primary border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-semibold text-slate-500">Loading Recruitzaa…</p>
    </div>
  </main>
);

const FocusOnRouteChange = () => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    const shouldMoveFocus = previousPathRef.current !== location.pathname && !location.hash;

    if (shouldMoveFocus && main) {
      main.focus();
    }

    previousPathRef.current = location.pathname;
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <JobPreferencesProvider>
                <HashRouter>
                  <FocusOnRouteChange />
                  <Suspense fallback={<LoadingSpinner />}>
                    <AppRoutes />
                  </Suspense>
                  <ToastContainer />
                </HashRouter>
              </JobPreferencesProvider>
            </QueryClientProvider>
          </Provider>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
