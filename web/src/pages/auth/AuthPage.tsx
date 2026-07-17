import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from '../../components/layout/PageTransition';
import styles from './AuthPage.module.css';
import logo from '../../assets/logo.png';
import { useAppDispatch } from '../../store/hooks';
import { setAuthLoading } from '../../store/slices/auth.slice';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

type Role = 'candidate' | 'employer';
type Mode = 'login' | 'register';

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState<Role>('candidate');
  const [mode, setMode] = useState<Mode>('login');

  const handleSuccess = (_uid: string) => {
    // Always route to launchpad for now so you can see it on staging
    localStorage.setItem('selected_role', role);
    dispatch(setAuthLoading(true)); // Force RoleGuard to wait for Firebase listener
    navigate('/launchpad');
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
      <div className={styles.page}>
        {/* ── Left brand panel (desktop only) ── */}
        <section className={styles.brandPanel}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Recruitzaa logo" width="140" height="36" />
          </div>
          <p>
            AI-driven recruitment platform — connecting talent with companies through intelligent
            matching, automated screening, and hiring workflows.
          </p>
          <ul className={styles.trustPoints}>
            <li>
              <span aria-hidden="true">✦</span> AI-powered job matching
            </li>
            <li>
              <span aria-hidden="true">✦</span> ATS resume scoring
            </li>
            <li>
              <span aria-hidden="true">✦</span> Mock interview coach
            </li>
            <li>
              <span aria-hidden="true">✦</span> Real-time application tracker
            </li>
          </ul>
        </section>

        {/* ── Right form panel ── */}
        <section className={styles.formPanel}>
          <div className={styles.card}>
            {/* Role tabs */}
            <div className={styles.tabs}>
              <button
                type="button"
                className={role === 'candidate' ? styles.active : ''}
                onClick={() => setRole('candidate')}
              >
                Job Seeker
              </button>
              <button
                type="button"
                className={role === 'employer' ? styles.active : ''}
                onClick={() => setRole('employer')}
              >
                Employer
              </button>
            </div>

            {/* Mode toggle */}
            <div className={styles.modeToggle}>
              <button
                type="button"
                className={mode === 'login' ? styles.modeActive : ''}
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={mode === 'register' ? styles.modeActive : ''}
                onClick={() => setMode('register')}
              >
                Create Account
              </button>
            </div>

            {mode === 'login' ? (
              <LoginForm
                role={role}
                onSuccess={handleSuccess}
                onSwitchToRegister={() => setMode('register')}
              />
            ) : (
              <RegisterForm
                role={role}
                onSuccess={handleSuccess}
                onSwitchToLogin={() => setMode('login')}
              />
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
export default AuthPage;
