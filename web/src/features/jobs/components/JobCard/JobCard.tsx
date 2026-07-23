import { Card } from '../../../../components/ui/Card';
import { Badge } from '../../../../components/ui/Badge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { Bookmark } from 'lucide-react';
import { useJobPreferences } from '../../hooks/useJobPreferences';
import { useToast } from '../../../../hooks/useToast';
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
  source?: string;
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
  source,
}: JobCardProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const currentPath = useLocation().pathname;
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { savedJobIds, toggleSavedJob } = useJobPreferences();
  const isSaved = savedJobIds.includes(id);
  const isPortalView = currentPath.startsWith('/candidate');
  const detailsLink = isPortalView ? `/candidate/jobs/${id}` : `/jobs/${id}`;

  return (
    <Card className={styles.jobCard} role="article">
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
            {location}
            {location.toLowerCase().includes(type.toLowerCase()) ? '' : ` (${type})`}
          </div>
        </div>
        {isAuthenticated ? (
          <div className={styles.matchPill}>
            {matchScore > 0 ? `${matchScore}% profile match` : 'Match not calculated'}
          </div>
        ) : (
          <Link to={`/login?next=${encodeURIComponent(detailsLink)}`} className={styles.matchLink}>
            Sign in to see match
          </Link>
        )}
        <button
          type="button"
          className={styles.saveButton}
          aria-label={isSaved ? `Remove ${title} from saved jobs` : `Save ${title}`}
          aria-pressed={isSaved}
          onClick={() => {
            if (!isAuthenticated) {
              navigate(`/login?next=${encodeURIComponent(detailsLink)}`);
              return;
            }
            toggleSavedJob(id);
            toast.info(isSaved ? 'Removed from saved jobs.' : 'Saved in this browser.');
          }}
        >
          <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
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
          {source && <span className={styles.source}>Source: {source}</span>}
        </div>
        <div className={styles.actions}>
          <Link
            to={
              isAuthenticated
                ? '/candidate/ai-hub'
                : `/login?next=${encodeURIComponent(detailsLink)}`
            }
            aria-label={`Check ATS fit score for ${title} role at ${company}`}
            className={`${styles.actionBtn} ${styles.outlineAction}`}
          >
            {isAuthenticated ? 'Check profile fit' : 'Sign in for match'}
          </Link>
          <Link
            to={detailsLink}
            aria-label={`View details for ${title} role at ${company}`}
            className={`${styles.actionBtn} ${styles.primaryAction}`}
          >
            View details
          </Link>
        </div>
      </div>
    </Card>
  );
};
