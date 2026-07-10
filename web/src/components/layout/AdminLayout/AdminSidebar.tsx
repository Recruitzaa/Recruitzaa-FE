import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import styles from './AdminSidebar.module.css';

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appUser } = useAppSelector((s) => s.auth);
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
        <Link to="/admin/dashboard">
          <span className={styles.logoText}>RecruitZaa <span style={{fontSize: '10px', color: '#DC2626'}}>ADMIN</span></span>
        </Link>
      </div>

      <ul className={styles.menu}>
        <li className={styles.sectionLabel}>Platform Core</li>
        <li>
          <Link to="/admin/dashboard" className={`${styles.link} ${isActive('/admin/dashboard') ? styles.active : ''}`}>
            <span>System Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/job-approvals" className={`${styles.link} ${isActive('/admin/job-approvals') ? styles.active : ''}`}>
            <span>Job Approvals</span>
            <span className={styles.badge}>5</span>
          </Link>
        </li>

        <li className={styles.sectionLabel}>Entities Management</li>
        <li>
          <Link to="/admin/companies" className={`${styles.link} ${isActive('/admin/companies') ? styles.active : ''}`}>
            <span>Companies</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/employers" className={`${styles.link} ${isActive('/admin/employers') ? styles.active : ''}`}>
            <span>Employer Accounts</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className={`${styles.link} ${isActive('/admin/users') ? styles.active : ''}`}>
            <span>Candidate Users</span>
          </Link>
        </li>

        <li className={styles.sectionLabel}>System</li>
        <li>
          <Link to="#" className={styles.link}>
            <span>Settings & API</span>
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className={styles.linkButton}>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>

      <div className={styles.user}>
        <div className={styles.avatar} style={{ backgroundColor: '#DC2626' }}>
          {appUser ? getInitials(appUser.displayName) : 'SA'}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{appUser ? appUser.displayName : 'Super Admin'}</div>
          <div className={styles.userRole}>System Operator</div>
        </div>
      </div>
    </aside>
  );
};
