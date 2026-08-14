import React from 'react';
import { Briefcase, User, Clock, Monitor } from 'lucide-react';

export const ActiveAllocationCard: React.FC = () => {
  return (
    <>
      <section
        className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4"
        aria-labelledby="allocation-title"
      >
        <div>
          <h2
            id="allocation-title"
            className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
          >
            <Briefcase size={16} className="text-[#c14f16]" aria-hidden="true" /> Active Project
            Allocation
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Your current enterprise resource allocation status and reporting line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3">
            <div
              className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <Monitor size={15} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Project Name
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Telecomm-Core-Stream
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <Briefcase size={15} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Role
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Software Engineer
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <User size={15} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Reporting Manager
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Sarah Jenkins (Engineering VP)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 shrink-0"
              aria-hidden="true"
            >
              <Clock size={15} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Current Shift
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Afternoon/Night Shift
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ActiveAllocationCard;
