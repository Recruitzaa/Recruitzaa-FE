import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FloatingInput } from './FloatingInput';

describe('FloatingInput', () => {
  it('floats the label on focus and forwards focus handlers', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<FloatingInput label="Email" onFocus={onFocus} onBlur={onBlur} />);

    const input = screen.getByLabelText('Email');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('toggles password visibility and shows validation messages', () => {
    render(
      <FloatingInput
        label="Password"
        type="password"
        showPasswordToggle
        error="Password is required."
        hint="Use a strong password."
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Password is required.');
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });
});
