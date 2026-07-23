import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { LandingPage } from './LandingPage';

describe('LandingPage accessibility', () => {
  it('allows broad searches and uses semantic FAQ accordions', () => {
    render(
      <HelmetProvider>
        <Provider store={store}>
          <MemoryRouter>
            <LandingPage />
          </MemoryRouter>
        </Provider>
      </HelmetProvider>
    );

    const searchForm = screen.getByRole('search', { name: /job search/i });
    const keywordInput = screen.getByLabelText(/job title or keyword/i);
    const locationInput = screen.getByLabelText(/location/i);
    const faqItem = screen.getByText(/how does recruitzaa/i).closest('details');

    expect(searchForm).toBeInTheDocument();
    expect(keywordInput).not.toHaveAttribute('required');
    expect(locationInput).not.toHaveAttribute('required');
    expect(faqItem).toBeInTheDocument();
    expect(faqItem?.querySelector('summary')).toBeInTheDocument();
  });
});
