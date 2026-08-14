import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import authReducer from '../../store/slices/auth.slice';
import uiReducer from '../../store/slices/ui.slice';
import { NotFoundPage } from './NotFoundPage';

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({ user: null, isInitializing: false }),
}));

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
};

const renderNotFound = () => {
  const store = configureStore({ reducer: { auth: authReducer, ui: uiReducer } });
  return render(
    <HelmetProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/does-not-exist']}>
          <Routes>
            <Route path="/jobs" element={<LocationDisplay />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </HelmetProvider>
  );
};

describe('NotFoundPage', () => {
  it('offers recovery destinations and a compact job search', () => {
    renderNotFound();

    expect(screen.getByRole('heading', { name: /couldn't find that page/i })).toBeInTheDocument();
    const browseLinks = screen.getAllByRole('link', { name: /browse jobs/i });
    expect(browseLinks.some((link) => link.getAttribute('href') === '/jobs')).toBe(true);
    const employerLinks = screen.getAllByRole('link', { name: /for employers/i });
    expect(employerLinks.some((link) => link.getAttribute('href') === '/employers')).toBe(true);
    expect(screen.getByRole('search', { name: /job search/i })).toBeInTheDocument();
  });

  it('navigates to jobs with a keyword query when search is submitted', () => {
    renderNotFound();
    fireEvent.change(screen.getByPlaceholderText(/job title, company, or skills/i), {
      target: { value: 'Engineer' },
    });
    fireEvent.submit(screen.getByRole('search', { name: /job search/i }));
    expect(screen.getByTestId('location')).toHaveTextContent('/jobs?keyword=Engineer');
  });

  it('navigates to the bare jobs page when search is submitted empty', () => {
    renderNotFound();
    fireEvent.submit(screen.getByRole('search', { name: /job search/i }));
    expect(screen.getByTestId('location')).toHaveTextContent('/jobs');
  });
});
