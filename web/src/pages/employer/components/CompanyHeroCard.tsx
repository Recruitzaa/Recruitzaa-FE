import React, { useRef, useState } from 'react';
import { Upload, Building2, Edit2 } from 'lucide-react';
import type { CompanyProfile } from '../../../store/slices/employerProfileSlice';
import { PhotoUploadModal } from '../../../components/ui/PhotoUploadModal';
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
  onLogoUpload: (dataUrl: string) => void;
  id: string;
}

export const CompanyHeroCard = ({
  profile,
  editingSection,
  startEdit,
  cancelEdit,
  saveEdit,
  field,
  onLogoUpload,
  id,
}: CompanyHeroCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
      setIsPhotoModalOpen(true);
    }
    e.target.value = '';
  };

  return (
    <section id="company-hero" className={styles.heroCard} aria-labelledby="company-hero-title">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        className={styles.logoZone}
        role="button"
        tabIndex={0}
        aria-label={profile.logoUrl ? 'Change company logo' : 'Upload company logo'}
        onClick={openFilePicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFilePicker();
          }
        }}
        style={
          profile.logoUrl
            ? {
                backgroundImage: `url(${profile.logoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }
            : undefined
        }
      >
        {!profile.logoUrl && (
          <>
            <Upload size={20} />
            <span>Upload Logo</span>
          </>
        )}
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

      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => {
          setIsPhotoModalOpen(false);
          setPendingFile(null);
        }}
        onSave={(dataUrl) => {
          onLogoUpload(dataUrl);
          setPendingFile(null);
        }}
        onRemove={() => {
          onLogoUpload('');
          setIsPhotoModalOpen(false);
          setPendingFile(null);
        }}
        currentImage={profile.logoUrl}
        initialFile={pendingFile}
        shape="rounded"
        title="Update company logo"
        description="Drag to reposition and zoom to frame your logo, then save."
        previewContexts={[
          { label: 'Company page', size: 72 },
          { label: 'Job listing', size: 40 },
          { label: 'Search results', size: 28 },
        ]}
      />
    </section>
  );
};
