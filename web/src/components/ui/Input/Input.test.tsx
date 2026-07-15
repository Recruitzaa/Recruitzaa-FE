import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders input element correctly with standard attributes', () => {
    render(<Input placeholder="Enter username" />);
    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toBeInTheDocument();
  });

  it('renders label with correct htmlFor mapping', () => {
    render(<Input label="Username" id="user-input" />);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label.getAttribute('for')).toBe('user-input');

    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
  });

  it('generates random id if not provided', () => {
    render(<Input label="Generates ID" />);
    const label = screen.getByText('Generates ID');
    const input = screen.getByLabelText('Generates ID');
    expect(input.id).toBeDefined();
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('displays error text and applies error class', () => {
    render(<Input error="Invalid email address" />);
    const errorSpan = screen.getByText('Invalid email address');
    expect(errorSpan).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input.className).toContain('hasError');
  });

  it('forwards custom ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('supports onChange events', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');
    expect(handleChange).toHaveBeenCalled();
  });
});
