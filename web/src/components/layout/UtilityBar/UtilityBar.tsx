import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './UtilityBar.module.css';
import { SITE_CONTENT } from '../../../config/content';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setAudience } from '../../../store/slices/ui.slice';

export const UtilityBar = () => {
  const { contact } = SITE_CONTENT;
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const audience = useAppSelector((s) => s.ui.audience);
  const dispatch = useAppDispatch();

  const pathname = location.pathname;
  const isJobSeekersActive =
    pathname === '/' || pathname.startsWith('/jobs') || pathname.startsWith('/candidate');
  const isEmployersActive = pathname === '/employers' || pathname.startsWith('/employer');

  // Keep the persisted audience in sync with the current URL.
  // Without this, a user who visited /employers (setting audience='employer')
  // and then navigated back to / via browser back/address-bar would still have
  // audience='employer' in the store, causing the Navbar to hide Find Jobs /
  // Career Tools on the homepage. The URL is always the source of truth.
  useEffect(() => {
    if (isJobSeekersActive && audience !== 'job_seeker') {
      dispatch(setAudience('job_seeker'));
    } else if (isEmployersActive && audience !== 'employer') {
      dispatch(setAudience('employer'));
    }
  }, [pathname, isJobSeekersActive, isEmployersActive, audience, dispatch]);

  // The utility bar is a pre-login marketing element.
  // Hide it entirely for authenticated users to avoid role confusion.
  if (isAuthenticated) return null;

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
