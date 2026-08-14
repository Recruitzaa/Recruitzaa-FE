import { useEffect, useState } from 'react';
import { Bookmark, Flag, Share2 } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/ui/Button';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { useAppSelector } from '../../store/hooks';
import { useJobPreferences } from '../../features/jobs/hooks/useJobPreferences';
import { useToast } from '../../hooks/useToast';
import styles from './JobDetailPage.module.css';
import { ROUTES } from '../../config/routes';
import { trackEvent } from '../../services/analytics.service';
import {
  isJobListOrigin,
  type JobListNavigationState,
} from '../../features/jobs/jobListNavigation';

export const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const job = useAppSelector((state) => state.jobs.jobsList.find((item) => item.id === id));
  const { isAuthenticated, appUser } = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.profile);
  const { savedJobIds, toggleSavedJob } = useJobPreferences();
  const [reportOpen, setReportOpen] = useState(false);
  const isPortalView = location.pathname.startsWith('/candidate');
  const fallbackBackLink = isPortalView ? '/candidate/jobs' : '/jobs';
  const listState = location.state as JobListNavigationState | null;
  const canUseHistoryBack = isJobListOrigin(listState?.from, isPortalView);

  const handleBack = () => {
    if (canUseHistoryBack) navigate(-1);
    else navigate(fallbackBackLink);
  };

  useEffect(() => {
    if (job) trackEvent('job_detail_viewed', { jobId: job.id, authenticated: isAuthenticated });
  }, [job, isAuthenticated]);

  if (!job) {
    return (
      <PageTransition>
        <SEO
          title="Job not found | Recruitzaa"
          description="This job listing is no longer available."
        />
        <section className={styles.notFound}>
          <p className={styles.eyebrow}>Listing unavailable</p>
          <h1>This job could not be found</h1>
          <p>It may have closed or the link may be incorrect.</p>
          <Link to={fallbackBackLink}>Browse available jobs</Link>
        </section>
      </PageTransition>
    );
  }

  const applicationId = `job-${job.id}`;
  const displayLocation = job.location.replace(/\s*\([^)]*\)\s*$/, '');
  const isCandidate = appUser?.activeRole === 'CANDIDATE' || appUser?.role === 'CANDIDATE';
  const nextPath = `/jobs/${job.id}`;
  const isSaved = savedJobIds.includes(job.id);
  const profileSkills = profile.skills.map((skill) => skill.toLowerCase());
  const recognizedSkills = job.tags.filter((tag) =>
    profileSkills.some(
      (skill) => tag.toLowerCase().includes(skill) || skill.includes(tag.toLowerCase())
    )
  );
  const hasProfileData = profile.skills.length >= 3;
  const skillScore = job.tags.length
    ? Math.round((recognizedSkills.length / job.tags.length) * 100)
    : 0;
  const locationMatch = profile.careerProfile.desiredLocations.some((item) =>
    displayLocation.toLowerCase().includes(item.toLowerCase())
  );

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH.loginWithNext(nextPath));
      return;
    }
    toggleSavedJob(job.id);
    toast.info(isSaved ? 'Removed from saved jobs.' : 'Saved in this browser.');
  };
  const handleShare = async () => {
    const shareData = {
      title: `${job.title} at ${job.company}`,
      text: `${job.title} at ${job.company}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Job link copied.');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError')
        toast.error('The job link could not be shared.');
    }
  };
  const jobSchema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.title} at ${job.company}. Skills include ${job.tags.join(', ')}.`,
    identifier: { '@type': 'PropertyValue', name: job.company, value: applicationId },
    employmentType: job.type.toUpperCase().replace('-', '_'),
    hiringOrganization: { '@type': 'Organization', name: job.company },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: displayLocation },
    },
  };

  return (
    <PageTransition>
      <SEO
        title={`${job.title} | ${job.company} | Recruitzaa`}
        description={`View ${job.title} at ${job.company} in ${displayLocation}.`}
        type="job"
        schema={jobSchema}
      />
      <div className={styles.page}>
        <div className={styles.backRow}>
          <div className={styles.container}>
            {canUseHistoryBack ? (
              <button type="button" className={styles.backLink} onClick={handleBack}>
                ← Back to job listings
              </button>
            ) : (
              <Link to={fallbackBackLink}>← Back to job listings</Link>
            )}
          </div>
        </div>
        <Breadcrumbs currentLabel={job.title} />
        <header className={styles.header}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              {import.meta.env.DEV ? 'Demo catalogue listing' : 'Job listing'}
            </p>
            <h1>{job.title}</h1>
            <p>
              {job.company} · {displayLocation} · {job.type} · Posted {job.postedAt}
            </p>
            <div className={styles.headerActions}>
              {!isAuthenticated ? (
                <Link className={styles.headerApply} to={ROUTES.AUTH.loginWithNext(nextPath)}>
                  Sign in to apply
                </Link>
              ) : isCandidate ? (
                import.meta.env.DEV ? (
                  <button
                    type="button"
                    className={styles.headerApply}
                    disabled
                    title="Applications require the production application service."
                  >
                    Applications unavailable in demo
                  </button>
                ) : (
                  <button type="button" className={styles.headerApply} disabled>
                    Apply
                  </button>
                )
              ) : (
                <Link className={styles.headerApply} to="/launchpad">
                  Switch workspace to apply
                </Link>
              )}
              <button type="button" onClick={handleSave} aria-pressed={isSaved}>
                <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
                {isSaved ? 'Saved' : 'Save job'}
              </button>
              <button type="button" onClick={handleShare}>
                <Share2 size={18} aria-hidden="true" />
                Share
              </button>
              <button
                type="button"
                onClick={() => setReportOpen((open) => !open)}
                aria-expanded={reportOpen}
              >
                <Flag size={18} aria-hidden="true" />
                Report
              </button>
            </div>
            {reportOpen && (
              <div className={styles.reportPanel} role="status">
                <strong>Report a listing concern</strong>
                <p>
                  The production moderation endpoint is not connected. Email{' '}
                  <a
                    href={`mailto:support@recruitzaa.com?subject=${encodeURIComponent(`Job listing concern: ${job.title} (${job.id})`)}`}
                  >
                    support@recruitzaa.com
                  </a>{' '}
                  with the listing ID and concern.
                </p>
              </div>
            )}
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.content}>
              <section className={styles.card} aria-labelledby="role-heading">
                <h2 id="role-heading">About the role</h2>
                <p>
                  {job.description ??
                    `${job.company} is looking for a ${job.title}. Review the skills and workplace information below before continuing.`}
                </p>
                <h2>What you’ll work with</h2>
                <ul>
                  {job.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <h2>Application requirements</h2>
                <ul>
                  {(job.requirements?.length
                    ? job.requirements
                    : [
                        'A current candidate profile',
                        'A resume or work history',
                        'Employer-specific screening answers when the production service is connected',
                      ]
                  ).map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
                <h2>Listing source</h2>
                <p>
                  <strong>{job.source ?? 'Source unavailable'}</strong>
                  <br />
                  {job.verifiedAt ?? 'Verification timestamp unavailable'}. This role is
                  illustrative and is not represented as a direct employer posting.
                </p>
                <h2>Before you apply</h2>
                <p>
                  Employer-authored responsibilities, qualifications, benefits, and closing dates
                  must come from the production jobs service. They are intentionally not invented in
                  this demo listing.
                </p>
              </section>
            </div>

            <aside className={styles.sidebar} aria-label="Job summary">
              <section className={styles.card}>
                {isAuthenticated && isCandidate && hasProfileData ? (
                  <div className={styles.matchSection}>
                    <div className={styles.score}>
                      <div className={styles.circle}>{skillScore}%</div>
                      <div>
                        <strong>Keyword overlap</strong>
                        <p>Calculated from demo profile skills</p>
                      </div>
                    </div>
                    <dl className={styles.matchFactors}>
                      <div>
                        <dt>Skills found</dt>
                        <dd>
                          {recognizedSkills.length} of {job.tags.length}
                        </dd>
                      </div>
                      <div>
                        <dt>Preferred location</dt>
                        <dd>{locationMatch ? 'Aligned' : 'Not aligned'}</dd>
                      </div>
                      <div>
                        <dt>Work mode</dt>
                        <dd>{job.type}</dd>
                      </div>
                    </dl>
                    <p className={styles.matchDisclosure}>
                      This deterministic comparison assists discovery only. It does not assess
                      candidate quality or make hiring decisions. Update stale data in{' '}
                      <Link to="/candidate/profile">your profile</Link>.
                    </p>
                  </div>
                ) : isAuthenticated && isCandidate ? (
                  <div className={styles.signInNotice}>
                    <strong>Complete your profile for a comparison</strong>
                    <p>
                      Add at least three skills before Recruitzaa compares this role with your
                      profile.
                    </p>
                    <Link to="/candidate/profile">Complete profile</Link>
                  </div>
                ) : (
                  <div className={styles.signInNotice}>
                    <strong>See your profile match</strong>
                    <p>Sign in as a candidate to view profile-based tools.</p>
                  </div>
                )}
                <div className={styles.fact}>
                  <strong>Salary</strong>
                  <span>{job.salary}</span>
                </div>
                <div className={styles.fact}>
                  <strong>Workplace</strong>
                  <span>{job.type}</span>
                </div>
                <div className={styles.fact}>
                  <strong>Location</strong>
                  <span>{displayLocation}</span>
                </div>
                <div className={styles.tags}>
                  {job.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <div className={styles.applyArea}>
                  {!isAuthenticated ? (
                    <Link className={styles.applyLink} to={ROUTES.AUTH.loginWithNext(nextPath)}>
                      Sign in to continue
                    </Link>
                  ) : !isCandidate ? (
                    <p className={styles.serviceNotice}>
                      Switch to a candidate workspace to apply.
                    </p>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        className="w-full py-3 px-4 text-sm font-bold"
                        disabled
                      >
                        {import.meta.env.DEV ? 'Applications unavailable in demo' : 'Apply'}
                      </Button>
                      {import.meta.env.DEV && (
                        <p className={styles.serviceNotice}>
                          No application has been submitted. Connect the production application API
                          to enable this action.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
