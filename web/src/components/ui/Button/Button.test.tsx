import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with children correctly', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    // It should have the button class from styles module
    expect(button.className).toContain('button');
    expect(button.className).toContain('variant-primary');
    expect(button.className).toContain('size-md');
  });

  it('applies custom variant and size classes', () => {
    render(
      <Button variant="danger" size="lg">
        Danger Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('variant-danger');
    expect(button.className).toContain('size-lg');
  });

  it('merges custom className passed to it', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
