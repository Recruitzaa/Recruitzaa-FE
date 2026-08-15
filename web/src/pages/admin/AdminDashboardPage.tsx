import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import styles from './AdminDashboardPage.module.css';
import { SEO } from '../../components/seo/SEO';

export const AdminDashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      <SEO
        title="Platform Overview | Recruitzaa Admin"
        description="Track users, active companies, token counts, and system metrics."
      />
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Platform Overview</h1>
      </div>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Total Users</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+1.2K This Month</span>
            )}
          </div>
          <div className={styles.kpiValue}>14,592</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Active Companies</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+12 This Month</span>
            )}
          </div>
          <div className={styles.kpiValue}>348</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Active Jobs</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagPrimary}`}>24 Pending</span>
            )}
          </div>
          <div className={styles.kpiValue}>2,105</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>AI Token Usage</span>
            {import.meta.env.DEV && (
              <span className={`${styles.kpiTag} ${styles.tagWarning}`}>88% Quota</span>
            )}
          </div>
          <div className={styles.kpiValue}>4.2M</div>
        </Card>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          {/* Pending Job Approvals */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Pending Job Approvals</h2>
              <Link to="/admin/job-approvals" className={styles.panelLink}>
                Review All &rarr;
              </Link>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.roleText}>TCS Digital</div>
                    </td>
                    <td>
                      <span className={styles.subTextDark}>React Native Architect</span>
                    </td>
                    <td>
                      <span className={styles.subText}>Jul 10, 2025</span>
                    </td>
                    <td>
                      <Badge variant="warning">Pending</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Wipro Limited</div>
                    </td>
                    <td>
                      <span className={styles.subTextDark}>Senior Backend Engineer</span>
                    </td>
                    <td>
                      <span className={styles.subText}>Jul 9, 2025</span>
                    </td>
                    <td>
                      <Badge variant="warning">Pending</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>System Activity Logs</h2>
            </div>

            <div className={styles.activityFeed}>
              {import.meta.env.DEV ? (
                <>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>✓</div>
                    <div className={styles.activityContent}>
                      <p>
                        <strong>Arjun Kumar</strong> updated their resume.
                      </p>
                      <span className={styles.activityTime}>2 minutes ago</span>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={`${styles.activityIcon} bg-red-600 text-white font-bold`}>
                      !
                    </div>
                    <div className={styles.activityContent}>
                      <p>
                        <strong>Razorpay</strong> exceeded their monthly AI screen limit.
                      </p>
                      <span className={styles.activityTime}>1 hour ago</span>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}>+</div>
                    <div className={styles.activityContent}>
                      <p>
                        <strong>New Company Registered:</strong> Zomato Media Ltd.
                      </p>
                      <span className={styles.activityTime}>3 hours ago</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No recent system alerts.
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className={styles.sideCol}>
          {/* Quick Stats */}
          <Card className={styles.panelCard}>
            <h2 className={styles.panelTitle}>Platform Health</h2>

            <div className={styles.meterItem}>
              <div className={styles.meterHead}>
                <span>API Uptime</span>
                <span className="text-emerald-600 font-bold">100.0%</span>
              </div>
              <div className={styles.meterBar}>
                <div className={`${styles.meterFill} bg-emerald-600 w-[100%]`}></div>
              </div>
            </div>
            <div className={styles.meterItem}>
              <div className={styles.meterHead}>
                <span>AI Token Usage</span>
                <span>{import.meta.env.DEV ? '85%' : '0%'}</span>
              </div>
              <div className={styles.meterBar}>
                <div
                  className={`${styles.meterFill} ${import.meta.env.DEV ? 'w-[85%]' : 'w-0'}`}
                ></div>
              </div>
            </div>
            <div className={styles.meterItem}>
              <div className={styles.meterHead}>
                <span>Database Load</span>
                <span>{import.meta.env.DEV ? '42%' : 'Normal'}</span>
              </div>
              <div className={styles.meterBar}>
                <div
                  className={`${styles.meterFill} ${import.meta.env.DEV ? 'w-[42%]' : 'w-[5%]'}`}
                ></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
