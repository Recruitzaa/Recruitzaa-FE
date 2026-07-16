import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import styles from '../DashboardPage.module.css';
import { type RecommendedJob, type ActiveApplication } from '../../../data/mockDashboard';
import type { ApplicationCard } from '../../../features/applications/types/kanban.types';

interface DashboardLeftColProps {
  isLoading: boolean;
  jobs: RecommendedJob[];
  reduxApps: ApplicationCard[];
  activeApps: ActiveApplication[];
  handleApply: (job: RecommendedJob) => void;
}

export const DashboardLeftCol = ({
  isLoading,
  jobs,
  reduxApps,
  activeApps,
  handleApply,
}: DashboardLeftColProps) => {
  return (
    <div className={styles.mainCol}>
      {/* Recommended Jobs */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>AI Recommended Positions</h2>
          <Link to="/jobs" className={styles.panelLink}>
            Explore Jobs &rarr;
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Job Role</th>
                <th>Location</th>
                <th>Compensation</th>
                <th>Match</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <div className={styles.subText}>Loading jobs...</div>
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <div className={styles.subText}>No recommended jobs found.</div>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const isAlreadyApplied = reduxApps.some((app) => app.id === job.id);
                  return (
                    <tr key={job.id}>
                      <td>
                        <div className={styles.roleText}>{job.role}</div>
                        <div className={styles.companyText}>{job.company}</div>
                      </td>
                      <td>{job.location}</td>
                      <td>{job.salary}</td>
                      <td>
                        <span className={styles.scoreText}>{job.matchScore}% Match</span>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant={isAlreadyApplied ? 'outline' : 'primary'}
                          onClick={() => handleApply(job)}
                          disabled={isAlreadyApplied}
                          className={isAlreadyApplied ? 'opacity-60 cursor-not-allowed' : ''}
                        >
                          {isAlreadyApplied ? 'Applied' : 'Apply'}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Active Applications */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Active Application Status</h2>
          <Link to="/candidate/pipeline" className={styles.panelLink}>
            Open Kanban Board &rarr;
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company & Position</th>
                <th>Applied Date</th>
                <th>Stage Status</th>
                <th>Next Step</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <div className={styles.subText}>Loading applications...</div>
                  </td>
                </tr>
              ) : activeApps.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <div className={styles.subText}>No active applications.</div>
                  </td>
                </tr>
              ) : (
                activeApps.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className={styles.roleText}>{app.company}</div>
                      <div className={styles.companyText}>{app.role}</div>
                    </td>
                    <td>{app.appliedDate}</td>
                    <td>
                      <Badge variant={app.stageVariant}>{app.stageStatus}</Badge>
                    </td>
                    <td>
                      <span className={app.isSuccessText ? styles.subTextSuccess : styles.subText}>
                        {app.nextStep}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default DashboardLeftCol;
