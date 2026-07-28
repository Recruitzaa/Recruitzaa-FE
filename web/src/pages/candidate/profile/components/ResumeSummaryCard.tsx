import React from 'react';
import { Edit2 } from 'lucide-react';
import type { ProfileState } from '../../../../store/slices/profileSlice';

interface ResumeSummaryCardProps {
  profile: ProfileState;
  isEditingSummary: boolean;
  setIsEditingSummary: (val: boolean) => void;
  summaryForm: {
    headline: string;
    detailedSummary: string;
  };
  setSummaryForm: React.Dispatch<
    React.SetStateAction<{
      headline: string;
      detailedSummary: string;
    }>
  >;
  startEditingSummary: () => void;
  saveSummary: () => void;
}

export const ResumeSummaryCard = ({
  profile,
  isEditingSummary,
  setIsEditingSummary,
  summaryForm,
  setSummaryForm,
  startEditingSummary,
  saveSummary,
}: ResumeSummaryCardProps) => {
  return (
    <div
      id="resume-headline"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24 text-left"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Resume Headline & Summary</h3>
        {!isEditingSummary && (
          <button
            type="button"
            onClick={startEditingSummary}
            className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
            aria-label="Edit summary"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingSummary ? (
        <div className="space-y-3 text-sm leading-relaxed text-slate-700">
          <div className="font-semibold text-slate-900 border-l-2 border-brand-primary pl-3 italic">
            {profile.professionalSummary.headline}
          </div>
          <p>{profile.professionalSummary.detailedSummary}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-500 uppercase">Resume Headline</label>
            <input
              type="text"
              value={summaryForm.headline}
              onChange={(e) => setSummaryForm({ ...summaryForm, headline: e.target.value })}
              className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-500 uppercase">Detailed Summary</label>
            <textarea
              value={summaryForm.detailedSummary}
              onChange={(e) => setSummaryForm({ ...summaryForm, detailedSummary: e.target.value })}
              rows={5}
              className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary resize-none bg-white text-slate-800"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingSummary(false)}
              className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold text-slate-700 bg-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveSummary}
              className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
            >
              Save Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
