import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LandingPage } from './LandingPage';

describe('LandingPage accessibility', () => {
  it('uses a submit-friendly form and semantic FAQ accordions', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const searchForm = screen.getByRole('search', { name: /job search/i });
    const keywordInput = screen.getByLabelText(/job title or keyword/i);
    const locationInput = screen.getByLabelText(/location/i);
    const faqItem = screen.getByText(/how does recruitzaa/i).closest('details');

    expect(searchForm).toBeInTheDocument();
    expect(keywordInput).toHaveAttribute('required');
    expect(locationInput).toHaveAttribute('required');
    expect(faqItem).toBeInTheDocument();
    expect(faqItem?.querySelector('summary')).toBeInTheDocument();
  });
});
