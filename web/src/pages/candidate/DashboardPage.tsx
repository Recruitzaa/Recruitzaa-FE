import { Card } from '../../components/ui/Card';
import { useAppSelector } from '../../store/hooks';
import styles from './DashboardPage.module.css';
import { mapReduxAppToActiveApp } from './DashboardPageUtils';
import { DashboardLeftCol } from './components/DashboardLeftCol';
import { DashboardRightCol } from './components/DashboardRightCol';
import { useJobPreferences } from '../../features/jobs/hooks/useJobPreferences';

export const DashboardPage = () => {
  const reduxApps = useAppSelector((state) => state.kanban.applications);
  const { jobsList } = useAppSelector((state) => state.jobs);
  const profile = useAppSelector((state) => state.profile);
  const appUser = useAppSelector((state) => state.auth.appUser);
  const { savedJobIds } = useJobPreferences();
  const normalizedSkills = profile.skills.map((skill) => skill.toLowerCase());
  const jobs = jobsList
    .filter((job) => job.status === 'Active')
    .map((job) => ({
      id: job.id,
      role: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary.replace(' - ', ' – '),
      matchedSkills: job.tags.filter((tag) =>
        normalizedSkills.some(
          (skill) => skill.includes(tag.toLowerCase()) || tag.toLowerCase().includes(skill)
        )
      ).length,
    }))
    .sort((a, b) => b.matchedSkills - a.matchedSkills);

  // Convert Redux applications to active application items
  const activeApps = reduxApps.map(mapReduxAppToActiveApp);

  const totalSubmitted = reduxApps.length;
  const interviewsCount = reduxApps.filter((app) => app.stage === 'INTERVIEWING').length;
  const profileBelongsToUser =
    Boolean(appUser?.email) &&
    profile.personalInfo.email.trim().toLowerCase() === appUser?.email.trim().toLowerCase();
  const profileSections = profileBelongsToUser
    ? [
        profile.personalInfo.email,
        profile.professionalSummary.headline,
        profile.skills.length,
        profile.employmentHistory.length,
        profile.education.degree,
        profile.projects.length,
      ]
    : [appUser?.email, false, false, false, false, false];
  const profileCompleteness = Math.round(
    (profileSections.filter(Boolean).length / profileSections.length) * 100
  );

  return (
    <div className={styles.dashboard}>
      <p className={styles.demoNotice} role="status">
        Demo workspace: application stages are illustrative browser data until the employer workflow
        is connected.
      </p>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Applications Submitted</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Demo data</span>
          </div>
          <div className={styles.kpiValue}>{totalSubmitted}</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Saved Jobs</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>Browser saved</span>
          </div>
          <div className={styles.kpiValue}>{savedJobIds.length}</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Scheduled Interviews</span>
            <span className={`${styles.kpiTag} ${styles.tagWarning}`}>Demo pipeline</span>
          </div>
          <div className={styles.kpiValue}>{interviewsCount}</div>
        </Card>

        <Card className={styles.kpiCard}>
          <div className={styles.kpiHead}>
            <span className={styles.kpiTitle}>Profile Completeness</span>
            <span className={`${styles.kpiTag} ${styles.tagSuccess}`}>From profile</span>
          </div>
          <div className={styles.kpiValue}>{profileCompleteness}%</div>
        </Card>
      </div>

      <div className={styles.layout}>
        <DashboardLeftCol jobs={jobs} activeApps={activeApps} />
        <DashboardRightCol />
      </div>
    </div>
  );
};
