import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { useProfileForm } from '../../hooks/useProfileForm';
import { useUpdateProfileMutation } from '../../services/profileApi';

import { BasicInfoStep } from './steps/BasicInfoStep';
import { EducationStep } from './steps/EducationStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { SkillsStep } from './steps/SkillsStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { ResumeUploadStep } from './steps/ResumeUploadStep';
import { useToast } from '../../../../hooks/useToast';

/**
 * ProfileWizardContainer — Coordinates step navigation, local form state, and mutation saves.
 */
export const ProfileWizardContainer: React.FC = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const {
    formData,
    updateBasicInfo,
    updateEducation,
    updateExperience,
    updateSkills,
    updatePreferences,
  } = useProfileForm();

  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = async () => {
    try {
      await updateProfile(formData).unwrap();
      if (step < 6) {
        setStep((prev) => prev + 1);
      } else {
        toast.success('Profile saved successfully.');
      }
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleResumeUpload = async (_file: File) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const stepsLabel = ['Basic Info', 'Education', 'Experience', 'Skills', 'Preferences', 'Resume'];

  return (
    <Card className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 border border-slate-200 shadow-lg rounded-xl">
      {/* Progress Tracker */}
      <div className="mb-6 text-slate-900 dark:text-slate-100">
        <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase mb-2">
          <span>Profile Onboarding Wizard</span>
          <span>Step {step} of 6</span>
        </div>
        <div className="w-full bg-slate-105 dark:bg-slate-900 h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 overflow-x-auto gap-2">
          {stepsLabel.map((lbl, idx) => (
            <span
              key={lbl}
              className={`text-xs font-bold uppercase ${
                step === idx + 1
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {lbl}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[220px] mb-6">
        {step === 1 && <BasicInfoStep data={formData.basicInfo} onChange={updateBasicInfo} />}
        {step === 2 && <EducationStep data={formData.education} onChange={updateEducation} />}
        {step === 3 && <ExperienceStep data={formData.experience} onChange={updateExperience} />}
        {step === 4 && <SkillsStep data={formData.skills} onChange={updateSkills} />}
        {step === 5 && <PreferencesStep data={formData.preferences} onChange={updatePreferences} />}
        {step === 6 && (
          <ResumeUploadStep onResumeUpload={handleResumeUpload} isLoading={isUploading} />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-slate-100">
        <Button
          onClick={handleBack}
          disabled={step === 1 || isSaving}
          variant="outline"
          className="text-sm py-2 px-4 rounded border-slate-200 text-slate-600 dark:text-slate-400 font-semibold"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={isSaving}
          className="bg-indigo-600 hover:bg-indigo-750 text-white font-semibold text-sm py-2 px-5 rounded"
        >
          {isSaving ? 'Saving...' : step === 6 ? 'Submit Profile' : 'Save & Next'}
        </Button>
      </div>
    </Card>
  );
};
