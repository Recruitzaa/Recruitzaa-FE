import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import authReducer from '../../store/slices/auth.slice';
import jobsReducer from '../../store/slices/jobsSlice';
import profileReducer from '../../store/slices/profileSlice';
import { JobDetailPage } from './JobDetailPage';

vi.mock('../../services/analytics.service', () => ({
  trackEvent: vi.fn(),
}));

const renderDetail = (initialEntry: string, initialIndex = 0) => {
  const store = configureStore({
    reducer: { auth: authReducer, jobs: jobsReducer, profile: profileReducer },
  });

  return render(
    <HelmetProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialEntry]} initialIndex={initialIndex}>
          <Routes>
            <Route path="/jobs" element={<div>Jobs list</div>} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </HelmetProvider>
  );
};

describe('JobDetailPage back navigation', () => {
  it('links to the job list when opened directly', () => {
    const store = configureStore({
      reducer: { auth: authReducer, jobs: jobsReducer, profile: profileReducer },
    });
    const jobId = store.getState().jobs.jobsList[0].id;

    renderDetail(`/jobs/${jobId}`);

    const back = screen.getByRole('link', { name: /back to job listings/i });
    expect(back).toHaveAttribute('href', '/jobs');
  });

  it('shows a recovery link when the job is missing', () => {
    renderDetail('/jobs/missing-job-id');
    expect(screen.getByRole('link', { name: /browse available jobs/i })).toHaveAttribute(
      'href',
      '/jobs'
    );
  });

  it('uses browser history when returning from a filtered job list', () => {
    const store = configureStore({
      reducer: { auth: authReducer, jobs: jobsReducer, profile: profileReducer },
    });
    const jobId = store.getState().jobs.jobsList[0].id;
    const listUrl = '/jobs?workplace=Remote&sort=salary';

    render(
      <HelmetProvider>
        <Provider store={store}>
          <MemoryRouter
            initialEntries={[listUrl, { pathname: `/jobs/${jobId}`, state: { from: listUrl } }]}
            initialIndex={1}
          >
            <Routes>
              <Route path="/jobs" element={<div>Jobs list</div>} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </HelmetProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /back to job listings/i }));
    expect(screen.getByText('Jobs list')).toBeInTheDocument();
  });
});
