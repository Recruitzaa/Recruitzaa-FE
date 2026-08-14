import { Link } from 'react-router-dom';
import { RecoveryShell } from '../../components/layout/RecoveryShell/RecoveryShell';
import { SEO } from '../../components/seo/SEO';
import styles from './NotFoundPage.module.css';

export const UnauthorizedPage = () => (
  <RecoveryShell>
    <SEO
      title="Access restricted | Recruitzaa"
      description="This Recruitzaa workspace is not assigned to your account. Choose an assigned workspace to continue."
    />
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Access restricted</p>
        <h1>This workspace is not assigned to you</h1>
        <p className={styles.lead}>
          Choose an assigned workspace or contact an administrator if you believe your role is
          incorrect.
        </p>
        <div className={styles.actions}>
          <Link to="/launchpad" className={styles.primaryLink}>
            Choose workspace
          </Link>
          <Link to="/" className={styles.secondaryLink}>
            Return home
          </Link>
        </div>
      </div>
    </div>
  </RecoveryShell>
);
