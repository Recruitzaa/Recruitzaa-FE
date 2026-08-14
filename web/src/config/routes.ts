/**
 * Guards `next`/`redirect`-style query params against open-redirect payloads
 * before they're handed to `navigate()`. A safe internal path must:
 * - start with a single `/` (rules out absolute URLs like `https://evil.com`)
 * - not start with `//` or `/\` (both are browser-parsed as protocol-relative
 *   URLs, i.e. `//evil.com` navigates off-origin)
 * - not contain a `:` before the first `/` (rules out `/\t javascript:...`
 *   and similar scheme-confusion payloads some parsers normalize)
 */
export const isSafeInternalPath = (path: string | null | undefined): path is string => {
  if (!path) return false;
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//') || path.startsWith('/\\')) return false;
  const schemeConfusion = /^\/[^/?#]*:/;
  if (schemeConfusion.test(path)) return false;
  return true;
};

export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    EMPLOYERS: '/employers',
    JOBS: '/jobs',
    JOB_DETAIL: (id: string) => `/jobs/${id}`,
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_CANDIDATE: '/register?intent=candidate',
    REGISTER_EMPLOYER: '/register?intent=employer',
    LEGACY: '/auth',
    loginWithNext: (next: string) => `/login?next=${encodeURIComponent(next)}`,
    loginWithIntent: (intent: 'candidate' | 'employer') => `/login?intent=${intent}`,
    registerWithIntent: (intent: 'candidate' | 'employer') => `/register?intent=${intent}`,
  },
  CANDIDATE: {
    DASHBOARD: '/candidate/dashboard',
    APPLICATIONS: '/candidate/applications',
    PIPELINE: '/candidate/pipeline',
    AI_HUB: '/candidate/ai-hub',
    PROFILE: '/candidate/profile',
  },
  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    POST_JOB: '/employer/post-job',
    MY_JOBS: '/employer/my-jobs',
    CANDIDATES: '/employer/candidates',
    ANALYTICS: '/employer/analytics',
    PROFILE: '/employer/profile',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    JOB_APPROVALS: '/admin/job-approvals',
    COMPANIES: '/admin/companies',
    USERS: '/admin/users',
    EMPLOYERS: '/admin/employers',
    SETTINGS: '/admin/settings',
  },
};
