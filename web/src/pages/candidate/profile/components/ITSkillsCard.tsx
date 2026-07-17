import { Plus, Edit2 } from 'lucide-react';
import { useId } from 'react';
import type { ITSkillItem } from '../../../../store/slices/profileSlice';

interface ITSkillsCardProps {
  itSkills: ITSkillItem[];
  editingITSkillIndex: number | null;
  setEditingITSkillIndex: (index: number | null) => void;
  startEditingITSkill: (index: number) => void;
  itSkillForm: ITSkillItem;
  setITSkillForm: (form: ITSkillItem) => void;
  saveITSkillItem: (index: number) => void;
  deleteITSkillItem: (index: number) => void;
  addNewITSkillItem: () => void;
}

export const ITSkillsCard = ({
  itSkills,
  editingITSkillIndex,
  setEditingITSkillIndex,
  startEditingITSkill,
  itSkillForm,
  setITSkillForm,
  saveITSkillItem,
  deleteITSkillItem,
  addNewITSkillItem,
}: ITSkillsCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="it-skills"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">IT Skills</h3>
        <button
          type="button"
          onClick={addNewITSkillItem}
          className="flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-hover font-bold"
        >
          <Plus size={14} /> Add Skill Detail
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-medium">
              <th className="py-2.5">Skills</th>
              <th className="py-2.5">Version</th>
              <th className="py-2.5">Last Used</th>
              <th className="py-2.5">Experience</th>
              <th className="py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itSkills.map((item, index) => {
              const skillId = `${idPrefix}-skill-${index}`;
              const versionId = `${idPrefix}-version-${index}`;
              const lastUsedId = `${idPrefix}-lastUsed-${index}`;
              const experienceId = `${idPrefix}-experience-${index}`;

              return (
                <tr
                  key={`${item.skill}-${index}`}
                  className="border-b border-slate-100 text-slate-700"
                >
                  {editingITSkillIndex !== index ? (
                    <>
                      <td className="py-3 font-semibold text-slate-800">{item.skill}</td>
                      <td className="py-3">{item.version}</td>
                      <td className="py-3">{item.lastUsed}</td>
                      <td className="py-3">{item.experience}</td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => startEditingITSkill(index)}
                          className="text-slate-450 hover:text-brand-primary"
                          aria-label={`Edit ${item.skill}`}
                        >
                          <Edit2 size={13} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <td colSpan={5} className="py-3">
                      <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label
                              htmlFor={skillId}
                              className="text-[9px] font-bold text-slate-500 uppercase block"
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
                              className="w-full border border-slate-200 rounded px-2.5 py-1 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={versionId}
                              className="text-[9px] font-bold text-slate-500 uppercase block"
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
                              className="w-full border border-slate-200 rounded px-2.5 py-1 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={lastUsedId}
                              className="text-[9px] font-bold text-slate-500 uppercase block"
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
                              className="w-full border border-slate-200 rounded px-2.5 py-1 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor={experienceId}
                              className="text-[9px] font-bold text-slate-500 uppercase block"
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
                              className="w-full border border-slate-200 rounded px-2.5 py-1 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => deleteITSkillItem(index)}
                            className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-[11px] font-semibold hover:bg-red-100 mr-auto"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingITSkillIndex(null)}
                            className="px-3 py-1.5 border rounded text-xs hover:bg-slate-100 font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => saveITSkillItem(index)}
                            className="px-3 py-1.5 bg-brand-primary text-white rounded text-xs hover:bg-brand-primary-hover font-semibold"
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
