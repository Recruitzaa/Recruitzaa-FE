import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { FeatureUnavailablePage } from './FeatureUnavailablePage';

describe('FeatureUnavailablePage', () => {
  it('returns to the employer workspace from employer routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/employer/inbox']}>
          <FeatureUnavailablePage title="Inbox" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: /employer workspace/i })).toHaveAttribute(
      'href',
      '/employer/dashboard'
    );
  });

  it('returns to the candidate workspace from candidate routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/candidate/inbox']}>
          <FeatureUnavailablePage title="Inbox" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: /candidate workspace/i })).toHaveAttribute(
      'href',
      '/candidate/dashboard'
    );
  });

  it('returns to the tutor workspace from expert routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/expert/inbox']}>
          <FeatureUnavailablePage title="Inbox" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: /tutor workspace/i })).toHaveAttribute(
      'href',
      '/expert/dashboard'
    );
  });

  it('returns to the employee workspace from employee routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/employee/inbox']}>
          <FeatureUnavailablePage title="Inbox" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: /employee workspace/i })).toHaveAttribute(
      'href',
      '/employee/dashboard'
    );
  });

  it('returns to the admin workspace from admin routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/admin/inbox']}>
          <FeatureUnavailablePage title="Inbox" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: /admin workspace/i })).toHaveAttribute(
      'href',
      '/admin/dashboard'
    );
  });

  it('falls back to launchpad for unknown workspaces', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/unknown/feature']}>
          <FeatureUnavailablePage title="Unavailable" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: /choose workspace/i })).toHaveAttribute(
      'href',
      '/launchpad'
    );
  });
});
