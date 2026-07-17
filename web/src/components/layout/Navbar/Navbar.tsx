import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import styles from './Navbar.module.css';
import logo from '../../../assets/logo.png';
import { ROUTES } from '../../../config/routes';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appUser, isAuthenticated } = useAppSelector((s) => s.auth);
  const pathname = location.pathname;

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getDashboardRoute = () => {
    if (!appUser) return '/auth';
    if (appUser.role === 'SUPER_ADMIN') return '/admin/dashboard';
    if (appUser.role === 'EMPLOYER') return ROUTES.EMPLOYER.DASHBOARD;
    return ROUTES.CANDIDATE.DASHBOARD;
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <img src={logo} alt="Recruitzaa logo" width="140" height="36" />
        </Link>

        <nav className={styles.navMenu} aria-label="Primary" role="navigation">
          {(!isAuthenticated || appUser?.role !== 'EMPLOYER') && (
            <div className={styles.navItem}>
              <Link
                to="/jobs"
                className={styles.navLink}
                aria-current={pathname.startsWith('/jobs') ? 'page' : undefined}
              >
                Find Jobs <span className={styles.caret}>▼</span>
              </Link>
              <div className={styles.megaMenu}>
                <div>
                  <div className={styles.mmTitle}>By Category</div>
                  <Link to="/jobs" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>IT & Software Engineering</div>
                    <div className={styles.mmItemDesc}>3,420 Active Roles in India</div>
                  </Link>
                  <Link to="/jobs" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Remote & Hybrid Work</div>
                    <div className={styles.mmItemDesc}>Flexible Work Positions</div>
                  </Link>
                </div>
                <div>
                  <div className={styles.mmTitle}>Career Tools</div>
                  <Link to="/candidate/ai-hub" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>ATS Resume Score Check</div>
                    <div className={styles.mmItemDesc}>Test Parseability Score</div>
                  </Link>
                  <Link to="/candidate/dashboard" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Candidate Workspace</div>
                    <div className={styles.mmItemDesc}>Dashboard & Pipeline</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {(!isAuthenticated || appUser?.role !== 'CANDIDATE') && (
            <div className={styles.navItem}>
              <Link
                to="/employers"
                className={styles.navLink}
                aria-current={
                  pathname === '/employers' || pathname.startsWith('/employer') ? 'page' : undefined
                }
              >
                Employer Services <span className={styles.caret}>▼</span>
              </Link>
              <div className={styles.megaMenu}>
                <div>
                  <div className={styles.mmTitle}>Staffing Engagement</div>
                  <Link to="/employers" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Permanent Placement</div>
                    <div className={styles.mmItemDesc}>Full-Cycle Recruitment</div>
                  </Link>
                  <Link to="/employers" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Contract Staffing</div>
                    <div className={styles.mmItemDesc}>Rapid Contractor Deployment</div>
                  </Link>
                </div>
                <div>
                  <div className={styles.mmTitle}>Enterprise Solutions</div>
                  <Link to="/employers" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Executive Search</div>
                    <div className={styles.mmItemDesc}>Confidential Headhunting</div>
                  </Link>
                  <Link to="/auth" className={styles.mmItem}>
                    <div className={styles.mmItemTitle}>Post a Job Listing</div>
                    <div className={styles.mmItemDesc}>Employer Account Setup</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {(!isAuthenticated || appUser?.role !== 'EMPLOYER') && (
            <Link
              to="/candidate/ai-hub"
              className={styles.navLink}
              aria-current={pathname.startsWith('/candidate/ai-hub') ? 'page' : undefined}
            >
              AI Career Hub
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to={getDashboardRoute()}
              className={styles.navLink}
              aria-current={
                pathname.startsWith('/candidate') ||
                pathname.startsWith('/employer') ||
                pathname.startsWith('/admin')
                  ? 'page'
                  : undefined
              }
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/#about"
            className={styles.navLink}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            About Us
          </Link>
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <Link to={getDashboardRoute()} className={`${styles.button} ${styles.primary}`}>
                Go to Workspace
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
              <Link to="/auth" className={`${styles.button} ${styles.outline}`}>
                Sign In
              </Link>
              <Link to="/auth" className={`${styles.button} ${styles.dark}`}>
                Post a Job
              </Link>
              <Link to="/auth" className={`${styles.button} ${styles.primary}`}>
                Register Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
