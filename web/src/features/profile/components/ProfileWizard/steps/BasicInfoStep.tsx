import React from 'react';
import type { UserProfile } from '../../../services/profileApi';

interface BasicInfoStepProps {
  data: UserProfile['basicInfo'];
  onChange: (info: Partial<UserProfile['basicInfo']>) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-3">
        Step 1: Basic Information
      </h3>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          placeholder="e.g. Arjun Kumar"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Email Address <span className="text-rose-500">*</span>
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          placeholder="e.g. arjun@gmail.com"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          placeholder="e.g. +91 98765 43210"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Location (City, Country)
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          placeholder="e.g. Bangalore, India"
        />
      </div>
    </div>
  );
};
