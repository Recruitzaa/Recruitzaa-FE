import React from 'react';
import type { UserProfile } from '../../../services/profileApi';

interface PreferencesStepProps {
  data: UserProfile['preferences'];
  onChange: (pref: Partial<UserProfile['preferences']>) => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
        Step 5: Job Preferences
      </h3>

      <div>
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Desired Role / Job Title
        </label>
        <input
          type="text"
          value={data.desiredRole}
          onChange={(e) => onChange({ desiredRole: e.target.value })}
          className="w-full text-sm p-2.5 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          placeholder="e.g. Senior Frontend Engineer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Desired Locations (comma separated)
        </label>
        <input
          type="text"
          value={data.locations.join(', ')}
          onChange={(e) =>
            onChange({
              locations: e.target.value
                .split(',')
                .map((l) => l.trim())
                .filter(Boolean),
            })
          }
          className="w-full text-sm p-2.5 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          placeholder="e.g. Bangalore, Remote, Pune"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Minimum Salary (INR / Annum)
          </label>
          <input
            type="number"
            value={data.salaryRange.min || ''}
            onChange={(e) =>
              onChange({
                salaryRange: { ...data.salaryRange, min: Number(e.target.value) },
              })
            }
            className="w-full text-sm p-2.5 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
            placeholder="e.g. 1200000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Maximum Salary (INR / Annum)
          </label>
          <input
            type="number"
            value={data.salaryRange.max || ''}
            onChange={(e) =>
              onChange({
                salaryRange: { ...data.salaryRange, max: Number(e.target.value) },
              })
            }
            className="w-full text-sm p-2.5 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
            placeholder="e.g. 2400000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          Preferred Work Mode
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['remote', 'hybrid', 'onsite'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onChange({ workMode: mode })}
              className={`py-2 px-3 text-sm font-semibold rounded border capitalize transition-all ${
                data.workMode === mode
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
