import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders registry labels for nested routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/jobs/job-123']}>
          <Breadcrumbs currentLabel="Senior React Native Engineer" />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('link', { name: 'Jobs' })).toHaveAttribute('href', '/jobs');
    expect(screen.getByText('Senior React Native Engineer')).toBeInTheDocument();
    expect(screen.queryByText('job-123')).not.toBeInTheDocument();
  });

  it('renders nothing for top-level routes', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/jobs']}>
          <Breadcrumbs />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
