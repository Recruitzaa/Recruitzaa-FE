import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const TimesheetWidget: React.FC = () => {
  const toast = useToast();
  const [hours] = useState(40);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTimesheet = () => {
    setSubmitted(true);
    toast.success('Weekly timesheet of 40 hours submitted successfully!');
  };

  return (
    <>
      <section
        className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4"
        aria-labelledby="timesheet-title"
      >
        <div>
          <h2
            id="timesheet-title"
            className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
          >
            <Calendar size={16} className="text-[#c14f16]" aria-hidden="true" /> Timesheets & Leaves
          </h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
            Log weekly deliverables, review submission statuses, and check leave logs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Timesheet submission card */}
          <div className="border border-slate-100 dark:border-slate-850 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/20 space-y-3 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">
                  Current Week Hours
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {hours} Hours Logged
                </span>
              </div>
              <span
                className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                  submitted
                    ? 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                    : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                }`}
              >
                {submitted ? 'Submitted' : 'Pending Review'}
              </span>
            </div>

            <button
              type="button"
              disabled={submitted}
              onClick={handleSubmitTimesheet}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                submitted
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-[#c14f16] hover:bg-[#a94210] text-white shadow-sm'
              }`}
            >
              {submitted ? (
                <>
                  <ShieldCheck size={14} aria-hidden="true" /> Time Logged
                </>
              ) : (
                <>
                  Submit 40 Hours <ArrowRight size={13} aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {/* Leave/PTO tracking statistics */}
          <div className="border border-slate-100 dark:border-slate-850 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/20 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">
                PTO Balance
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">
                18.5 Days Available
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-500">
              <div className="bg-white dark:bg-slate-900/50 p-2 rounded border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-350 block">4.0 Days</span>
                <span className="text-[9px] text-slate-400">Approved Leave</span>
              </div>
              <div className="bg-white dark:bg-slate-900/50 p-2 rounded border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-350 block">1.5 Days</span>
                <span className="text-[9px] text-slate-400">Sick Logged</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default TimesheetWidget;
