import React from 'react';
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
  setIsEditingPersonal: (val: boolean) => void;
  savePersonalDetails: () => void;
}

export const PersonalDetailsEditForm = ({
  personalForm,
  setPersonalForm,
  setIsEditingPersonal,
  savePersonalDetails,
}: PersonalDetailsEditFormProps) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 text-left">
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-slate-700">Edit Personal Details</h3>
        <button
          type="button"
          onClick={() => setIsEditingPersonal(false)}
          className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close edit form"
        >
          <X size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">First Name</label>
          <input
            type="text"
            value={personalForm.firstName}
            onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Last Name</label>
          <input
            type="text"
            value={personalForm.lastName}
            onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Phone</label>
          <input
            type="text"
            value={personalForm.phone}
            onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Location</label>
          <input
            type="text"
            value={personalForm.location}
            onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Current Company</label>
          <input
            type="text"
            value={personalForm.currentCompany}
            onChange={(e) => setPersonalForm({ ...personalForm, currentCompany: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Current Designation</label>
          <input
            type="text"
            value={personalForm.currentDesignation}
            onChange={(e) =>
              setPersonalForm({ ...personalForm, currentDesignation: e.target.value })
            }
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Total Experience</label>
          <input
            type="text"
            value={personalForm.totalExperience}
            onChange={(e) => setPersonalForm({ ...personalForm, totalExperience: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Current CTC</label>
          <input
            type="text"
            value={personalForm.currentCTC}
            onChange={(e) => setPersonalForm({ ...personalForm, currentCTC: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-bold text-slate-500 uppercase">Notice Period</label>
          <select
            value={personalForm.noticePeriod}
            onChange={(e) => setPersonalForm({ ...personalForm, noticePeriod: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          >
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
          className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold text-slate-700 bg-white"
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
