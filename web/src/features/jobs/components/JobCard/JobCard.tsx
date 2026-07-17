import { Card } from '../../../../components/ui/Card';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';
import { Link, useLocation } from 'react-router-dom';
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
  isPriority,
}: JobCardProps) => {
  const currentPath = useLocation().pathname;
  const isPortalView = currentPath.startsWith('/candidate');
  const detailsLink = isPortalView ? `/candidate/jobs/${id}` : `/jobs/${id}`;

  return (
    <Card className={styles.jobCard} role="article" tabIndex={0}>
      <div className={styles.topRow}>
        <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
          {avatarText}
        </div>
        <div className={styles.mainInfo}>
          <Link to={detailsLink} className={styles.title}>
            {title}
          </Link>
          <div className={styles.companyInfo}>
            {company}{' '}
            <span className="mx-1" aria-hidden="true">
              &middot;
            </span>{' '}
            {location} ({type})
          </div>
        </div>
        <div className={styles.matchPill}>{matchScore}% AI Match</div>
      </div>

      <div className={styles.tagsRow}>
        {isPriority && (
          <Badge variant="primary" className={styles.tag}>
            Priority Hiring
          </Badge>
        )}
        {tags.map((tag) => (
          <Badge key={`${id}-${tag}`} variant="neutral" className={styles.tag}>
            {tag}
          </Badge>
        ))}
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.meta}>
          <span className={styles.salary}>{salary}</span>
          <span className={styles.divider} aria-hidden="true">
            |
          </span>
          <span className={styles.postedAt}>Posted {postedAt}</span>
        </div>
        <div className={styles.actions}>
          <Link
            to="/candidate/ai-hub"
            aria-label={`Check ATS fit score for ${title} role at ${company}`}
          >
            <Button variant="outline" className={styles.actionBtn}>
              Check ATS Fit
            </Button>
          </Link>
          <Link to={detailsLink} aria-label={`Apply now for ${title} role at ${company}`}>
            <Button variant="primary" className={styles.actionBtn}>
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
