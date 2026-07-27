import { FileText, Upload } from 'lucide-react';

interface ResumeUploadCardProps {
  resumeFileName: string;
  resumeFileSize: string;
  isParsing: boolean;
  handleTriggerAIParsing: () => void;
}

export const ResumeUploadCard = ({
  resumeFileName,
  resumeFileSize,
  isParsing,
  handleTriggerAIParsing,
}: ResumeUploadCardProps) => {
  return (
    <div
      id="resume-upload"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24 text-left"
    >
      <div className="flex justify-between items-center pb-2 border-b">
        <h3 className="text-sm font-bold text-brand-charcoal">Resume</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/50 p-4 rounded-lg border border-dashed border-slate-300">
        <div className="flex items-center gap-4 text-left w-full sm:w-auto">
          <div className="p-3 bg-white text-brand-primary rounded-lg border shadow-sm">
            <FileText size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 break-all">{resumeFileName}</h4>
            <p className="text-sm text-slate-400 mt-0.5">
              {resumeFileSize} &bull; Uploaded recently
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={handleTriggerAIParsing}
            disabled={isParsing}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2 px-4 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 bg-white shadow-sm transition-all"
          >
            <Upload size={13} />
            Update resume
          </button>
          <p className="text-[9px] text-slate-400 text-center sm:text-left">
            Supported Formats: doc, docx, rtf, pdf, max 2 MB
          </p>
        </div>
      </div>

      {isParsing && (
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-brand-primary h-1.5 rounded-full animate-pulse"
            style={{ width: '75%' }}
          ></div>
        </div>
      )}
    </div>
  );
};
