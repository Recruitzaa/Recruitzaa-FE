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
}

interface CareerProfileEditFormProps {
  careerForm: CareerFormType;
  setCareerForm: (form: CareerFormType) => void;
  setIsEditingCareer: (val: boolean) => void;
  saveCareerProfile: () => void;
}

export const CareerProfileEditForm = ({
  careerForm,
  setCareerForm,
  setIsEditingCareer,
  saveCareerProfile,
}: CareerProfileEditFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Industry</label>
          <input
            type="text"
            value={careerForm.industry}
            onChange={(e) => setCareerForm({ ...careerForm, industry: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Department</label>
          <input
            type="text"
            value={careerForm.department}
            onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Role Category</label>
          <input
            type="text"
            value={careerForm.roleCategory}
            onChange={(e) => setCareerForm({ ...careerForm, roleCategory: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Job Role</label>
          <input
            type="text"
            value={careerForm.jobRole}
            onChange={(e) => setCareerForm({ ...careerForm, jobRole: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Desired Job Type</label>
          <input
            type="text"
            value={careerForm.desiredJobType}
            onChange={(e) => setCareerForm({ ...careerForm, desiredJobType: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">
            Desired Employment Type
          </label>
          <input
            type="text"
            value={careerForm.desiredEmploymentType}
            onChange={(e) =>
              setCareerForm({ ...careerForm, desiredEmploymentType: e.target.value })
            }
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Expected Salary</label>
          <input
            type="text"
            value={careerForm.expectedSalary}
            onChange={(e) => setCareerForm({ ...careerForm, expectedSalary: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-500 uppercase">Preferred Shift</label>
          <input
            type="text"
            value={careerForm.preferredShift}
            onChange={(e) => setCareerForm({ ...careerForm, preferredShift: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-bold text-slate-500 uppercase">
            Desired Locations (comma separated)
          </label>
          <input
            type="text"
            value={careerForm.desiredLocationsText}
            onChange={(e) => setCareerForm({ ...careerForm, desiredLocationsText: e.target.value })}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary bg-white text-slate-800"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => setIsEditingCareer(false)}
          className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold text-slate-700 bg-white"
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
