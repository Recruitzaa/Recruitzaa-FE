import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('provides dialog semantics and closes on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen title="Save search" description="Choose a frequency" onClose={onClose}>
        <button type="button">Save</button>
      </Modal>
    );

    expect(screen.getByRole('dialog', { name: 'Save search' })).toHaveAttribute(
      'aria-modal',
      'true'
    );
    expect(screen.getByText('Choose a frequency')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes when the overlay or close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen title="Delete item" onClose={onClose}>
        <p>Are you sure?</p>
      </Modal>
    );

    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!);
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('renders nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} title="Hidden" onClose={vi.fn()}>
        Hidden content
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
