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
        'Architected and launched 4 high-performance mobile applications using React Native and TypeScript, resulting in a 35% increase in user retention.',
      benefit: 'Uses strong action verbs and quantifies impact on retention.',
    },
    {
      id: 'b2',
      original: 'Worked on fixing bugs and improving the UI speed.',
      optimized:
        'Optimized state management and rendering pathways, reducing app launch latency by 42% and eliminating 15+ major memory leaks.',
      benefit: 'Highlights specific technical achievements and details performance metrics.',
    },
    {
      id: 'b3',
      original: 'Collaborated with designers and backend API developers.',
      optimized:
        'Partnered with cross-functional UI/UX designers and backend teams to integrate REST/GraphQL APIs, reducing API response parser error rates by 18%.',
      benefit: 'Shows teamwork and specifies integration technology.',
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
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
        Tailor your achievements with professional action verbs and impact metrics.
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
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Original
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                  "{bullet.original}"
                </p>
              </div>
            </div>

            {/* AI Optimized Text */}
            <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 pt-3 lg:pt-0 lg:pl-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">
                  AI-Optimized Suggestion
                </span>
                <p className="text-xs text-slate-900 dark:text-slate-100 font-medium mt-1">
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
                  className="text-xs"
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
