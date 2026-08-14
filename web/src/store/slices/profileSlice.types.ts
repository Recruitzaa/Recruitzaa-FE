export interface JobHistoryItem {
  designation: string;
  company: string;
  duration: string;
  keyResponsibilities: string[];
}

export interface EducationDetails {
  level: string;
  degree: string;
  university: string;
  duration: string;
  type: string;
  // Almost every Indian IT employer (TCS/Infosys/Wipro/Cognizant etc.) screens
  // applicants on 10th/12th/Graduation percentage or CGPA — required to be
  // eligible to apply to most postings, not just a "nice to have".
  percentage: string;
}

export interface ProjectItem {
  name: string;
  client: string;
  duration: string;
  description: string;
}

export interface ITSkillItem {
  skill: string;
  version: string;
  lastUsed: string;
  experience: string;
}

export interface CareerProfile {
  industry: string;
  department: string;
  roleCategory: string;
  jobRole: string;
  desiredJobType: string;
  desiredEmploymentType: string;
  desiredLocations: string[];
  expectedSalary: string;
  preferredShift: string;
  // Asked on almost every job application form (LinkedIn Easy Apply,
  // Workday, Greenhouse, Naukri) — captured on the profile so they can be
  // auto-filled instead of re-asked per application.
  workAuthorization: string;
  willingToRelocate: string;
  preferredWorkMode: string;
}

export interface ExtendedPersonalInfo {
  gender: string;
  maritalStatus: string;
  dob: string;
  address: string;
  languages: string[];
  nationality: string;
  // Standard field on Indian job portals (e.g. Naukri) and required by many
  // employers for compliance/accessibility accommodations.
  differentlyAbled: string;
}

export interface ReferenceItem {
  name: string;
  relationship: string;
  company: string;
  email: string;
  phone: string;
}

export interface Accomplishments {
  onlineProfile: string;
  workSample: string;
  publication: string;
  presentation: string;
  patent: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  // Verification/credential link, e.g. Coursera/AWS/Microsoft badge page.
  credentialUrl: string;
  // Uploaded proof document (certificate PDF/image), stored as a data URL
  // the same way avatar/logo uploads are — no separate file-storage backend yet.
  fileName: string;
  fileSizeLabel: string;
  fileDataUrl: string;
}

export interface ProfileState {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
  };
  employmentDetails: {
    currentCompany: string;
    currentDesignation: string;
    totalExperience: string;
    currentCTC: string;
    noticePeriod: string;
  };
  professionalSummary: {
    headline: string;
    detailedSummary: string;
  };
  skills: string[];
  employmentHistory: JobHistoryItem[];
  education: EducationDetails[];
  projects: ProjectItem[];
  itSkills: ITSkillItem[];
  careerProfile: CareerProfile;
  extendedPersonal: ExtendedPersonalInfo;
  accomplishments: Accomplishments;
  references: ReferenceItem[];
  certifications: CertificationItem[];
}
