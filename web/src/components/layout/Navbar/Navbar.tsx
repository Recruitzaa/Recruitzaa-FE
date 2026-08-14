import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './Navbar.module.css';
import { BrandLogo } from '../../brand/BrandLogo';
import { ROUTES } from '../../../config/routes';
import { useTheme } from '../../../hooks/useTheme';

type MenuName = 'jobs' | 'employers' | null;

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appUser, isAuthenticated } = useAppSelector((s) => s.auth);
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const audience = useAppSelector((s) => s.ui.audience);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLElement>(null);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  useFocusTrap(mobileOpen, mobilePanelRef, { onEscape: closeMobile });

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // Close dropdown when clicking outside the nav or pressing Escape
  useEffect(() => {
    if (!openMenu) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (navMenuRef.current && !navMenuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenu]);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getDashboardRoute = () => {
    const role = appUser?.activeRole ?? appUser?.role;
    if (!role) return ROUTES.AUTH.LOGIN;
    if (role === 'SUPER_ADMIN') return '/admin/dashboard';
    if (role === 'EMPLOYER') return ROUTES.EMPLOYER.DASHBOARD;
    if (role === 'EXPERT') return '/expert/dashboard';
    if (role === 'EMPLOYEE') return '/employee/dashboard';
    return ROUTES.CANDIDATE.DASHBOARD;
  };

  const userRole = appUser?.activeRole ?? appUser?.role;
  const isEmployerContext =
    location.pathname.startsWith('/employers') ||
    location.pathname.startsWith('/employer') ||
    location.search.includes('intent=employer');
  // The homepage '/' is the canonical job-seeker landing — treat it the same
  // as /jobs and /candidate so a persisted 'employer' audience preference
  // never hides Find Jobs / Career Tools when a visitor navigates back to '/'.
  const isJobSeekerContext =
    location.pathname === '/' ||
    location.pathname.startsWith('/jobs') ||
    location.pathname.startsWith('/candidate') ||
    location.search.includes('intent=candidate');
  // Sign In should land on the account-type tab that matches where the visitor
  // currently is (or their saved audience preference), not always "Job Seeker".
  const signInIntent: 'candidate' | 'employer' = isEmployerContext
    ? 'employer'
    : isJobSeekerContext
      ? 'candidate'
      : audience === 'employer'
        ? 'employer'
        : 'candidate';
  const authLink = (intent: 'signin' | 'candidate' | 'employer') =>
    intent === 'signin'
      ? ROUTES.AUTH.loginWithIntent(signInIntent)
      : ROUTES.AUTH.registerWithIntent(intent);
  // Once a guest has self-identified via the UtilityBar toggle, stop
  // cross-promoting the other audience in the primary nav — but never hide
  // the section a visitor is currently standing on, even if it conflicts
  // with a stale preference from an earlier visit. Each override must check
  // its OWN context (job-seeker pages keep Jobs visible, employer pages keep
  // Employer Services visible) — checking the other one hides the wrong link.
  const canSeeJobs =
    (!isAuthenticated || userRole !== 'EMPLOYER') &&
    (audience !== 'employer' || isJobSeekerContext);
  // Employer tab is a pre-login marketing element — hide it for ALL authenticated users
  const canSeeEmployers = !isAuthenticated && (audience !== 'job_seeker' || isEmployerContext);

  const guestPrimaryCta = isEmployerContext
    ? { label: 'Post a Job', to: authLink('employer'), style: styles.dark }
    : { label: 'Create Account', to: authLink('candidate'), style: styles.primary };

  const primaryLinks = (
    <>
      {canSeeJobs && (
        <Link to="/jobs" className={styles.mobileLink}>
          Find Jobs
        </Link>
      )}
      {canSeeEmployers && (
        <Link to="/employers" className={styles.mobileLink}>
          For Employers
        </Link>
      )}
      {canSeeJobs && (
        <Link
          to={isAuthenticated ? '/candidate/ai-hub' : authLink('candidate')}
          className={styles.mobileLink}
        >
          Career Tools
        </Link>
      )}
      {isAuthenticated && (
        <Link to={getDashboardRoute()} className={styles.mobileLink}>
          Dashboard
        </Link>
      )}
      <Link to="/#about" className={styles.mobileLink}>
        About Recruitzaa
      </Link>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} aria-label="Recruitzaa home">
          <BrandLogo />
        </Link>

        <nav ref={navMenuRef} className={styles.navMenu} aria-label="Primary navigation">
          {canSeeJobs && (
            <div className={styles.navItem}>
              <div
                className={`${styles.navGroup} ${openMenu === 'jobs' ? styles.navGroupActive : ''}`}
              >
                <Link
                  to="/jobs"
                  className={styles.navLink}
                  aria-current={location.pathname.startsWith('/jobs') ? 'page' : undefined}
                >
                  Find Jobs
                </Link>
                <button
                  type="button"
                  className={styles.menuTrigger}
                  aria-label="Open Find Jobs menu"
                  aria-expanded={openMenu === 'jobs'}
                  aria-controls="jobs-mega-menu"
                  onClick={() => setOpenMenu(openMenu === 'jobs' ? null : 'jobs')}
                >
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={`${styles.chevron} ${openMenu === 'jobs' ? styles.chevronOpen : ''}`}
                  />
                </button>
              </div>
              <div
                id="jobs-mega-menu"
                className={`${styles.megaMenu} ${openMenu === 'jobs' ? styles.megaMenuOpen : ''}`}
              >
                <div>
                  <div className={styles.mmTitle}>Browse roles</div>
                  <Link to="/jobs?keyword=engineer" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Engineering roles</div>
                    <div className={styles.mmItemDesc}>
                      Filter the currently available job catalogue
                    </div>
                  </Link>
                  <Link to="/jobs?workplace=Remote" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Remote work</div>
                    <div className={styles.mmItemDesc}>Roles marked as remote by employers</div>
                  </Link>
                </div>
                <div>
                  <div className={styles.mmTitle}>Career tools</div>
                  <Link
                    to={isAuthenticated ? '/candidate/ai-hub' : authLink('candidate')}
                    className={styles.mmItem}
                  >
                    <div className={styles.mmItemTitle}>Resume tools</div>
                    <div className={styles.mmItemDesc}>Sign in to use profile-based tools</div>
                  </Link>
                  <Link
                    to={isAuthenticated ? getDashboardRoute() : authLink('candidate')}
                    className={styles.mmItem}
                  >
                    <div className={styles.mmItemTitle}>Candidate workspace</div>
                    <div className={styles.mmItemDesc}>Track jobs and applications</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {canSeeEmployers && (
            <div className={styles.navItem}>
              <div
                className={`${styles.navGroup} ${openMenu === 'employers' ? styles.navGroupActive : ''}`}
              >
                <Link
                  to="/employers"
                  className={styles.navLink}
                  aria-current={location.pathname.startsWith('/employer') ? 'page' : undefined}
                >
                  Employer Services
                </Link>
                <button
                  type="button"
                  className={styles.menuTrigger}
                  aria-label="Open Employer Services menu"
                  aria-expanded={openMenu === 'employers'}
                  aria-controls="employer-mega-menu"
                  onClick={() => setOpenMenu(openMenu === 'employers' ? null : 'employers')}
                >
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={`${styles.chevron} ${openMenu === 'employers' ? styles.chevronOpen : ''}`}
                  />
                </button>
              </div>
              <div
                id="employer-mega-menu"
                className={`${styles.megaMenu} ${openMenu === 'employers' ? styles.megaMenuOpen : ''}`}
              >
                <div>
                  <div className={styles.mmTitle}>Hiring options</div>
                  <Link to="/employers#services" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Permanent placement</div>
                    <div className={styles.mmItemDesc}>Explore the recruitment workflow</div>
                  </Link>
                  <Link to="/employers#services" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Contract staffing</div>
                    <div className={styles.mmItemDesc}>Discuss flexible hiring requirements</div>
                  </Link>
                </div>
                <div>
                  <div className={styles.mmTitle}>Employer workspace</div>
                  <Link
                    to={isAuthenticated ? getDashboardRoute() : authLink('employer')}
                    className={styles.mmItem}
                  >
                    <div className={styles.mmItemTitle}>Post and manage jobs</div>
                    <div className={styles.mmItemDesc}>Sign in with an employer account</div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {canSeeJobs && (
            <Link
              to={isAuthenticated ? '/candidate/ai-hub' : authLink('candidate')}
              className={styles.navLink}
            >
              Career Tools
            </Link>
          )}
          <Link to="/#about" className={styles.navLink}>
            About Us
          </Link>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeButton}
            onClick={toggleTheme}
            aria-label={isDark ? 'Use light theme' : 'Use dark theme'}
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          {isAuthenticated ? (
            <>
              <Link to={getDashboardRoute()} className={`${styles.button} ${styles.primary}`}>
                Workspace
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className={`${styles.button} ${styles.outline}`}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to={authLink('signin')} className={`${styles.button} ${styles.outline}`}>
                Sign In
              </Link>
              <Link to={guestPrimaryCta.to} className={`${styles.button} ${guestPrimaryCta.style}`}>
                {guestPrimaryCta.label}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.mobileTrigger}
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onMouseDown={(event) => event.target === event.currentTarget && closeMobile()}
        >
          <div
            ref={mobilePanelRef}
            className={styles.mobilePanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            tabIndex={-1}
          >
            <div className={styles.mobileHeader}>
              <span id="mobile-nav-title">Menu</span>
              <button type="button" onClick={closeMobile} aria-label="Close navigation">
                <X aria-hidden="true" />
              </button>
            </div>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {primaryLinks}
            </nav>
            <div className={styles.mobileActions}>
              <button
                type="button"
                onClick={toggleTheme}
                className={`${styles.button} ${styles.outline}`}
              >
                {isDark ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
                {isDark ? 'Use light theme' : 'Use dark theme'}
              </button>
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardRoute()} className={`${styles.button} ${styles.primary}`}>
                    Go to workspace
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={`${styles.button} ${styles.outline}`}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={guestPrimaryCta.to}
                    className={`${styles.button} ${guestPrimaryCta.style}`}
                  >
                    {isEmployerContext ? 'Create employer account' : 'Create candidate account'}
                  </Link>
                  <Link to={authLink('signin')} className={`${styles.button} ${styles.outline}`}>
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
