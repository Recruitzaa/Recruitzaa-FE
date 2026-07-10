import { Link, useLocation } from 'react-router-dom';
import styles from './PortalSidebar.module.css';

export const PortalSidebar = () => {
  const location = useLocation();
  const isEmployer = location.pathname.startsWith('/employer');
  
  const isActive = (path: string) => location.pathname === path;

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
              <Link to="/auth" className={styles.link}>
                <span>Sign Out</span>
              </Link>
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
              <Link to="/auth" className={styles.link}>
                <span>Sign Out / Switch</span>
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className={styles.user}>
        {isEmployer ? (
          <>
            <div className={styles.avatar} style={{ backgroundColor: '#111827' }}>IN</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Infosys HR</div>
              <div className={styles.userRole}>Enterprise Account</div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.avatar}>AK</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Arjun Kumar</div>
              <div className={styles.userRole}>React Native Developer</div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
