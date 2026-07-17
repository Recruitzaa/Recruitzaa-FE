import { Edit2, Award, Link as LinkIcon } from 'lucide-react';
import { useId } from 'react';
import type { Accomplishments } from '../../../../store/slices/profileSlice';

interface AccomplishmentsCardProps {
  accomplishments: Accomplishments;
  isEditingAccomplishments: boolean;
  setIsEditingAccomplishments: (val: boolean) => void;
  startEditingAccomplishments: () => void;
  accomplishmentsForm: Accomplishments;
  setAccomplishmentsForm: (form: Accomplishments) => void;
  saveAccomplishments: () => void;
}

export const AccomplishmentsCard = ({
  accomplishments,
  isEditingAccomplishments,
  setIsEditingAccomplishments,
  startEditingAccomplishments,
  accomplishmentsForm,
  setAccomplishmentsForm,
  saveAccomplishments,
}: AccomplishmentsCardProps) => {
  const id = useId();
  const onlineProfileId = `${id}-online-profile`;
  const workSampleId = `${id}-work-sample`;
  const publicationId = `${id}-publication`;
  const presentationId = `${id}-presentation`;
  const patentId = `${id}-patent`;
  const certificationId = `${id}-certification`;

  return (
    <div
      id="accomplishments"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Accomplishments</h3>
        {!isEditingAccomplishments && (
          <button
            type="button"
            onClick={startEditingAccomplishments}
            className="text-slate-400 hover:text-brand-primary"
            aria-label="Edit accomplishments"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {!isEditingAccomplishments ? (
        <div className="space-y-5 text-xs text-slate-700">
          <div className="flex items-start gap-3">
            <LinkIcon size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                Online Profiles
              </div>
              <a
                href={accomplishments.onlineProfile}
                target="_blank"
                rel="noreferrer"
                className="text-brand-primary font-bold hover:underline block mt-0.5"
              >
                {accomplishments.onlineProfile}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LinkIcon size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                Work Samples
              </div>
              <a
                href={accomplishments.workSample}
                target="_blank"
                rel="noreferrer"
                className="text-brand-primary font-bold hover:underline block mt-0.5"
              >
                {accomplishments.workSample}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                Publications
              </div>
              <div className="font-bold text-slate-800 mt-0.5">{accomplishments.publication}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LinkIcon size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                Presentations
              </div>
              <a
                href={accomplishments.presentation}
                target="_blank"
                rel="noreferrer"
                className="text-brand-primary font-bold hover:underline block mt-0.5"
              >
                {accomplishments.presentation}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                Patents
              </div>
              <div className="font-bold text-slate-800 mt-0.5">{accomplishments.patent}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                Certifications
              </div>
              <div className="font-bold text-slate-800 mt-0.5">{accomplishments.certification}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label
                htmlFor={onlineProfileId}
                className="text-[10px] font-bold text-slate-500 uppercase block"
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
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={workSampleId}
                className="text-[10px] font-bold text-slate-500 uppercase block"
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
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={publicationId}
                className="text-[10px] font-bold text-slate-500 uppercase block"
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
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={presentationId}
                className="text-[10px] font-bold text-slate-500 uppercase block"
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
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={patentId}
                className="text-[10px] font-bold text-slate-500 uppercase block"
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
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor={certificationId}
                className="text-[10px] font-bold text-slate-500 uppercase block"
              >
                Certifications
              </label>
              <input
                id={certificationId}
                type="text"
                value={accomplishmentsForm.certification}
                onChange={(e) =>
                  setAccomplishmentsForm({ ...accomplishmentsForm, certification: e.target.value })
                }
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditingAccomplishments(false)}
              className="px-3 py-1.5 border rounded text-xs hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveAccomplishments}
              className="px-3 py-1.5 bg-brand-primary text-white rounded text-xs hover:bg-brand-primary-hover font-semibold"
            >
              Save Accomplishments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
