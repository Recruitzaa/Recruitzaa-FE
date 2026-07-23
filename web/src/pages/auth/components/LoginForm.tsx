import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import styles from '../AuthPage.module.css';
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithLinkedIn,
  signInWithEmail,
  requestPasswordReset,
} from '../../../services/auth.service';
import { FloatingInput } from './FloatingInput';
import { SocialAuthButtons } from './SocialAuthButtons';

interface LoginFormProps {
  role: 'candidate' | 'employer';
  onSuccess: (uid: string) => void;
  onSwitchToRegister: () => void;
}

const REMEMBER_EMAIL_KEY = 'recruitzaa_remembered_email';

export const LoginForm: React.FC<LoginFormProps> = ({ role, onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
    setStatus(null);
    setLoading(true);
    try {
      const user = await signInWithEmail(email.trim(), password);
      if (user?.uid) {
        if (rememberMe) {
          localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
        } else {
          localStorage.removeItem(REMEMBER_EMAIL_KEY);
        }
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed.';
      if (
        msg.includes('user-not-found') ||
        msg.includes('wrong-password') ||
        msg.includes('invalid-credential')
      ) {
        setError('Incorrect email or password.');
      } else if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setStatus(null);
    if (!email.trim()) {
      setError('Enter your email address first, then request a reset link.');
      return;
    }
    setLoading(true);
    try {
      await requestPasswordReset(email.trim());
      setStatus('If an account exists for this address, we sent password reset instructions.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';
      setError(
        message.includes('invalid-email')
          ? 'Enter a valid email address.'
          : 'Password reset could not be requested. Try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isEmployer = role === 'employer';

  return (
    <>
      <div className={styles.formHeader}>
        <h1>Welcome back</h1>
        <p className={styles.subtitle}>
          {isEmployer
            ? 'Sign in to manage roles, candidates, and hiring pipelines.'
            : 'Sign in to continue exploring roles and tracking applications.'}
        </p>
      </div>

      <SocialAuthButtons
        loading={loading}
        onGoogle={() => handleSocialSignIn(signInWithGoogle, 'Google')}
        onGithub={() => handleSocialSignIn(signInWithGithub, 'GitHub')}
        onLinkedIn={() => handleSocialSignIn(signInWithLinkedIn, 'LinkedIn')}
      />

      <div className={styles.divider}>
        <span>or</span>
      </div>

      <form onSubmit={handleSubmit} noValidate className={styles.authForm}>
        <div className={styles.fieldStack}>
          <FloatingInput
            id="login-email"
            label={isEmployer ? 'Work Email' : 'Email Address'}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            leftIcon={<Mail size={18} aria-hidden="true" />}
            state={email.trim() ? 'success' : 'default'}
          />

          <FloatingInput
            id="login-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            showPasswordToggle
          />
        </div>

        <div className={styles.loginUtilities}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className={styles.forgotButton}
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p className={styles.error} role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {status && (
          <p className={styles.success} role="status" aria-live="polite">
            {status}
          </p>
        )}

        <button type="submit" className={styles.primary} disabled={loading}>
          {loading ? 'Please wait…' : 'Sign In'}
        </button>
      </form>

      <div className={styles.switchPanel}>
        <p className={styles.switchText}>Don&apos;t have an account?</p>
        <button type="button" className={styles.switchCta} onClick={onSwitchToRegister}>
          Create Account
        </button>
      </div>
    </>
  );
};
