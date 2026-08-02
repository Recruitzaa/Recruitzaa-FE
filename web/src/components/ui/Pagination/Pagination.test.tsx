import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('navigates through bounded pages', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={7} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    expect(onPageChange).toHaveBeenNthCalledWith(1, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 5);
  });

  it('disables navigation at the boundaries', () => {
    const { rerender } = render(<Pagination page={1} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    rerender(<Pagination page={2} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('renders nothing when there is only one page', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders ellipsis controls for large page counts', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={12} onPageChange={onPageChange} />);
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: '12' }));
    expect(onPageChange).toHaveBeenCalledWith(12);
  });
});
