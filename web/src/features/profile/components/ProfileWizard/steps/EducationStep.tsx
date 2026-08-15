import React, { useState } from 'react';
import type { UserProfile } from '../../../services/profileApi';
import { Button } from '../../../../../components/ui/Button';

interface EducationStepProps {
  data: UserProfile['education'];
  onChange: (edu: UserProfile['education']) => void;
}

export const EducationStep: React.FC<EducationStepProps> = ({ data, onChange }) => {
  const [inst, setInst] = useState('');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleAdd = () => {
    if (!inst || !degree || !field || !start) return;
    onChange([
      ...data,
      {
        institution: inst,
        degree,
        fieldOfStudy: field,
        startDate: start,
        endDate: end || undefined,
      },
    ]);
    setInst('');
    setDegree('');
    setField('');
    setStart('');
    setEnd('');
  };

  const handleRemove = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2">
        Step 2: Education
      </h3>

      <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
        <input
          type="text"
          value={inst}
          onChange={(e) => setInst(e.target.value)}
          placeholder="Institution (e.g. Stanford University)"
          className="w-full text-sm p-2 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Degree (e.g. B.Tech)"
            className="text-sm p-2 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="Field of Study (e.g. CS)"
            className="text-sm p-2 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start Year (e.g. 2020)"
            className="text-sm p-2 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End Year (or Present)"
            className="text-sm p-2 border border-slate-200 bg-white dark:bg-slate-900 rounded outline-none text-slate-900 dark:text-slate-100"
          />
        </div>
        <Button
          onClick={handleAdd}
          type="button"
          size="sm"
          className="w-full bg-slate-800 text-white text-sm py-1.5 rounded"
        >
          + Add Education
        </Button>
      </div>

      <div className="space-y-2">
        {data.map((edu, idx) => (
          <div
            key={`${edu.institution}-${edu.startDate}-${idx}`}
            className="flex justify-between items-center p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"
          >
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {edu.institution}
              </div>
              <div className="text-xs text-slate-500">
                {edu.degree} in {edu.fieldOfStudy} ({edu.startDate} - {edu.endDate || 'Present'})
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-sm text-rose-500 hover:underline"
              aria-label={`Remove ${edu.institution}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
