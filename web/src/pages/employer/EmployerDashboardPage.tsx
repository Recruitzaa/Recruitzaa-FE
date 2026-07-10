import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import styles from './EmployerDashboardPage.module.css';

export const EmployerDashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Active Listings</span>
            <span className={`${styles.kpiTag} ${styles.tagPrimary}`}>4 Open</span>
          </div>
          <div className={styles.kpiValue}>4</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Total Applications</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+28 This Week</span>
          </div>
          <div className={styles.kpiValue}>142</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Shortlisted Candidates</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>12 Pending Review</span>
          </div>
          <div className={styles.kpiValue}>38</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Interviews Scheduled</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+3 This Week</span>
          </div>
          <div className={styles.kpiValue}>8</div>
        </Card>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          
          {/* Active Job Postings */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Active Job Postings</h2>
              <Link to="/employer/my-jobs" className={styles.panelLink}>View All Postings &rarr;</Link>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Status</th>
                    <th>Applications</th>
                    <th>Posted Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Senior React Native Developer</div>
                      <div className={styles.subText}>Bangalore (Hybrid)</div>
                    </td>
                    <td><Badge variant="success">Active</Badge></td>
                    <td><span className={styles.highlightText}>45</span></td>
                    <td><span className={styles.subText}>Jun 15, 2025</span></td>
                    <td><Button size="sm" variant="outline">Manage</Button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Backend Engineer (Node.js)</div>
                      <div className={styles.subText}>Remote</div>
                    </td>
                    <td><Badge variant="success">Active</Badge></td>
                    <td><span className={styles.highlightText}>28</span></td>
                    <td><span className={styles.subText}>Jun 20, 2025</span></td>
                    <td><Button size="sm" variant="outline">Manage</Button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Product Designer</div>
                      <div className={styles.subText}>Mumbai (On-Site)</div>
                    </td>
                    <td><Badge variant="warning">Draft</Badge></td>
                    <td><span className={styles.subText}>0</span></td>
                    <td><span className={styles.subText}>-</span></td>
                    <td><Button size="sm" variant="outline">Edit</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Applications */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Recent Applications</h2>
              <Link to="/employer/candidates" className={styles.panelLink}>View Candidate Pipeline &rarr;</Link>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Applied For</th>
                    <th>AI Match Score</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.candidateProfile}>
                        <div className={styles.avatar}>AK</div>
                        <div>
                          <div className={styles.roleText}>Arjun Kumar</div>
                          <div className={styles.subText}>React Native Developer</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.subTextDark}>Senior React Native Developer</span></td>
                    <td><span className={styles.scoreText}>94%</span></td>
                    <td><Badge variant="warning">New</Badge></td>
                    <td><Button size="sm" variant="outline">Review</Button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.candidateProfile}>
                        <div className={styles.avatar} style={{backgroundColor: '#059669'}}>SR</div>
                        <div>
                          <div className={styles.roleText}>Sneha Rao</div>
                          <div className={styles.subText}>Backend Developer</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.subTextDark}>Backend Engineer (Node.js)</span></td>
                    <td><span className={styles.scoreText}>88%</span></td>
                    <td><Badge variant="success">Screening</Badge></td>
                    <td><Button size="sm" variant="outline">Review</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className={styles.sideCol}>
          
          {/* Quick Actions */}
          <Card className={styles.panelCard}>
            <h2 className={styles.panelTitle}>Quick Actions</h2>
            <div className={styles.actionStack}>
              <Link to="/employer/post-job" style={{ textDecoration: 'none' }}>
                <Button className={styles.fullWidthBtn}>Post a New Job</Button>
              </Link>
              <Button variant="outline" className={styles.fullWidthBtn}>Search Resumes</Button>
              <Button variant="outline" className={styles.fullWidthBtn}>Manage Subscription</Button>
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
            <p className={styles.subText} style={{ marginTop: '1rem' }}>
              Your plan renews on August 1st, 2025.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
