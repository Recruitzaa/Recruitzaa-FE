import React from 'react';
import type { ApplicationCard } from '../../types/kanban.types';

interface ApplicationRowProps {
  application: ApplicationCard;
  onViewDetails: (id: string) => void;
}

export const ApplicationRow: React.FC<ApplicationRowProps> = ({ application, onViewDetails }) => {
  const getStatusStyle = (stage: string) => {
    switch (stage) {
      case 'OFFERED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/40';
      case 'INTERVIEWING':
        return 'bg-brand-primary-light text-brand-primary border-brand-primary/30';
      case 'SCREENING':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-850';
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all">
      <td className="py-4 px-4">
        <div className="text-sm font-bold text-slate-900 dark:text-white">
          {application.jobTitle}
        </div>
        <div className="text-sm text-slate-500">{application.companyName}</div>
      </td>
      <td className="py-4 px-4 text-sm text-slate-650 dark:text-slate-400">
        {application.updatedAt}
      </td>
      <td className="py-4 px-4 text-sm text-slate-650 dark:text-slate-400">
        {application.salaryEstimate}
      </td>
      <td className="py-4 px-4">
        <span
          className={`inline-block text-sm font-semibold px-2 py-0.5 border rounded uppercase ${getStatusStyle(application.stage)}`}
        >
          {application.stage}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-slate-650 dark:text-slate-400">
        <strong className="block text-slate-900 dark:text-white">{application.owner}</strong>
        <span>{application.expectedResponse}</span>
      </td>
      <td className="py-4 px-4 text-right">
        <button
          onClick={() => onViewDetails(application.id)}
          className="text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          {application.nextAction}
        </button>
      </td>
    </tr>
  );
};
