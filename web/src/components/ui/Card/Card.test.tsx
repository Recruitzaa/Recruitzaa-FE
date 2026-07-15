import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    render(<Card>Default Card</Card>);
    const card = screen.getByText('Default Card');
    expect(card.className).toContain('card');
    expect(card.className).toContain('variant-default');
  });

  it('applies custom variant classes', () => {
    render(<Card variant="elevated">Elevated Card</Card>);
    const card = screen.getByText('Elevated Card');
    expect(card.className).toContain('variant-elevated');
  });

  it('merges custom className passed to it', () => {
    render(<Card className="my-custom-card">Custom Class</Card>);
    const card = screen.getByText('Custom Class');
    expect(card.className).toContain('my-custom-card');
  });
});
