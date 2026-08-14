import { Edit2 } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import styles from '../EmployerProfilePage.module.css';

interface CompanyPerksCardProps {
  profile: CompanyProfile;
  editingSection: string | null;
  startEdit: (section: string) => void;
  cancelEdit: () => void;
  saveEdit: () => void;
  draft: Partial<CompanyProfile>;
  newPerk: string;
  setNewPerk: (val: string) => void;
  handleAddPerk: () => void;
  handleRemovePerk: (perk: string) => void;
  id: string;
}

export const CompanyPerksCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  draft,
  newPerk,
  setNewPerk,
  handleAddPerk,
  handleRemovePerk,
  id,
}: CompanyPerksCardProps) => {
  return (
    <section id="company-perks" className={styles.card} aria-labelledby="company-perks-title">
      <div className={styles.cardHeader}>
        <h2 id="company-perks-title" className={styles.cardTitle}>
          Culture & Perks
        </h2>
        {editingSection !== 'perks' && (
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => startEdit('perks')}
            aria-label="Edit perks"
          >
            <Edit2 size={15} />
          </button>
        )}
      </div>

      <div className={styles.perkChips}>
        {(editingSection === 'perks' ? (draft.perks ?? profile.perks) : profile.perks).map(
          (perk) => (
            <span key={perk} className={styles.perkChip}>
              {perk}
              {editingSection === 'perks' && (
                <button
                  type="button"
                  className={styles.perkRemove}
                  onClick={() => handleRemovePerk(perk)}
                  aria-label={`Remove ${perk}`}
                >
                  ×
                </button>
              )}
            </span>
          )
        )}
      </div>

      {editingSection === 'perks' && (
        <>
          <div className={styles.perkInputRow}>
            <input
              id={`${id}-new-perk`}
              aria-label="Add a perk"
              type="text"
              value={newPerk}
              onChange={(e) => setNewPerk(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPerk();
                }
              }}
              placeholder="Add a perk (e.g. Hybrid Work)"
              className={`${styles.fieldInput} flex-1`}
            />
            <button type="button" onClick={handleAddPerk} className={styles.perkAdd}>
              + Add
            </button>
          </div>
          <div className={styles.actionRow}>
            <button type="button" onClick={cancelEdit} className={styles.btnCancel}>
              Cancel
            </button>
            <button type="button" onClick={saveEdit} className={styles.btnSave}>
              Save Perks
            </button>
          </div>
        </>
      )}
    </section>
  );
};
