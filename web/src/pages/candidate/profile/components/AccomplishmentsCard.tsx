import { Edit2, Award, Link as LinkIcon } from 'lucide-react';
import { useId } from 'react';
import type { Accomplishments } from '../../../../store/slices/profileSlice';
import { toSafeHref } from '../../../../lib/sanitizeUrl';

interface AccomplishmentsCardProps {
  accomplishments: Accomplishments;
  isEditingAccomplishments: boolean;
  setIsEditingAccomplishments: (val: boolean) => void;
  startEditingAccomplishments: () => void;
  accomplishmentsForm: Accomplishments;
  setAccomplishmentsForm: (form: Accomplishments) => void;
  accomplishmentsErrors: Record<string, string>;
  saveAccomplishments: () => void;
}

export const AccomplishmentsCard = ({
  accomplishments,
  isEditingAccomplishments,
  setIsEditingAccomplishments,
  startEditingAccomplishments,
  accomplishmentsForm,
  setAccomplishmentsForm,
  accomplishmentsErrors,
  saveAccomplishments,
}: AccomplishmentsCardProps) => {
  const id = useId();
  const onlineProfileId = `${id}-online-profile`;
  const workSampleId = `${id}-work-sample`;
  const publicationId = `${id}-publication`;
  const presentationId = `${id}-presentation`;
  const patentId = `${id}-patent`;

  return (
    <div
      id="accomplishments"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Accomplishments</h3>
        {!isEditingAccomplishments && (
          <button
            type="button"
            onClick={startEditingAccomplishments}
            className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Edit accomplishments"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingAccomplishments ? (
        <div className="space-y-5 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-3">
            <LinkIcon
              size={16}
              className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                Online Profiles
              </div>
              {toSafeHref(accomplishments.onlineProfile) ? (
                <a
                  href={toSafeHref(accomplishments.onlineProfile)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary font-bold hover:underline block mt-0.5"
                >
                  {accomplishments.onlineProfile}
                </a>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 block mt-0.5">Not added</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LinkIcon
              size={16}
              className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                Work Samples
              </div>
              {toSafeHref(accomplishments.workSample) ? (
                <a
                  href={toSafeHref(accomplishments.workSample)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary font-bold hover:underline block mt-0.5"
                >
                  {accomplishments.workSample}
                </a>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 block mt-0.5">Not added</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award
              size={16}
              className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                Publications
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {accomplishments.publication}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LinkIcon
              size={16}
              className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                Presentations
              </div>
              {toSafeHref(accomplishments.presentation) ? (
                <a
                  href={toSafeHref(accomplishments.presentation)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary font-bold hover:underline block mt-0.5"
                >
                  {accomplishments.presentation}
                </a>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 block mt-0.5">Not added</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award
              size={16}
              className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                Patents
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {accomplishments.patent}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label
                htmlFor={onlineProfileId}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase block"
              >
                Online Profile URL
              </label>
              <input
                id={onlineProfileId}
                type="text"
                value={accomplishmentsForm.onlineProfile}
                onChange={(e) =>
                  setAccomplishmentsForm({ ...accomplishmentsForm, onlineProfile: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                aria-invalid={Boolean(accomplishmentsErrors.onlineProfile)}
              />
              {accomplishmentsErrors.onlineProfile && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {accomplishmentsErrors.onlineProfile}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor={workSampleId}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase block"
              >
                Work Sample URL
              </label>
              <input
                id={workSampleId}
                type="text"
                value={accomplishmentsForm.workSample}
                onChange={(e) =>
                  setAccomplishmentsForm({ ...accomplishmentsForm, workSample: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                aria-invalid={Boolean(accomplishmentsErrors.workSample)}
              />
              {accomplishmentsErrors.workSample && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {accomplishmentsErrors.workSample}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor={publicationId}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase block"
              >
                Publications
              </label>
              <input
                id={publicationId}
                type="text"
                value={accomplishmentsForm.publication}
                onChange={(e) =>
                  setAccomplishmentsForm({ ...accomplishmentsForm, publication: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={presentationId}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase block"
              >
                Presentations URL
              </label>
              <input
                id={presentationId}
                type="text"
                value={accomplishmentsForm.presentation}
                onChange={(e) =>
                  setAccomplishmentsForm({ ...accomplishmentsForm, presentation: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                aria-invalid={Boolean(accomplishmentsErrors.presentation)}
              />
              {accomplishmentsErrors.presentation && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {accomplishmentsErrors.presentation}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor={patentId}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase block"
              >
                Patents
              </label>
              <input
                id={patentId}
                type="text"
                value={accomplishmentsForm.patent}
                onChange={(e) =>
                  setAccomplishmentsForm({ ...accomplishmentsForm, patent: e.target.value })
                }
                className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Manage certifications with credential links and proof documents in the{' '}
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Certifications &amp; Licenses
            </span>{' '}
            section below.
          </p>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingAccomplishments(false)}
              className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveAccomplishments}
              className="px-3 py-1.5 bg-brand-primary text-white rounded text-sm hover:bg-brand-primary-hover font-semibold"
            >
              Save Accomplishments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
