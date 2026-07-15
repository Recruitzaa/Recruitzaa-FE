import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders children correctly', () => {
    render(<Textarea>Content goes here</Textarea>);
    const textarea = screen.getByText('Content goes here');
    expect(textarea).toBeInTheDocument();
  });

  it('applies basic CSS class', () => {
    render(<Textarea>Class Test</Textarea>);
    const textarea = screen.getByText('Class Test');
    expect(textarea.className).toContain('textarea');
  });

  it('merges custom className passed to it', () => {
    render(<Textarea className="custom-textarea-class">Custom Class Test</Textarea>);
    const textarea = screen.getByText('Custom Class Test');
    expect(textarea.className).toContain('custom-textarea-class');
  });
});
