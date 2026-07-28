import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import styles from './Navbar.module.css';
import logo from '../../../assets/logo.png';
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
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getDashboardRoute = () => {
    const role = appUser?.activeRole ?? appUser?.role;
    if (!role) return '/login';
    if (role === 'SUPER_ADMIN') return '/admin/dashboard';
    if (role === 'EMPLOYER') return ROUTES.EMPLOYER.DASHBOARD;
    if (role === 'EXPERT') return '/expert/dashboard';
    if (role === 'EMPLOYEE') return '/employee/dashboard';
    return ROUTES.CANDIDATE.DASHBOARD;
  };

  const authLink = (intent: 'signin' | 'candidate' | 'employer') =>
    intent === 'signin' ? '/login' : `/register?intent=${intent}`;
  const userRole = appUser?.activeRole ?? appUser?.role;
  const canSeeJobs = !isAuthenticated || userRole !== 'EMPLOYER';
  // Employer tab is a pre-login marketing element — hide it for ALL authenticated users
  const canSeeEmployers = !isAuthenticated;

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
          <img src={logo} alt="" width="140" height="36" />
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
              <Link to={authLink('employer')} className={`${styles.button} ${styles.dark}`}>
                Post a Job
              </Link>
              <Link to={authLink('candidate')} className={`${styles.button} ${styles.primary}`}>
                Create Account
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
                  <Link to={authLink('candidate')} className={`${styles.button} ${styles.primary}`}>
                    Create candidate account
                  </Link>
                  <Link to={authLink('employer')} className={`${styles.button} ${styles.dark}`}>
                    Create employer account
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
