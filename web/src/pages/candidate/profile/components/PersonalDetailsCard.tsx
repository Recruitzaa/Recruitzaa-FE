import { useId } from 'react';
import { Edit2 } from 'lucide-react';
import type { ExtendedPersonalInfo } from '../../../../store/slices/profileSlice';

interface PersonalFormType {
  gender: string;
  maritalStatus: string;
  dob: string;
  address: string;
  languages: string[];
  languagesText: string;
  nationality: string;
  differentlyAbled: string;
}

interface PersonalDetailsCardProps {
  extendedPersonal: ExtendedPersonalInfo;
  isEditingExtendedPersonal: boolean;
  setIsEditingExtendedPersonal: (val: boolean) => void;
  startEditingExtendedPersonal: () => void;
  extendedPersonalForm: PersonalFormType;
  setExtendedPersonalForm: (form: PersonalFormType) => void;
  extendedPersonalErrors: Record<string, string>;
  saveExtendedPersonal: () => void;
}

export const PersonalDetailsCard = ({
  extendedPersonal,
  isEditingExtendedPersonal,
  setIsEditingExtendedPersonal,
  startEditingExtendedPersonal,
  extendedPersonalForm,
  setExtendedPersonalForm,
  extendedPersonalErrors,
  saveExtendedPersonal,
}: PersonalDetailsCardProps) => {
  const idPrefix = useId();
  const fieldId = (name: keyof PersonalFormType) => `${idPrefix}-${name}`;

  return (
    <div
      id="personal-details"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold text-brand-charcoal">Personal Details</h3>
        {!isEditingExtendedPersonal && (
          <button
            type="button"
            onClick={startEditingExtendedPersonal}
            className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Edit personal details"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingExtendedPersonal ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-slate-700 dark:text-slate-300">
          <div>
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Gender
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
              {extendedPersonal.gender}
            </div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Marital Status
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
              {extendedPersonal.maritalStatus}
            </div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Date of Birth
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
              {extendedPersonal.dob}
            </div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Nationality
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
              {extendedPersonal.nationality}
            </div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Differently Abled
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
              {extendedPersonal.differentlyAbled}
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Permanent Address
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
              {extendedPersonal.address}
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider text-sm">
              Languages Known
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {extendedPersonal.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs border border-slate-200 dark:border-slate-700"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor={fieldId('gender')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Gender
              </label>
              <select
                id={fieldId('gender')}
                value={extendedPersonalForm.gender}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, gender: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor={fieldId('maritalStatus')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Marital Status
              </label>
              <select
                id={fieldId('maritalStatus')}
                value={extendedPersonalForm.maritalStatus}
                onChange={(e) =>
                  setExtendedPersonalForm({
                    ...extendedPersonalForm,
                    maritalStatus: e.target.value,
                  })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
              >
                <option>Single / Unmarried</option>
                <option>Married</option>
                <option>Divorced</option>
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor={fieldId('dob')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Date of Birth
              </label>
              <input
                id={fieldId('dob')}
                type="text"
                value={extendedPersonalForm.dob}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, dob: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={fieldId('nationality')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Nationality
              </label>
              <input
                id={fieldId('nationality')}
                type="text"
                value={extendedPersonalForm.nationality}
                onChange={(e) =>
                  setExtendedPersonalForm({
                    ...extendedPersonalForm,
                    nationality: e.target.value,
                  })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={fieldId('differentlyAbled')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Differently Abled
              </label>
              <select
                id={fieldId('differentlyAbled')}
                value={extendedPersonalForm.differentlyAbled}
                onChange={(e) =>
                  setExtendedPersonalForm({
                    ...extendedPersonalForm,
                    differentlyAbled: e.target.value,
                  })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
              >
                <option>No</option>
                <option>Yes</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor={fieldId('languagesText')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Languages (comma separated)
              </label>
              <input
                id={fieldId('languagesText')}
                type="text"
                value={extendedPersonalForm.languagesText}
                onChange={(e) =>
                  setExtendedPersonalForm({
                    ...extendedPersonalForm,
                    languagesText: e.target.value,
                  })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
                aria-invalid={Boolean(extendedPersonalErrors.languagesText)}
              />
              {extendedPersonalErrors.languagesText && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {extendedPersonalErrors.languagesText}
                </p>
              )}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor={fieldId('address')}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
              >
                Permanent Address
              </label>
              <textarea
                id={fieldId('address')}
                value={extendedPersonalForm.address}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, address: e.target.value })
                }
                rows={2}
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100 resize-none"
                aria-invalid={Boolean(extendedPersonalErrors.address)}
              />
              {extendedPersonalErrors.address && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {extendedPersonalErrors.address}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingExtendedPersonal(false)}
              className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveExtendedPersonal}
              className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
            >
              Save Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
