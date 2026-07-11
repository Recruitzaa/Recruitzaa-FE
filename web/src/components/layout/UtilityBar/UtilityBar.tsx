import { Link } from 'react-router-dom';
import styles from './UtilityBar.module.css';
import { SITE_CONTENT } from '../../../config/content';

export const UtilityBar = () => {
  const { contact } = SITE_CONTENT;
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
          Support Line: <strong><a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className={styles.contactLink}>{contact.phone}</a></strong> &nbsp;|&nbsp; <strong><a href={`mailto:${contact.email}`} className={styles.contactLink}>{contact.email}</a></strong>
        </div>
      </div>
    </div>
  );
};
