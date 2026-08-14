/** Router state passed when navigating from a job list to a detail page. */
export interface JobListNavigationState {
  from?: string;
  scrollY?: number;
}

/** Paths from which a "back to results" link/button is meaningful. */
const JOB_LIST_BASES = {
  public: ['/jobs'],
  portal: ['/candidate/jobs', '/candidate/saved-jobs'],
};

export const isJobListOrigin = (from: string | undefined, portal = false) => {
  if (!from) return false;
  const bases = portal ? JOB_LIST_BASES.portal : JOB_LIST_BASES.public;
  return bases.some((base) => from === base || from.startsWith(`${base}?`));
};
