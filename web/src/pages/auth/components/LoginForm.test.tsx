import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import authReducer from '../../../store/slices/auth.slice';
import { LoginForm } from './LoginForm';

const authMocks = vi.hoisted(() => ({
  signInWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
  signInWithGithub: vi.fn(),
  signInWithLinkedIn: vi.fn(),
  requestPasswordReset: vi.fn(),
}));
const verifyUser = vi.hoisted(() => vi.fn());
const registerUser = vi.hoisted(() => vi.fn());

vi.mock('../../../services/auth.service', () => authMocks);
vi.mock('../../../services/api.service', () => ({ verifyUser, registerUser }));

const renderForm = (role: 'candidate' | 'employer' = 'candidate') => {
  const onSuccess = vi.fn();
  const store = configureStore({ reducer: { auth: authReducer } });
  render(
    <Provider store={store}>
      <LoginForm role={role} onSuccess={onSuccess} onSwitchToRegister={vi.fn()} />
    </Provider>
  );
  return { onSuccess, store };
};

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows employer-specific copy and signs in with email', async () => {
    authMocks.signInWithEmail.mockResolvedValue({
      uid: 'user-1',
      getIdToken: vi.fn().mockResolvedValue('token'),
    });
    verifyUser.mockResolvedValue({
      uid: 'user-1',
      email: 'owner@acme.example',
      role: 'EMPLOYER',
      availableRoles: ['EMPLOYER'],
    });

    const { onSuccess } = renderForm('employer');

    expect(screen.getByText(/manage roles, candidates, and hiring pipelines/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Work Email'), {
      target: { value: 'owner@acme.example' },
    });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('user-1'));
    expect(localStorage.getItem('recruitzaa_remembered_email')).toBeNull();
  });

  it('requires an email before requesting password reset', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /forgot password/i }));
    expect(await screen.findByText(/enter your email address first/i)).toBeInTheDocument();
    expect(authMocks.requestPasswordReset).not.toHaveBeenCalled();
  });

  it('requests a password reset when email is present', async () => {
    authMocks.requestPasswordReset.mockResolvedValue(undefined);
    renderForm();
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /forgot password/i }));
    expect(await screen.findByText(/password reset instructions/i)).toBeInTheDocument();
    expect(authMocks.requestPasswordReset).toHaveBeenCalledWith('alex@example.com');
  });

  it('maps invalid credential errors to friendly copy', async () => {
    authMocks.signInWithEmail.mockRejectedValue(new Error('auth/wrong-password'));
    renderForm();
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'bad' } });
    fireEvent.submit(screen.getByRole('button', { name: /^sign in$/i }).closest('form')!);
    expect(await screen.findByText(/incorrect email or password/i)).toBeInTheDocument();
  });

  it('remembers email when the checkbox is selected', async () => {
    authMocks.signInWithEmail.mockResolvedValue({
      uid: 'user-2',
      getIdToken: vi.fn().mockResolvedValue('token'),
    });
    verifyUser.mockResolvedValue({
      uid: 'user-2',
      email: 'alex@example.com',
      role: 'CANDIDATE',
      availableRoles: ['CANDIDATE'],
    });

    renderForm();
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /remember me/i }));
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() =>
      expect(localStorage.getItem('recruitzaa_remembered_email')).toBe('alex@example.com')
    );
  });

  it('auto-registers backend users after social sign-in', async () => {
    const firebaseUser = {
      uid: 'social-1',
      displayName: 'Alex',
      getIdToken: vi.fn().mockResolvedValue('token'),
    };
    authMocks.signInWithGoogle.mockResolvedValue(firebaseUser);
    verifyUser.mockRejectedValue({ response: { status: 404 } });
    registerUser.mockResolvedValue({
      uid: 'social-1',
      email: 'alex@example.com',
      role: 'CANDIDATE',
      availableRoles: ['CANDIDATE'],
    });

    const { onSuccess } = renderForm();
    fireEvent.click(screen.getByRole('button', { name: /google/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('social-1'));
    expect(registerUser).toHaveBeenCalledWith('token', 'CANDIDATE', 'Alex');
  });
});
