import { useState, useEffect } from 'react';
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
import {
  personalDetailsFormSchema,
  summaryFormSchema,
  careerFormSchema,
  extendedPersonalFormSchema,
  accomplishmentsFormSchema,
  getFieldErrors,
} from '../utils/profileValidation';

export const useProfileSectionEdit = (profile: ProfileState, appUser: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditingCareer, setIsEditingCareer] = useState(false);
  const [isEditingExtendedPersonal, setIsEditingExtendedPersonal] = useState(false);
  const [isEditingAccomplishments, setIsEditingAccomplishments] = useState(false);

  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});
  const [summaryErrors, setSummaryErrors] = useState<Record<string, string>>({});
  const [careerErrors, setCareerErrors] = useState<Record<string, string>>({});
  const [extendedPersonalErrors, setExtendedPersonalErrors] = useState<Record<string, string>>({});
  const [accomplishmentsErrors, setAccomplishmentsErrors] = useState<Record<string, string>>({});

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

  // Forms are seeded once from `profile` via useState above, but the
  // candidate's real profile loads asynchronously from the backend after
  // mount (see useProfileForm). Without this resync, opening an edit form
  // before that load resolves shows stale/empty defaults instead of the
  // data that just arrived.
  useEffect(() => {
    setPersonalForm({
      ...profile.personalInfo,
      ...profile.employmentDetails,
    });
    setSummaryForm({ ...profile.professionalSummary });
    setCareerForm({
      ...profile.careerProfile,
      desiredLocationsText: profile.careerProfile.desiredLocations.join(', '),
    });
    setExtendedPersonalForm({
      ...profile.extendedPersonal,
      languagesText: profile.extendedPersonal.languages.join(', '),
    });
    setAccomplishmentsForm({ ...profile.accomplishments });
  }, [profile]);

  const skillResume = useProfileSkillAndResume(profile.skills, appUser);

  const startEditingPersonal = () => {
    setPersonalForm({ ...profile.personalInfo, ...profile.employmentDetails });
    setPersonalErrors({});
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
    setSummaryErrors({});
    setIsEditingSummary(true);
  };

  const startEditingCareer = () => {
    setCareerForm({
      ...profile.careerProfile,
      desiredLocationsText: profile.careerProfile.desiredLocations.join(', '),
    });
    setCareerErrors({});
    setIsEditingCareer(true);
  };

  const startEditingExtendedPersonal = () => {
    setExtendedPersonalForm({
      ...profile.extendedPersonal,
      languagesText: profile.extendedPersonal.languages.join(', '),
    });
    setExtendedPersonalErrors({});
    setIsEditingExtendedPersonal(true);
  };

  const startEditingAccomplishments = () => {
    setAccomplishmentsForm({ ...profile.accomplishments });
    setAccomplishmentsErrors({});
    setIsEditingAccomplishments(true);
  };

  const savePersonalDetails = () => {
    const errors = getFieldErrors(personalDetailsFormSchema, personalForm);
    if (Object.keys(errors).length > 0) {
      setPersonalErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
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
    setPersonalErrors({});
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
    const errors = getFieldErrors(summaryFormSchema, summaryForm);
    if (Object.keys(errors).length > 0) {
      setSummaryErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(updateProfessionalSummary({ ...summaryForm }));
    setIsEditingSummary(false);
    setSummaryErrors({});
    dispatch(updateUserProfile({ summary: summaryForm.detailedSummary }));
    toast.success('Resume headline & summary updated.');
  };

  const saveCareerProfile = () => {
    const errors = getFieldErrors(careerFormSchema, careerForm);
    if (Object.keys(errors).length > 0) {
      setCareerErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
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
    setCareerErrors({});
    toast.success('Career profile updated.');
  };

  const saveExtendedPersonal = () => {
    const errors = getFieldErrors(extendedPersonalFormSchema, extendedPersonalForm);
    if (Object.keys(errors).length > 0) {
      setExtendedPersonalErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
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
    setExtendedPersonalErrors({});
    toast.success('Personal details updated.');
  };

  const saveAccomplishments = () => {
    const errors = getFieldErrors(accomplishmentsFormSchema, accomplishmentsForm);
    if (Object.keys(errors).length > 0) {
      setAccomplishmentsErrors(errors);
      toast.error('Fix the highlighted fields before saving.');
      return;
    }
    dispatch(updateAccomplishments({ ...accomplishmentsForm }));
    setIsEditingAccomplishments(false);
    setAccomplishmentsErrors({});
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
    personalErrors,
    summaryForm,
    setSummaryForm,
    summaryErrors,
    careerForm,
    setCareerForm,
    careerErrors,
    extendedPersonalForm,
    setExtendedPersonalForm,
    extendedPersonalErrors,
    accomplishmentsForm,
    setAccomplishmentsForm,
    accomplishmentsErrors,
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
