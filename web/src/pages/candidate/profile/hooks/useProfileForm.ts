import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../store';
import { setFullProfile } from '../../../../store/slices/profileSlice';
import { getCandidateProfile } from '../../../../services/profile.service';
import { useProfileSectionEdit } from './useProfileSectionEdit';
import { useProfileListEdit } from './useProfileListEdit';
import { scrollToElementId } from '../../../../lib/scrollToElement';

/**
 * useProfileForm — Orchestrates sub-hooks for managing candidate profile forms.
 * Loads candidate data from backend DB on mount and provides section/list edit handlers.
 */
export const useProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const profile = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    let isMounted = true;
    const loadProfileFromDB = async () => {
      if (!isAuthenticated) return;
      try {
        const dbProfile: any = await getCandidateProfile();
        if (dbProfile && isMounted) {
          // Merge database state cleanly
          const merged: any = {
            personalInfo: dbProfile.personalInfo || {
              firstName: appUser?.displayName ? appUser.displayName.split(' ')[0] : '',
              lastName: appUser?.displayName
                ? appUser.displayName.split(' ').slice(1).join(' ')
                : '',
              email: appUser?.email || '',
              phone: appUser?.phone || '',
              location: appUser?.location || '',
              avatar: appUser?.photoUrl || '',
            },
            employmentDetails: dbProfile.employmentStatus
              ? {
                  currentCompany: dbProfile.employmentStatus.currentCompany || '',
                  currentDesignation: dbProfile.employmentStatus.currentRole || '',
                  totalExperience: '',
                  currentCTC: dbProfile.employmentStatus.currentSalary || '',
                  noticePeriod: dbProfile.employmentStatus.noticePeriod || '',
                }
              : {
                  currentCompany: appUser?.currentCompany || '',
                  currentDesignation: appUser?.currentRole || '',
                  totalExperience: '',
                  currentCTC: appUser?.currentSalary || '',
                  noticePeriod: appUser?.noticePeriod || '',
                },
            professionalSummary: {
              headline: dbProfile.headline || '',
              detailedSummary: dbProfile.summary || dbProfile.bio || '',
            },
            skills:
              dbProfile.skills && dbProfile.skills.length > 0
                ? dbProfile.skills.map((s: any) => (typeof s === 'string' ? s : s.name))
                : dbProfile.skillsFlat || [],
            employmentHistory: dbProfile.experience || [],
            education:
              dbProfile.education &&
              Array.isArray(dbProfile.education) &&
              dbProfile.education.length > 0
                ? {
                    degree: dbProfile.education[0].degree || '',
                    university: dbProfile.education[0].institution || '',
                    duration: dbProfile.education[0].graduationYear
                      ? String(dbProfile.education[0].graduationYear)
                      : '',
                    type: 'Full Time',
                  }
                : dbProfile.education || { degree: '', university: '', duration: '', type: '' },
            projects: dbProfile.projects || [],
            itSkills: dbProfile.itSkills || [],
            careerProfile: dbProfile.careerProfile || {
              industry: '',
              department: '',
              roleCategory: '',
              jobRole: '',
              desiredJobType: '',
              desiredEmploymentType: '',
              desiredLocations: dbProfile.preferredLocations || [],
              expectedSalary: dbProfile.salaryExpectation?.min
                ? String(dbProfile.salaryExpectation.min)
                : '',
              preferredShift: '',
            },
            extendedPersonal: dbProfile.extendedPersonal || {
              gender: '',
              maritalStatus: '',
              dob: '',
              category: '',
              address: '',
              languages: dbProfile.languages || [],
            },
            accomplishments: dbProfile.accomplishments || {
              onlineProfile: '',
              workSample: '',
              publication: '',
              presentation: '',
              patent: '',
              certification: '',
            },
          };
          dispatch(setFullProfile(merged));
        }
      } catch {
        // Fallback: If DB profile is not yet created, initialize with logged in user info
        if (appUser && isMounted) {
          dispatch(
            setFullProfile({
              ...profile,
              personalInfo: {
                ...profile.personalInfo,
                firstName: appUser.displayName
                  ? appUser.displayName.split(' ')[0]
                  : profile.personalInfo.firstName,
                lastName: appUser.displayName
                  ? appUser.displayName.split(' ').slice(1).join(' ')
                  : profile.personalInfo.lastName,
                email: appUser.email || profile.personalInfo.email,
                phone: appUser.phone || profile.personalInfo.phone,
                location: appUser.location || profile.personalInfo.location,
              },
            })
          );
        }
      }
    };

    loadProfileFromDB();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, appUser?.id]);

  const sectionEdit = useProfileSectionEdit(profile, appUser);
  const listEdit = useProfileListEdit(profile);

  const scrollToSection = (sectionId: string) => {
    scrollToElementId(sectionId);
  };

  return {
    profile,
    appUser,
    scrollToSection,
    ...sectionEdit,
    ...listEdit,
  };
};
export default useProfileForm;
