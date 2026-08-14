import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it, vi } from 'vitest';

import { BrandLogo } from './BrandLogo';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({ isDark: false, toggleTheme: vi.fn() }),
}));

describe('BrandLogo', () => {
  it('renders the light logo by default', () => {
    render(
      <HelmetProvider>
        <BrandLogo />
      </HelmetProvider>
    );

    expect(screen.getByAltText('Recruitzaa')).toBeInTheDocument();
  });
});
