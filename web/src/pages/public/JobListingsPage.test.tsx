import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import authReducer from '../../store/slices/auth.slice';
import jobsReducer from '../../store/slices/jobsSlice';
import profileReducer from '../../store/slices/profileSlice';
import { JobPreferencesProvider } from '../../features/jobs/hooks/useJobPreferences';
import { JobListingsPage } from './JobListingsPage';

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({ user: null, isInitializing: false }),
}));

const renderJobListings = (initialEntry = '/jobs') => {
  const store = configureStore({
    reducer: { auth: authReducer, jobs: jobsReducer, profile: profileReducer },
  });

  return render(
    <HelmetProvider>
      <Provider store={store}>
        <JobPreferencesProvider>
          <MemoryRouter initialEntries={[initialEntry]}>
            <JobListingsPage />
          </MemoryRouter>
        </JobPreferencesProvider>
      </Provider>
    </HelmetProvider>
  );
};

describe('JobListingsPage', () => {
  it('renders the job search hero and results feed', () => {
    renderJobListings();
    expect(screen.getByRole('heading', { name: /find a role that fits/i })).toBeInTheDocument();
    expect(screen.getByRole('search', { name: /search jobs/i })).toBeInTheDocument();
    expect(screen.getByText(/opportunities found/i)).toBeInTheDocument();
  });

  it('applies keyword filters from the URL', () => {
    renderJobListings('/jobs?keyword=engineer');
    expect(screen.getByDisplayValue('engineer')).toBeInTheDocument();
  });
});
