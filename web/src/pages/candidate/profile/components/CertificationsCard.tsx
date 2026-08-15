import { useId, useRef } from 'react';
import { Plus, Edit2, Award, Link as LinkIcon, Paperclip, X, Loader2 } from 'lucide-react';
import type { CertificationItem } from '../../../../store/slices/profileSlice';
import { toSafeHref } from '../../../../lib/sanitizeUrl';

interface CertificationsCardProps {
  certifications: CertificationItem[];
  editingCertificationId: string | null;
  cancelCertificationEditing: () => void;
  startEditingCertification: (id: string) => void;
  certificationForm: CertificationItem;
  setCertificationForm: (form: CertificationItem) => void;
  certificationErrors: Record<string, string>;
  saveCertificationItem: (id: string) => void;
  deleteCertificationItem: (id: string) => void;
  addNewCertificationItem: () => void;
  isUploadingCertificateFile: boolean;
  handleCertificateFileUpload: (file: File) => void;
  removeCertificateFile: () => void;
}

export const CertificationsCard = ({
  certifications,
  editingCertificationId,
  cancelCertificationEditing,
  startEditingCertification,
  certificationForm,
  setCertificationForm,
  certificationErrors,
  saveCertificationItem,
  deleteCertificationItem,
  addNewCertificationItem,
  isUploadingCertificateFile,
  handleCertificateFileUpload,
  removeCertificateFile,
}: CertificationsCardProps) => {
  const idPrefix = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      id="certifications"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <div>
          <h3 className="text-sm font-bold text-brand-charcoal">Certifications &amp; Licenses</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
            Add a verification link and upload the certificate as proof.
          </p>
        </div>
        <button
          type="button"
          onClick={addNewCertificationItem}
          className="flex items-center gap-1 text-sm text-brand-primary hover:text-brand-primary-hover font-bold shrink-0"
        >
          <Plus size={14} /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 py-2">
          No certifications added yet.
        </p>
      ) : (
        <div className="space-y-5">
          {certifications.map((cert) => {
            const nameId = `${idPrefix}-cert-name-${cert.id}`;
            const issuerId = `${idPrefix}-cert-issuer-${cert.id}`;
            const issueDateId = `${idPrefix}-cert-date-${cert.id}`;
            const credentialIdId = `${idPrefix}-cert-credid-${cert.id}`;
            const credentialUrlId = `${idPrefix}-cert-url-${cert.id}`;

            return (
              <div
                key={cert.id}
                className="flex gap-4 items-start text-sm text-slate-700 dark:text-slate-300"
              >
                {editingCertificationId !== cert.id && (
                  <div className="p-3 bg-slate-50 dark:bg-brand-card text-brand-primary rounded-lg border shadow-sm shrink-0">
                    <Award size={24} />
                  </div>
                )}

                {editingCertificationId !== cert.id ? (
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">
                          {cert.name}
                        </h4>
                        <p className="font-semibold text-slate-500 dark:text-slate-400">
                          {cert.issuer}
                        </p>
                        <p className="text-slate-400 dark:text-slate-500">
                          {cert.issueDate}
                          {cert.credentialId && (
                            <>
                              {' '}
                              &bull; Credential ID:{' '}
                              <span className="font-medium text-slate-500 dark:text-slate-400">
                                {cert.credentialId}
                              </span>
                            </>
                          )}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                          {toSafeHref(cert.credentialUrl) && (
                            <a
                              href={toSafeHref(cert.credentialUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-brand-primary font-bold hover:underline text-sm"
                            >
                              <LinkIcon size={12} /> View credential
                            </a>
                          )}
                          {cert.fileDataUrl && (
                            <a
                              href={cert.fileDataUrl}
                              download={cert.fileName || 'certificate'}
                              className="inline-flex items-center gap-1 text-brand-primary font-bold hover:underline text-sm"
                            >
                              <Paperclip size={12} /> {cert.fileName || 'Certificate file'}
                            </a>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => startEditingCertification(cert.id)}
                        className="inline-flex min-w-11 min-h-11 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        aria-label={`Edit ${cert.name}`}
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-brand-card p-4 rounded border border-slate-200 dark:border-slate-700 space-y-3 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor={nameId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Certification Name
                        </label>
                        <input
                          id={nameId}
                          type="text"
                          value={certificationForm.name}
                          onChange={(e) =>
                            setCertificationForm({ ...certificationForm, name: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(certificationErrors.name)}
                        />
                        {certificationErrors.name && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {certificationErrors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={issuerId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Issuing Organization
                        </label>
                        <input
                          id={issuerId}
                          type="text"
                          value={certificationForm.issuer}
                          onChange={(e) =>
                            setCertificationForm({ ...certificationForm, issuer: e.target.value })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(certificationErrors.issuer)}
                        />
                        {certificationErrors.issuer && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {certificationErrors.issuer}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={issueDateId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Issue Date / Year
                        </label>
                        <input
                          id={issueDateId}
                          type="text"
                          placeholder="e.g. Jun 2025"
                          value={certificationForm.issueDate}
                          onChange={(e) =>
                            setCertificationForm({
                              ...certificationForm,
                              issueDate: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={credentialIdId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Credential ID (optional)
                        </label>
                        <input
                          id={credentialIdId}
                          type="text"
                          value={certificationForm.credentialId}
                          onChange={(e) =>
                            setCertificationForm({
                              ...certificationForm,
                              credentialId: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor={credentialUrlId}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block"
                        >
                          Credential / Verification Link
                        </label>
                        <input
                          id={credentialUrlId}
                          type="url"
                          placeholder="https://..."
                          value={certificationForm.credentialUrl}
                          onChange={(e) =>
                            setCertificationForm({
                              ...certificationForm,
                              credentialUrl: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          aria-invalid={Boolean(certificationErrors.credentialUrl)}
                        />
                        {certificationErrors.credentialUrl && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {certificationErrors.credentialUrl}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block">
                          Certificate File (PDF, JPG, PNG, or WEBP — max 10 MB)
                        </span>
                        {certificationForm.fileName ? (
                          <div className="flex items-center gap-2 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5">
                            <Paperclip size={14} className="text-brand-primary shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 truncate flex-1">
                              {certificationForm.fileName}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                              {certificationForm.fileSizeLabel}
                            </span>
                            <button
                              type="button"
                              onClick={removeCertificateFile}
                              className="text-slate-400 dark:text-slate-500 hover:text-red-500 shrink-0"
                              aria-label="Remove attached file"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploadingCertificateFile}
                            className="w-full flex items-center justify-center gap-1.5 border border-dashed border-slate-300 rounded px-2.5 py-2 text-sm text-slate-500 dark:text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors bg-white dark:bg-slate-850"
                          >
                            {isUploadingCertificateFile ? (
                              <>
                                <Loader2 size={14} className="animate-spin" /> Processing file...
                              </>
                            ) : (
                              <>
                                <Paperclip size={14} /> Upload certificate file
                              </>
                            )}
                          </button>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCertificateFileUpload(file);
                            e.target.value = '';
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => deleteCertificationItem(cert.id)}
                        className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 mr-auto"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={cancelCertificationEditing}
                        className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveCertificationItem(cert.id)}
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
