import React, { useId } from 'react';
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
  summaryErrors: Record<string, string>;
  startEditingSummary: () => void;
  saveSummary: () => void;
}

export const ResumeSummaryCard = ({
  profile,
  isEditingSummary,
  setIsEditingSummary,
  summaryForm,
  setSummaryForm,
  summaryErrors,
  startEditingSummary,
  saveSummary,
}: ResumeSummaryCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="resume-headline"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24 text-left"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Resume Headline & Summary</h3>
        {!isEditingSummary && (
          <button
            type="button"
            onClick={startEditingSummary}
            className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Edit summary"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingSummary ? (
        <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <div className="font-semibold text-slate-900 border-l-2 border-brand-primary pl-3 italic">
            {profile.professionalSummary.headline}
          </div>
          <p>{profile.professionalSummary.detailedSummary}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor={`${idPrefix}-headline`}
              className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
            >
              Resume Headline
            </label>
            <input
              id={`${idPrefix}-headline`}
              type="text"
              value={summaryForm.headline}
              onChange={(e) => setSummaryForm({ ...summaryForm, headline: e.target.value })}
              className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
              aria-invalid={Boolean(summaryErrors.headline)}
            />
            {summaryErrors.headline && (
              <p className="text-xs text-red-600 dark:text-red-400">{summaryErrors.headline}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor={`${idPrefix}-detailedSummary`}
              className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
            >
              Detailed Summary
            </label>
            <textarea
              id={`${idPrefix}-detailedSummary`}
              value={summaryForm.detailedSummary}
              onChange={(e) => setSummaryForm({ ...summaryForm, detailedSummary: e.target.value })}
              rows={5}
              className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary resize-none bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingSummary(false)}
              className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850"
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
