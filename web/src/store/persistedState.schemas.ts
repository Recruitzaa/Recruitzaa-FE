import { z } from 'zod';
import type { KanbanState } from './slices/kanbanSlice';
import type { Job } from './slices/jobsSlice';
import type { Audience } from './slices/ui.slice';
import type { CompanyProfile } from './slices/employerProfileSlice';
import type { ProfileState } from './slices/profileSlice.types';

/**
 * Storage keys, envelope versions, and Zod shapes for every slice this app
 * persists to localStorage. Centralized so store/index.ts (the subscriber
 * that writes) and each slice module (that hydrates on load) validate
 * against the exact same contract instead of drifting independently.
 *
 * Each schema is typed against its slice's own interface (z.ZodType<T>) so
 * the hydrated value's TypeScript type lines up exactly with what the
 * reducer expects, instead of a structurally-similar-but-different type.
 */

// ─── Kanban ───────────────────────────────────────────────────────
export const KANBAN_STORAGE_KEY = 'kanban_state';
export const KANBAN_STORAGE_VERSION = 1;

const pipelineStageSchema = z.enum(['APPLIED', 'SCREENING', 'INTERVIEWING', 'OFFERED', 'REJECTED']);

export const kanbanStateSchema: z.ZodType<KanbanState> = z.object({
  applications: z.array(
    z.object({
      id: z.string(),
      companyName: z.string(),
      jobTitle: z.string(),
      salaryEstimate: z.string(),
      updatedAt: z.string(),
      stage: pipelineStageSchema,
      owner: z.string(),
      expectedResponse: z.string(),
      nextAction: z.string(),
    })
  ),
});

// ─── Jobs ─────────────────────────────────────────────────────────
export const JOBS_STORAGE_KEY = 'recruitzaa_jobs';
// v2: `type` was renamed to `workplace` and structured `employmentType`,
// `salaryMin`/`salaryMax`, `postedAtIso`, and `experienceMin`/`experienceMax`
// fields were added. Older payloads fail validation and fall back to the
// demo catalogue rather than rendering with missing/undefined fields.
export const JOBS_STORAGE_VERSION = 2;

export const jobsListSchema: z.ZodType<Job[]> = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    workplace: z.string(),
    employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY']),
    salary: z.string(),
    salaryMin: z.number(),
    salaryMax: z.number(),
    postedAt: z.string(),
    postedAtIso: z.string(),
    experienceMin: z.number(),
    experienceMax: z.number(),
    matchScore: z.number(),
    tags: z.array(z.string()),
    avatarText: z.string(),
    avatarColor: z.string(),
    isPriority: z.boolean(),
    description: z.string().optional(),
    source: z.string().optional(),
    verifiedAt: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    status: z.enum(['Active', 'Draft', 'Closed']),
  })
);

// ─── Audience (candidate/employer self-identification) ─────────────
export const AUDIENCE_STORAGE_KEY = 'recruitzaa-audience-v1';
export const AUDIENCE_STORAGE_VERSION = 1;

export const audienceSchema: z.ZodType<Audience> = z.union([
  z.literal('job_seeker'),
  z.literal('employer'),
  z.null(),
]);

// ─── Employer profile ────────────────────────────────────────────
export const EMPLOYER_PROFILE_STORAGE_KEY = 'employer_profile_state';
export const EMPLOYER_PROFILE_STORAGE_VERSION = 1;

// Persisted profiles are merged over defaults, so every field stays optional
// here — the schema's job is to reject corrupted *types*, not enforce
// completeness.
export const companyProfilePartialSchema: z.ZodType<Partial<CompanyProfile>> = z
  .object({
    companyName: z.string(),
    tagline: z.string(),
    foundedYear: z.string(),
    logoUrl: z.string(),
    industry: z.string(),
    companySize: z.string(),
    companyType: z.string(),
    hqLocation: z.string(),
    website: z.string(),
    about: z.string(),
    perks: z.array(z.string()),
    linkedIn: z.string(),
    twitter: z.string(),
    github: z.string(),
    glassdoor: z.string(),
    pocName: z.string(),
    pocDesignation: z.string(),
    pocEmail: z.string(),
    pocPhone: z.string(),
  })
  .partial();

// ─── Candidate profile ───────────────────────────────────────────
export const PROFILE_STORAGE_KEY = 'recruitzaa_profile';
// v2: every list item (employment history, education, projects, IT skills,
// references, certifications) gained a stable `id` field so editing stops
// being index-based. Payloads written under v1 fail validation and fall
// back to the (now blank) default profile rather than crashing on a
// missing `id`.
export const PROFILE_STORAGE_VERSION = 2;

const jobHistoryItemSchema = z.object({
  id: z.string(),
  designation: z.string(),
  company: z.string(),
  duration: z.string(),
  keyResponsibilities: z.array(z.string()),
});

const educationDetailsSchema = z.object({
  id: z.string(),
  level: z.string(),
  degree: z.string(),
  university: z.string(),
  duration: z.string(),
  type: z.string(),
  percentage: z.string(),
});

const projectItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  client: z.string(),
  duration: z.string(),
  description: z.string(),
});

const itSkillItemSchema = z.object({
  id: z.string(),
  skill: z.string(),
  version: z.string(),
  lastUsed: z.string(),
  experience: z.string(),
});

const referenceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  relationship: z.string(),
  company: z.string(),
  email: z.string(),
  phone: z.string(),
});

const certificationItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialId: z.string(),
  credentialUrl: z.string(),
  fileName: z.string(),
  fileSizeLabel: z.string(),
  fileDataUrl: z.string(),
});

export const profileStateSchema: z.ZodType<ProfileState> = z.object({
  personalInfo: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    avatar: z.string(),
  }),
  employmentDetails: z.object({
    currentCompany: z.string(),
    currentDesignation: z.string(),
    totalExperience: z.string(),
    currentCTC: z.string(),
    noticePeriod: z.string(),
  }),
  professionalSummary: z.object({
    headline: z.string(),
    detailedSummary: z.string(),
  }),
  skills: z.array(z.string()),
  employmentHistory: z.array(jobHistoryItemSchema),
  education: z.array(educationDetailsSchema),
  projects: z.array(projectItemSchema),
  itSkills: z.array(itSkillItemSchema),
  careerProfile: z.object({
    industry: z.string(),
    department: z.string(),
    roleCategory: z.string(),
    jobRole: z.string(),
    desiredJobType: z.string(),
    desiredEmploymentType: z.string(),
    desiredLocations: z.array(z.string()),
    expectedSalary: z.string(),
    preferredShift: z.string(),
    workAuthorization: z.string(),
    willingToRelocate: z.string(),
    preferredWorkMode: z.string(),
  }),
  extendedPersonal: z.object({
    gender: z.string(),
    maritalStatus: z.string(),
    dob: z.string(),
    address: z.string(),
    languages: z.array(z.string()),
    nationality: z.string(),
    differentlyAbled: z.string(),
  }),
  accomplishments: z.object({
    onlineProfile: z.string(),
    workSample: z.string(),
    publication: z.string(),
    presentation: z.string(),
    patent: z.string(),
  }),
  references: z.array(referenceItemSchema),
  certifications: z.array(certificationItemSchema),
});

/** Legacy (pre-versioning) payloads for any of these keys match the current shape 1:1. */
export const identityMigrate = (data: unknown) => data;
