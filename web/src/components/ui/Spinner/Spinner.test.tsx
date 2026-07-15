import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renders children correctly if provided', () => {
    render(<Spinner>Loading...</Spinner>);
    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
  });

  it('applies basic CSS class', () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.className).toContain('spinner');
  });

  it('merges custom className passed to it', () => {
    render(<Spinner data-testid="spinner" className="custom-spinner-class" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner.className).toContain('custom-spinner-class');
  });
});
