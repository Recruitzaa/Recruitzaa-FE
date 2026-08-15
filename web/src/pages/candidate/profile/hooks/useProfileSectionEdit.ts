import { useState, useEffect } from 'react';
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
import { updateCandidateProfile } from '../../../../services/profile.service';
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

  // Keep forms synced when profile loads from DB
  useEffect(() => {
    setPersonalForm({
      ...profile.personalInfo,
      ...profile.employmentDetails,
    });
    setSummaryForm({ ...profile.professionalSummary });
    setEducationForm({ ...profile.education });
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

  const savePersonalDetails = async () => {
    const pInfo = {
      firstName: personalForm.firstName,
      lastName: personalForm.lastName,
      phone: personalForm.phone,
      location: personalForm.location,
    };
    const empDetails = {
      currentCompany: personalForm.currentCompany,
      currentDesignation: personalForm.currentDesignation,
      totalExperience: personalForm.totalExperience,
      currentCTC: personalForm.currentCTC,
      noticePeriod: personalForm.noticePeriod,
    };

    dispatch(updatePersonalInfo(pInfo));
    dispatch(updateEmploymentDetails(empDetails));
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

    try {
      await updateCandidateProfile({
        personalInfo: pInfo,
        employmentStatus: {
          isEmployed: Boolean(personalForm.currentCompany),
          currentCompany: personalForm.currentCompany,
          currentRole: personalForm.currentDesignation,
          currentSalary: personalForm.currentCTC,
          noticePeriod: personalForm.noticePeriod,
        },
        preferredLocations: personalForm.location ? [personalForm.location] : [],
      } as any);
      toast.success('Personal and employment details saved to database.');
    } catch {
      toast.info('Personal details updated locally.');
    }
  };

  const saveSummary = async () => {
    dispatch(updateProfessionalSummary({ ...summaryForm }));
    setIsEditingSummary(false);
    dispatch(updateUserProfile({ summary: summaryForm.detailedSummary }));

    try {
      await updateCandidateProfile({
        headline: summaryForm.headline,
        summary: summaryForm.detailedSummary,
        bio: summaryForm.detailedSummary,
      } as any);
      toast.success('Resume headline & summary saved to database.');
    } catch {
      toast.info('Summary updated locally.');
    }
  };

  const saveEducation = async () => {
    dispatch(updateEducation({ ...educationForm }));
    setIsEditingEducation(false);

    try {
      await updateCandidateProfile({
        education: educationForm.university || educationForm.degree
          ? [
              {
                institution: educationForm.university,
                degree: educationForm.degree,
                fieldOfStudy: educationForm.type,
                graduationYear: educationForm.duration ? parseInt(educationForm.duration, 10) || undefined : undefined,
              },
            ]
          : [],
      } as any);
      toast.success('Education history saved to database.');
    } catch {
      toast.info('Education history updated locally.');
    }
  };

  const saveCareerProfile = async () => {
    const locations = careerForm.desiredLocationsText
      .split(',')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const updated = {
      ...careerForm,
      desiredLocations: locations,
    };
    dispatch(updateCareerProfile(updated));
    setIsEditingCareer(false);

    try {
      await updateCandidateProfile({
        careerProfile: updated,
        preferredLocations: locations,
        preferredJobTypes: careerForm.desiredJobType ? [careerForm.desiredJobType] : [],
      } as any);
      toast.success('Career profile saved to database.');
    } catch {
      toast.info('Career profile updated locally.');
    }
  };

  const saveExtendedPersonal = async () => {
    const languages = extendedPersonalForm.languagesText
      .split(',')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const updated = {
      ...extendedPersonalForm,
      languages,
    };
    dispatch(updateExtendedPersonal(updated));
    setIsEditingExtendedPersonal(false);

    try {
      await updateCandidateProfile({
        extendedPersonal: updated,
        languages,
      } as any);
      toast.success('Personal details saved to database.');
    } catch {
      toast.info('Personal details updated locally.');
    }
  };

  const saveAccomplishments = async () => {
    dispatch(updateAccomplishments({ ...accomplishmentsForm }));
    setIsEditingAccomplishments(false);

    try {
      await updateCandidateProfile({
        accomplishments: accomplishmentsForm,
      } as any);
      toast.success('Accomplishments saved to database.');
    } catch {
      toast.info('Accomplishments updated locally.');
    }
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
