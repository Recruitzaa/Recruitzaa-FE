import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import authReducer from '../../store/slices/auth.slice';
import { RoleGuard } from './RoleGuard';

const getMe = vi.hoisted(() => vi.fn());
const registerUser = vi.hoisted(() => vi.fn());
const logOut = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const getIdToken = vi.hoisted(() => vi.fn().mockResolvedValue('firebase-token'));
const mockUseAuth = vi.hoisted(() => vi.fn());

vi.mock('../../services/api.service', () => ({ getMe, registerUser }));
vi.mock('../../services/auth.service', () => ({ logOut }));
vi.mock('../../hooks/useAuth', () => ({ useAuth: mockUseAuth }));

const adminFirebaseUser = {
  uid: 'firebase-1',
  email: 'admin@example.com',
  displayName: 'Admin',
  photoUrl: null,
  getIdToken,
};

const renderGuard = () => {
  mockUseAuth.mockReturnValue({ user: adminFirebaseUser, isInitializing: false });
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

    mockUseAuth.mockReturnValue({ user: adminFirebaseUser, isInitializing: false });
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
    expect(registerUser).toHaveBeenCalledWith(
      'firebase-token',
      'EMPLOYER',
      'Admin',
      expect.any(AbortSignal)
    );
  });

  it('clears auth state and forces a Firebase sign-out when the backend rejects the token with 401', async () => {
    getMe.mockRejectedValue(
      Object.assign(new Error('Unauthorized'), { response: { status: 401 } })
    );
    const store = renderGuard();
    await waitFor(() => expect(store.getState().auth.appUser).toBeNull());
    await waitFor(() => expect(logOut).toHaveBeenCalled());
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

  it('sends a suspended (403) account to /unauthorized instead of the retry screen', async () => {
    getMe.mockRejectedValue(Object.assign(new Error('Forbidden'), { response: { status: 403 } }));
    const store = renderGuard();
    await waitFor(() => expect(store.getState().auth.appUser).toBeNull());
    expect(await screen.findByText('Unauthorized')).toBeInTheDocument();
    expect(screen.queryByText('Account verification failed')).not.toBeInTheDocument();
  });

  it('shows a rate-limit specific message on a 429', async () => {
    getMe.mockRejectedValue(
      Object.assign(new Error('Too Many Requests'), { response: { status: 429 } })
    );
    renderGuard();
    expect(await screen.findByText(/too many requests.*wait a moment/i)).toBeInTheDocument();
  });

  it('discards a stale getMe response once the signed-in user changes', async () => {
    let resolveStaleCall: (user: unknown) => void = () => undefined;
    const staleCall = new Promise((resolve) => {
      resolveStaleCall = resolve;
    });
    getMe.mockImplementationOnce(() => staleCall);
    getMe.mockResolvedValueOnce({
      id: 'sql-user-2',
      firebaseUid: 'firebase-2',
      email: 'second@example.com',
      displayName: 'Second',
      role: 'SUPER_ADMIN',
      availableRoles: ['SUPER_ADMIN'],
    });

    mockUseAuth.mockReturnValue({ user: adminFirebaseUser, isInitializing: false });
    const store = configureStore({ reducer: { auth: authReducer } });
    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
              <Route path="/admin" element={<div>Admin content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Swap the signed-in user before the first getMe() call resolves.
    mockUseAuth.mockReturnValue({
      user: { ...adminFirebaseUser, uid: 'firebase-2', email: 'second@example.com' },
      isInitializing: false,
    });
    rerender(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
              <Route path="/admin" element={<div>Admin content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Admin content')).toBeInTheDocument();
    expect(store.getState().auth.appUser?.firebaseUid).toBe('firebase-2');

    // Resolve the stale first call afterwards — it must not overwrite the current user.
    resolveStaleCall({
      id: 'sql-user-1',
      firebaseUid: 'firebase-1',
      email: 'admin@example.com',
      displayName: 'Admin',
      role: 'SUPER_ADMIN',
      availableRoles: ['SUPER_ADMIN'],
    });
    await Promise.resolve();
    await Promise.resolve();
    expect(store.getState().auth.appUser?.firebaseUid).toBe('firebase-2');
  });

  it('deduplicates concurrent guards resolving the same UID into a single getMe() call', async () => {
    getMe.mockResolvedValue({
      id: 'sql-user-1',
      firebaseUid: 'firebase-1',
      email: 'admin@example.com',
      displayName: 'Admin',
      role: 'SUPER_ADMIN',
      availableRoles: ['SUPER_ADMIN'],
    });
    mockUseAuth.mockReturnValue({ user: adminFirebaseUser, isInitializing: false });
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <RoleGuard allowedRoles={['SUPER_ADMIN']}>
                  <RoleGuard allowedRoles={['SUPER_ADMIN']}>
                    <div>Admin content</div>
                  </RoleGuard>
                </RoleGuard>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText('Admin content')).toBeInTheDocument();
    expect(getMe).toHaveBeenCalledTimes(1);
  });
});
