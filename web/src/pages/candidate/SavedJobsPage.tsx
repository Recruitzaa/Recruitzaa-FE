import { Link } from 'react-router-dom';
import { Bookmark, Bell } from 'lucide-react';
import { JobCard } from '../../features/jobs/components/JobCard/JobCard';
import { useJobPreferences } from '../../features/jobs/hooks/useJobPreferences';
import { useAppSelector } from '../../store/hooks';

export const SavedJobsPage = () => {
  const jobs = useAppSelector((state) => state.jobs.jobsList);
  const { savedJobIds, savedSearches, removeSearch } = useJobPreferences();
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Saved jobs and searches
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          These demo preferences are stored only in this browser. Cross-device sync and
          notifications require the production service.
        </p>
      </header>
      <section aria-labelledby="saved-jobs-title">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="saved-jobs-title"
            className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white"
          >
            <Bookmark size={20} aria-hidden="true" />
            Saved jobs
          </h2>
          <Link
            to="/jobs"
            className="text-sm font-bold text-brand-primary underline underline-offset-4"
          >
            Browse jobs
          </Link>
        </div>
        {savedJobs.length ? (
          <ul className="list-none space-y-4 p-0">
            {savedJobs.map((job) => (
              <li key={job.id}>
                <JobCard {...job} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131924] p-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              You have not saved any jobs yet.
            </p>
          </div>
        )}
      </section>
      <section aria-labelledby="saved-searches-title">
        <h2
          id="saved-searches-title"
          className="mb-4 flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white"
        >
          <Bell size={20} aria-hidden="true" />
          Saved search preferences
        </h2>
        {savedSearches.length ? (
          <ul className="grid list-none gap-3 p-0">
            {savedSearches.map((search) => (
              <li
                key={search.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#131924] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <strong className="text-sm text-slate-900 dark:text-white">{search.label}</strong>
                  <p className="mt-1 text-sm text-slate-500">
                    {search.frequency} preference · delivery not connected
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/jobs?${search.query}`}
                    className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 px-3 text-sm font-bold dark:border-slate-700"
                  >
                    Run search
                  </Link>
                  <button
                    type="button"
                    className="min-h-11 rounded-lg border border-rose-200 px-3 text-sm font-bold text-rose-700 dark:border-rose-900 dark:text-rose-300"
                    onClick={() => removeSearch(search.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131924] p-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No saved search preferences.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
