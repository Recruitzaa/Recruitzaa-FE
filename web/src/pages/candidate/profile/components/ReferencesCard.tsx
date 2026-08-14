import { Plus, Edit2, User } from 'lucide-react';
import { useId } from 'react';
import type { ReferenceItem } from '../../../../store/slices/profileSlice';

interface ReferencesCardProps {
  references: ReferenceItem[];
  editingReferenceId: string | null;
  cancelReferenceEditing: () => void;
  startEditingReference: (id: string) => void;
  referenceForm: ReferenceItem;
  setReferenceForm: (form: ReferenceItem) => void;
  referenceErrors: Record<string, string>;
  saveReferenceItem: (id: string) => void;
  deleteReferenceItem: (id: string) => void;
  addNewReferenceItem: () => void;
}

export const ReferencesCard = ({
  references,
  editingReferenceId,
  cancelReferenceEditing,
  startEditingReference,
  referenceForm,
  setReferenceForm,
  referenceErrors,
  saveReferenceItem,
  deleteReferenceItem,
  addNewReferenceItem,
}: ReferencesCardProps) => {
  const idPrefix = useId();

  return (
    <div
      id="references"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="text-sm font-bold text-brand-charcoal">Professional References</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
            Many employers ask for 1-2 references during the application process.
          </p>
        </div>
        <button
          type="button"
          onClick={addNewReferenceItem}
          className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary-hover font-bold shrink-0"
        >
          <Plus size={14} /> Add Reference
        </button>
      </div>

      {references.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 py-2">No references added yet.</p>
      ) : (
        <div className="space-y-4">
          {references.map((ref) => {
            const nameId = `${idPrefix}-ref-name-${ref.id}`;
            const relationshipId = `${idPrefix}-ref-relationship-${ref.id}`;
            const companyId = `${idPrefix}-ref-company-${ref.id}`;
            const emailId = `${idPrefix}-ref-email-${ref.id}`;
            const phoneId = `${idPrefix}-ref-phone-${ref.id}`;

            return (
              <div key={ref.id} className="relative border-l-2 border-orange-200 pl-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2.5">
                    <User
                      size={16}
                      className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {ref.name}
                      </h4>
                      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        {ref.relationship} <span aria-hidden="true">&bull;</span>{' '}
                        <span className="font-normal text-slate-400 dark:text-slate-500">
                          {ref.company}
                        </span>
                      </div>
                    </div>
                  </div>
                  {editingReferenceId !== ref.id && (
                    <button
                      type="button"
                      onClick={() => startEditingReference(ref.id)}
                      className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      aria-label={`Edit reference ${ref.name}`}
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                </div>

                {editingReferenceId !== ref.id ? (
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ref.email} <span aria-hidden="true">&bull;</span> {ref.phone}
                  </p>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 space-y-3 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label
                          htmlFor={nameId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Full Name
                        </label>
                        <input
                          id={nameId}
                          type="text"
                          value={referenceForm.name}
                          onChange={(e) =>
                            setReferenceForm({ ...referenceForm, name: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(referenceErrors.name)}
                        />
                        {referenceErrors.name && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {referenceErrors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={relationshipId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Relationship / Designation
                        </label>
                        <input
                          id={relationshipId}
                          type="text"
                          value={referenceForm.relationship}
                          onChange={(e) =>
                            setReferenceForm({ ...referenceForm, relationship: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(referenceErrors.relationship)}
                        />
                        {referenceErrors.relationship && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {referenceErrors.relationship}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor={companyId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Company
                        </label>
                        <input
                          id={companyId}
                          type="text"
                          value={referenceForm.company}
                          onChange={(e) =>
                            setReferenceForm({ ...referenceForm, company: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={emailId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Email
                        </label>
                        <input
                          id={emailId}
                          type="email"
                          value={referenceForm.email}
                          onChange={(e) =>
                            setReferenceForm({ ...referenceForm, email: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(referenceErrors.email)}
                        />
                        {referenceErrors.email && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {referenceErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={phoneId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Phone
                        </label>
                        <input
                          id={phoneId}
                          type="text"
                          value={referenceForm.phone}
                          onChange={(e) =>
                            setReferenceForm({ ...referenceForm, phone: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(referenceErrors.phone)}
                        />
                        {referenceErrors.phone && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {referenceErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => deleteReferenceItem(ref.id)}
                        className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 mr-auto"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={cancelReferenceEditing}
                        className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveReferenceItem(ref.id)}
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
