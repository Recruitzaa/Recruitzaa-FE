import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import styles from '../DashboardPage.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useMemo } from 'react';

export const DashboardRightCol = () => {
  const profile = useAppSelector((state) => state.profile);
  const jobsList = useAppSelector((state) => state.jobs.jobsList);
  const jobs = useMemo(() => jobsList.filter((job) => job.status === 'Active'), [jobsList]);
  const sections = [
    profile.personalInfo.email,
    profile.professionalSummary.headline,
    profile.skills.length,
    profile.employmentHistory.length,
    profile.education.length,
    profile.projects.length,
  ];
  const completeness = Math.round((sections.filter(Boolean).length / sections.length) * 100);
  const demand = [
    ...jobs
      .flatMap((job) => job.tags)
      .reduce(
        (counts, skill) => counts.set(skill, (counts.get(skill) ?? 0) + 1),
        new Map<string, number>()
      ),
  ]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return (
    <div className={styles.rightCol}>
      {/* Profile Completeness */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Profile Completeness</h2>
          <span className={styles.scoreText}>{completeness}%</span>
        </div>
        <div className={styles.meterBar}>
          <div className={styles.meterFill} style={{ width: `${completeness}%` }}></div>
        </div>
        <p className={styles.panelDesc}>
          Completion reflects the profile sections currently filled in. It is not a recruiter
          ranking.
        </p>
        <Link to="/candidate/profile" className="no-underline">
          <Button variant="outline" className={styles.fullWidthBtn}>
            Review profile
          </Button>
        </Link>
      </Card>

      {/* Skill Demand Index */}
      <Card className={styles.panelCard}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Skills in current listings</h2>
          <span className={styles.subText}>{jobs.length} demo jobs</span>
        </div>

        {demand.map(([skill, count]) => (
          <div className={styles.meterItem} key={skill}>
            <div className={styles.meterHead}>
              <span>{skill}</span>
              <span>
                {count} listing{count === 1 ? '' : 's'}
              </span>
            </div>
            <div className={styles.meterBar}>
              <div
                className={styles.meterFill}
                style={{ width: `${Math.round((count / Math.max(jobs.length, 1)) * 100)}%` }}
              />
            </div>
          </div>
        ))}
        <p className={styles.panelDesc}>
          Counts are calculated only from the jobs visible in this demo—not from labour-market data.
        </p>
      </Card>
    </div>
  );
};
export default DashboardRightCol;
