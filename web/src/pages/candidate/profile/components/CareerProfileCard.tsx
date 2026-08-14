import { Edit2 } from 'lucide-react';
import type { CareerProfile } from '../../../../store/slices/profileSlice';
import { CareerProfileEditForm } from './CareerProfileEditForm';

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

interface CareerProfileCardProps {
  careerProfile: CareerProfile;
  isEditingCareer: boolean;
  setIsEditingCareer: (val: boolean) => void;
  startEditingCareer: () => void;
  careerForm: CareerFormType;
  setCareerForm: (form: CareerFormType) => void;
  saveCareerProfile: () => void;
}

export const CareerProfileCard = ({
  careerProfile,
  isEditingCareer,
  setIsEditingCareer,
  startEditingCareer,
  careerForm,
  setCareerForm,
  saveCareerProfile,
}: CareerProfileCardProps) => {
  return (
    <div
      id="career-profile"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Career Profile</h3>
        {!isEditingCareer && (
          <button
            type="button"
            onClick={startEditingCareer}
            className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
            aria-label="Edit career profile"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingCareer ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-slate-700">
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Current Industry
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.industry}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Functional Department
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.department}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Role Category
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.roleCategory}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Desired Job Role
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.jobRole}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Desired Job Type
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.desiredJobType}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Employment Type
            </div>
            <div className="font-semibold text-slate-800 mt-1">
              {careerProfile.desiredEmploymentType}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Expected Annual Salary
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.expectedSalary}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Preferred Shift
            </div>
            <div className="font-semibold text-slate-800 mt-1">{careerProfile.preferredShift}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Preferred Work Mode
            </div>
            <div className="font-semibold text-slate-800 mt-1">
              {careerProfile.preferredWorkMode}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Willing to Relocate
            </div>
            <div className="font-semibold text-slate-800 mt-1">
              {careerProfile.willingToRelocate}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Work Authorization
            </div>
            <div className="font-semibold text-slate-800 mt-1">
              {careerProfile.workAuthorization}
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
              Preferred Work Locations
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {careerProfile.desiredLocations.map((loc) => (
                <span
                  key={loc}
                  className="px-2.5 py-0.5 bg-slate-50 text-slate-700 rounded text-[11px] border"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CareerProfileEditForm
          careerForm={careerForm}
          setCareerForm={setCareerForm}
          setIsEditingCareer={setIsEditingCareer}
          saveCareerProfile={saveCareerProfile}
        />
      )}
    </div>
  );
};
