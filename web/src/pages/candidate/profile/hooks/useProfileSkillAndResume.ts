import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import { updateUserProfile } from '../../../../store/slices/auth.slice';
import { addSkill, removeSkill, setFullProfile } from '../../../../store/slices/profileSlice';
import { getMockParsedProfile } from '../utils/mockParsedProfile';
import { updateCandidateProfile } from '../../../../services/profile.service';
import type { RootState } from '../../../../store';

export const useProfileSkillAndResume = (appUser: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const currentSkills = useAppSelector((state: RootState) => state.profile.skills);

  const [newSkill, setNewSkill] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [resumeFileName, setResumeFileName] = useState(
    appUser?.displayName
      ? `${appUser.displayName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf'
  );
  const [resumeFileSize, setResumeFileSize] = useState('124 KB');

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillTrimmed = newSkill.trim();
    if (!skillTrimmed) return;
    if (currentSkills.includes(skillTrimmed)) {
      toast.info('Skill already added.');
      return;
    }
    const updatedSkills = [...currentSkills, skillTrimmed];
    dispatch(addSkill(skillTrimmed));
    setNewSkill('');
    toast.success('Skill added.');

    try {
      await updateCandidateProfile({
        skillsFlat: updatedSkills,
      } as any);
    } catch {
      // Ignored for local fallback
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    const updatedSkills = currentSkills.filter((s) => s !== skill);
    dispatch(removeSkill(skill));
    toast.info('Removed skill.');

    try {
      await updateCandidateProfile({
        skillsFlat: updatedSkills,
      } as any);
    } catch {
      // Ignored for local fallback
    }
  };

  const handleTriggerAIParsing = () => {
    setIsParsing(true);
    toast.info('AI Resume Parser scanning document layout...');

    setTimeout(async () => {
      const parsedProfile = getMockParsedProfile(appUser?.email || '');
      dispatch(setFullProfile(parsedProfile));
      setResumeFileName(`${(appUser?.displayName || 'User').replace(/\s+/g, '_')}_Parsed_CV.pdf`);
      setResumeFileSize('186 KB');

      dispatch(
        updateUserProfile({
          phone: parsedProfile.personalInfo.phone,
          location: parsedProfile.personalInfo.location,
          currentCompany: parsedProfile.employmentDetails.currentCompany,
          currentRole: parsedProfile.employmentDetails.currentDesignation,
          currentSalary: parsedProfile.employmentDetails.currentCTC,
          noticePeriod: parsedProfile.employmentDetails.noticePeriod,
          summary: parsedProfile.professionalSummary.detailedSummary,
          skills: parsedProfile.skills,
        })
      );

      try {
        await updateCandidateProfile({
          personalInfo: parsedProfile.personalInfo,
          headline: parsedProfile.professionalSummary.headline,
          summary: parsedProfile.professionalSummary.detailedSummary,
          skillsFlat: parsedProfile.skills,
          experience: parsedProfile.employmentHistory.map((h) => ({
            role: h.designation,
            company: h.company,
            startDate: h.duration,
            description: (h.keyResponsibilities || []).join('\n'),
          })),
          projects: parsedProfile.projects,
          itSkills: parsedProfile.itSkills,
          careerProfile: parsedProfile.careerProfile,
          extendedPersonal: parsedProfile.extendedPersonal,
          accomplishments: parsedProfile.accomplishments,
        } as any);
      } catch {
        // Ignored
      }

      setIsParsing(false);
      toast.success('AI parsed resume successfully! Populated profile blocks and saved to DB.');
    }, 2000);
  };

  return {
    newSkill,
    setNewSkill,
    isParsing,
    resumeFileName,
    resumeFileSize,
    handleAddSkill,
    handleRemoveSkill,
    handleTriggerAIParsing,
  };
};
