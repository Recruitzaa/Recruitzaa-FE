import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addApplication } from '../../store/slices/kanbanSlice';
import { useToast } from '../../hooks/useToast';
import styles from './DashboardPage.module.css';
import { type RecommendedJob } from '../../data/mockDashboard';
import { fitScoresMap, mapReduxAppToActiveApp } from './DashboardPageUtils';
import { DashboardLeftCol } from './components/DashboardLeftCol';
import { DashboardRightCol } from './components/DashboardRightCol';

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
        <DashboardLeftCol
          isLoading={isLoading}
          jobs={jobs}
          reduxApps={reduxApps}
          activeApps={activeApps}
          handleApply={handleApply}
        />
        <DashboardRightCol />
      </div>
    </div>
  );
};
