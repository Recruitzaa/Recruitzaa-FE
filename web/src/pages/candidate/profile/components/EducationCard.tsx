import { Plus, Edit2, GraduationCap } from 'lucide-react';
import { useId } from 'react';
import type { EducationDetails } from '../../../../store/slices/profileSlice';

interface EducationCardProps {
  education: EducationDetails[];
  editingEducationId: string | null;
  cancelEducationEditing: () => void;
  startEditingEducationItem: (id: string) => void;
  educationForm: EducationDetails;
  setEducationForm: (form: EducationDetails) => void;
  educationErrors: Record<string, string>;
  saveEducationItem: (id: string) => void;
  deleteEducationItem: (id: string) => void;
  addNewEducationItem: () => void;
}

export const EducationCard = ({
  education,
  editingEducationId,
  cancelEducationEditing,
  startEditingEducationItem,
  educationForm,
  setEducationForm,
  educationErrors,
  saveEducationItem,
  deleteEducationItem,
  addNewEducationItem,
}: EducationCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="education"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="text-sm font-bold text-brand-charcoal">Education</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
            Most employers require 10th, 12th/Diploma and Graduation details with marks.
          </p>
        </div>
        <button
          type="button"
          onClick={addNewEducationItem}
          className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary-hover font-bold shrink-0"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 py-2">
          No education records added yet.
        </p>
      ) : (
        <div className="space-y-5">
          {education.map((edu) => {
            const levelId = `${idPrefix}-edu-level-${edu.id}`;
            const degreeId = `${idPrefix}-edu-degree-${edu.id}`;
            const universityId = `${idPrefix}-edu-university-${edu.id}`;
            const durationId = `${idPrefix}-edu-duration-${edu.id}`;
            const typeId = `${idPrefix}-edu-type-${edu.id}`;
            const percentageId = `${idPrefix}-edu-percentage-${edu.id}`;

            return (
              <div
                key={edu.id}
                className="flex gap-4 items-start text-sm text-slate-700 dark:text-slate-300"
              >
                {editingEducationId !== edu.id && (
                  <div className="p-3 bg-slate-50 dark:bg-brand-card text-brand-primary rounded-lg border shadow-sm shrink-0">
                    <GraduationCap size={24} />
                  </div>
                )}

                {editingEducationId !== edu.id ? (
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                          {edu.level}
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">
                          {edu.degree}
                        </h4>
                        <p className="font-semibold text-slate-500 dark:text-slate-400">
                          {edu.university}
                        </p>
                        <p className="text-slate-400 dark:text-slate-500">
                          {edu.duration} &bull;{' '}
                          <span className="font-medium text-slate-500 dark:text-slate-400">
                            {edu.type}
                          </span>
                          {edu.percentage && (
                            <>
                              {' '}
                              &bull;{' '}
                              <span className="font-medium text-slate-500 dark:text-slate-400">
                                {edu.percentage}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEditingEducationItem(edu.id)}
                        className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        aria-label={`Edit ${edu.level || edu.degree}`}
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-brand-card p-4 rounded border border-slate-200 dark:border-slate-700 space-y-3 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label
                          htmlFor={levelId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Qualification Level
                        </label>
                        <select
                          id={levelId}
                          value={educationForm.level}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, level: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
                        >
                          <option>10th</option>
                          <option>12th / Diploma</option>
                          <option>Graduation</option>
                          <option>Post Graduation</option>
                          <option>Doctorate</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={degreeId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Degree / Course
                        </label>
                        <input
                          id={degreeId}
                          type="text"
                          value={educationForm.degree}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, degree: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(educationErrors.degree)}
                        />
                        {educationErrors.degree && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {educationErrors.degree}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor={universityId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          University / Board / School
                        </label>
                        <input
                          id={universityId}
                          type="text"
                          value={educationForm.university}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, university: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(educationErrors.university)}
                        />
                        {educationErrors.university && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {educationErrors.university}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={durationId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Duration (Years)
                        </label>
                        <input
                          id={durationId}
                          type="text"
                          value={educationForm.duration}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, duration: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={percentageId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Percentage / CGPA
                        </label>
                        <input
                          id={percentageId}
                          type="text"
                          placeholder="e.g. 82% or 8.2 CGPA"
                          value={educationForm.percentage}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, percentage: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor={typeId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Course Type
                        </label>
                        <select
                          id={typeId}
                          value={educationForm.type}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, type: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100"
                        >
                          <option>Full Time</option>
                          <option>Part Time</option>
                          <option>Correspondence / Distance</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => deleteEducationItem(edu.id)}
                        className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 mr-auto"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={cancelEducationEditing}
                        className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEducationItem(edu.id)}
                        className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
