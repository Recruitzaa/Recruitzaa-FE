import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import { updateUserProfile } from '../../../../store/slices/auth.slice';
import { addSkill, removeSkill, setFullProfile } from '../../../../store/slices/profileSlice';
import { getMockParsedProfile } from '../utils/mockParsedProfile';

export const useProfileSkillAndResume = (appUser: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [newSkill, setNewSkill] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [resumeFileName, setResumeFileName] = useState(
    appUser?.displayName
      ? `${appUser.displayName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Arjun_Kumar_Resume.pdf'
  );
  const [resumeFileSize, setResumeFileSize] = useState('124 KB');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    dispatch(addSkill(newSkill.trim()));
    setNewSkill('');
    toast.success('Skill added.');
  };

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill));
    toast.info('Removed skill.');
  };

  const handleTriggerAIParsing = () => {
    setIsParsing(true);
    toast.info('AI Resume Parser scanning document layout...');

    setTimeout(() => {
      const parsedProfile = getMockParsedProfile(appUser?.email || '');
      dispatch(setFullProfile(parsedProfile));
      setResumeFileName('Arjun_Kumar_Lead_Architect_CV.pdf');
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

      setIsParsing(false);
      toast.success('AI parsed resume successfully! Pre-populated 10 profile blocks.');
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
