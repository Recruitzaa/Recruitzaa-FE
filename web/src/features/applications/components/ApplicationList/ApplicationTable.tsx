import React from 'react';
import { ApplicationRow } from './ApplicationRow';
import type { ApplicationCard } from '../../types/kanban.types';

interface ApplicationTableProps {
  applications: ApplicationCard[];
  onViewDetails: (id: string) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onViewDetails,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden w-full select-none">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-left">
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Job / Company
              </th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Last Activity
              </th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Salary
              </th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Status
              </th>
              <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <ApplicationRow key={app.id} application={app} onViewDetails={onViewDetails} />
            ))}
            {applications.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-xs text-slate-400 dark:text-slate-500 italic bg-white dark:bg-slate-800"
                >
                  No matching applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
