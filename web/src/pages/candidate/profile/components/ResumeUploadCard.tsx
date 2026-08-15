import { FileText, Upload } from 'lucide-react';
import { ConfirmDialog } from '../../../../components/ui/ConfirmDialog/ConfirmDialog';

interface ResumeUploadCardProps {
  resumeFileName: string | null;
  resumeFileSize: string | null;
  isParsing: boolean;
  isAIParsingConfirmOpen: boolean;
  requestAIParsing: () => void;
  cancelAIParsing: () => void;
  confirmAIParsing: () => void;
}

export const ResumeUploadCard = ({
  resumeFileName,
  resumeFileSize,
  isParsing,
  isAIParsingConfirmOpen,
  requestAIParsing,
  cancelAIParsing,
  confirmAIParsing,
}: ResumeUploadCardProps) => {
  return (
    <div
      id="resume-upload"
      className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 scroll-mt-24 text-left"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Resume</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 dark:bg-brand-card/50 p-4 rounded-lg border border-dashed border-slate-300">
        <div className="flex items-center gap-4 text-left w-full sm:w-auto">
          <div className="p-3 bg-white dark:bg-slate-850 text-brand-primary rounded-lg border shadow-sm">
            <FileText size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 break-all">
              {resumeFileName ?? 'No resume on file'}
            </h4>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {resumeFileName
                ? `${resumeFileSize} \u2022 Uploaded recently`
                : 'Upload a resume or run AI autofill below.'}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={requestAIParsing}
            disabled={isParsing}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 shadow-sm transition-all"
          >
            <Upload size={13} />
            {resumeFileName ? 'Update resume' : 'Run AI autofill'}
          </button>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
            Supported Formats: doc, docx, rtf, pdf, max 2 MB
          </p>
        </div>
      </div>

      {isParsing && (
        <div className="w-full bg-slate-100 dark:bg-brand-card rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-brand-primary h-1.5 rounded-full animate-pulse"
            style={{ width: '75%' }}
          ></div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isAIParsingConfirmOpen}
        title="Replace profile with AI-parsed resume?"
        message="This overwrites your personal details, summary, employment history, education, projects, skills, and certifications with data parsed from the new resume. This cannot be undone."
        confirmLabel="Import Resume Data"
        variant="warning"
        onConfirm={confirmAIParsing}
        onCancel={cancelAIParsing}
      />
    </div>
  );
};
