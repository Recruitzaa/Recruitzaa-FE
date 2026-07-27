import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppSelector } from '../../store/hooks';
import styles from './EmployerDashboardPage.module.css';
import { EmployerDashboardSideCol } from './components/EmployerDashboardSideCol';

export const EmployerDashboardPage = () => {
  const jobs = useAppSelector((state) => state.jobs.jobsList);
  const activeJobs = jobs.filter((job) => job.status === 'Active');
  const draftJobs = jobs.filter((job) => job.status === 'Draft');
  const closedJobs = jobs.filter((job) => job.status === 'Closed');

  return (
    <div className={styles.dashboard}>
      <p className={styles.demoNotice} role="status">
        Demo workspace: listings are stored in this browser. Applications, candidate search,
        billing, and interview data are not connected yet.
      </p>

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Active Listings</span>
            <span className={`${styles.kpiTag} ${styles.tagPrimary}`}>Browser data</span>
          </div>
          <div className={styles.kpiValue}>{activeJobs.length}</div>
        </Card>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Drafts to Finish</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Actionable</span>
          </div>
          <div className={styles.kpiValue}>{draftJobs.length}</div>
        </Card>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Closed Listings</span>
            <span className={`${styles.kpiTag} ${styles.tagPrimary}`}>Browser data</span>
          </div>
          <div className={styles.kpiValue}>{closedJobs.length}</div>
        </Card>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Applications</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Not connected</span>
          </div>
          <div className={styles.kpiValue} aria-label="Applications unavailable">
            —
          </div>
        </Card>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Your job listings</h2>
              <Link to="/employer/my-jobs" className={styles.panelLink}>
                Manage all &rarr;
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Job title</th>
                    <th>Status</th>
                    <th>Applications</th>
                    <th>Posted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.slice(0, 5).map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div className={styles.roleText}>{job.title}</div>
                        <div className={styles.subText}>{job.location}</div>
                      </td>
                      <td>
                        <Badge
                          variant={
                            job.status === 'Active'
                              ? 'success'
                              : job.status === 'Draft'
                                ? 'warning'
                                : 'neutral'
                          }
                        >
                          {job.status}
                        </Badge>
                      </td>
                      <td>
                        <span className={styles.subText}>Not connected</span>
                      </td>
                      <td>
                        <span className={styles.subText}>{job.postedAt}</span>
                      </td>
                      <td>
                        <Link to="/employer/my-jobs" className="no-underline">
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan={5} className={styles.emptyState}>
                        No listings yet. Create your first job to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Candidate pipeline</h2>
            </div>
            <div className={styles.emptyPanel}>
              <h3>Candidate data is not connected</h3>
              <p>
                Recruitzaa will show applicants here after a production application API, consent
                controls, and employer ownership checks are implemented.
              </p>
            </div>
          </Card>
        </div>
        <EmployerDashboardSideCol draftCount={draftJobs.length} />
      </div>
    </div>
  );
};
