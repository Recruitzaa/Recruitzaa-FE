import { useId } from 'react';

interface CareerFormType {
  industry: string;
  department: string;
  roleCategory: string;
  jobRole: string;
  desiredJobType: string;
  desiredEmploymentType: string;
  desiredLocations: string[];
  desiredLocationsText: string;
  expectedSalary: string;
  preferredShift: string;
  workAuthorization: string;
  willingToRelocate: string;
  preferredWorkMode: string;
}

interface CareerProfileEditFormProps {
  careerForm: CareerFormType;
  setCareerForm: (form: CareerFormType) => void;
  careerErrors: Record<string, string>;
  setIsEditingCareer: (val: boolean) => void;
  saveCareerProfile: () => void;
}

export const CareerProfileEditForm = ({
  careerForm,
  setCareerForm,
  careerErrors,
  setIsEditingCareer,
  saveCareerProfile,
}: CareerProfileEditFormProps) => {
  const idPrefix = useId();
  const fieldId = (name: keyof CareerFormType) => `${idPrefix}-${name}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor={fieldId('industry')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Industry
          </label>
          <input
            id={fieldId('industry')}
            type="text"
            value={careerForm.industry}
            onChange={(e) => setCareerForm({ ...careerForm, industry: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('department')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Department
          </label>
          <input
            id={fieldId('department')}
            type="text"
            value={careerForm.department}
            onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('roleCategory')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Role Category
          </label>
          <input
            id={fieldId('roleCategory')}
            type="text"
            value={careerForm.roleCategory}
            onChange={(e) => setCareerForm({ ...careerForm, roleCategory: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('jobRole')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Job Role
          </label>
          <input
            id={fieldId('jobRole')}
            type="text"
            value={careerForm.jobRole}
            onChange={(e) => setCareerForm({ ...careerForm, jobRole: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('desiredJobType')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Desired Job Type
          </label>
          <input
            id={fieldId('desiredJobType')}
            type="text"
            value={careerForm.desiredJobType}
            onChange={(e) => setCareerForm({ ...careerForm, desiredJobType: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('desiredEmploymentType')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Desired Employment Type
          </label>
          <input
            id={fieldId('desiredEmploymentType')}
            type="text"
            value={careerForm.desiredEmploymentType}
            onChange={(e) =>
              setCareerForm({ ...careerForm, desiredEmploymentType: e.target.value })
            }
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('expectedSalary')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Expected Salary
          </label>
          <input
            id={fieldId('expectedSalary')}
            type="text"
            value={careerForm.expectedSalary}
            onChange={(e) => setCareerForm({ ...careerForm, expectedSalary: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('preferredShift')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Preferred Shift
          </label>
          <input
            id={fieldId('preferredShift')}
            type="text"
            value={careerForm.preferredShift}
            onChange={(e) => setCareerForm({ ...careerForm, preferredShift: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('preferredWorkMode')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Preferred Work Mode
          </label>
          <select
            id={fieldId('preferredWorkMode')}
            value={careerForm.preferredWorkMode}
            onChange={(e) => setCareerForm({ ...careerForm, preferredWorkMode: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          >
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Flexible</option>
          </select>
        </div>
        <div className="space-y-1">
          <label
            htmlFor={fieldId('willingToRelocate')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Willing to Relocate
          </label>
          <select
            id={fieldId('willingToRelocate')}
            value={careerForm.willingToRelocate}
            onChange={(e) => setCareerForm({ ...careerForm, willingToRelocate: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          >
            <option>Yes</option>
            <option>No</option>
            <option>Open to select locations only</option>
          </select>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label
            htmlFor={fieldId('workAuthorization')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Work Authorization
          </label>
          <select
            id={fieldId('workAuthorization')}
            value={careerForm.workAuthorization}
            onChange={(e) => setCareerForm({ ...careerForm, workAuthorization: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
          >
            <option>Indian Citizen – no visa/sponsorship required</option>
            <option>Require employment visa/work permit sponsorship</option>
            <option>Hold a valid work permit</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label
            htmlFor={fieldId('desiredLocationsText')}
            className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase"
          >
            Desired Locations (comma separated)
          </label>
          <input
            id={fieldId('desiredLocationsText')}
            type="text"
            value={careerForm.desiredLocationsText}
            onChange={(e) => setCareerForm({ ...careerForm, desiredLocationsText: e.target.value })}
            className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
            aria-invalid={Boolean(careerErrors.desiredLocationsText)}
          />
          {careerErrors.desiredLocationsText && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {careerErrors.desiredLocationsText}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => setIsEditingCareer(false)}
          className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={saveCareerProfile}
          className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
        >
          Save Career Profile
        </button>
      </div>
    </div>
  );
};
