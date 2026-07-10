import { Link } from 'react-router-dom';
import styles from './UtilityBar.module.css';

export const UtilityBar = () => {
  return (
    <div className={styles.utilityBar}>
      <div className={styles.container}>
        <div className={styles.portalToggle}>
          <Link to="/" className={`${styles.link} ${styles.active}`}>For Job Seekers</Link>
          <Link to="/employers" className={styles.link}>For Employers & Enterprise Clients</Link>
        </div>
        <div className={styles.contact}>
          Support Line: <strong>+91 70972 74644</strong> &nbsp;|&nbsp; <strong>talent@recruitzaa.com</strong>
        </div>
      </div>
    </div>
  );
};
