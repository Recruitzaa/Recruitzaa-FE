import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUser } from '../../store/slices/auth.slice';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import type { AppUser } from '../../types/auth.types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('WorkspaceSwitcher Component', () => {
  let store: ReturnType<typeof configureStore>;

  const mockAppUser: AppUser = {
    id: 'u1',
    email: 'dev@recruitzaa.com',
    role: 'CANDIDATE',
    availableRoles: ['CANDIDATE', 'EMPLOYER', 'EXPERT'],
    activeRole: 'CANDIDATE',
    displayName: 'Test Developer',
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    store.dispatch(setUser(mockAppUser));
  });

  it('renders Shift To header and lists only the non-active roles', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WorkspaceSwitcher />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Shift To...')).toBeInTheDocument();

    // activeRole is CANDIDATE (Job Seeker). So Employer and Tutor should be listed, but Job Seeker should NOT.
    expect(
      screen.getByRole('button', { name: /Switch to Employer workspace/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Switch to Tutor workspace/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Switch to Job Seeker workspace/i })
    ).not.toBeInTheDocument();
  });

  it('dispatches switchActiveRole action and navigates to the selected workspace after event tick', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WorkspaceSwitcher />
        </MemoryRouter>
      </Provider>
    );

    const employerBtn = screen.getByRole('button', { name: /Switch to Employer workspace/i });

    // Simulate user click
    await user.click(employerBtn);

    // Assert Redux store immediately switches state
    const state = store.getState() as any;
    expect(state.auth.appUser.activeRole).toBe('EMPLOYER');
    expect(state.auth.appUser.role).toBe('EMPLOYER');

    // Assert navigation is deferred and triggers with correct route after setTimeout tick
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/employer/dashboard');
    });
  });

  it('renders nothing when the user only has one workspace role', () => {
    const singleRoleUser: AppUser = { ...mockAppUser, availableRoles: ['CANDIDATE'] };
    store.dispatch(setUser(singleRoleUser));
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <WorkspaceSwitcher />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
