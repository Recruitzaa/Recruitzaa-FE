import { Plus, Edit2 } from 'lucide-react';
import { useId } from 'react';
import type { ITSkillItem } from '../../../../store/slices/profileSlice';

interface ITSkillsCardProps {
  itSkills: ITSkillItem[];
  editingITSkillId: string | null;
  cancelITSkillEditing: () => void;
  startEditingITSkill: (id: string) => void;
  itSkillForm: ITSkillItem;
  setITSkillForm: (form: ITSkillItem) => void;
  itSkillErrors: Record<string, string>;
  saveITSkillItem: (id: string) => void;
  deleteITSkillItem: (id: string) => void;
  addNewITSkillItem: () => void;
}

export const ITSkillsCard = ({
  itSkills,
  editingITSkillId,
  cancelITSkillEditing,
  startEditingITSkill,
  itSkillForm,
  setITSkillForm,
  itSkillErrors,
  saveITSkillItem,
  deleteITSkillItem,
  addNewITSkillItem,
}: ITSkillsCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="it-skills"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">IT Skills</h3>
        <button
          type="button"
          onClick={addNewITSkillItem}
          className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary-hover font-bold"
        >
          <Plus size={14} /> Add Skill Detail
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-medium">
              <th className="py-2.5">Skills</th>
              <th className="py-2.5">Version</th>
              <th className="py-2.5">Last Used</th>
              <th className="py-2.5">Experience</th>
              <th className="py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itSkills.map((item) => {
              const skillId = `${idPrefix}-skill-${item.id}`;
              const versionId = `${idPrefix}-version-${item.id}`;
              const lastUsedId = `${idPrefix}-lastUsed-${item.id}`;
              const experienceId = `${idPrefix}-experience-${item.id}`;

              return (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {editingITSkillId !== item.id ? (
                    <>
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-100">
                        {item.skill}
                      </td>
                      <td className="py-3">{item.version}</td>
                      <td className="py-3">{item.lastUsed}</td>
                      <td className="py-3">{item.experience}</td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => startEditingITSkill(item.id)}
                          className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-450 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          aria-label={`Edit ${item.skill}`}
                        >
                          <Edit2 size={13} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <td colSpan={5} className="py-3">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label
                              htmlFor={skillId}
                              className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                            >
                              Skill
                            </label>
                            <input
                              id={skillId}
                              type="text"
                              value={itSkillForm.skill}
                              onChange={(e) =>
                                setITSkillForm({ ...itSkillForm, skill: e.target.value })
                              }
                              className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                              aria-invalid={Boolean(itSkillErrors.skill)}
                            />
                            {itSkillErrors.skill && (
                              <p className="text-xs text-red-600 dark:text-red-400">
                                {itSkillErrors.skill}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={versionId}
                              className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                            >
                              Version
                            </label>
                            <input
                              id={versionId}
                              type="text"
                              value={itSkillForm.version}
                              onChange={(e) =>
                                setITSkillForm({ ...itSkillForm, version: e.target.value })
                              }
                              className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={lastUsedId}
                              className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                            >
                              Last Used
                            </label>
                            <input
                              id={lastUsedId}
                              type="text"
                              value={itSkillForm.lastUsed}
                              onChange={(e) =>
                                setITSkillForm({ ...itSkillForm, lastUsed: e.target.value })
                              }
                              className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={experienceId}
                              className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                            >
                              Experience
                            </label>
                            <input
                              id={experienceId}
                              type="text"
                              value={itSkillForm.experience}
                              onChange={(e) =>
                                setITSkillForm({ ...itSkillForm, experience: e.target.value })
                              }
                              className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => deleteITSkillItem(item.id)}
                            className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 mr-auto"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={cancelITSkillEditing}
                            className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => saveITSkillItem(item.id)}
                            className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
