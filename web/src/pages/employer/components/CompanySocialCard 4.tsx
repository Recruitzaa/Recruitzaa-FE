import React from 'react';
import { Edit2, ExternalLink, Globe } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import styles from '../EmployerProfilePage.module.css';

interface CompanySocialCardProps {
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

export const CompanySocialCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  field,
  id,
}: CompanySocialCardProps) => {
  return (
    <section id="company-social" className={styles.card} aria-labelledby="company-social-title">
      <div className={styles.cardHeader}>
        <h2 id="company-social-title" className={styles.cardTitle}>
          Social & Online Presence
        </h2>
        {editingSection !== 'social' && (
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => startEdit('social')}
            aria-label="Edit social links"
          >
            <Edit2 size={15} />
          </button>
        )}
      </div>

      {editingSection !== 'social' ? (
        <div className={styles.socialGrid}>
          {[
            { icon: <ExternalLink size={15} />, label: 'LinkedIn', value: profile.linkedIn },
            { icon: <ExternalLink size={15} />, label: 'Twitter / X', value: profile.twitter },
            { icon: <ExternalLink size={15} />, label: 'GitHub', value: profile.github },
            { icon: <Globe size={15} />, label: 'Glassdoor', value: profile.glassdoor },
          ].map(({ icon, label, value }) => (
            <div key={label} className={styles.socialItem}>
              <div className={styles.socialIcon} aria-hidden="true">
                {icon}
              </div>
              <div>
                <div className={styles.fieldLabel}>{label}</div>
                {value ? (
                  <a href={value} target="_blank" rel="noreferrer" className={styles.socialLink}>
                    {value.replace('https://', '')}
                  </a>
                ) : (
                  <span className={styles.socialEmpty}>Not added</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.socialGrid}>
            {(
              [
                {
                  key: 'linkedIn' as const,
                  label: 'LinkedIn URL',
                  icon: <ExternalLink size={14} />,
                  id: `${id}-li`,
                },
                {
                  key: 'twitter' as const,
                  label: 'Twitter / X URL',
                  icon: <ExternalLink size={14} />,
                  id: `${id}-tw`,
                },
                {
                  key: 'github' as const,
                  label: 'GitHub Org URL',
                  icon: <ExternalLink size={14} />,
                  id: `${id}-gh`,
                },
                {
                  key: 'glassdoor' as const,
                  label: 'Glassdoor URL',
                  icon: <Globe size={14} />,
                  id: `${id}-gd`,
                },
              ] as { key: keyof CompanyProfile; label: string; icon: React.ReactNode; id: string }[]
            ).map(({ key, label, icon, id: fid }) => (
              <div key={key} className={styles.fieldGroup}>
                <label htmlFor={fid} className={`${styles.fieldLabel} flex items-center gap-1`}>
                  <span aria-hidden="true">{icon}</span> {label}
                </label>
                <input
                  id={fid}
                  {...field(key)}
                  placeholder="https://..."
                  className={styles.fieldInput}
                />
              </div>
            ))}
          </div>
          <div className={styles.actionRow}>
            <button type="button" onClick={cancelEdit} className={styles.btnCancel}>
              Cancel
            </button>
            <button type="button" onClick={saveEdit} className={styles.btnSave}>
              Save Links
            </button>
          </div>
        </>
      )}
    </section>
  );
};
