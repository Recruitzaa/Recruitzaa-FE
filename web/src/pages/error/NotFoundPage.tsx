import { type FormEvent, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RecoveryShell } from '../../components/layout/RecoveryShell/RecoveryShell';
import { SEO } from '../../components/seo/SEO';
import { ROUTES } from '../../config/routes';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const searchId = useId();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('q') ?? '').trim();
    navigate(query ? `${ROUTES.PUBLIC.JOBS}?q=${encodeURIComponent(query)}` : ROUTES.PUBLIC.JOBS);
  };

  return (
    <RecoveryShell>
      <SEO
        title="Page not found | Recruitzaa"
        description="This Recruitzaa page could not be found. Browse jobs or explore employer hiring tools."
      />
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>404</p>
          <h1>We couldn&apos;t find that page</h1>
          <p className={styles.lead}>
            The address may be incorrect or the page may have moved. Try a job search or jump to a
            popular destination below.
          </p>

          <form
            className={styles.search}
            role="search"
            aria-label="Job search"
            onSubmit={handleSearch}
          >
            <input
              id={searchId}
              name="q"
              type="search"
              placeholder="Job title, company, or skills"
              aria-label="Search jobs"
            />
            <button type="submit">Search jobs</button>
          </form>

          <div className={styles.actions}>
            <Link to={ROUTES.PUBLIC.JOBS} className={styles.primaryLink}>
              Browse jobs
            </Link>
            <Link to={ROUTES.PUBLIC.EMPLOYERS} className={styles.secondaryLink}>
              For employers
            </Link>
            <Link to={ROUTES.PUBLIC.HOME} className={styles.secondaryLink}>
              Return home
            </Link>
          </div>
        </div>
      </div>
    </RecoveryShell>
  );
};
