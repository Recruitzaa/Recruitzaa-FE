import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Active</Badge>);
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('badge');
    expect(badge.className).toContain('variant-neutral');
  });

  it('applies custom variant classes', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge.className).toContain('variant-success');
  });

  it('merges custom className passed to it', () => {
    render(<Badge className="custom-badge">Text</Badge>);
    const badge = screen.getByText('Text');
    expect(badge.className).toContain('custom-badge');
  });
});
