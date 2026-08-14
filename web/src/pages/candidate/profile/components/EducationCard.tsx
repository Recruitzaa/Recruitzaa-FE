import { Plus, Edit2, GraduationCap } from 'lucide-react';
import { useId } from 'react';
import type { EducationDetails } from '../../../../store/slices/profileSlice';

interface EducationCardProps {
  education: EducationDetails[];
  editingEducationIndex: number | null;
  cancelEducationEditing: () => void;
  startEditingEducationItem: (index: number) => void;
  educationForm: EducationDetails;
  setEducationForm: (form: EducationDetails) => void;
  saveEducationItem: (index: number) => void;
  deleteEducationItem: (index: number) => void;
  addNewEducationItem: () => void;
}

export const EducationCard = ({
  education,
  editingEducationIndex,
  cancelEducationEditing,
  startEditingEducationItem,
  educationForm,
  setEducationForm,
  saveEducationItem,
  deleteEducationItem,
  addNewEducationItem,
}: EducationCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="education"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="text-sm font-bold text-brand-charcoal">Education</h3>
          <p className="text-sm text-slate-400 mt-0.5">
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
        <p className="text-sm text-slate-400 py-2">No education records added yet.</p>
      ) : (
        <div className="space-y-5">
          {education.map((edu, index) => {
            const levelId = `${idPrefix}-edu-level-${index}`;
            const degreeId = `${idPrefix}-edu-degree-${index}`;
            const universityId = `${idPrefix}-edu-university-${index}`;
            const durationId = `${idPrefix}-edu-duration-${index}`;
            const typeId = `${idPrefix}-edu-type-${index}`;
            const percentageId = `${idPrefix}-edu-percentage-${index}`;

            return (
              <div
                key={`${edu.degree}-${index}`}
                className="flex gap-4 items-start text-sm text-slate-700"
              >
                {editingEducationIndex !== index && (
                  <div className="p-3 bg-slate-50 text-brand-primary rounded-lg border shadow-sm shrink-0">
                    <GraduationCap size={24} />
                  </div>
                )}

                {editingEducationIndex !== index ? (
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider text-[9px]">
                          {edu.level}
                        </div>
                        <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                        <p className="font-semibold text-slate-500">{edu.university}</p>
                        <p className="text-slate-400">
                          {edu.duration} &bull;{' '}
                          <span className="font-medium text-slate-500">{edu.type}</span>
                          {edu.percentage && (
                            <>
                              {' '}
                              &bull;{' '}
                              <span className="font-medium text-slate-500">{edu.percentage}</span>
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEditingEducationItem(index)}
                        className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                        aria-label={`Edit ${edu.level || edu.degree}`}
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label
                          htmlFor={levelId}
                          className="text-[9px] font-bold text-slate-500 uppercase block"
                        >
                          Qualification Level
                        </label>
                        <select
                          id={levelId}
                          value={educationForm.level}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, level: e.target.value })
                          }
                          className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white text-slate-800"
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
                          className="text-[9px] font-bold text-slate-500 uppercase block"
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
                          className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor={universityId}
                          className="text-[9px] font-bold text-slate-500 uppercase block"
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
                          className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={durationId}
                          className="text-[9px] font-bold text-slate-500 uppercase block"
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
                          className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={percentageId}
                          className="text-[9px] font-bold text-slate-500 uppercase block"
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
                          className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor={typeId}
                          className="text-[9px] font-bold text-slate-500 uppercase block"
                        >
                          Course Type
                        </label>
                        <select
                          id={typeId}
                          value={educationForm.type}
                          onChange={(e) =>
                            setEducationForm({ ...educationForm, type: e.target.value })
                          }
                          className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white text-slate-800"
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
                        onClick={() => deleteEducationItem(index)}
                        className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-[11px] font-semibold hover:bg-red-100 mr-auto"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={cancelEducationEditing}
                        className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEducationItem(index)}
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
