import { Link, useLocation } from 'react-router-dom';
import styles from './UtilityBar.module.css';
import { SITE_CONTENT } from '../../../config/content';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setAudience } from '../../../store/slices/ui.slice';

export const UtilityBar = () => {
  const { contact } = SITE_CONTENT;
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

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
            onClick={() => dispatch(setAudience('job_seeker'))}
          >
            For Job Seekers
          </Link>
          <Link
            to="/employers"
            className={`${styles.link} ${isEmployersActive ? styles.active : ''}`}
            aria-current={isEmployersActive ? 'page' : undefined}
            onClick={() => dispatch(setAudience('employer'))}
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
