import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Globe, Mail, UserRound } from 'lucide-react';
import styles from '../AuthPage.module.css';
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithLinkedIn,
  registerWithEmail,
} from '../../../services/auth.service';
import { registerUser } from '../../../services/api.service';
import { registerEmployerCompany } from '../../../services/companies.service';
import { FloatingInput } from './FloatingInput';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { SocialAuthButtons } from './SocialAuthButtons';
import { isPasswordValid } from './passwordUtils';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/slices/auth.slice';
import { safeLocalStorage } from '../../../lib/safeStorage';

interface RegisterFormProps {
  role: 'candidate' | 'employer';
  onSuccess: (uid: string) => void;
  onSwitchToLogin: () => void;
}

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
];

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
};

const registrationErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') return detail;
  }
  return error instanceof Error ? error.message : fallback;
};

const persistRegistrationProfile = (
  role: 'candidate' | 'employer',
  payload: Record<string, string | undefined>
) => {
  safeLocalStorage.setItem(
    'registration_profile',
    JSON.stringify({
      role,
      ...payload,
      savedAt: new Date().toISOString(),
    })
  );
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ role, onSuccess, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();

  const isEmployer = role === 'employer';
  const emailLabel = isEmployer ? 'Work Email' : 'Email Address';
  const workEmailDomain = email.split('@')[1]?.toLowerCase();
  const usesPersonalEmail =
    isEmployer && workEmailDomain && PERSONAL_EMAIL_DOMAINS.includes(workEmailDomain);

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
    if (isEmployer && companyName.trim().length < 2) {
      setTouched((current) => ({ ...current, companyName: true }));
      setError('Enter your company name before continuing with social sign-in.');
      return;
    }
    if (isEmployer && companyWebsite.trim() && !isValidUrl(companyWebsite.trim())) {
      setTouched((current) => ({ ...current, companyWebsite: true }));
      setError('Enter a valid company website URL.');
      return;
    }
    setLoading(true);
    try {
      const user = await providerFn();
      if (user?.uid) {
        persistRegistrationProfile(role, {
          fullName: fullName.trim() || undefined,
          companyName: companyName.trim() || undefined,
          companyWebsite: companyWebsite.trim() || undefined,
        });
        const token = await (user as any).getIdToken(true);
        const requestedRole = isEmployer ? 'EMPLOYER' : 'CANDIDATE';
        const appUser = await registerUser(
          token,
          requestedRole,
          (user as any).displayName || fullName.trim() || undefined
        );
        if (isEmployer) {
          await registerEmployerCompany(companyName.trim(), companyWebsite.trim() || undefined);
        }
        dispatch(setUser(appUser));
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      const msg = registrationErrorMessage(err, `${name} sign-in failed.`);
      if (!msg.includes('popup-closed-by-user') && !msg.includes('cancelled-popup-request')) {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (isEmployer) {
      if (!companyName.trim()) return 'Enter your company name.';
      if (!email.trim()) return 'Enter your work email address.';
      if (!password) return 'Create a password to continue.';
      if (!isPasswordValid(password)) {
        return 'Use at least 8 characters, including a letter and a number.';
      }
      if (companyWebsite.trim() && !isValidUrl(companyWebsite.trim())) {
        return 'Enter a valid company website URL.';
      }
      return null;
    }

    if (!fullName.trim()) return 'Enter your full name.';
    if (!email.trim()) return 'Enter your email address.';
    if (!password) return 'Create a password to continue.';
    if (!isPasswordValid(password)) {
      return 'Use at least 8 characters, including a letter and a number.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTouched({
      fullName: true,
      companyName: true,
      email: true,
      password: true,
      companyWebsite: true,
    });

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const user = await registerWithEmail(email.trim(), password);
      if (user?.uid) {
        let backendRegistered = false;
        persistRegistrationProfile(role, {
          fullName: fullName.trim() || undefined,
          companyName: companyName.trim() || undefined,
          companyWebsite: companyWebsite.trim() || undefined,
        });
        try {
          const token = await user.getIdToken(true);
          const requestedRole = isEmployer ? 'EMPLOYER' : 'CANDIDATE';
          const appUser = await registerUser(token, requestedRole, fullName.trim() || undefined);
          backendRegistered = true;
          if (isEmployer) {
            await registerEmployerCompany(companyName.trim(), companyWebsite.trim() || undefined);
          }
          dispatch(setUser(appUser));
        } catch (backendErr) {
          if (!backendRegistered) {
            try {
              await user.delete();
            } catch (cleanupError) {
              console.error('Could not clean up incomplete Firebase registration:', cleanupError);
            }
          }
          throw backendErr;
        }
        onSuccess(user.uid);
      }
    } catch (err: unknown) {
      const msg = registrationErrorMessage(err, 'Registration failed.');
      if (msg.includes('email-already-in-use')) {
        setError('An account with this email already exists.');
      } else if (msg.includes('weak-password')) {
        setError('Use at least 8 characters, including a letter and a number.');
      } else if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldMotion = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.2 },
  };

  return (
    <>
      <div className={styles.formHeader}>
        <h1>{isEmployer ? 'Build your hiring workspace' : 'Start your job search'}</h1>
        <p className={styles.subtitle}>
          {isEmployer
            ? 'Create an employer account to publish roles and manage candidates.'
            : 'Create a profile to discover roles and track your applications.'}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            className={styles.fieldStack}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
              exit: { opacity: 0 },
            }}
          >
            {!isEmployer ? (
              <motion.div {...fieldMotion}>
                <FloatingInput
                  id="register-full-name"
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  leftIcon={<UserRound size={18} aria-hidden="true" />}
                  error={
                    touched.fullName && !fullName.trim() ? 'Full name is required.' : undefined
                  }
                  state={fullName.trim() ? 'success' : 'default'}
                />
              </motion.div>
            ) : (
              <motion.div {...fieldMotion}>
                <FloatingInput
                  id="register-company-name"
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  autoComplete="organization"
                  leftIcon={<Building2 size={18} aria-hidden="true" />}
                  error={
                    touched.companyName && !companyName.trim()
                      ? 'Company name is required.'
                      : undefined
                  }
                  state={companyName.trim() ? 'success' : 'default'}
                />
              </motion.div>
            )}

            <motion.div {...fieldMotion}>
              <FloatingInput
                id="register-email"
                label={emailLabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                leftIcon={<Mail size={18} aria-hidden="true" />}
                error={
                  touched.email && !email.trim()
                    ? `${emailLabel} is required.`
                    : usesPersonalEmail
                      ? 'Use a business email for faster employer verification.'
                      : undefined
                }
                state={email.trim() && !usesPersonalEmail ? 'success' : 'default'}
              />
            </motion.div>

            <motion.div {...fieldMotion}>
              <FloatingInput
                id="register-password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                showPasswordToggle
                error={
                  touched.password && password && !isPasswordValid(password)
                    ? 'Use at least 8 characters, including a letter and a number.'
                    : undefined
                }
              />
              <PasswordStrengthMeter password={password} />
            </motion.div>

            {isEmployer && (
              <motion.div {...fieldMotion}>
                <FloatingInput
                  id="register-company-website"
                  label="Company Website / URL"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  autoComplete="url"
                  leftIcon={<Globe size={18} aria-hidden="true" />}
                  hint="Used to verify your company profile during onboarding."
                  error={
                    touched.companyWebsite &&
                    companyWebsite.trim() &&
                    !isValidUrl(companyWebsite.trim())
                      ? 'Enter a valid website URL.'
                      : undefined
                  }
                  state={
                    companyWebsite.trim() && isValidUrl(companyWebsite.trim())
                      ? 'success'
                      : 'default'
                  }
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <p className={styles.securityNote}>
          <span aria-hidden="true">🔒</span> Protected with 256-bit SSL encryption
        </p>

        {error && (
          <p className={styles.error} role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button type="submit" className={styles.primary} disabled={loading}>
          {loading
            ? 'Please wait…'
            : isEmployer
              ? 'Create Employer Account'
              : 'Create Job Seeker Account'}
        </button>
      </form>

      <div className={styles.switchPanel}>
        <p className={styles.switchText}>Already have an account?</p>
        <button type="button" className={styles.switchCta} onClick={onSwitchToLogin}>
          Sign In
        </button>
      </div>
    </>
  );
};
