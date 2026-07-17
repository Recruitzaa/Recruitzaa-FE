export interface JobHistoryItem {
  designation: string;
  company: string;
  duration: string;
  keyResponsibilities: string[];
}

export interface EducationDetails {
  degree: string;
  university: string;
  duration: string;
  type: string;
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
}

export interface ExtendedPersonalInfo {
  gender: string;
  maritalStatus: string;
  dob: string;
  category: string;
  address: string;
  languages: string[];
}

export interface Accomplishments {
  onlineProfile: string;
  workSample: string;
  publication: string;
  presentation: string;
  patent: string;
  certification: string;
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
  education: EducationDetails;
  projects: ProjectItem[];
  itSkills: ITSkillItem[];
  careerProfile: CareerProfile;
  extendedPersonal: ExtendedPersonalInfo;
  accomplishments: Accomplishments;
}
