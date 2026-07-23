import React from 'react';
import { GraduationCap, Edit2 } from 'lucide-react';

export interface EducationDetails {
  degree: string;
  university: string;
  duration: string;
  type: string;
}

interface EducationCardProps {
  education: EducationDetails;
  isEditingEducation: boolean;
  setIsEditingEducation: (val: boolean) => void;
  educationForm: EducationDetails;
  setEducationForm: React.Dispatch<React.SetStateAction<EducationDetails>>;
  saveEducation: () => void;
  startEditingEducation: () => void;
}

export const EducationCard = ({
  education,
  isEditingEducation,
  setIsEditingEducation,
  educationForm,
  setEducationForm,
  saveEducation,
  startEditingEducation,
}: EducationCardProps) => {
  return (
    <div
      id="education"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Education</h3>
        {!isEditingEducation && (
          <button
            type="button"
            onClick={startEditingEducation}
            className="text-slate-400 hover:text-brand-primary"
            aria-label="Edit education"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingEducation ? (
        <div className="flex gap-4 items-start text-sm text-slate-700">
          <div className="p-3 bg-slate-50 text-brand-primary rounded-lg border shadow-sm">
            <GraduationCap size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800">{education.degree}</h4>
            <p className="font-semibold text-slate-500">{education.university}</p>
            <p className="text-slate-400">
              {education.duration} &bull;{' '}
              <span className="font-medium text-slate-500">{education.type}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase text-left w-full block">
                Degree
              </label>
              <input
                type="text"
                value={educationForm.degree}
                onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase text-left w-full block">
                University / Board
              </label>
              <input
                type="text"
                value={educationForm.university}
                onChange={(e) => setEducationForm({ ...educationForm, university: e.target.value })}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase text-left w-full block">
                Duration (Years)
              </label>
              <input
                type="text"
                value={educationForm.duration}
                onChange={(e) => setEducationForm({ ...educationForm, duration: e.target.value })}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase text-left w-full block">
                Course Type
              </label>
              <select
                value={educationForm.type}
                onChange={(e) => setEducationForm({ ...educationForm, type: e.target.value })}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Correspondence / Distance</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingEducation(false)}
              className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEducation}
              className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
            >
              Save Education
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
