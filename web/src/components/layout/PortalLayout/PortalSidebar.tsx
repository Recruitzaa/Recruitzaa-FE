import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import styles from './PortalSidebar.module.css';

export const PortalSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appUser } = useAppSelector((s) => s.auth);
  const isEmployer = location.pathname.startsWith('/employer');
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Link to={isEmployer ? "/employers" : "/"}>
          <span className={styles.logoText}>RecruitZaa {isEmployer && <span style={{fontSize: '10px', color: 'var(--color-primary)'}}>PRO</span>}</span>
        </Link>
      </div>

      <ul className={styles.menu}>
        {isEmployer ? (
          <>
            <li className={styles.sectionLabel}>Employer Hub</li>
            <li>
              <Link to="/employer/dashboard" className={`${styles.link} ${isActive('/employer/dashboard') ? styles.active : ''}`}>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/post-job" className={`${styles.link} ${isActive('/employer/post-job') ? styles.active : ''}`}>
                <span>Post a Job</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/my-jobs" className={`${styles.link} ${isActive('/employer/my-jobs') ? styles.active : ''}`}>
                <span>Active Listings</span>
              </Link>
            </li>
            <li>
              <Link to="/employer/candidates" className={`${styles.link} ${isActive('/employer/candidates') ? styles.active : ''}`}>
                <span>Candidate Pipeline</span>
                <span className={styles.badge} style={{ background: '#2563EB', color: '#fff' }}>14</span>
              </Link>
            </li>

            <li className={styles.sectionLabel}>Company Settings</li>
            <li>
              <Link to="#" className={styles.link}>
                <span>Company Profile</span>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className={styles.linkButton}>
                <span>Sign Out</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.sectionLabel}>Workspace</li>
            <li>
              <Link to="/candidate/dashboard" className={`${styles.link} ${isActive('/candidate/dashboard') ? styles.active : ''}`}>
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link to="/jobs" className={styles.link}>
                <span>Verified Job Search</span>
                <span className={styles.badge}>12.8K</span>
              </Link>
            </li>
            <li>
              <Link to="/candidate/pipeline" className={`${styles.link} ${isActive('/candidate/pipeline') ? styles.active : ''}`}>
                <span>Application Pipeline</span>
                <span className={styles.badge} style={{ background: '#2563EB', color: '#fff' }}>7</span>
              </Link>
            </li>

            <li className={styles.sectionLabel}>AI Career Copilot</li>
            <li>
              <Link to="/candidate/ai-hub" className={`${styles.link} ${isActive('/candidate/ai-hub') ? styles.active : ''}`}>
                <span>ATS Resume Parser</span>
              </Link>
            </li>
            <li>
              <Link to="/candidate/ai-hub" className={styles.link}>
                <span>AI Resume Builder</span>
              </Link>
            </li>

            <li className={styles.sectionLabel}>Profile & Settings</li>
            <li>
              <Link to="/candidate/profile" className={`${styles.link} ${isActive('/candidate/profile') ? styles.active : ''}`}>
                <span>Saved Positions</span>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className={styles.linkButton}>
                <span>Sign Out / Switch</span>
              </button>
            </li>
          </>
        )}
      </ul>

      <div className={styles.user}>
        <div className={styles.avatar} style={isEmployer ? { backgroundColor: '#111827' } : undefined}>
          {appUser ? getInitials(appUser.displayName) : 'U'}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{appUser ? appUser.displayName : 'Loading...'}</div>
          <div className={styles.userRole}>
            {isEmployer ? 'Enterprise Account' : 'Job Seeker'}
          </div>
        </div>
      </div>
    </aside>
  );
};

