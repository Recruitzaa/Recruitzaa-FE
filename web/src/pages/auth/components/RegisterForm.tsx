import React, { useState } from 'react';
import styles from '../AuthPage.module.css';
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithLinkedIn,
  registerWithEmail,
} from '../../../services/auth.service';

interface RegisterFormProps {
  role: 'candidate' | 'employer';
  onSuccess: (uid: string) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  role: _role,
  onSuccess,
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSocialSignIn = async (
    providerFn: () => Promise<{ uid?: string } | null | undefined>,
    name: string
  ) => {
    setError(null);
    setLoading(true);
    try {
      const user = await providerFn();
      if (user?.uid) {
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `${name} sign-in failed.`;
      if (!msg.includes('popup-closed-by-user') && !msg.includes('cancelled-popup-request')) {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await registerWithEmail(email, password);
      if (user?.uid) {
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      if (msg.includes('email-already-in-use')) {
        setError('An account with this email already exists.');
      } else if (msg.includes('weak-password')) {
        setError('Password must be at least 6 characters.');
      } else if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Get started</h2>
      <p className={styles.subtitle}>Create a new account — it only takes a minute.</p>

      {/* Social Sign-In */}
      <div className={styles.socialButtonsGroup}>
        <button
          type="button"
          className={styles.googleBtn}
          onClick={() => handleSocialSignIn(signInWithGoogle, 'Google')}
          disabled={loading}
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={() => handleSocialSignIn(signInWithGithub, 'GitHub')}
          disabled={loading}
        >
          <GithubIcon />
          <span>Continue with GitHub</span>
        </button>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={() => handleSocialSignIn(signInWithLinkedIn, 'LinkedIn')}
          disabled={loading}
        >
          <LinkedInIcon />
          <span>Continue with LinkedIn</span>
        </button>
      </div>

      <div className={styles.divider}>
        <span>or</span>
      </div>

      {/* Credentials form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className="sr-only" htmlFor="register-email">
            Email address
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className={styles.field}>
          <label className="sr-only" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </div>

        {error && (
          <p className={styles.error} role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button type="submit" className={styles.primary} disabled={loading}>
          {loading ? 'Please wait…' : 'Create Account'}
        </button>
      </form>

      <p className={styles.footer}>
        Already have an account?{' '}
        <button type="button" className={styles.link} onClick={onSwitchToLogin}>
          Sign In
        </button>
      </p>
    </>
  );
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      fill="#EA4335"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
