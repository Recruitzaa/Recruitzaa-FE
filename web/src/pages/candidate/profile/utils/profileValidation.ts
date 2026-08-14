import { z } from 'zod';

/**
 * Zod schemas for every editable profile form. Validation runs on Save; on
 * failure the editor stays open and `getFieldErrors` produces a
 * field-name -> message map the forms render inline instead of silently
 * accepting garbage (or worse, crashing later on a missing/malformed value).
 */

const requiredText = (label: string, max = 120) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalText = (max = 500) =>
  z.string().max(max, `Must be ${max} characters or fewer.`).optional().or(z.literal(''));

const optionalEmail = z
  .string()
  .trim()
  .refine((value) => value === '' || z.string().email().safeParse(value).success, {
    message: 'Enter a valid email address.',
  });

const optionalPhone = z
  .string()
  .trim()
  .refine((value) => value === '' || /^[+()\-\s\d]{6,20}$/.test(value), {
    message: 'Enter a valid phone number.',
  });

/** http(s)-only — blocks `javascript:`/`data:` URLs from ever reaching an `href`. */
const optionalHttpUrl = z
  .string()
  .trim()
  .refine(
    (value) => {
      if (value === '') return true;
      try {
        return ['http:', 'https:'].includes(new URL(value).protocol);
      } catch {
        return false;
      }
    },
    { message: 'Enter a valid http:// or https:// link.' }
  );

export const jobHistorySchema = z.object({
  id: z.string(),
  designation: requiredText('Designation'),
  company: requiredText('Company'),
  duration: requiredText('Duration'),
  keyResponsibilities: z.array(z.string()),
});

export const educationItemSchema = z.object({
  id: z.string(),
  level: requiredText('Qualification level'),
  degree: requiredText('Degree / course'),
  university: requiredText('University / board / school'),
  duration: requiredText('Duration'),
  type: requiredText('Course type'),
  percentage: optionalText(40),
});

export const projectItemSchema = z.object({
  id: z.string(),
  name: requiredText('Project name'),
  client: optionalText(120),
  duration: optionalText(60),
  description: optionalText(1000),
});

export const itSkillItemSchema = z.object({
  id: z.string(),
  skill: requiredText('Skill'),
  version: optionalText(40),
  lastUsed: optionalText(20),
  experience: optionalText(40),
});

export const referenceItemSchema = z.object({
  id: z.string(),
  name: requiredText('Name'),
  relationship: requiredText('Relationship / designation'),
  company: optionalText(120),
  email: optionalEmail,
  phone: optionalPhone,
});

export const certificationItemSchema = z.object({
  id: z.string(),
  name: requiredText('Certification name'),
  issuer: requiredText('Issuing organization'),
  issueDate: optionalText(30),
  credentialId: optionalText(80),
  credentialUrl: optionalHttpUrl,
  fileName: optionalText(200),
  fileSizeLabel: optionalText(30),
  fileDataUrl: optionalText(20_000_000),
});

export const personalDetailsFormSchema = z.object({
  firstName: requiredText('First name', 60),
  lastName: requiredText('Last name', 60),
  phone: optionalPhone,
  location: optionalText(120),
  currentCompany: optionalText(120),
  currentDesignation: optionalText(120),
  totalExperience: optionalText(40),
  currentCTC: optionalText(40),
  noticePeriod: optionalText(60),
});

export const summaryFormSchema = z.object({
  headline: requiredText('Headline', 220),
  detailedSummary: optionalText(3000),
});

export const careerFormSchema = z.object({
  industry: optionalText(120),
  department: optionalText(120),
  roleCategory: optionalText(120),
  jobRole: optionalText(120),
  desiredJobType: optionalText(60),
  desiredEmploymentType: optionalText(60),
  desiredLocationsText: optionalText(300),
  expectedSalary: optionalText(40),
  preferredShift: optionalText(60),
  workAuthorization: optionalText(120),
  willingToRelocate: optionalText(20),
  preferredWorkMode: optionalText(40),
});

export const extendedPersonalFormSchema = z.object({
  gender: optionalText(40),
  maritalStatus: optionalText(40),
  dob: optionalText(40),
  address: optionalText(300),
  languagesText: optionalText(200),
  nationality: optionalText(60),
  differentlyAbled: optionalText(20),
});

export const accomplishmentsFormSchema = z.object({
  onlineProfile: optionalHttpUrl,
  workSample: optionalHttpUrl,
  publication: optionalText(300),
  presentation: optionalHttpUrl,
  patent: optionalText(300),
});

/** Flattens the first issue per field path into a `{ field: message }` map for inline display. */
export function getFieldErrors<T>(schema: z.ZodType<T>, data: unknown): Record<string, string> {
  const result = schema.safeParse(data);
  if (result.success) return {};
  const fieldErrors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join('.');
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

export const isValid = <T>(schema: z.ZodType<T>, data: unknown): boolean =>
  schema.safeParse(data).success;
