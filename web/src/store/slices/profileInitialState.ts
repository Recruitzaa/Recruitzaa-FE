import type { ProfileState } from './profileSlice.types';

/**
 * Clean initial candidate profile state.
 * All fields start empty for new registrations until populated by the user or fetched from the database.
 */
export const initialProfileState: ProfileState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
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
  education: {
    degree: '',
    university: '',
    duration: '',
    type: '',
  },
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
  },
  extendedPersonal: {
    gender: '',
    maritalStatus: '',
    dob: '',
    category: '',
    address: '',
    languages: [],
  },
  accomplishments: {
    onlineProfile: '',
    workSample: '',
    publication: '',
    presentation: '',
    patent: '',
    certification: '',
  },
};
