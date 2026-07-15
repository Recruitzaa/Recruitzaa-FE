import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addApplication } from '../../store/slices/kanban.slice';
import { useToast } from '../../hooks/useToast';
import styles from './DashboardPage.module.css';
import { type RecommendedJob, type ActiveApplication } from '../../data/mockDashboard';
import type { ApplicationCard } from '../../features/applications/types/kanban.types';

// Fit score maps for dynamic statistics calculation
const fitScoresMap: Record<string, number> = {
  a1: 92,
  a2: 89,
  a3: 94,
  a4: 85,
  a5: 91,
  a6: 96,
  rj1: 94,
  rj2: 91,
  rj3: 86,
};

const mapReduxAppToActiveApp = (app: ApplicationCard): ActiveApplication => {
  let stageStatus = 'Applied';
  let stageVariant: ActiveApplication['stageVariant'] = 'neutral';
  let nextStep = 'Review in progress';
  let isSuccessText = false;

  switch (app.stage) {
    case 'APPLIED':
      stageStatus = 'Applied';
      stageVariant = 'primary';
      nextStep = 'Under initial review';
      break;
    case 'SCREENING':
      stageStatus = 'Screening';
      stageVariant = 'warning';
      nextStep = 'Resume screening';
      break;
    case 'INTERVIEWING':
      stageStatus = 'Interviewing';
      stageVariant = 'warning';
      nextStep =
        app.updatedAt.includes('Scheduled') || app.updatedAt.includes('Round')
          ? app.updatedAt
          : 'Interview session';
      break;
    case 'OFFERED':
      stageStatus = 'Offer Received';
      stageVariant = 'success';
      nextStep = app.updatedAt.includes('Deadline') ? app.updatedAt : 'Offer decision pending';
      isSuccessText = true;
      break;
    case 'REJECTED':
      stageStatus = 'Rejected';
      stageVariant = 'error';
      nextStep = 'Position closed';
      break;
  }

  return {
    id: app.id,
    company: app.companyName,
    role: app.jobTitle,
    appliedDate:
      app.updatedAt.includes('ago') || app.updatedAt.includes('now') ? 'Recent' : app.updatedAt,
    stageStatus,
    stageVariant,
    nextStep,
    isSuccessText,
  };
};

export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const reduxApps = useAppSelector((state) => state.kanban.applications);
  const { jobsList } = useAppSelector((state) => state.jobs);

  const [jobs, setJobs] = useState<RecommendedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const recommended = jobsList
        .filter((j) => j.status === 'Active')
        .map((j) => ({
          id: j.id,
          role: j.title,
          company: j.company,
          location: j.location,
          salary: j.salary.replace(' - ', ' – '),
          matchScore: j.matchScore,
        }));
      setJobs(recommended);
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [jobsList]);

  const handleApply = (job: RecommendedJob) => {
    dispatch(
      addApplication({
        id: job.id,
        companyName: job.company,
        jobTitle: job.role,
        salaryEstimate: job.salary,
      })
    );
    toast.success(`Successfully applied to ${job.role} at ${job.company}!`);
  };

  // Convert Redux applications to active application items
  const activeApps = reduxApps.map(mapReduxAppToActiveApp);

  // Dynamic KPI Metrics calculations
  const totalSubmitted = reduxApps.length;
  const interviewsCount = reduxApps.filter((app) => app.stage === 'INTERVIEWING').length;

  const totalScoreSum = reduxApps.reduce((acc, app) => acc + (fitScoresMap[app.id] ?? 88), 0);
  const avgFitScore = reduxApps.length > 0 ? Math.round(totalScoreSum / reduxApps.length) : 88;

  return (
    <div className={styles.dashboard}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Applications Submitted</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>Live Tracker</span>
          </div>
          <div className={styles.kpiValue}>{totalSubmitted}</div>
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
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Pending Check</span>
          </div>
          <div className={styles.kpiValue}>{interviewsCount}</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Average AI Fit Score</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>AI Optimized</span>
          </div>
          <div className={styles.kpiValue}>{avgFitScore}%</div>
        </Card>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          {/* Top AI Recommended Jobs */}
          <Card className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Top AI-Recommended Jobs for You</h2>
              <Link to="/jobs" className={styles.panelLink}>
                View All Listings &rarr;
              </Link>
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
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className={styles.subText}>Loading jobs...</div>
                      </td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
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
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className={styles.subText}>Loading applications...</div>
                      </td>
                    </tr>
                  ) : activeApps.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
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
                          <span
                            className={app.isSuccessText ? styles.subTextSuccess : styles.subText}
                          >
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
              Add <strong>GraphQL</strong> & <strong>AWS Deployment</strong> to your resume to
              increase match rank by 15%.
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
      </div>
    </div>
  );
};
