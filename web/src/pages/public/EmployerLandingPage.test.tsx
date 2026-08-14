import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EmployerLandingPage } from './EmployerLandingPage';

describe('EmployerLandingPage anchors', () => {
  beforeEach(() => {
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('exposes the services anchor target for navbar deep links', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <EmployerLandingPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    const services = document.getElementById('services');
    expect(services).toBeTruthy();
    expect(services?.className).toMatch(/servicesAnchor/);
  });

  it('renders a level-one heading for accessibility', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <EmployerLandingPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(document.getElementById('employer-hero-title')).toBeTruthy();
  });

  it('scrolls to services when opened with a hash link', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/employers#services']}>
          <EmployerLandingPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
