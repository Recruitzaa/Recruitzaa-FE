import React, { useState } from 'react';
import { FileDropZone } from '../../../../../components/ui/FileDropZone/FileDropZone';

interface ResumeUploadStepProps {
  onResumeUpload: (file: File) => void;
  isLoading: boolean;
}

export const ResumeUploadStep: React.FC<ResumeUploadStepProps> = ({
  onResumeUpload,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      onResumeUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
        Step 6: Resume Upload
      </h3>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-center">
        <p className="text-sm text-slate-500 mb-4">
          Upload your resume (PDF/DOCX) to enable AI job matching and score analysis.
        </p>

        <FileDropZone
          value={selectedFile}
          onChange={handleFileChange}
          label="Select Resume (PDF, DOCX)"
        />

        {selectedFile && (
          <div className="mt-4 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded text-left flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-slate-850 dark:text-slate-150 truncate max-w-[200px]">
                {selectedFile.name}
              </div>
              <div className="text-sm text-slate-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            {isLoading ? (
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
                Parsing...
              </span>
            ) : (
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Uploaded
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded text-xs text-amber-800 dark:text-amber-300 leading-normal">
        <span className="font-bold">💡 Note:</span> Uploading a detailed resume helps our AI match
        algorithms compute highly accurate job suitability scores.
      </div>
    </div>
  );
};
