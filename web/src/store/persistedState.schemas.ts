import { z } from 'zod';
import type { KanbanState } from './slices/kanbanSlice';
import type { Job } from './slices/jobsSlice';
import type { Audience } from './slices/ui.slice';
import type { CompanyProfile } from './slices/employerProfileSlice';

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
export const JOBS_STORAGE_VERSION = 1;

export const jobsListSchema: z.ZodType<Job[]> = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    type: z.string(),
    salary: z.string(),
    postedAt: z.string(),
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

/** Legacy (pre-versioning) payloads for any of these keys match the current shape 1:1. */
export const identityMigrate = (data: unknown) => data;
