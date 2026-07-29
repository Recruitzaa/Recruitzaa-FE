import { Link, useLocation } from 'react-router-dom';
import styles from './UtilityBar.module.css';
import { SITE_CONTENT } from '../../../config/content';
import { useAppSelector } from '../../../store/hooks';

export const UtilityBar = () => {
  const { contact } = SITE_CONTENT;
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  // The utility bar is a pre-login marketing element.
  // Hide it entirely for authenticated users to avoid role confusion.
  if (isAuthenticated) return null;

  const pathname = location.pathname;
  const isJobSeekersActive =
    pathname === '/' || pathname.startsWith('/jobs') || pathname.startsWith('/candidate');
  const isEmployersActive = pathname === '/employers' || pathname.startsWith('/employer');

  return (
    <nav className={styles.utilityBar} aria-label="Audience shortcuts">
      <div className={styles.container}>
        <div className={styles.portalToggle}>
          <Link
            to="/"
            className={`${styles.link} ${isJobSeekersActive ? styles.active : ''}`}
            aria-current={isJobSeekersActive ? 'page' : undefined}
          >
            For Job Seekers
          </Link>
          <Link
            to="/employers"
            className={`${styles.link} ${isEmployersActive ? styles.active : ''}`}
            aria-current={isEmployersActive ? 'page' : undefined}
          >
            For Employers & Enterprise Clients
          </Link>
        </div>
        <div className={styles.contact}>
          Support Line:{' '}
          <strong>
            <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className={styles.contactLink}>
              {contact.phone}
            </a>
          </strong>{' '}
          &nbsp;|&nbsp;{' '}
          <strong>
            <a href={`mailto:${contact.email}`} className={styles.contactLink}>
              {contact.email}
            </a>
          </strong>
        </div>
      </div>
    </nav>
  );
};
