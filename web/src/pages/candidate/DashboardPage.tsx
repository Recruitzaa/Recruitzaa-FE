import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import styles from './DashboardPage.module.css';

export const DashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Applications Submitted</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+3 This Week</span>
          </div>
          <div className={styles.kpiValue}>24</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Recruiter Profile Views</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+5 Today</span>
          </div>
          <div className={styles.kpiValue}>18</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Scheduled Interviews</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>2 Pending</span>
          </div>
          <div className={styles.kpiValue}>3</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Average AI Fit Score</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>+4% Match</span>
          </div>
          <div className={styles.kpiValue}>88%</div>
        </Card>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          
          {/* Top AI Recommended Jobs */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Top AI-Recommended Jobs for You</h2>
              <Link to="/jobs" className={styles.panelLink}>View All Listings &rarr;</Link>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Role & Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Fit Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Senior React Native Developer</div>
                      <div className={styles.companyText}>Infosys Limited</div>
                    </td>
                    <td>Bangalore (Hybrid)</td>
                    <td>₹18 – 26 LPA</td>
                    <td><span className={styles.scoreText}>94% Match</span></td>
                    <td><Button size="sm" variant="outline">Apply</Button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Mobile Application Specialist</div>
                      <div className={styles.companyText}>Zomato Media</div>
                    </td>
                    <td>Gurugram (Remote)</td>
                    <td>₹20 – 30 LPA</td>
                    <td><span className={styles.scoreText}>91% Match</span></td>
                    <td><Button size="sm" variant="outline">Apply</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Active Applications */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Active Application Status</h2>
              <Link to="/candidate/pipeline" className={styles.panelLink}>Open Kanban Board &rarr;</Link>
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
                  <tr>
                    <td>
                      <div className={styles.roleText}>Infosys Limited</div>
                      <div className={styles.companyText}>Senior React Native Developer</div>
                    </td>
                    <td>Jul 1, 2025</td>
                    <td><Badge variant="warning">Interview Round 1</Badge></td>
                    <td><span className={styles.subText}>HR Interview tomorrow at 10:00 AM</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.roleText}>Razorpay Technologies</div>
                      <div className={styles.companyText}>Staff Mobile Engineer</div>
                    </td>
                    <td>Jun 20, 2025</td>
                    <td><Badge variant="success">Offer Received</Badge></td>
                    <td><span className={styles.subTextSuccess}>Decision pending (Deadline Jul 10)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

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
              Add <strong>GraphQL</strong> & <strong>AWS Deployment</strong> to your resume to increase match rank by 15%.
            </p>
            <Button variant="outline" className={styles.fullWidthBtn}>Optimize Resume with AI</Button>
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
      </div>
    </div>
  );
};
