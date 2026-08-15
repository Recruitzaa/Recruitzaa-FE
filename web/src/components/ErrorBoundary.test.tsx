import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const Bomb = ({ message }: { message: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, reload: vi.fn() },
    });
    window.sessionStorage.clear();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('shows the generic fallback, with role="alert", for an unrelated crash', () => {
    render(
      <ErrorBoundary>
        <Bomb message="Something broke" />
      </ErrorBoundary>
    );

    const alert = screen.getByRole('alert');
    expect(alert.tagName).toBe('MAIN');
    expect(screen.getByRole('heading', { name: 'Application Error' })).toBeInTheDocument();
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });

  it('moves focus to the heading so screen-reader users are told something changed', () => {
    render(
      <ErrorBoundary>
        <Bomb message="Boom" />
      </ErrorBoundary>
    );

    const heading = screen.getByRole('heading', { name: 'Application Error' });
    expect(heading).toHaveFocus();
  });

  it('recognizes every stale-asset error string consistently between logging and the fallback UI', () => {
    render(
      <ErrorBoundary>
        <Bomb message="Importing a module script failed" />
      </ErrorBoundary>
    );

    // Previously, componentDidCatch and render() checked different string
    // lists, so this exact message triggered the reload path while still
    // rendering the generic "Application Error" copy.
    expect(
      screen.getByRole('heading', { name: 'Workspace View Reload Required' })
    ).toBeInTheDocument();
    expect(screen.queryByText(/pastel/i)).not.toBeInTheDocument();
  });
});
