import React from 'react';
import { Edit2, Mail, Phone } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import styles from '../EmployerProfilePage.module.css';

interface CompanyPocCardProps {
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

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const CompanyPocCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  field,
  id,
}: CompanyPocCardProps) => {
  return (
    <section id="hiring-poc" className={styles.card} aria-labelledby="hiring-poc-title">
      <div className={styles.cardHeader}>
        <h2 id="hiring-poc-title" className={styles.cardTitle}>
          Hiring Point of Contact
        </h2>
        {editingSection !== 'poc' && (
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => startEdit('poc')}
            aria-label="Edit hiring contact"
          >
            <Edit2 size={15} />
          </button>
        )}
      </div>

      {editingSection !== 'poc' ? (
        <div className={styles.pocCard}>
          <div className={styles.pocAvatar} aria-hidden="true">
            {getInitials(profile.pocName)}
          </div>
          <div className={styles.pocInfo}>
            <div className={styles.pocName}>{profile.pocName}</div>
            <div className={styles.pocDesignation}>{profile.pocDesignation}</div>
            <div className={styles.pocContacts}>
              <span className={styles.pocContact}>
                <Mail size={12} aria-hidden="true" /> {profile.pocEmail}
              </span>
              <span className={styles.pocContact}>
                <Phone size={12} aria-hidden="true" /> {profile.pocPhone}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.formGrid}>
            {(
              [
                { key: 'pocName' as const, label: 'Full Name', id: `${id}-poc-name` },
                { key: 'pocDesignation' as const, label: 'Designation', id: `${id}-poc-role` },
                { key: 'pocEmail' as const, label: 'Contact Email', id: `${id}-poc-email` },
                { key: 'pocPhone' as const, label: 'Contact Phone', id: `${id}-poc-phone` },
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
              Save Contact
            </button>
          </div>
        </>
      )}
    </section>
  );
};
