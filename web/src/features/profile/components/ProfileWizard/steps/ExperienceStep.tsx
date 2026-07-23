import React, { useState } from 'react';
import type { UserProfile } from '../../../services/profileApi';
import { Button } from '../../../../../components/ui/Button';

interface ExperienceStepProps {
  data: UserProfile['experience'];
  onChange: (exp: UserProfile['experience']) => void;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({ data, onChange }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = () => {
    if (!company || !position || !start) return;
    onChange([
      ...data,
      {
        company,
        position,
        startDate: start,
        endDate: end || undefined,
        description: desc || undefined,
      },
    ]);
    setCompany('');
    setPosition('');
    setStart('');
    setEnd('');
    setDesc('');
  };

  const handleRemove = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-2">
        Step 3: Work Experience
      </h3>

      <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            className="text-sm p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Role/Position"
            className="text-sm p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start Year (e.g. 2022)"
            className="text-sm p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End Year (or Present)"
            className="text-sm p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
        </div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Brief description of work..."
          className="w-full text-sm p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100 resize-none min-h-[50px]"
        />
        <Button
          onClick={handleAdd}
          type="button"
          size="sm"
          className="w-full bg-slate-800 text-white text-sm py-1.5 rounded"
        >
          + Add Experience
        </Button>
      </div>

      <div className="space-y-2">
        {data.map((exp, idx) => (
          <div
            key={`${exp.company}-${exp.startDate}-${idx}`}
            className="flex justify-between items-center p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"
          >
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {exp.position} at {exp.company}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {exp.startDate} - {exp.endDate || 'Present'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-sm text-rose-500 hover:underline"
              aria-label={`Remove ${exp.position} at ${exp.company}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
