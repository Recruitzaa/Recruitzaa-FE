import React from 'react';
import { Edit2 } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import styles from '../EmployerProfilePage.module.css';

interface CompanyOverviewCardProps {
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

export const CompanyOverviewCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  field,
  id,
}: CompanyOverviewCardProps) => {
  return (
    <section id="company-overview" className={styles.card} aria-labelledby="company-overview-title">
      <div className={styles.cardHeader}>
        <h2 id="company-overview-title" className={styles.cardTitle}>
          Company Overview
        </h2>
        {editingSection !== 'overview' && (
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => startEdit('overview')}
            aria-label="Edit company overview"
          >
            <Edit2 size={15} />
          </button>
        )}
      </div>

      {editingSection !== 'overview' ? (
        <div className={styles.formGrid}>
          {[
            { label: 'Industry', value: profile.industry },
            { label: 'Company Size', value: profile.companySize },
            { label: 'Company Type', value: profile.companyType },
            { label: 'HQ Location', value: profile.hqLocation },
            { label: 'Website', value: profile.website },
          ].map(({ label, value }) => (
            <div key={label} className={styles.fieldGroup}>
              <span className={styles.fieldLabel}>{label}</span>
              <span className={styles.fieldValue}>{value || '—'}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.formGrid}>
            {(
              [
                { key: 'industry' as const, label: 'Industry', id: `${id}-industry` },
                { key: 'companySize' as const, label: 'Company Size', id: `${id}-size` },
                { key: 'companyType' as const, label: 'Company Type', id: `${id}-type` },
                { key: 'hqLocation' as const, label: 'HQ Location', id: `${id}-hq` },
                { key: 'website' as const, label: 'Website URL', id: `${id}-web` },
              ] as { key: keyof CompanyProfile; label: string; id: string }[]
            ).map(({ key, label, id: fid }) => (
              <div key={key} className={styles.fieldGroup}>
                <label htmlFor={fid} className={styles.fieldLabel}>
                  {label}
                </label>
                <input id={fid} {...field(key)} className={styles.fieldInput} />
              </div>
            ))}
          </div>
          <div className={styles.actionRow}>
            <button type="button" onClick={cancelEdit} className={styles.btnCancel}>
              Cancel
            </button>
            <button type="button" onClick={saveEdit} className={styles.btnSave}>
              Save Overview
            </button>
          </div>
        </>
      )}
    </section>
  );
};
