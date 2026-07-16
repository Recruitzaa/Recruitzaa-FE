import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import styles from '../DashboardPage.module.css';

export const DashboardRightCol = () => {
  return (
    <div className={styles.rightCol}>
      {/* Profile Completeness */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Profile Completeness</h2>
          <span className={styles.scoreText}>78%</span>
        </div>
        <div className={styles.meterBar}>
          <div className={styles.meterFill} style={{ width: '78%' }}></div>
        </div>
        <p className={styles.panelDesc}>
          Add <strong>GraphQL</strong> & <strong>AWS Deployment</strong> to your resume to increase
          match rank by 15%.
        </p>
        <Button variant="outline" className={styles.fullWidthBtn}>
          Optimize Resume with AI
        </Button>
      </Card>

      {/* Skill Demand Index */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Skill Demand Index</h2>
          <span className={styles.subText}>Q3 2025</span>
        </div>

        <div className={styles.meterItem}>
          <div className={styles.meterHead}>
            <span>React Native</span>
            <span>92% High</span>
          </div>
          <div className={styles.meterBar}>
            <div className={styles.meterFill} style={{ width: '92%' }}></div>
          </div>
        </div>
        <div className={styles.meterItem}>
          <div className={styles.meterHead}>
            <span>TypeScript Architecture</span>
            <span>88% High</span>
          </div>
          <div className={styles.meterBar}>
            <div className={styles.meterFill} style={{ width: '88%' }}></div>
          </div>
        </div>
        <div className={styles.meterItem}>
          <div className={styles.meterHead}>
            <span>GraphQL Integration</span>
            <span>74% Moderate</span>
          </div>
          <div className={styles.meterBar}>
            <div className={styles.meterFill} style={{ width: '74%' }}></div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default DashboardRightCol;
