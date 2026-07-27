import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BriefcaseBusiness,
  ClipboardList,
  MessageSquareQuote,
  Sparkles,
  Target,
} from 'lucide-react';
import { PageTransition } from '../../components/layout/PageTransition';
import styles from './AuthPage.module.css';
import logo from '../../assets/logo.png';
import { useAppDispatch } from '../../store/hooks';
import { setAuthLoading } from '../../store/slices/auth.slice';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { SegmentedControl } from './components/SegmentedControl';
import { trackEvent } from '../../services/analytics.service';

type Role = 'candidate' | 'employer';
type Mode = 'login' | 'register';

const ROLE_OPTIONS = [
  { value: 'candidate' as const, label: 'Job Seeker' },
  { value: 'employer' as const, label: 'Employer' },
];

const TRUST_POINTS = [
  { icon: Target, text: 'Profile-based job discovery' },
  { icon: Sparkles, text: 'ATS resume scoring' },
  { icon: MessageSquareQuote, text: 'Mock interview coach' },
  { icon: ClipboardList, text: 'Structured application tracker' },
];

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const intent = searchParams.get('intent');
  const [role, setRole] = useState<Role>(intent === 'employer' ? 'employer' : 'candidate');
  const routeMode: Mode | null =
    location.pathname === '/login'
      ? 'login'
      : location.pathname === '/register'
        ? 'register'
        : null;
  const [legacyMode, setLegacyMode] = useState<Mode>(
    intent === 'candidate' || intent === 'employer' ? 'register' : 'login'
  );
  const mode = routeMode ?? legacyMode;

  useEffect(() => {
    trackEvent('auth_intent_viewed', { mode, intent: intent ?? 'unspecified' });
  }, [intent, mode]);

  const switchMode = (nextMode: Mode) => {
    if (routeMode) {
      navigate({
        pathname: nextMode === 'login' ? '/login' : '/register',
        search: searchParams.toString(),
      });
    } else {
      setLegacyMode(nextMode);
    }
  };

  const handleSuccess = (_uid: string) => {
    localStorage.setItem('selected_role', role);
    dispatch(setAuthLoading(true)); // Force RoleGuard to wait for Firebase listener
    const next = searchParams.get('next');
    navigate(next?.startsWith('/') && !next.startsWith('//') ? next : '/launchpad');
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Sign In & Get Started — Recruitzaa Workspace</title>
        <meta
          name="description"
          content="Access your candidate, employer, or administrator control panel on Recruitzaa."
        />
      </Helmet>
      <main className={styles.page}>
        {/* ── Left brand panel (desktop only) ── */}
        <section className={styles.brandPanel}>
          <Link to="/" className={styles.logoContainer} aria-label="Recruitzaa home">
            <img src={logo} alt="Recruitzaa logo" width="140" height="36" />
          </Link>

          <p className={styles.brandCopy}>
            One workspace for exploring roles, managing candidates, and tracking recruitment work.
          </p>

          <ul className={styles.trustPoints}>
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className={styles.trustIcon} aria-hidden="true">
                  <Icon size={16} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className={styles.brandFooter}>
            <BriefcaseBusiness size={16} aria-hidden="true" />
            <span>Enterprise-ready workflows for modern hiring teams</span>
          </div>
        </section>

        {/* ── Right form panel ── */}
        <section className={styles.formPanel}>
          <Link to="/" className={styles.mobileLogo} aria-label="Recruitzaa home">
            <img src={logo} alt="Recruitzaa logo" width="120" height="31" />
          </Link>

          <div className={styles.card}>
            {/* Role selector */}
            <SegmentedControl
              ariaLabel="Choose account type"
              options={ROLE_OPTIONS}
              value={role}
              onChange={setRole}
            />

            {/* Mode toggle */}
            {!routeMode && (
              <div className={styles.modeToggle}>
                <button
                  type="button"
                  className={mode === 'login' ? styles.modeActive : ''}
                  aria-pressed={mode === 'login'}
                  onClick={() => switchMode('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={mode === 'register' ? styles.modeActive : ''}
                  aria-pressed={mode === 'register'}
                  onClick={() => switchMode('register')}
                >
                  Create Account
                </button>
              </div>
            )}

            {role === 'employer' && (
              <p className={styles.verificationNotice}>
                Employer publishing access requires business-email and company verification after
                registration.
              </p>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className={styles.formContent}
              >
                {mode === 'login' ? (
                  <LoginForm
                    role={role}
                    onSuccess={handleSuccess}
                    onSwitchToRegister={() => switchMode('register')}
                  />
                ) : (
                  <RegisterForm
                    role={role}
                    onSuccess={handleSuccess}
                    onSwitchToLogin={() => switchMode('login')}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default AuthPage;
