import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { Bell, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { JobCard } from '../../features/jobs/components/JobCard/JobCard';
import { useJobPreferences } from '../../features/jobs/hooks/useJobPreferences';
import { useToast } from '../../hooks/useToast';
import { useAppSelector } from '../../store/hooks';
import styles from './JobListingsPage.module.css';
import { ROUTES } from '../../config/routes';
import { trackEvent } from '../../services/analytics.service';
import { safeSessionStorage } from '../../lib/safeStorage';

type SortOption = 'newest' | 'match' | 'salary';
const PAGE_SIZE = 6;

export const JobListingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { jobsList } = useAppSelector((state) => state.jobs);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { saveSearch } = useJobPreferences();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('weekly');
  const resultsRef = useRef<HTMLElement>(null);
  const keywordId = useId();
  const locationId = useId();
  const experienceId = useId();
  const workplace = searchParams.get('workplace') ?? '';
  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const requestedPage = Math.max(1, Number(searchParams.get('page') ?? 1) || 1);
  const listOrigin = `${location.pathname}${location.search}`;

  useEffect(() => {
    const savedScroll = safeSessionStorage.getItem(`scroll:${listOrigin}`);
    if (savedScroll) {
      window.scrollTo(0, Number(savedScroll));
      safeSessionStorage.removeItem(`scroll:${listOrigin}`);
    }
  }, [listOrigin]);

  const filteredJobs = useMemo(() => {
    const keyword = searchParams.get('keyword')?.trim().toLowerCase() ?? '';
    const location = searchParams.get('location')?.trim().toLowerCase() ?? '';
    const experience = searchParams.get('experience') ?? '';
    const priorityOnly = searchParams.get('priority') === 'true';
    const highMatchOnly = searchParams.get('highMatch') === 'true';
    const results = jobsList.filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase();
      const matchesExperience =
        !experience ||
        (experience === '3-6'
          ? job.experienceMax >= 3 && job.experienceMin <= 6
          : experience === '6-10'
            ? job.experienceMax >= 6 && job.experienceMin <= 10
            : job.experienceMax >= 10);
      return (
        job.status === 'Active' &&
        (!keyword || searchable.includes(keyword)) &&
        (!location || `${job.location} ${job.workplace}`.toLowerCase().includes(location)) &&
        (!workplace || job.workplace.toLowerCase() === workplace.toLowerCase()) &&
        (!priorityOnly || job.isPriority) &&
        (!highMatchOnly || job.matchScore >= 90) &&
        matchesExperience
      );
    });
    return [...results].sort((a, b) => {
      if (sort === 'match') return b.matchScore - a.matchScore;
      if (sort === 'salary') return b.salaryMax - a.salaryMax;
      return new Date(b.postedAtIso).getTime() - new Date(a.postedAtIso).getTime();
    });
  }, [jobsList, searchParams, sort, workplace]);

  const pageCount = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const visibleJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };
  const clearFilters = () => setSearchParams({});
  const closeFilters = useCallback(() => setFiltersOpen(false), []);
  const closeAlert = useCallback(() => setAlertOpen(false), []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = new URLSearchParams(searchParams);
    for (const key of ['keyword', 'location', 'experience']) {
      const value = String(data.get(key) ?? '').trim();
      if (value) next.set(key, value);
      else next.delete(key);
    }
    next.delete('page');
    setSearchParams(next);
    trackEvent('job_search_submitted', {
      hasKeyword: Boolean(next.get('keyword')),
      hasLocation: Boolean(next.get('location')),
      hasExperience: Boolean(next.get('experience')),
    });
    // Move focus to the results so keyboard/screen-reader users land on the
    // outcome of their search instead of staying at the top of the form.
    resultsRef.current?.focus();
  };

  const openAlert = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH.loginWithNext(`/jobs?${searchParams}`));
      return;
    }
    setAlertOpen(true);
  };
  const handleSaveAlert = () => {
    const query = searchParams.toString();
    const label =
      searchParams.get('keyword') || searchParams.get('location') || 'All current roles';
    saveSearch({ label, query, frequency });
    trackEvent('job_alert_saved', {
      frequency,
      activeFilterCount: [...searchParams.keys()].length,
    });
    toast.success(
      'Search preference saved in this browser. Email delivery requires the production notification service.'
    );
    closeAlert();
  };

  const filterControls = (groupSuffix: string) => (
    <div className={styles.filterCard}>
      <h2 id={`filter-heading-${groupSuffix}`}>Filter results</h2>
      <fieldset>
        <legend>Workplace</legend>
        {['', 'Remote', 'Hybrid', 'On-Site'].map((value) => (
          <label key={value || 'all'} className={styles.radioLabel}>
            <input
              type="radio"
              name={`workplace-${groupSuffix}`}
              checked={workplace === value}
              onChange={() => updateParam('workplace', value)}
            />
            {value || 'All workplaces'}
          </label>
        ))}
      </fieldset>
      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={searchParams.get('priority') === 'true'}
          onChange={(event) => updateParam('priority', event.target.checked ? 'true' : '')}
        />
        Priority hiring only
      </label>
      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={searchParams.get('highMatch') === 'true'}
          onChange={(event) => updateParam('highMatch', event.target.checked ? 'true' : '')}
        />
        90%+ profile match
      </label>
      {searchParams.size > 0 && (
        <button type="button" className={styles.clearButton} onClick={clearFilters}>
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <PageTransition>
      <SEO
        title="Search Jobs | Recruitzaa"
        description="Search the roles currently available in the Recruitzaa job catalogue."
      />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="job-search-title">
          <div className={styles.container}>
            <div className={styles.heroTop}>
              <div>
                <p>Current job catalogue</p>
                <h1 id="job-search-title">Find a role that fits</h1>
              </div>
              <Link to={ROUTES.AUTH.REGISTER_CANDIDATE} className={styles.heroCta}>
                Create a candidate profile
              </Link>
            </div>
            <form
              className={styles.searchBar}
              role="search"
              aria-label="Search jobs"
              onSubmit={handleSearch}
            >
              <label htmlFor={keywordId}>
                Keywords
                <input
                  id={keywordId}
                  name="keyword"
                  defaultValue={searchParams.get('keyword') ?? ''}
                  placeholder="Job title, company, or skill"
                  autoComplete="off"
                />
              </label>
              <label htmlFor={locationId}>
                Location
                <input
                  id={locationId}
                  name="location"
                  defaultValue={searchParams.get('location') ?? ''}
                  placeholder="City, state, or remote"
                  autoComplete="address-level2"
                />
              </label>
              <label htmlFor={experienceId}>
                Experience
                <select
                  id={experienceId}
                  name="experience"
                  defaultValue={searchParams.get('experience') ?? ''}
                >
                  <option value="">Any experience</option>
                  <option value="3-6">3–6 years</option>
                  <option value="6-10">6–10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </label>
              <button type="submit" className={styles.searchButton}>
                Search jobs
              </button>
            </form>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.mobileTools}>
            <button type="button" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={18} aria-hidden="true" />
              Filters
            </button>
            <button type="button" onClick={openAlert}>
              <Bell size={18} aria-hidden="true" />
              Create alert
            </button>
          </div>
          <div className={styles.mainLayout}>
            <aside className={styles.sidebar} aria-labelledby="filter-heading-desktop">
              {filterControls('desktop')}
              <button type="button" className={styles.alertButton} onClick={openAlert}>
                <Bell size={18} aria-hidden="true" />
                Create search alert
              </button>
              {isAuthenticated && (
                <Link className={styles.manageLink} to="/candidate/saved-jobs">
                  Manage saved jobs and searches
                </Link>
              )}
            </aside>
            <section
              ref={resultsRef}
              className={styles.feed}
              id="job-results"
              tabIndex={-1}
              aria-label="Job results"
            >
              <div className={styles.feedHeader}>
                <div aria-live="polite">
                  <strong>{filteredJobs.length}</strong>{' '}
                  {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} found
                </div>
                <label className={styles.sortLabel}>
                  Sort by
                  <select
                    value={sort}
                    onChange={(event) => updateParam('sort', event.target.value)}
                  >
                    <option value="newest">Newest</option>
                    <option value="match">Profile match</option>
                    <option value="salary">Salary</option>
                  </select>
                </label>
              </div>
              <p className={styles.dataNotice}>
                Listings shown here are demo catalogue data until the production jobs API is
                connected.
              </p>
              {filteredJobs.length > 0 ? (
                <>
                  <ul className={styles.list}>
                    {visibleJobs.map((job) => (
                      <li key={job.id}>
                        <JobCard {...job} listOrigin={listOrigin} />
                      </li>
                    ))}
                  </ul>
                  {pageCount > 1 && (
                    <nav className={styles.pagination} aria-label="Job results pages">
                      <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => updateParam('page', String(page - 1))}
                      >
                        Previous
                      </button>
                      <span>
                        Page {page} of {pageCount}
                      </span>
                      <button
                        type="button"
                        disabled={page === pageCount}
                        onClick={() => updateParam('page', String(page + 1))}
                      >
                        Next
                      </button>
                    </nav>
                  )}
                </>
              ) : (
                <section className={styles.emptyState}>
                  <h2>No matching jobs</h2>
                  <p>Try removing a filter or broadening your keywords.</p>
                  <button type="button" onClick={clearFilters}>
                    Reset search
                  </button>
                </section>
              )}
            </section>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={filtersOpen}
        onClose={closeFilters}
        title="Filter jobs"
        description="Narrow the current catalogue"
        side="bottom"
      >
        {filterControls('mobile')}
        <button type="button" className={styles.applyFiltersButton} onClick={closeFilters}>
          Show {filteredJobs.length} results
        </button>
      </Drawer>
      <Modal
        isOpen={alertOpen}
        onClose={closeAlert}
        title="Save this search"
        description="The criteria will be stored in this browser. Production email delivery is not connected."
      >
        <fieldset className={styles.frequency}>
          <legend>Reminder preference</legend>
          <label>
            <input
              type="radio"
              name="alert-frequency"
              checked={frequency === 'daily'}
              onChange={() => setFrequency('daily')}
            />
            Daily
          </label>
          <label>
            <input
              type="radio"
              name="alert-frequency"
              checked={frequency === 'weekly'}
              onChange={() => setFrequency('weekly')}
            />
            Weekly
          </label>
        </fieldset>
        <button type="button" className={styles.saveAlertButton} onClick={handleSaveAlert}>
          Save search preference
        </button>
      </Modal>
    </PageTransition>
  );
};
