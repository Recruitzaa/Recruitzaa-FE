import { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useFocusTrap } from './useFocusTrap';

function FocusTrapHarness({
  isOpen,
  onEscape,
  lockScroll = true,
}: {
  isOpen: boolean;
  onEscape?: () => void;
  lockScroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, ref, { onEscape, lockScroll });

  return (
    <div ref={ref}>
      <button type="button">First</button>
      <button type="button">Last</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('focuses the first element and restores body overflow on close', () => {
    const { rerender } = render(<FocusTrapHarness isOpen />);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement).toHaveTextContent('First');

    rerender(<FocusTrapHarness isOpen={false} />);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('calls onEscape and cycles focus with shift-tab', () => {
    const onEscape = vi.fn();
    render(<FocusTrapHarness isOpen onEscape={onEscape} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);

    const first = screen.getByRole('button', { name: 'First' });
    const last = screen.getByRole('button', { name: 'Last' });
    last.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
    first.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });
});
