import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import styles from '../EmployerDashboardPage.module.css';

export const EmployerDashboardSideCol = () => {
  return (
    <div className={styles.sideCol}>
      {/* Quick Actions */}
      <Card className={styles.panelCard}>
        <h2 className={styles.panelTitle}>Quick Actions</h2>
        <div className={styles.actionStack}>
          <Link to="/employer/post-job" className="no-underline">
            <Button className={styles.fullWidthBtn}>Post a New Job</Button>
          </Link>
          <Button variant="outline" className={styles.fullWidthBtn}>
            Search Resumes
          </Button>
          <Button variant="outline" className={styles.fullWidthBtn}>
            Manage Subscription
          </Button>
        </div>
      </Card>

      {/* Plan Details */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Current Plan</h2>
          <Badge variant="primary">Enterprise</Badge>
        </div>

        <div className={styles.meterItem}>
          <div className={styles.meterHead}>
            <span>Active Listings Quota</span>
            <span>4 / 10</span>
          </div>
          <div className={styles.meterBar}>
            <div className={styles.meterFill} style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className={styles.meterItem}>
          <div className={styles.meterHead}>
            <span>AI Screenings</span>
            <span>142 / 500</span>
          </div>
          <div className={styles.meterBar}>
            <div className={styles.meterFill} style={{ width: '28%' }}></div>
          </div>
        </div>
        <p className={`${styles.subText} mt-4`}>Your plan renews on August 1st, 2025.</p>
      </Card>
    </div>
  );
};
export default EmployerDashboardSideCol;
