import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail } from 'lucide-react';
import styles from '../AuthPage.module.css';
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithLinkedIn,
  signInWithEmail,
  requestPasswordReset,
} from '../../../services/auth.service';
import { verifyUser, registerUser } from '../../../services/api.service';
import { FloatingInput } from './FloatingInput';
import { SocialAuthButtons } from './SocialAuthButtons';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/auth.slice';
import { safeLocalStorage } from '../../../lib/safeStorage';
import { useToast } from '../../../hooks/useToast';
import { isDismissedPopupError, mapFirebaseAuthError } from '../../../lib/firebaseAuthErrors';

interface LoginFormProps {
  role: 'candidate' | 'employer';
  onSuccess: (uid: string) => void;
  onSwitchToRegister: () => void;
}

const REMEMBER_EMAIL_KEY = 'recruitzaa_remembered_email';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC<LoginFormProps> = ({ role, onSuccess, onSwitchToRegister }) => {
  const [error, setError] = useState<string | null>(null);
  // Each auth operation gets its own loading flag so, e.g., requesting a
  // password reset doesn't also spin/disable the unrelated social buttons.
  const [submitLoading, setSubmitLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const rememberedEmail = safeLocalStorage.getItem(REMEMBER_EMAIL_KEY);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: rememberedEmail ?? '',
      password: '',
      rememberMe: Boolean(rememberedEmail),
    },
  });

  const emailValue = watch('email');

  /**
   * After Firebase sign-in succeeds, verify with the Backend.
   * If the user doesn't exist on the Backend yet (404), auto-register them.
   */
  const syncWithBackend = async (firebaseUser: {
    uid?: string;
    getIdToken?: (force?: boolean) => Promise<string>;
    displayName?: string | null;
  }) => {
    if (!firebaseUser?.uid || !firebaseUser?.getIdToken) return;

    try {
      const token = await firebaseUser.getIdToken(true);
      let appUser;
      try {
        appUser = await verifyUser(token);
      } catch (verifyErr: any) {
        // If user not found on Backend, auto-register
        if (verifyErr?.response?.status === 404) {
          const requestedRole = role === 'employer' ? 'EMPLOYER' : 'CANDIDATE';
          appUser = await registerUser(token, requestedRole, firebaseUser.displayName ?? undefined);
        } else {
          throw verifyErr;
        }
      }
      dispatch(setUser(appUser));
    } catch (err) {
      console.error('Backend sync failed:', err);
      // Firebase auth is still valid, so let the user proceed — but don't
      // pretend everything worked. RoleGuard will retry resolving the
      // account on the destination route and surface its own error there
      // if the backend is still unreachable.
      toast.warning(
        "Signed in, but we couldn't sync your Recruitzaa account yet. Some features may be limited until this resolves."
      );
    }
  };

  const handleSocialSignIn = async (
    providerFn: () => Promise<
      | {
          uid?: string;
          getIdToken?: (force?: boolean) => Promise<string>;
          displayName?: string | null;
        }
      | null
      | undefined
    >,
    name: string
  ) => {
    setError(null);
    setSocialLoading(true);
    try {
      const user = await providerFn();
      if (user?.uid) {
        await syncWithBackend(user as any);
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      const msg = mapFirebaseAuthError(err, `${name} sign-in failed.`);
      if (!isDismissedPopupError(msg)) {
        setError(msg);
      }
    } finally {
      setSocialLoading(false);
    }
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password, rememberMe }) => {
    setError(null);
    setStatus(null);
    setSubmitLoading(true);
    try {
      const user = await signInWithEmail(email, password);
      if (user?.uid) {
        if (rememberMe) {
          safeLocalStorage.setItem(REMEMBER_EMAIL_KEY, email);
        } else {
          safeLocalStorage.removeItem(REMEMBER_EMAIL_KEY);
        }
        await syncWithBackend(user as any);
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      setError(mapFirebaseAuthError(err, 'Authentication failed.'));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setStatus(null);
    const email = getValues('email').trim();
    if (!email) {
      setError('Enter your email address first, then request a reset link.');
      return;
    }
    setForgotLoading(true);
    try {
      await requestPasswordReset(email);
      setStatus('If an account exists for this address, we sent password reset instructions.');
    } catch (err: unknown) {
      setError(
        mapFirebaseAuthError(err, 'Password reset could not be requested. Try again later.')
      );
    } finally {
      setForgotLoading(false);
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
        loading={socialLoading}
        onGoogle={() => handleSocialSignIn(signInWithGoogle, 'Google')}
        onGithub={() => handleSocialSignIn(signInWithGithub, 'GitHub')}
        onLinkedIn={() => handleSocialSignIn(signInWithLinkedIn, 'LinkedIn')}
      />

      <div className={styles.divider}>
        <span>or</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.authForm}>
        <div className={styles.fieldStack}>
          <FloatingInput
            id="login-email"
            label={isEmployer ? 'Work Email' : 'Email Address'}
            type="email"
            autoComplete="email"
            leftIcon={<Mail size={18} aria-hidden="true" />}
            error={errors.email?.message}
            state={!errors.email && emailValue?.trim() ? 'success' : 'default'}
            {...register('email')}
          />

          <FloatingInput
            id="login-password"
            label="Password"
            autoComplete="current-password"
            showPasswordToggle
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className={styles.loginUtilities}>
          <label className={styles.rememberMe}>
            <input type="checkbox" {...register('rememberMe')} />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className={styles.forgotButton}
            onClick={handleForgotPassword}
            disabled={forgotLoading}
          >
            {forgotLoading ? 'Sending…' : 'Forgot password?'}
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

        <button type="submit" className={styles.primary} disabled={submitLoading}>
          {submitLoading ? 'Please wait…' : 'Sign In'}
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
