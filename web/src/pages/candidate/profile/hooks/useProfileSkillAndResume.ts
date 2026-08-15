import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useToast } from '../../../../hooks/useToast';
import { updateUserProfile } from '../../../../store/slices/auth.slice';
import { addSkill, removeSkill, setFullProfile } from '../../../../store/slices/profileSlice';
import { getMockParsedProfile } from '../../../../data/demo/mockParsedProfile';

const MAX_SKILL_LENGTH = 60;

export const useProfileSkillAndResume = (skills: string[], appUser: any) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [newSkill, setNewSkill] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isAIParsingConfirmOpen, setIsAIParsingConfirmOpen] = useState(false);
  // No resume exists until the user uploads one or runs AI autofill.
  // Fabricated filename/size defaults previously told every new user a
  // document was already on file when none was.
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeFileSize, setResumeFileSize] = useState<string | null>(null);

  const parsingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (parsingTimeoutRef.current) {
        clearTimeout(parsingTimeoutRef.current);
      }
    };
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const skill = newSkill.trim();
    if (!skill) return;

    if (skill.length > MAX_SKILL_LENGTH) {
      toast.error(`Skill names must be ${MAX_SKILL_LENGTH} characters or fewer.`);
      return;
    }

    if (skills.some((existing) => existing.toLowerCase() === skill.toLowerCase())) {
      // The reducer silently drops duplicates — telling the user "Skill
      // added" here would confirm an action that never happened.
      toast.info(`"${skill}" is already on your profile.`);
      setNewSkill('');
      return;
    }

    dispatch(addSkill(skill));
    setNewSkill('');
    toast.success('Skill added.');
  };

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill));
    toast.info(`Removed "${skill}".`);
  };

  // Overwrites every profile section, so it must be an explicit,
  // confirmed action rather than a single accidental click.
  const requestAIParsing = () => {
    setIsAIParsingConfirmOpen(true);
  };

  const cancelAIParsing = () => {
    setIsAIParsingConfirmOpen(false);
  };

  const confirmAIParsing = () => {
    setIsAIParsingConfirmOpen(false);
    setIsParsing(true);

    parsingTimeoutRef.current = setTimeout(() => {
      try {
        const parsedProfile = getMockParsedProfile(appUser?.email || '');
        dispatch(setFullProfile(parsedProfile));
        setResumeFileName('Sample_Parsed_Resume.pdf');
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

        // Honest disclosure: no resume was actually parsed. Claiming
        // "AI parsed resume successfully" asserted work that never happened.
        toast.warning(
          'Your profile was filled with sample data for demonstration. Review every section before applying.'
        );
      } catch {
        toast.error('Something went wrong loading the sample profile. Please try again.');
      } finally {
        setIsParsing(false);
      }
    }, 2000);
  };

  return {
    newSkill,
    setNewSkill,
    isParsing,
    isAIParsingConfirmOpen,
    resumeFileName,
    resumeFileSize,
    handleAddSkill,
    handleRemoveSkill,
    requestAIParsing,
    cancelAIParsing,
    confirmAIParsing,
  };
};
