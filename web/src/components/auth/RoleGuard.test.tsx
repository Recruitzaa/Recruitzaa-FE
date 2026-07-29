import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import authReducer from '../../store/slices/auth.slice';
import { RoleGuard } from './RoleGuard';

const getMe = vi.hoisted(() => vi.fn());
const registerUser = vi.hoisted(() => vi.fn());
const getIdToken = vi.hoisted(() => vi.fn().mockResolvedValue('firebase-token'));

vi.mock('../../services/api.service', () => ({ getMe, registerUser }));
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: {
      uid: 'firebase-1',
      email: 'admin@example.com',
      displayName: 'Admin',
      photoURL: null,
      getIdToken,
    },
    isInitializing: false,
  }),
}));

const renderGuard = () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/admin" element={<div>Admin content</div>} />
          </Route>
          <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  return store;
};

describe('RoleGuard backend role resolution', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it('uses backend available roles and restores admin access', async () => {
    getMe.mockResolvedValue({
      id: 'sql-user-1',
      firebaseUid: 'firebase-1',
      email: 'admin@example.com',
      displayName: 'Admin',
      role: 'SUPER_ADMIN',
      availableRoles: ['CANDIDATE', 'EMPLOYER', 'SUPER_ADMIN'],
    });
    renderGuard();
    expect(await screen.findByText('Admin content')).toBeInTheDocument();
  });

  it('shows a recoverable error instead of a one-role Firebase fallback', async () => {
    getMe.mockRejectedValue(new Error('network down'));
    const store = renderGuard();
    expect(await screen.findByText('Account verification failed')).toBeInTheDocument();
    await waitFor(() => expect(store.getState().auth.appUser).toBeNull());
  });

  it('shows a recoverable error when auto-registration fails after a 404', async () => {
    const axiosError = Object.assign(new Error('Not found'), {
      response: { status: 404 },
    });
    getMe.mockRejectedValue(axiosError);
    registerUser.mockRejectedValue(new Error('Backend unavailable'));
    const store = renderGuard();
    expect(
      await screen.findByText(/We could not finish creating your Recruitzaa account/)
    ).toBeInTheDocument();
    await waitFor(() => expect(store.getState().auth.appUser).toBeNull());
  });

  it('auto-registers a new backend user after a 404 from getMe', async () => {
    localStorage.setItem('selected_role', 'employer');
    getMe.mockRejectedValue(Object.assign(new Error('Not found'), { response: { status: 404 } }));
    registerUser.mockResolvedValue({
      id: 'sql-user-2',
      firebaseUid: 'firebase-1',
      email: 'employer@example.com',
      displayName: 'Employer',
      role: 'EMPLOYER',
      availableRoles: ['EMPLOYER'],
    });

    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/employer']}>
          <Routes>
            <Route element={<RoleGuard allowedRoles={['EMPLOYER']} />}>
              <Route path="/employer" element={<div>Employer content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Employer content')).toBeInTheDocument();
    expect(registerUser).toHaveBeenCalledWith('firebase-token', 'EMPLOYER', 'Admin');
  });

  it('clears auth state when the backend rejects the token with 401', async () => {
    getMe.mockRejectedValue(
      Object.assign(new Error('Unauthorized'), { response: { status: 401 } })
    );
    const store = renderGuard();
    await waitFor(() => expect(store.getState().auth.appUser).toBeNull());
  });

  it('retries role resolution when the user clicks Try again', async () => {
    getMe.mockRejectedValue(new Error('network down'));
    renderGuard();
    expect(await screen.findByText('Account verification failed')).toBeInTheDocument();
    getMe.mockResolvedValue({
      id: 'sql-user-3',
      firebaseUid: 'firebase-1',
      email: 'admin@example.com',
      displayName: 'Admin',
      role: 'SUPER_ADMIN',
      availableRoles: ['SUPER_ADMIN'],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByText('Admin content')).toBeInTheDocument();
    expect(getMe.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
});
