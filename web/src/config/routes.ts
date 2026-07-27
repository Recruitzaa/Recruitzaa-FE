export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    EMPLOYERS: '/employers',
    JOBS: '/jobs',
    JOB_DETAIL: (id: string) => `/jobs/${id}`,
  },
  AUTH: {
    LOGIN: '/login',
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
