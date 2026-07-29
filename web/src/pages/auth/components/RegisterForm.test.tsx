import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import authReducer from '../../../store/slices/auth.slice';
import { RegisterForm } from './RegisterForm';

const authMocks = vi.hoisted(() => ({
  registerWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
  signInWithGithub: vi.fn(),
  signInWithLinkedIn: vi.fn(),
}));
const registerUser = vi.hoisted(() => vi.fn());
const registerEmployerCompany = vi.hoisted(() => vi.fn());

vi.mock('../../../services/auth.service', () => authMocks);
vi.mock('../../../services/api.service', () => ({ registerUser }));
vi.mock('../../../services/companies.service', () => ({ registerEmployerCompany }));

const renderForm = (role: 'candidate' | 'employer' = 'employer', onSuccess = vi.fn()) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  render(
    <Provider store={store}>
      <RegisterForm role={role} onSuccess={onSuccess} onSwitchToLogin={vi.fn()} />
    </Provider>
  );
  return { onSuccess, store };
};

const fillEmployerForm = () => {
  fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'Acme' } });
  fireEvent.change(screen.getByLabelText('Work Email'), {
    target: { value: 'owner@acme.example' },
  });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Company Website / URL'), {
    target: { value: 'https://acme.example' },
  });
};

const fillCandidateForm = () => {
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Alex Candidate' } });
  fireEvent.change(screen.getByLabelText('Email Address'), {
    target: { value: 'alex@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
};

describe('RegisterForm employer consistency', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('does not start social registration without company details', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(await screen.findByText(/company name before continuing/i)).toBeInTheDocument();
    expect(authMocks.signInWithGoogle).not.toHaveBeenCalled();
  });

  it('rejects invalid company websites before social sign-in', async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'Acme' } });
    fireEvent.change(screen.getByLabelText('Company Website / URL'), {
      target: { value: '://invalid' },
    });
    fireEvent.click(screen.getByRole('button', { name: /google/i }));
    expect(await screen.findByText(/valid company website url/i)).toBeInTheDocument();
    expect(authMocks.signInWithGoogle).not.toHaveBeenCalled();
  });

  it('completes employer social sign-in when company details are valid', async () => {
    const firebaseUser = {
      uid: 'firebase-2',
      displayName: 'Owner',
      getIdToken: vi.fn().mockResolvedValue('token'),
    };
    authMocks.signInWithGoogle.mockResolvedValue(firebaseUser);
    registerUser.mockResolvedValue({
      id: 'user-2',
      email: 'owner@acme.example',
      displayName: 'Owner',
      role: 'EMPLOYER',
      availableRoles: ['EMPLOYER'],
    });
    registerEmployerCompany.mockResolvedValue(undefined);
    const { onSuccess } = renderForm();
    fillEmployerForm();

    fireEvent.click(screen.getByRole('button', { name: /google/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('firebase-2'));
    expect(registerEmployerCompany).toHaveBeenCalledWith('Acme', 'https://acme.example');
  });

  it('does not report success and cleans Firebase up when backend registration fails', async () => {
    const firebaseUser = {
      uid: 'firebase-1',
      getIdToken: vi.fn().mockResolvedValue('token'),
      delete: vi.fn().mockResolvedValue(undefined),
    };
    authMocks.registerWithEmail.mockResolvedValue(firebaseUser);
    registerUser.mockRejectedValue(new Error('Backend unavailable'));
    const { onSuccess } = renderForm();
    fillEmployerForm();

    fireEvent.click(screen.getByRole('button', { name: /create employer account/i }));

    expect(await screen.findByText('Backend unavailable')).toBeInTheDocument();
    expect(firebaseUser.delete).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(registerEmployerCompany).not.toHaveBeenCalled();
  });

  it('keeps a registered account recoverable when company registration fails', async () => {
    const firebaseUser = {
      uid: 'firebase-1',
      getIdToken: vi.fn().mockResolvedValue('token'),
      delete: vi.fn(),
    };
    authMocks.registerWithEmail.mockResolvedValue(firebaseUser);
    registerUser.mockResolvedValue({
      id: 'user-1',
      email: 'owner@acme.example',
      displayName: 'Owner',
      role: 'EMPLOYER',
      availableRoles: ['EMPLOYER'],
    });
    registerEmployerCompany.mockRejectedValue(new Error('Company verification failed'));
    const { onSuccess } = renderForm();
    fillEmployerForm();

    fireEvent.click(screen.getByRole('button', { name: /create employer account/i }));

    await waitFor(() =>
      expect(screen.getByText('Company verification failed')).toBeInTheDocument()
    );
    expect(firebaseUser.delete).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('registers a candidate account successfully', async () => {
    const firebaseUser = {
      uid: 'candidate-1',
      getIdToken: vi.fn().mockResolvedValue('token'),
    };
    authMocks.registerWithEmail.mockResolvedValue(firebaseUser);
    registerUser.mockResolvedValue({
      id: 'user-candidate',
      email: 'alex@example.com',
      displayName: 'Alex Candidate',
      role: 'CANDIDATE',
      availableRoles: ['CANDIDATE'],
    });
    const { onSuccess } = renderForm('candidate');
    fillCandidateForm();

    fireEvent.click(screen.getByRole('button', { name: /create job seeker account/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('candidate-1'));
    expect(localStorage.getItem('registration_profile')).toContain('candidate');
  });

  it('maps common Firebase registration errors to friendly messages', async () => {
    authMocks.registerWithEmail.mockRejectedValue(new Error('auth/email-already-in-use'));
    renderForm('candidate');
    fillCandidateForm();
    fireEvent.click(screen.getByRole('button', { name: /create job seeker account/i }));
    expect(await screen.findByText(/account with this email already exists/i)).toBeInTheDocument();

    authMocks.registerWithEmail.mockRejectedValue(new Error('auth/weak-password'));
    fireEvent.click(screen.getByRole('button', { name: /create job seeker account/i }));
    expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument();

    authMocks.registerWithEmail.mockRejectedValue(new Error('auth/invalid-email'));
    fireEvent.click(screen.getByRole('button', { name: /create job seeker account/i }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it('shows validation errors for incomplete employer forms', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /create employer account/i }));
    expect(await screen.findByText('Enter your company name.')).toBeInTheDocument();
  });

  it('supports the remaining social providers', async () => {
    const firebaseUser = {
      uid: 'firebase-3',
      displayName: 'Owner',
      getIdToken: vi.fn().mockResolvedValue('token'),
    };
    authMocks.signInWithGithub.mockResolvedValue(firebaseUser);
    authMocks.signInWithLinkedIn.mockResolvedValue(firebaseUser);
    registerUser.mockResolvedValue({
      id: 'user-3',
      email: 'owner@acme.example',
      displayName: 'Owner',
      role: 'EMPLOYER',
      availableRoles: ['EMPLOYER'],
    });
    registerEmployerCompany.mockResolvedValue(undefined);
    const { onSuccess } = renderForm();
    fillEmployerForm();

    fireEvent.click(screen.getByRole('button', { name: /github/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('firebase-3'));

    onSuccess.mockClear();
    fireEvent.click(screen.getByRole('button', { name: /linkedin/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('firebase-3'));
  });
});
