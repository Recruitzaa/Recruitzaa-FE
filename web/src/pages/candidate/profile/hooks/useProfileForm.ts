import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { useProfileSectionEdit } from './useProfileSectionEdit';
import { useProfileListEdit } from './useProfileListEdit';
import { scrollToElementId } from '../../../../lib/scrollToElement';

/**
 * useProfileForm — Orchestrates sub-hooks for managing candidate profile forms.
 * Decouples state management to maintain modular files and avoid bloated codebases.
 */
export const useProfileForm = () => {
  const { appUser } = useSelector((state: RootState) => state.auth);
  const profile = useSelector((state: RootState) => state.profile);

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
