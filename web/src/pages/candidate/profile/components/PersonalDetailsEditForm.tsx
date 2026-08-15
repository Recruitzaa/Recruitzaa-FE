import React, { useId } from 'react';
import { X } from 'lucide-react';

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

interface PersonalDetailsEditFormProps {
  personalForm: PersonalFormState;
  setPersonalForm: React.Dispatch<React.SetStateAction<PersonalFormState>>;
  personalErrors: Record<string, string>;
  setIsEditingPersonal: (val: boolean) => void;
  savePersonalDetails: () => void;
}

export const PersonalDetailsEditForm = ({
  personalForm,
  setPersonalForm,
  personalErrors,
  setIsEditingPersonal,
  savePersonalDetails,
}: PersonalDetailsEditFormProps) => {
  const idPrefix = useId();
  const fieldId = (name: keyof PersonalFormState) => `${idPrefix}-${name}`;

  return (
    <div className="bg-slate-50 dark:bg-brand-card p-4 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4 text-left">
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Edit Personal Details
        </h3>
        <button
          type="button"
          onClick={() => setIsEditingPersonal(false)}
          className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close edit form"
        >
          <X size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor={fieldId('firstName')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            First Name
          </label>
          <input
            id={fieldId('firstName')}
            type="text"
            value={personalForm.firstName}
            onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
            aria-invalid={Boolean(personalErrors.firstName)}
          />
          {personalErrors.firstName && (
            <p className="text-xs text-red-600 dark:text-red-400">{personalErrors.firstName}</p>
          )}
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('lastName')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Last Name
          </label>
          <input
            id={fieldId('lastName')}
            type="text"
            value={personalForm.lastName}
            onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
            aria-invalid={Boolean(personalErrors.lastName)}
          />
          {personalErrors.lastName && (
            <p className="text-xs text-red-600 dark:text-red-400">{personalErrors.lastName}</p>
          )}
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('phone')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Phone
          </label>
          <input
            id={fieldId('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={personalForm.phone}
            onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
            aria-invalid={Boolean(personalErrors.phone)}
          />
          {personalErrors.phone && (
            <p className="text-xs text-red-600 dark:text-red-400">{personalErrors.phone}</p>
          )}
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('location')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Location
          </label>
          <input
            id={fieldId('location')}
            type="text"
            value={personalForm.location}
            onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('currentCompany')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Current Company
          </label>
          <input
            id={fieldId('currentCompany')}
            type="text"
            value={personalForm.currentCompany}
            onChange={(e) => setPersonalForm({ ...personalForm, currentCompany: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('currentDesignation')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Current Designation
          </label>
          <input
            id={fieldId('currentDesignation')}
            type="text"
            value={personalForm.currentDesignation}
            onChange={(e) =>
              setPersonalForm({ ...personalForm, currentDesignation: e.target.value })
            }
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('totalExperience')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Total Experience
          </label>
          <input
            id={fieldId('totalExperience')}
            type="text"
            value={personalForm.totalExperience}
            onChange={(e) => setPersonalForm({ ...personalForm, totalExperience: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('currentCTC')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Current CTC
          </label>
          <input
            id={fieldId('currentCTC')}
            type="text"
            value={personalForm.currentCTC}
            onChange={(e) => setPersonalForm({ ...personalForm, currentCTC: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label
            htmlFor={fieldId('noticePeriod')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Notice Period
          </label>
          <select
            id={fieldId('noticePeriod')}
            value={personalForm.noticePeriod}
            onChange={(e) => setPersonalForm({ ...personalForm, noticePeriod: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          >
            {/* Explicit empty option: a stored value that matches none of these
                (e.g. a blank profile) used to silently display the first option
                while the underlying state stayed mismatched. */}
            <option value="">Select a notice period</option>
            <option>Immediate (15 days or less)</option>
            <option>1 Month (30 days)</option>
            <option>2 Months (60 days)</option>
            <option>3 Months (90 days)</option>
            <option>Serving Notice Period</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => setIsEditingPersonal(false)}
          className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={savePersonalDetails}
          className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
