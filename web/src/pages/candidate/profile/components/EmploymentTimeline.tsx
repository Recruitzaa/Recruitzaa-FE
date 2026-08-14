import React from 'react';
import { Plus, Edit2 } from 'lucide-react';
import type { JobHistoryItem } from '../../../../store/slices/profileSlice';

export type { JobHistoryItem };

interface EmploymentTimelineProps {
  employmentHistory: JobHistoryItem[];
  editingHistoryId: string | null;
  cancelHistoryEditing: () => void;
  startEditingHistory: (id: string) => void;
  historyForm: JobHistoryItem;
  setHistoryForm: React.Dispatch<React.SetStateAction<JobHistoryItem>>;
  historyResponsibilitiesText: string;
  setHistoryResponsibilitiesText: (val: string) => void;
  historyErrors: Record<string, string>;
  saveHistoryItem: (id: string) => void;
  deleteHistoryItem: (id: string) => void;
  addNewHistoryItem: () => void;
}

export const EmploymentTimeline = ({
  employmentHistory,
  editingHistoryId,
  cancelHistoryEditing,
  startEditingHistory,
  historyForm,
  setHistoryForm,
  historyResponsibilitiesText,
  setHistoryResponsibilitiesText,
  historyErrors,
  saveHistoryItem,
  deleteHistoryItem,
  addNewHistoryItem,
}: EmploymentTimelineProps) => {
  return (
    <div
      id="employment"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Employment History</h3>
        <button
          type="button"
          onClick={addNewHistoryItem}
          className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary-hover font-bold"
        >
          <Plus size={14} /> Add Role
        </button>
      </div>

      <div className="relative border-l-2 border-slate-150 ml-4 pl-6 space-y-8">
        {employmentHistory.map((item) => (
          <div key={item.id} className="relative">
            {/* Timeline bullet dot */}
            <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-white border-4 border-brand-primary rounded-full shadow-sm"></div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{item.designation}</h4>
                  <div className="text-sm font-semibold text-slate-500 mt-0.5">
                    {item.company} &bull;{' '}
                    <span className="font-normal text-slate-400">{item.duration}</span>
                  </div>
                </div>
                {editingHistoryId !== item.id && (
                  <button
                    type="button"
                    onClick={() => startEditingHistory(item.id)}
                    className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                    aria-label={`Edit ${item.designation}`}
                  >
                    <Edit2 size={14} />
                  </button>
                )}
              </div>

              {editingHistoryId !== item.id ? (
                <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                  {item.keyResponsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              ) : (
                <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label
                        htmlFor={`${item.id}-designation`}
                        className="text-xs font-bold text-slate-500 uppercase text-left w-full block"
                      >
                        Designation
                      </label>
                      <input
                        id={`${item.id}-designation`}
                        type="text"
                        value={historyForm.designation}
                        onChange={(e) =>
                          setHistoryForm({ ...historyForm, designation: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:border-brand-primary"
                        aria-invalid={Boolean(historyErrors.designation)}
                      />
                      {historyErrors.designation && (
                        <p className="text-xs text-red-600">{historyErrors.designation}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor={`${item.id}-company`}
                        className="text-xs font-bold text-slate-500 uppercase text-left w-full block"
                      >
                        Company
                      </label>
                      <input
                        id={`${item.id}-company`}
                        type="text"
                        value={historyForm.company}
                        onChange={(e) =>
                          setHistoryForm({ ...historyForm, company: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:border-brand-primary"
                        aria-invalid={Boolean(historyErrors.company)}
                      />
                      {historyErrors.company && (
                        <p className="text-xs text-red-600">{historyErrors.company}</p>
                      )}
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor={`${item.id}-duration`}
                        className="text-xs font-bold text-slate-500 uppercase text-left w-full block"
                      >
                        Duration
                      </label>
                      <input
                        id={`${item.id}-duration`}
                        type="text"
                        value={historyForm.duration}
                        onChange={(e) =>
                          setHistoryForm({ ...historyForm, duration: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:border-brand-primary"
                        aria-invalid={Boolean(historyErrors.duration)}
                      />
                      {historyErrors.duration && (
                        <p className="text-xs text-red-600">{historyErrors.duration}</p>
                      )}
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label
                        htmlFor={`${item.id}-responsibilities`}
                        className="text-xs font-bold text-slate-500 uppercase text-left w-full block"
                      >
                        Responsibilities (one per line)
                      </label>
                      <textarea
                        id={`${item.id}-responsibilities`}
                        value={historyResponsibilitiesText}
                        onChange={(e) => setHistoryResponsibilitiesText(e.target.value)}
                        rows={4}
                        className="w-full border border-slate-200 rounded px-2.5 py-1 text-sm outline-none focus:border-brand-primary resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => deleteHistoryItem(item.id)}
                      className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-xs font-semibold hover:bg-red-100 mr-auto"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={cancelHistoryEditing}
                      className="px-3 py-1.5 border rounded text-sm hover:bg-slate-100 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveHistoryItem(item.id)}
                      className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
