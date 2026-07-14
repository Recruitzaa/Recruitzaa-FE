import { useState } from 'react';
import type { UserProfile } from '../services/profileApi';

const initialProfileState: UserProfile = {
  userId: '',
  basicInfo: { name: '', phone: '', email: '', location: '' },
  education: [],
  experience: [],
  skills: [],
  preferences: {
    desiredRole: '',
    locations: [],
    salaryRange: { min: 0, max: 0 },
    workMode: 'remote',
  },
};

/**
 * useProfileForm — Custom hook to manage multi-step candidate profile form drafts.
 */
export const useProfileForm = () => {
  const [formData, setFormData] = useState<UserProfile>(initialProfileState);

  const updateBasicInfo = (info: Partial<UserProfile['basicInfo']>) => {
    setFormData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...info },
    }));
  };

  const updateEducation = (edu: UserProfile['education']) => {
    setFormData((prev) => ({ ...prev, education: edu }));
  };

  const updateExperience = (exp: UserProfile['experience']) => {
    setFormData((prev) => ({ ...prev, experience: exp }));
  };

  const updateSkills = (skills: string[]) => {
    setFormData((prev) => ({ ...prev, skills }));
  };

  const updatePreferences = (pref: Partial<UserProfile['preferences']>) => {
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...pref },
    }));
  };

  return {
    formData,
    setFormData,
    updateBasicInfo,
    updateEducation,
    updateExperience,
    updateSkills,
    updatePreferences,
  };
};
