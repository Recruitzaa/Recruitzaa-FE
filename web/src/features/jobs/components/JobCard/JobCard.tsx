import { Card } from '../../../../components/ui/Card';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';
import { Link } from 'react-router-dom';
import styles from './JobCard.module.css';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  matchScore: number;
  tags: string[];
  avatarText: string;
  avatarColor: string;
  isPriority?: boolean;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  matchScore,
  tags,
  avatarText,
  avatarColor,
  isPriority
}: JobCardProps) => {
  return (
    <Card className={styles.jobCard}>
      <div className={styles.topRow}>
        <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
          {avatarText}
        </div>
        <div className={styles.mainInfo}>
          <Link to={`/jobs/${id}`} className={styles.title}>{title}</Link>
          <div className={styles.companyInfo}>
            {company} &middot; {location} ({type})
          </div>
        </div>
        <div className={styles.matchPill}>
          {matchScore}% AI Match
        </div>
      </div>

      <div className={styles.tagsRow}>
        {isPriority && <Badge variant="primary" className={styles.tag}>Priority Hiring</Badge>}
        {tags.map((tag, idx) => (
          <Badge key={idx} variant="neutral" className={styles.tag}>{tag}</Badge>
        ))}
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.meta}>
          <span className={styles.salary}>{salary}</span>
          <span className={styles.divider}>|</span>
          <span className={styles.postedAt}>Posted {postedAt}</span>
        </div>
        <div className={styles.actions}>
          <Link to="/candidate/ai-hub">
            <Button variant="outline" className={styles.actionBtn}>Check ATS Fit</Button>
          </Link>
          <Link to={`/jobs/${id}`}>
            <Button variant="primary" className={styles.actionBtn}>Apply Now</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
