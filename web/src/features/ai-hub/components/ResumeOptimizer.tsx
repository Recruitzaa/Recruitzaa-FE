import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface BulletPair {
  id: string;
  original: string;
  optimized: string;
  benefit: string;
}

export const ResumeOptimizer: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bullets] = useState<BulletPair[]>([
    {
      id: 'b1',
      original: 'Responsible for building mobile applications in React Native.',
      optimized:
        'Built [number] mobile applications using React Native and TypeScript, contributing to [measured outcome].',
      benefit: 'Prompts you to add only outcomes you can verify.',
    },
    {
      id: 'b2',
      original: 'Worked on fixing bugs and improving the UI speed.',
      optimized:
        'Optimized state management and rendering pathways, reducing app launch latency from [before] to [after].',
      benefit: 'Uses a specific before-and-after structure without inventing results.',
    },
    {
      id: 'b3',
      original: 'Collaborated with designers and backend API developers.',
      optimized:
        'Partnered with design and backend teams to integrate [API type], improving [verified team or user outcome].',
      benefit: 'Shows collaboration while leaving evidence-based details to the candidate.',
    },
  ]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Resume Optimizer</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
        Examples only. Replace bracketed prompts with facts you can verify; never copy invented
        metrics.
      </p>

      <div className="space-y-4">
        {bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
          >
            {/* Original Text */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Original
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">
                  "{bullet.original}"
                </p>
              </div>
            </div>

            {/* AI Optimized Text */}
            <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 pt-3 lg:pt-0 lg:pl-4">
              <div>
                <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">
                  Example rewrite
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-100 font-medium mt-1">
                  "{bullet.optimized}"
                </p>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
                  <span className="font-bold">✓ Impact:</span> {bullet.benefit}
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(bullet.id, bullet.optimized)}
                  className="text-sm"
                >
                  {copiedId === bullet.id ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
