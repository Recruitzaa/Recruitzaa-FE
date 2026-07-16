import { useState, useEffect, useId } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCompanyProfile } from '../../../store/slices/employerProfileSlice';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';

export const SECTIONS = [
  { id: 'company-hero', label: 'Company Branding' },
  { id: 'company-overview', label: 'Overview' },
  { id: 'company-about', label: 'About' },
  { id: 'company-perks', label: 'Culture & Perks' },
  { id: 'company-social', label: 'Social Links' },
  { id: 'hiring-poc', label: 'Hiring Contact' },
];

export const useEmployerProfileForm = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.employerProfile.profile);
  const id = useId();

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<CompanyProfile>>({});
  const [newPerk, setNewPerk] = useState('');
  const [activeSection, setActiveSection] = useState('company-hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const startEdit = (section: string) => {
    setEditingSection(section);
    setDraft({ ...profile });
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setDraft({});
  };

  const saveEdit = () => {
    dispatch(updateCompanyProfile(draft));
    setEditingSection(null);
    setDraft({});
  };

  const handleAddPerk = () => {
    const trimmed = newPerk.trim();
    if (!trimmed) return;
    const perks = [...(draft.perks ?? profile.perks)];
    if (!perks.includes(trimmed)) {
      setDraft((d) => ({ ...d, perks: [...perks, trimmed] }));
    }
    setNewPerk('');
  };

  const handleRemovePerk = (perk: string) => {
    const perks = (draft.perks ?? profile.perks).filter((p) => p !== perk);
    setDraft((d) => ({ ...d, perks }));
  };

  const field = (key: keyof CompanyProfile) => ({
    value: (draft[key] as string) ?? (profile[key] as string),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft((d) => ({ ...d, [key]: e.target.value })),
  });

  return {
    profile,
    id,
    editingSection,
    draft,
    newPerk,
    setNewPerk,
    activeSection,
    scrollToSection,
    startEdit,
    cancelEdit,
    saveEdit,
    handleAddPerk,
    handleRemovePerk,
    field,
  };
};
