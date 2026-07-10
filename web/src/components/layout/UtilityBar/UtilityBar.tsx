import { Link } from 'react-router-dom';
import styles from './UtilityBar.module.css';

export const UtilityBar = () => {
  return (
    <div className={styles.utilityBar}>
      <div className={styles.container}>
        <div className={styles.portalToggle}>
          <Link to="/" className={`${styles.link} ${styles.active}`}>
            <span className={styles.desktopText}>For Job Seekers</span>
            <span className={styles.mobileText}>Job Seekers</span>
          </Link>
          <Link to="/employers" className={styles.link}>
            <span className={styles.desktopText}>For Employers & Enterprise Clients</span>
            <span className={styles.mobileText}>Employers</span>
          </Link>
        </div>
        <div className={styles.contact}>
          Support Line: <strong>+91 70972 74644</strong> &nbsp;|&nbsp; <strong>talent@recruitzaa.com</strong>
        </div>
      </div>
    </div>
  );
};
