import React, { useRef, useState } from 'react';
import { MapPin, Briefcase, Phone, Mail, Edit2, Camera } from 'lucide-react';
import type { ProfileState } from '../../../../store/slices/profileSlice';
import { PersonalDetailsEditForm } from './PersonalDetailsEditForm';
import { PhotoUploadModal } from '../../../../components/ui/PhotoUploadModal';

interface PersonalFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  currentCompany: string;
  currentDesignation: string;
  totalExperience: string;
  currentCTC: string;
  noticePeriod: string;
}

interface ProfileBannerCardProps {
  profile: ProfileState;
  isEditingPersonal: boolean;
  setIsEditingPersonal: (val: boolean) => void;
  personalForm: PersonalFormState;
  setPersonalForm: React.Dispatch<React.SetStateAction<PersonalFormState>>;
  startEditingPersonal: () => void;
  savePersonalDetails: () => void;
  handleAvatarUpload: (dataUrl: string) => void;
}

export const ProfileBannerCard = ({
  profile,
  isEditingPersonal,
  setIsEditingPersonal,
  personalForm,
  setPersonalForm,
  startEditingPersonal,
  savePersonalDetails,
  handleAvatarUpload,
}: ProfileBannerCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
      setIsPhotoModalOpen(true);
    }
    e.target.value = '';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        <div className="relative w-24 h-24 shrink-0 group">
          <img
            src={profile.personalInfo.avatar}
            alt={`${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`}
            width="96"
            height="96"
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-inner"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256';
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFileChange}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload profile photo"
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/40 text-transparent group-hover:text-white transition-colors focus-visible:bg-black/40 focus-visible:text-white outline-none"
          >
            <Camera size={22} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <h2 className="text-xl font-bold text-brand-charcoal">
              {profile.personalInfo.firstName} {profile.personalInfo.lastName}
            </h2>
            <p className="text-sm font-semibold text-brand-primary mt-0.5 font-sans">
              {profile.employmentDetails.currentDesignation}
            </p>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              {profile.employmentDetails.currentCompany}
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-slate-400" />
              {profile.personalInfo.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} className="text-slate-400" />
              {profile.employmentDetails.totalExperience} Exp
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-700 rounded-full border text-sm">
              <Phone size={12} className="text-slate-400" />
              {profile.personalInfo.phone}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-700 rounded-full border text-sm">
              <Mail size={12} className="text-slate-400" />
              {profile.personalInfo.email}
            </span>
          </div>
        </div>

        {!isEditingPersonal && (
          <button
            type="button"
            onClick={startEditingPersonal}
            className="absolute right-0 top-0 inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
            aria-label="Edit personal details"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
        <div>
          <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
            Current CTC
          </div>
          <div className="font-bold text-brand-charcoal mt-0.5">
            {profile.employmentDetails.currentCTC}
          </div>
        </div>
        <div>
          <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
            Notice Period
          </div>
          <div className="font-bold text-brand-charcoal mt-0.5">
            {profile.employmentDetails.noticePeriod}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
            Job Search Status
          </div>
          <div className="font-bold text-green-600 mt-0.5">Active & Interviewing</div>
        </div>
      </div>

      {isEditingPersonal && (
        <PersonalDetailsEditForm
          personalForm={personalForm}
          setPersonalForm={setPersonalForm}
          setIsEditingPersonal={setIsEditingPersonal}
          savePersonalDetails={savePersonalDetails}
        />
      )}

      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => {
          setIsPhotoModalOpen(false);
          setPendingFile(null);
        }}
        onSave={(dataUrl) => {
          handleAvatarUpload(dataUrl);
          setPendingFile(null);
        }}
        onRemove={() => {
          handleAvatarUpload('');
          setIsPhotoModalOpen(false);
          setPendingFile(null);
        }}
        currentImage={profile.personalInfo.avatar}
        initialFile={pendingFile}
        shape="circle"
        title="Update profile photo"
        description="Drag to reposition and zoom to frame your photo, then save."
        previewContexts={[
          { label: 'Profile header', size: 72 },
          { label: 'Application card', size: 40 },
          { label: 'Navigation', size: 28 },
        ]}
      />
    </div>
  );
};
