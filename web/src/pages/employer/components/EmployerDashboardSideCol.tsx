import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import styles from '../EmployerDashboardPage.module.css';

export const EmployerDashboardSideCol = ({ draftCount }: { draftCount: number }) => (
  <div className={styles.sideCol}>
    <Card className={styles.panelCard}>
      <h2 className={styles.panelTitle}>Next actions</h2>
      <div className={styles.actionStack}>
        <Link to="/employer/post-job" className="no-underline">
          <Button className={styles.fullWidthBtn}>Post a new job</Button>
        </Link>
        <Link to="/employer/my-jobs" className="no-underline">
          <Button variant="outline" className={styles.fullWidthBtn}>
            {draftCount > 0
              ? `Review ${draftCount} draft${draftCount === 1 ? '' : 's'}`
              : 'Manage listings'}
          </Button>
        </Link>
      </div>
    </Card>
    <Card className={styles.panelCard}>
      <h2 className={styles.panelTitle}>Production readiness</h2>
      <ul className={styles.readinessList}>
        <li>
          <span aria-hidden="true">✓</span> Job drafting and status controls
        </li>
        <li>
          <span aria-hidden="true">○</span> Applicant ingestion and review
        </li>
        <li>
          <span aria-hidden="true">○</span> Team permissions and audit log
        </li>
        <li>
          <span aria-hidden="true">○</span> Billing and plan enforcement
        </li>
      </ul>
      <p className={styles.subText}>
        Unchecked workflows are deliberately disabled instead of showing fabricated business data.
      </p>
    </Card>
  </div>
);
export default EmployerDashboardSideCol;
