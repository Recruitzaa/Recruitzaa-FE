import type { ProfileState } from './profileSlice.types';

// Genuinely blank — a brand-new candidate must never see another person's
// (previously "Arjun Kumar") pre-filled data. Demo/sample data lives under
// src/data/demo/ and is only loaded via an explicit, confirmed user action
// (e.g. the AI resume-parser autofill).
export const initialProfileState: ProfileState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    // Empty until the candidate uploads their own photo. ProfileBannerCard
    // falls back to the signed-in provider's photo (e.g. Google), then to an
    // initials placeholder — never a stock photo of an unrelated person.
    avatar: '',
  },
  employmentDetails: {
    currentCompany: '',
    currentDesignation: '',
    totalExperience: '',
    currentCTC: '',
    noticePeriod: '',
  },
  professionalSummary: {
    headline: '',
    detailedSummary: '',
  },
  skills: [],
  employmentHistory: [],
  education: [],
  projects: [],
  itSkills: [],
  careerProfile: {
    industry: '',
    department: '',
    roleCategory: '',
    jobRole: '',
    desiredJobType: '',
    desiredEmploymentType: '',
    desiredLocations: [],
    expectedSalary: '',
    preferredShift: '',
    workAuthorization: '',
    willingToRelocate: '',
    preferredWorkMode: '',
  },
  extendedPersonal: {
    gender: '',
    maritalStatus: '',
    dob: '',
    address: '',
    languages: [],
    nationality: '',
    differentlyAbled: '',
  },
  accomplishments: {
    onlineProfile: '',
    workSample: '',
    publication: '',
    presentation: '',
    patent: '',
  },
  references: [],
  certifications: [],
};
