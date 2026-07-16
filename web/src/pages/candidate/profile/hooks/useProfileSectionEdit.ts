import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import { updateUserProfile } from '../../../../store/slices/auth.slice';
import {
  updatePersonalInfo,
  updateEmploymentDetails,
  updateProfessionalSummary,
  updateEducation,
  updateCareerProfile,
  updateExtendedPersonal,
  updateAccomplishments,
  type ProfileState,
} from '../../../../store/slices/profileSlice';
import { useProfileSkillAndResume } from './useProfileSkillAndResume';

export const useProfileSectionEdit = (profile: ProfileState, appUser: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingCareer, setIsEditingCareer] = useState(false);
  const [isEditingExtendedPersonal, setIsEditingExtendedPersonal] = useState(false);
  const [isEditingAccomplishments, setIsEditingAccomplishments] = useState(false);

  const [personalForm, setPersonalForm] = useState({
    ...profile.personalInfo,
    ...profile.employmentDetails,
  });
  const [summaryForm, setSummaryForm] = useState({ ...profile.professionalSummary });
  const [educationForm, setEducationForm] = useState({ ...profile.education });
  const [careerForm, setCareerForm] = useState({
    ...profile.careerProfile,
    desiredLocationsText: profile.careerProfile.desiredLocations.join(', '),
  });
  const [extendedPersonalForm, setExtendedPersonalForm] = useState({
    ...profile.extendedPersonal,
    languagesText: profile.extendedPersonal.languages.join(', '),
  });
  const [accomplishmentsForm, setAccomplishmentsForm] = useState({ ...profile.accomplishments });

  const skillResume = useProfileSkillAndResume(appUser);

  const startEditingPersonal = () => {
    setPersonalForm({ ...profile.personalInfo, ...profile.employmentDetails });
    setIsEditingPersonal(true);
  };

  const startEditingSummary = () => {
    setSummaryForm({ ...profile.professionalSummary });
    setIsEditingSummary(true);
  };

  const startEditingEducation = () => {
    setEducationForm({ ...profile.education });
    setIsEditingEducation(true);
  };

  const startEditingCareer = () => {
    setCareerForm({
      ...profile.careerProfile,
      desiredLocationsText: profile.careerProfile.desiredLocations.join(', '),
    });
    setIsEditingCareer(true);
  };

  const startEditingExtendedPersonal = () => {
    setExtendedPersonalForm({
      ...profile.extendedPersonal,
      languagesText: profile.extendedPersonal.languages.join(', '),
    });
    setIsEditingExtendedPersonal(true);
  };

  const startEditingAccomplishments = () => {
    setAccomplishmentsForm({ ...profile.accomplishments });
    setIsEditingAccomplishments(true);
  };

  const savePersonalDetails = () => {
    dispatch(
      updatePersonalInfo({
        firstName: personalForm.firstName,
        lastName: personalForm.lastName,
        phone: personalForm.phone,
        location: personalForm.location,
      })
    );
    dispatch(
      updateEmploymentDetails({
        currentCompany: personalForm.currentCompany,
        currentDesignation: personalForm.currentDesignation,
        totalExperience: personalForm.totalExperience,
        currentCTC: personalForm.currentCTC,
        noticePeriod: personalForm.noticePeriod,
      })
    );
    setIsEditingPersonal(false);
    dispatch(
      updateUserProfile({
        phone: personalForm.phone,
        location: personalForm.location,
        currentCompany: personalForm.currentCompany,
        currentRole: personalForm.currentDesignation,
        currentSalary: personalForm.currentCTC,
        noticePeriod: personalForm.noticePeriod,
      })
    );
    toast.success('Personal and employment details updated.');
  };

  const saveSummary = () => {
    dispatch(updateProfessionalSummary({ ...summaryForm }));
    setIsEditingSummary(false);
    dispatch(updateUserProfile({ summary: summaryForm.detailedSummary }));
    toast.success('Resume headline & summary updated.');
  };

  const saveEducation = () => {
    dispatch(updateEducation({ ...educationForm }));
    setIsEditingEducation(false);
    toast.success('Education history updated.');
  };

  const saveCareerProfile = () => {
    dispatch(
      updateCareerProfile({
        ...careerForm,
        desiredLocations: careerForm.desiredLocationsText
          .split(',')
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
      })
    );
    setIsEditingCareer(false);
    toast.success('Career profile updated.');
  };

  const saveExtendedPersonal = () => {
    dispatch(
      updateExtendedPersonal({
        ...extendedPersonalForm,
        languages: extendedPersonalForm.languagesText
          .split(',')
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
      })
    );
    setIsEditingExtendedPersonal(false);
    toast.success('Personal details updated.');
  };

  const saveAccomplishments = () => {
    dispatch(updateAccomplishments({ ...accomplishmentsForm }));
    setIsEditingAccomplishments(false);
    toast.success('Accomplishments updated.');
  };

  return {
    isEditingPersonal,
    setIsEditingPersonal,
    isEditingSummary,
    setIsEditingSummary,
    isEditingEducation,
    setIsEditingEducation,
    isEditingCareer,
    setIsEditingCareer,
    isEditingExtendedPersonal,
    setIsEditingExtendedPersonal,
    isEditingAccomplishments,
    setIsEditingAccomplishments,
    personalForm,
    setPersonalForm,
    summaryForm,
    setSummaryForm,
    educationForm,
    setEducationForm,
    careerForm,
    setCareerForm,
    extendedPersonalForm,
    setExtendedPersonalForm,
    accomplishmentsForm,
    setAccomplishmentsForm,
    startEditingPersonal,
    startEditingSummary,
    startEditingEducation,
    startEditingCareer,
    startEditingExtendedPersonal,
    startEditingAccomplishments,
    savePersonalDetails,
    saveSummary,
    saveEducation,
    saveCareerProfile,
    saveExtendedPersonal,
    saveAccomplishments,
    ...skillResume,
  };
};
