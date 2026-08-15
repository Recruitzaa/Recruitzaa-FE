import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../store/slices/auth.slice';
import uiReducer from '../../store/slices/ui.slice';
import { LandingPage } from './LandingPage';

const renderLandingPage = (initialEntry = '/') => {
  const store = configureStore({ reducer: { auth: authReducer, ui: uiReducer } });
  return render(
    <HelmetProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<div>Jobs page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </HelmetProvider>
  );
};

describe('LandingPage accessibility', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('allows broad searches and uses semantic FAQ accordions', () => {
    renderLandingPage();

    const searchForm = screen.getByRole('search', { name: /job search/i });
    const keywordInput = screen.getByLabelText(/job title or keyword/i);
    const locationInput = screen.getByLabelText(/location/i);
    const faqItem = screen.getByText(/how does recruitzaa/i).closest('details');

    expect(searchForm).toBeInTheDocument();
    expect(keywordInput).not.toHaveAttribute('required');
    expect(locationInput).not.toHaveAttribute('required');
    expect(faqItem).toBeInTheDocument();
    expect(faqItem?.querySelector('summary')).toBeInTheDocument();
    expect(screen.queryByText(/demo roles/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in for profile tools/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create your workspace/i })).toBeInTheDocument();
  });

  it('navigates to jobs with search params when the hero form is submitted', () => {
    renderLandingPage();
    fireEvent.change(screen.getByLabelText(/job title or keyword/i), {
      target: { value: 'Engineer' },
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'Remote' },
    });
    fireEvent.submit(screen.getByRole('search', { name: /job search/i }));
    expect(screen.getByText('Jobs page')).toBeInTheDocument();
  });

  it('scrolls to page sections when the hash changes', () => {
    window.history.replaceState({}, '', '/#about');
    renderLandingPage('/#about');
    expect(document.getElementById('about')).toBeTruthy();
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('opens FAQ entries when a question is toggled', () => {
    renderLandingPage();
    const faq = screen.getByText(/how does recruitzaa/i).closest('details')!;
    fireEvent.click(screen.getByText(/how does recruitzaa/i));
    expect(faq.open).toBe(true);
  });
});
