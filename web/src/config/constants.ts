export const APP_NAME = 'Recruitzaa';

export const PAGE_LIMITS = {
  JOBS: 10,
  APPLICATIONS: 10,
  COMPANIES: 10,
  USERS: 10,
};

export const JOB_TYPES = {
  FULL_TIME: 'Full-Time',
  PART_TIME: 'Part-Time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
} as const;

export const WORK_MODES = {
  REMOTE: 'Remote',
  HYBRID: 'Hybrid',
  ONSITE: 'On-Site',
} as const;

export const JOB_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
} as const;
