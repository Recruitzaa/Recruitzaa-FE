import { Link, useSearchParams } from 'react-router-dom';
import { useId, useMemo } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { JobCard } from '../../features/jobs/components/JobCard/JobCard';
import { useAppSelector } from '../../store/hooks';
import styles from './JobListingsPage.module.css';

export const JobListingsPage = () => {
  const { jobsList } = useAppSelector((state) => state.jobs);
  const [searchParams] = useSearchParams();
  const jobTitleId = useId();
  const locationId = useId();
  const experienceLevelId = useId();

  const keyword = searchParams.get('keyword')?.toLowerCase() ?? '';
  const location = searchParams.get('location')?.toLowerCase() ?? '';

  const filteredJobs = useMemo(() => {
    return jobsList.filter((job) => {
      const matchesKeyword =
        !keyword ||
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword);
      const matchesLocation = !location || job.location.toLowerCase().includes(location);
      return job.status === 'Active' && matchesKeyword && matchesLocation;
    });
  }, [jobsList, keyword, location]);

  return (
    <PageTransition>
      <SEO
        title="Search Jobs | AI Match | Recruitzaa"
        description="Find verified remote and on-site jobs in IT, Healthcare, and Finance. Apply now with AI-optimized ATS resumes."
      />
      <div className={styles.page}>
        <div className={styles.breadcrumb}>
          <div className={styles.container}>
            <span>Home</span>
            <span>/</span>
            <span>Job Search</span>
            <span>/</span>
            <strong>IT & Software</strong>
          </div>
        </div>

        <section className={styles.hero} aria-labelledby="job-search-title">
          <div className={styles.container}>
            <div className={styles.heroTop}>
              <div>
                <p>Verified job search</p>
                <h1 id="job-search-title">Job Search & Filter Engine</h1>
              </div>
              <Link to="/auth" className={styles.heroCta}>
                Apply with profile
              </Link>
            </div>

            <form
              className={styles.searchBar}
              role="search"
              aria-label="Job search filters"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor={jobTitleId}>
                Job Title
                <input
                  id={jobTitleId}
                  name="jobTitle"
                  required
                  aria-required="true"
                  defaultValue={keyword}
                  placeholder="e.g. React Native Developer"
                  autoComplete="off"
                />
              </label>
              <label htmlFor={locationId}>
                Location
                <input
                  id={locationId}
                  name="location"
                  required
                  aria-required="true"
                  defaultValue={location}
                  placeholder="e.g. Bangalore, KA"
                  autoComplete="off"
                />
              </label>
              <label htmlFor={experienceLevelId}>
                Experience Level
                <select
                  id={experienceLevelId}
                  name="experienceLevel"
                  defaultValue="Mid-Senior (3-6 yrs)"
                >
                  <option>Mid-Senior (3-6 yrs)</option>
                  <option>Senior (6-10 yrs)</option>
                  <option>Lead (10+ yrs)</option>
                </select>
              </label>
            </form>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.mainLayout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterCard}>
                <h2>Filters</h2>
                <p>Remote, hybrid, salary bands, experience level, and AI match score.</p>
                <div className={styles.filterPills}>
                  <span>Remote</span>
                  <span>Hybrid</span>
                  <span>High Match</span>
                  <span>Urgent</span>
                </div>
              </div>
            </aside>

            <main className={styles.feed}>
              <div className={styles.feedHeader}>
                <div>
                  Showing <strong>4,821</strong> verified opportunities
                </div>
                <div>
                  Sort by <strong>AI Match Score</strong>
                </div>
              </div>

              <ul className={styles.list}>
                {filteredJobs.map((job) => (
                  <li key={job.id}>
                    <JobCard {...job} />
                  </li>
                ))}
              </ul>
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
