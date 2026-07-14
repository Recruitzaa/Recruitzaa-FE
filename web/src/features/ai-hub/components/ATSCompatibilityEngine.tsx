import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { FileDropZone } from '../../../components/ui/FileDropZone/FileDropZone';
import { ProgressBar } from '../../../components/ui/ProgressBar/ProgressBar';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import type { ATSScore } from '../../../types/ai.types';

interface ATSCompatibilityEngineProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  jdText: string;
  setJdText: (text: string) => void;
  isAnalyzing: boolean;
  scoreData: ATSScore | null;
  onRunAnalysis: () => void;
}

export const ATSCompatibilityEngine: React.FC<ATSCompatibilityEngineProps> = ({
  resumeFile,
  setResumeFile,
  jdText,
  setJdText,
  isAnalyzing,
  scoreData,
  onRunAnalysis,
}) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          ATS Compatibility Engine
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Compare your current resume against target Job Descriptions to identify keyword gaps and
          formatting parseability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-center">
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
              Uploaded Resume
            </div>
            <FileDropZone
              value={resumeFile}
              onChange={setResumeFile}
              label="Choose PDF or Word Resume"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col">
            <div className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
              Target Job Description
            </div>
            <textarea
              className="flex-1 w-full border-0 bg-transparent outline-none text-xs text-slate-900 dark:text-slate-100 resize-none min-h-[80px]"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
        </div>

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          onClick={onRunAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" /> Analyzing...
            </span>
          ) : (
            'Run Deep ATS Analysis'
          )}
        </Button>
      </Card>

      {scoreData && (
        <Card className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            ATS Analysis Summary
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Real-time analysis compared against targets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6 items-center p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <div className="text-center flex justify-center">
              <div
                className="w-[120px] h-[120px] rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(var(--color-primary, #4f46e5) 0% ${scoreData.overall}%, var(--color-border, #e2e8f0) ${scoreData.overall}% 100%)`,
                }}
              >
                <div className="w-[96px] h-[96px] rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                    {scoreData.overall}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">
                    Score
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <ProgressBar value={scoreData.skillMatch} label="Keyword Alignment" />
              <ProgressBar value={scoreData.formatting} label="Format Parseability" />
              <ProgressBar value={scoreData.experienceFit} label="Work Experience Fit" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                Matched Keywords
              </div>
              <div className="flex flex-wrap gap-1.5">
                {scoreData.keywords
                  .filter((k) => k.found)
                  .map((k) => (
                    <span
                      key={k.keyword}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50"
                    >
                      {k.keyword}
                    </span>
                  ))}
                {scoreData.keywords.filter((k) => k.found).length === 0 && (
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    No matches found yet.
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                Missing Critical Keywords
              </div>
              <div className="flex flex-wrap gap-1.5">
                {scoreData.keywords
                  .filter((k) => !k.found)
                  .map((k) => (
                    <span
                      key={k.keyword}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50"
                    >
                      {k.keyword}
                    </span>
                  ))}
                {scoreData.keywords.filter((k) => !k.found).length === 0 && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    All core keywords present!
                  </span>
                )}
              </div>
            </div>

            {scoreData.suggestions.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Recommendations
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {scoreData.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
