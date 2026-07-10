import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

export const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

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
          <Link to="/auth" className={styles.link}>
            <span>Sign Out</span>
          </Link>
        </li>
      </ul>

      <div className={styles.user}>
        <div className={styles.avatar} style={{ backgroundColor: '#DC2626' }}>SA</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Super Admin</div>
          <div className={styles.userRole}>System Operator</div>
        </div>
      </div>
    </aside>
  );
};
