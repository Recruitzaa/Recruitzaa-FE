import React from 'react';
import { Edit2 } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import styles from '../EmployerProfilePage.module.css';

interface CompanyAboutCardProps {
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

export const CompanyAboutCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  field,
  id,
}: CompanyAboutCardProps) => {
  return (
    <section id="company-about" className={styles.card} aria-labelledby="company-about-title">
      <div className={styles.cardHeader}>
        <h2 id="company-about-title" className={styles.cardTitle}>
          About the Company
        </h2>
        {editingSection !== 'about' && (
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => startEdit('about')}
            aria-label="Edit about section"
          >
            <Edit2 size={15} />
          </button>
        )}
      </div>

      {editingSection !== 'about' ? (
        <p className={styles.fieldValueMuted}>{profile.about}</p>
      ) : (
        <>
          <label htmlFor={`${id}-about`} className={`${styles.fieldLabel} mb-1.5 block`}>
            Company Description
          </label>
          <textarea
            id={`${id}-about`}
            rows={6}
            className={styles.fieldTextarea}
            {...field('about')}
          />
          <div className={styles.actionRow}>
            <button type="button" onClick={cancelEdit} className={styles.btnCancel}>
              Cancel
            </button>
            <button type="button" onClick={saveEdit} className={styles.btnSave}>
              Save About
            </button>
          </div>
        </>
      )}
    </section>
  );
};
