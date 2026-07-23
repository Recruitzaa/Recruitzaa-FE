import React from 'react';
import { Badge } from '../../../../components/ui/Badge';

interface SkillsCardProps {
  skills: string[];
  newSkill: string;
  setNewSkill: (skill: string) => void;
  onAddSkill: (e: React.FormEvent) => void;
  onRemoveSkill: (skill: string) => void;
}

export const SkillsCard = ({
  skills,
  newSkill,
  setNewSkill,
  onAddSkill,
  onRemoveSkill,
}: SkillsCardProps) => {
  return (
    <div
      id="key-skills"
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4 scroll-mt-24"
    >
      <h3 className="text-sm font-bold text-brand-charcoal border-b pb-2">Key Skills</h3>

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <span className="text-sm text-slate-400">No skills added yet.</span>
        ) : (
          skills.map((skill) => (
            <Badge
              key={skill}
              variant="primary"
              className="inline-flex items-center gap-1 text-[11px] font-semibold py-1 px-2.5 bg-orange-50 text-brand-primary border border-orange-200 rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="text-[9px] hover:text-brand-primary-hover font-black ml-1"
                aria-label={`Remove ${skill}`}
              >
                ✕
              </button>
            </Badge>
          ))
        )}
      </div>

      <form onSubmit={onAddSkill} className="flex gap-2 pt-2">
        <input
          type="text"
          placeholder="Add skill tag..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-brand-primary"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-1.5 border border-brand-primary text-brand-primary hover:bg-brand-primary-light font-bold rounded-lg text-sm transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};
