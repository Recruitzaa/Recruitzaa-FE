import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { ShieldCheck } from 'lucide-react';

export const ServiceTiersCard: React.FC = () => {
  const toast = useToast();
  const [offerings, setOfferings] = useState({
    mentorship: true,
    mockInterviews: true,
    resumeReview: false,
  });

  const handleToggle = (key: keyof typeof offerings, label: string) => {
    const nextVal = !offerings[key];
    setOfferings((prev) => ({ ...prev, [key]: nextVal }));
    toast.success(`${label} ${nextVal ? 'activated' : 'deactivated'}.`);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#c14f16]" aria-hidden="true" /> Mentorship
            Active Offerings
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Toggle which service tiers you are currently offering to job seekers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                1:1 Live Mentorship
              </span>
              <span className="text-sm text-slate-400">
                Live career guidance, strategy, or coding help.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('mentorship', '1:1 Live Mentorship')}
              aria-label="Toggle 1:1 Live Mentorship offering"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                offerings.mentorship ? 'bg-[#c14f16]' : 'bg-slate-250 dark:bg-slate-850'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  offerings.mentorship ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                Mock Interviews
              </span>
              <span className="text-sm text-slate-400">
                Conduct technical mock loops with dynamic feedback reports.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('mockInterviews', 'Mock Interviews')}
              aria-label="Toggle Mock Interviews offering"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                offerings.mockInterviews ? 'bg-[#c14f16]' : 'bg-slate-250 dark:bg-slate-850'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  offerings.mockInterviews ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                Async Resume Review
              </span>
              <span className="text-sm text-slate-400">
                Provide written markdown resume feedback within 48 hours.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('resumeReview', 'Async Resume Review')}
              aria-label="Toggle Async Resume Review offering"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                offerings.resumeReview ? 'bg-[#c14f16]' : 'bg-slate-250 dark:bg-slate-850'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  offerings.resumeReview ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServiceTiersCard;
