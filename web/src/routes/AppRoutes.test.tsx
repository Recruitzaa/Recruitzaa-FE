import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { describe, expect, it, vi } from 'vitest';

import authReducer from '../store/slices/auth.slice';
import uiReducer from '../store/slices/ui.slice';
import jobsReducer from '../store/slices/jobsSlice';
import { JobPreferencesProvider } from '../features/jobs/hooks/useJobPreferences';
import { ThemeProvider } from '../hooks/useTheme';
import { AppRoutes } from './AppRoutes';

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ user: null, isInitializing: false }),
}));

vi.mock('../services/api.service', () => ({
  getMe: vi.fn(),
  registerUser: vi.fn(),
}));

const renderRoutes = (initialEntry: string) => {
  const store = configureStore({
    reducer: { auth: authReducer, ui: uiReducer, jobs: jobsReducer },
  });
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <Provider store={store}>
          <JobPreferencesProvider>
            <MemoryRouter initialEntries={[initialEntry]}>
              <Suspense fallback={<div>Loading…</div>}>
                <AppRoutes />
              </Suspense>
            </MemoryRouter>
          </JobPreferencesProvider>
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

describe('AppRoutes authentication paths', () => {
  it('renders sign-in mode on /login', async () => {
    renderRoutes('/login');
    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  it('renders employer registration on /register?intent=employer', async () => {
    renderRoutes('/register?intent=employer');
    expect(await screen.findByText(/build your hiring workspace/i)).toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  it('redirects legacy /auth to login flow', async () => {
    renderRoutes('/auth');
    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  it('does not 404 on primary pre-login CTA destinations', async () => {
    const paths = ['/', '/jobs', '/employers', '/login', '/register?intent=candidate'];

    for (const path of paths) {
      const { unmount } = renderRoutes(path);
      expect(await screen.findByRole('main')).toBeInTheDocument();
      expect(screen.queryByText(/couldn't find that page/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
      unmount();
    }
  });
});
