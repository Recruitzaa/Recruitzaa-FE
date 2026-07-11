import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusChip } from './StatusChip';

describe('StatusChip Component', () => {
  it('renders the correct label for PENDING status', () => {
    render(<StatusChip status="PENDING" />);
    const chip = screen.getByText('Pending');
    expect(chip).toBeInTheDocument();
    // Assuming styles mapping outputs an empty or specific string, but checking presence is enough for unit test
    expect(chip.className).toContain('chip');
  });

  it('renders the correct label for APPROVED status', () => {
    render(<StatusChip status="APPROVED" />);
    const chip = screen.getByText('Approved');
    expect(chip).toBeInTheDocument();
  });
});
