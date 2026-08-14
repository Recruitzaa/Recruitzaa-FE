import { Card } from '../../../../components/ui/Card';
import { Badge } from '../../../../components/ui/Badge';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { Bookmark } from 'lucide-react';
import { useJobPreferences } from '../../hooks/useJobPreferences';
import { useToast } from '../../../../hooks/useToast';
import { ROUTES } from '../../../../config/routes';
import type { JobListNavigationState } from '../../jobListNavigation';
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
  /** Full list URL (path + query) for context-preserving back navigation. */
  listOrigin?: string;
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
  listOrigin,
}: JobCardProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const currentPath = useLocation().pathname;
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { savedJobIds, toggleSavedJob } = useJobPreferences();
  const isSaved = savedJobIds.includes(id);
  const isPortalView = currentPath.startsWith('/candidate');
  const detailsLink = isPortalView ? `/candidate/jobs/${id}` : `/jobs/${id}`;
  const detailState: JobListNavigationState | undefined = listOrigin
    ? { from: listOrigin }
    : undefined;
  const rememberScroll = () => {
    if (listOrigin) {
      sessionStorage.setItem(`scroll:${listOrigin}`, String(window.scrollY));
    }
  };

  return (
    <Card className={styles.jobCard} role="article">
      <div className={styles.topRow}>
        <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
          {avatarText}
        </div>
        <div className={styles.mainInfo}>
          <Link
            to={detailsLink}
            state={detailState}
            className={styles.title}
            onClick={rememberScroll}
          >
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
          <span className={styles.matchPill}>Profile match after sign-in</span>
        )}
        <button
          type="button"
          className={styles.saveButton}
          aria-label={isSaved ? `Remove ${title} from saved jobs` : `Save ${title}`}
          aria-pressed={isSaved}
          onClick={() => {
            if (!isAuthenticated) {
              navigate(ROUTES.AUTH.loginWithNext(detailsLink));
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
            to={isAuthenticated ? '/candidate/ai-hub' : ROUTES.AUTH.loginWithNext(detailsLink)}
            aria-label={`Check ATS fit score for ${title} role at ${company}`}
            className={`${styles.actionBtn} ${styles.outlineAction}`}
          >
            {isAuthenticated ? 'Check profile fit' : 'Sign in for match'}
          </Link>
          <Link
            to={detailsLink}
            state={detailState}
            onClick={rememberScroll}
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
