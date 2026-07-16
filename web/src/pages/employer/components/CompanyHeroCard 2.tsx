import React from 'react';
import { Upload, Building2, Edit2 } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import styles from '../EmployerProfilePage.module.css';

interface CompanyHeroCardProps {
  profile: CompanyProfile;
  editingSection: string | null;
  startEdit: (section: string) => void;
  cancelEdit: () => void;
  saveEdit: () => void;
  field: (key: keyof CompanyProfile) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
  id: string;
}

export const CompanyHeroCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  field,
  id,
}: CompanyHeroCardProps) => {
  return (
    <section id="company-hero" className={styles.heroCard} aria-labelledby="company-hero-title">
      <div className={styles.logoZone} role="button" tabIndex={0} aria-label="Upload company logo">
        <Upload size={20} />
        <span>Upload Logo</span>
      </div>
      <div className={styles.heroInfo}>
        {editingSection !== 'hero' ? (
          <>
            <h2 id="company-hero-title" className={styles.heroName}>
              {profile.companyName}
            </h2>
            <div className={styles.heroTagline}>{profile.tagline}</div>
            <div className={styles.heroMeta}>
              <span className={styles.heroBadge}>
                <Building2 size={11} /> {profile.companyType}
              </span>
              <span className={styles.heroBadge}>📍 {profile.hqLocation}</span>
              <span className={styles.heroBadge}>🗓 Est. {profile.foundedYear}</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2.5">
            <input
              id={`${id}-company-name`}
              {...field('companyName')}
              placeholder="Company Name"
              className={`${styles.fieldInput} bg-white/10 text-white border border-white/20`}
            />
            <input
              id={`${id}-tagline`}
              {...field('tagline')}
              placeholder="Company tagline"
              className={`${styles.fieldInput} bg-white/10 text-white border border-white/20`}
            />
            <input
              id={`${id}-foundedYear`}
              {...field('foundedYear')}
              placeholder="Founded year"
              className={`${styles.fieldInput} bg-white/10 text-white border border-white/20 w-[120px]`}
            />
            <div className="flex gap-2 mt-1">
              <button type="button" onClick={cancelEdit} className={styles.heroEditBtn}>
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className={`${styles.heroEditBtn} bg-[#c14f16]/40 border-[#c14f16] text-white`}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      {editingSection !== 'hero' && (
        <button
          type="button"
          className={styles.heroEditBtn}
          onClick={() => startEdit('hero')}
          aria-label="Edit company branding"
        >
          <Edit2 size={13} className="inline mr-1" />
          Edit Branding
        </button>
      )}
    </section>
  );
};
