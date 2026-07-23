import React, { useState } from 'react';

interface SkillsStepProps {
  data: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsStep: React.FC<SkillsStepProps> = ({ data, onChange }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAdd = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed]);
      setSkillInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide mb-2">
        Step 4: Skills & Expertise
      </h3>

      <div>
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          Add Skills (Press Enter to add)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React Native, TypeScript, Python"
            className="flex-1 text-sm p-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded transition-all"
          >
            Add
          </button>
        </div>
      </div>

      <div className="pt-2">
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
          Your Added Skills ({data.length})
        </label>
        <div className="flex flex-wrap gap-1.5 min-h-[50px] p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
          {data.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemove(skill)}
                className="text-sm text-indigo-400 hover:text-indigo-600 font-bold"
              >
                ✕
              </button>
            </span>
          ))}
          {data.length === 0 && (
            <span className="text-sm text-slate-400 dark:text-slate-500 self-center">
              Type a skill above and click Add to start populating your profile.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
