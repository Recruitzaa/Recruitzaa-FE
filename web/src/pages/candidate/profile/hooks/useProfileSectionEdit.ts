import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import { updateUserProfile } from '../../../../store/slices/auth.slice';
import {
  updatePersonalInfo,
  updateEmploymentDetails,
  updateProfessionalSummary,
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
  const [isEditingCareer, setIsEditingCareer] = useState(false);
  const [isEditingExtendedPersonal, setIsEditingExtendedPersonal] = useState(false);
  const [isEditingAccomplishments, setIsEditingAccomplishments] = useState(false);

  const [personalForm, setPersonalForm] = useState({
    ...profile.personalInfo,
    ...profile.employmentDetails,
  });
  const [summaryForm, setSummaryForm] = useState({ ...profile.professionalSummary });
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

  // `dataUrl` arrives already cropped/resized by PhotoUploadModal; an empty
  // string means the user chose to remove their current photo.
  const handleAvatarUpload = (dataUrl: string) => {
    dispatch(updatePersonalInfo({ avatar: dataUrl }));
    setPersonalForm((prev) => ({ ...prev, avatar: dataUrl }));
    toast.success(dataUrl ? 'Profile photo updated.' : 'Profile photo removed.');
  };

  const startEditingSummary = () => {
    setSummaryForm({ ...profile.professionalSummary });
    setIsEditingSummary(true);
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
    careerForm,
    setCareerForm,
    extendedPersonalForm,
    setExtendedPersonalForm,
    accomplishmentsForm,
    setAccomplishmentsForm,
    startEditingPersonal,
    handleAvatarUpload,
    startEditingSummary,
    startEditingCareer,
    startEditingExtendedPersonal,
    startEditingAccomplishments,
    savePersonalDetails,
    saveSummary,
    saveCareerProfile,
    saveExtendedPersonal,
    saveAccomplishments,
    ...skillResume,
  };
};
