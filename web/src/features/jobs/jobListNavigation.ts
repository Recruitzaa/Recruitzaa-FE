/** Router state passed when navigating from a job list to a detail page. */
export interface JobListNavigationState {
  from?: string;
  scrollY?: number;
}

export const isJobListOrigin = (from: string | undefined, portal = false) => {
  if (!from) return false;
  const base = portal ? '/candidate/jobs' : '/jobs';
  return from === base || from.startsWith(`${base}?`);
};
