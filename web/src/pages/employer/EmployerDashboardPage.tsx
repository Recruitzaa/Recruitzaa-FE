import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppSelector } from '../../store/hooks';
import styles from './EmployerDashboardPage.module.css';
import { EmployerDashboardSideCol } from './components/EmployerDashboardSideCol';
import { SEO } from '../../components/seo/SEO';

export const EmployerDashboardPage = () => {
  const jobs = useAppSelector((state) => state.jobs.jobsList);
  const activeJobs = jobs.filter((job) => job.status === 'Active');
  const draftJobs = jobs.filter((job) => job.status === 'Draft');
  const closedJobs = jobs.filter((job) => job.status === 'Closed');

  return (
    <div className={styles.dashboard}>
      <SEO
        title="Employer Workspace | Recruitzaa"
        description="Review active listings, draft vacancies, and candidate pipeline tracking."
      />
      {import.meta.env.DEV && (
        <p className={styles.demoNotice} role="status">
          Demo workspace: listings are stored in this browser. Applications, candidate search,
          billing, and interview data are not connected yet.
        </p>
      )}

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Active Listings</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagPrimary}`}>Browser data</span>
            )}
          </div>
          <div className={styles.kpiValue}>{activeJobs.length}</div>
        </Card>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Draft Listings</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Actionable</span>
          </div>
          <div className={styles.kpiValue}>{draftJobs.length}</div>
        </Card>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Closed Listings</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagPrimary}`}>Browser data</span>
            )}
          </div>
          <div className={styles.kpiValue}>{closedJobs.length}</div>
        </Card>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Applications</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Not connected</span>
            )}
          </div>
          <div
            className={styles.kpiValue}
            aria-label={
              import.meta.env.DEV
                ? 'Application count unavailable until the service is connected'
                : 'Applications'
            }
            title={
              import.meta.env.DEV
                ? 'Application data will appear after the production application service is connected.'
                : 'Application data will appear once candidate integration is live.'
            }
          >
            {import.meta.env.DEV ? 'N/A' : '—'}
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
                        <span className={styles.subText}>—</span>
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
              <h3>
                {import.meta.env.DEV ? 'Candidate data is not connected' : 'No active applications'}
              </h3>
              <p>
                {import.meta.env.DEV
                  ? 'Recruitzaa will show applicants here after a production application API, consent controls, and employer ownership checks are implemented.'
                  : 'Candidate applications will appear here once they apply to your listings.'}
              </p>
            </div>
          </Card>
        </div>
        <EmployerDashboardSideCol draftCount={draftJobs.length} />
      </div>
    </div>
  );
};
