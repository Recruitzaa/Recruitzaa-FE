import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it, vi } from 'vitest';

import { BrandLogo } from './BrandLogo';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({ isDark: false, toggleTheme: vi.fn() }),
}));

describe('BrandLogo', () => {
  it('renders the wordmark and tagline by default', () => {
    render(
      <HelmetProvider>
        <BrandLogo />
      </HelmetProvider>
    );

    expect(screen.getByText('Recruit')).toBeInTheDocument();
    expect(screen.getByText('zaa')).toBeInTheDocument();
    expect(screen.getByText('Your Next Great Hire Starts Here')).toBeInTheDocument();
  });
});
