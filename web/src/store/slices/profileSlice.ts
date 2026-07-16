import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialProfileState } from './profileInitialState';
import type {
  JobHistoryItem,
  EducationDetails,
  ProjectItem,
  ITSkillItem,
  CareerProfile,
  ExtendedPersonalInfo,
  Accomplishments,
  ProfileState,
} from './profileSlice.types';

export type {
  JobHistoryItem,
  EducationDetails,
  ProjectItem,
  ITSkillItem,
  CareerProfile,
  ExtendedPersonalInfo,
  Accomplishments,
  ProfileState,
};

const initialState: ProfileState = initialProfileState;

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFullProfile(state, action: PayloadAction<ProfileState>) {
      Object.assign(state, action.payload);
    },
    updatePersonalInfo(state, action: PayloadAction<Partial<ProfileState['personalInfo']>>) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateEmploymentDetails(
      state,
      action: PayloadAction<Partial<ProfileState['employmentDetails']>>
    ) {
      state.employmentDetails = { ...state.employmentDetails, ...action.payload };
    },
    updateProfessionalSummary(
      state,
      action: PayloadAction<Partial<ProfileState['professionalSummary']>>
    ) {
      state.professionalSummary = { ...state.professionalSummary, ...action.payload };
    },
    addSkill(state, action: PayloadAction<string>) {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s !== action.payload);
    },
    updateEmploymentHistory(state, action: PayloadAction<JobHistoryItem[]>) {
      state.employmentHistory = action.payload;
    },
    updateEducation(state, action: PayloadAction<EducationDetails>) {
      state.education = action.payload;
    },
    updateProjects(state, action: PayloadAction<ProjectItem[]>) {
      state.projects = action.payload;
    },
    updateITSkills(state, action: PayloadAction<ITSkillItem[]>) {
      state.itSkills = action.payload;
    },
    updateCareerProfile(state, action: PayloadAction<CareerProfile>) {
      state.careerProfile = action.payload;
    },
    updateExtendedPersonal(state, action: PayloadAction<ExtendedPersonalInfo>) {
      state.extendedPersonal = action.payload;
    },
    updateAccomplishments(state, action: PayloadAction<Accomplishments>) {
      state.accomplishments = action.payload;
    },
  },
});

export const {
  setFullProfile,
  updatePersonalInfo,
  updateEmploymentDetails,
  updateProfessionalSummary,
  addSkill,
  removeSkill,
  updateEmploymentHistory,
  updateEducation,
  updateProjects,
  updateITSkills,
  updateCareerProfile,
  updateExtendedPersonal,
  updateAccomplishments,
} = profileSlice.actions;

export default profileSlice.reducer;
