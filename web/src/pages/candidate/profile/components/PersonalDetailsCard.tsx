import { Edit2 } from 'lucide-react';
import type { ExtendedPersonalInfo } from '../../../../store/slices/profileSlice';

interface PersonalFormType {
  gender: string;
  maritalStatus: string;
  dob: string;
  category: string;
  address: string;
  languages: string[];
  languagesText: string;
}

interface PersonalDetailsCardProps {
  extendedPersonal: ExtendedPersonalInfo;
  isEditingExtendedPersonal: boolean;
  setIsEditingExtendedPersonal: (val: boolean) => void;
  startEditingExtendedPersonal: () => void;
  extendedPersonalForm: PersonalFormType;
  setExtendedPersonalForm: (form: PersonalFormType) => void;
  saveExtendedPersonal: () => void;
}

export const PersonalDetailsCard = ({
  extendedPersonal,
  isEditingExtendedPersonal,
  setIsEditingExtendedPersonal,
  startEditingExtendedPersonal,
  extendedPersonalForm,
  setExtendedPersonalForm,
  saveExtendedPersonal,
}: PersonalDetailsCardProps) => {
  return (
    <div
      id="personal-details"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Personal Details</h3>
        {!isEditingExtendedPersonal && (
          <button
            type="button"
            onClick={startEditingExtendedPersonal}
            className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
            aria-label="Edit personal details"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingExtendedPersonal ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-slate-700">
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Gender
            </div>
            <div className="font-semibold text-slate-800 mt-1">{extendedPersonal.gender}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Marital Status
            </div>
            <div className="font-semibold text-slate-800 mt-1">
              {extendedPersonal.maritalStatus}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Date of Birth
            </div>
            <div className="font-semibold text-slate-800 mt-1">{extendedPersonal.dob}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Category
            </div>
            <div className="font-semibold text-slate-800 mt-1">{extendedPersonal.category}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Permanent Address
            </div>
            <div className="font-semibold text-slate-800 mt-1">{extendedPersonal.address}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Languages Known
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {extendedPersonal.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] border"
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
              <label className="text-sm font-bold text-slate-500 uppercase">Gender</label>
              <select
                value={extendedPersonalForm.gender}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, gender: e.target.value })
                }
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase">Marital Status</label>
              <select
                value={extendedPersonalForm.maritalStatus}
                onChange={(e) =>
                  setExtendedPersonalForm({
                    ...extendedPersonalForm,
                    maritalStatus: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
              >
                <option>Single / Unmarried</option>
                <option>Married</option>
                <option>Divorced</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase">Date of Birth</label>
              <input
                type="text"
                value={extendedPersonalForm.dob}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, dob: e.target.value })
                }
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-500 uppercase">Category</label>
              <input
                type="text"
                value={extendedPersonalForm.category}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, category: e.target.value })
                }
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-bold text-slate-500 uppercase">
                Languages (comma separated)
              </label>
              <input
                type="text"
                value={extendedPersonalForm.languagesText}
                onChange={(e) =>
                  setExtendedPersonalForm({
                    ...extendedPersonalForm,
                    languagesText: e.target.value,
                  })
                }
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-bold text-slate-500 uppercase">
                Permanent Address
              </label>
              <textarea
                value={extendedPersonalForm.address}
                onChange={(e) =>
                  setExtendedPersonalForm({ ...extendedPersonalForm, address: e.target.value })
                }
                rows={2}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary resize-none"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingExtendedPersonal(false)}
              className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold"
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
