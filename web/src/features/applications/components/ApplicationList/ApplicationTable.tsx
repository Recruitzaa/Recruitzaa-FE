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
    <div className="bg-white dark:bg-brand-card border border-slate-200 rounded-lg shadow-sm overflow-hidden w-full select-none">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 text-left">
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Job / Company
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Last Activity
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Salary
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Owner / response
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-slate-400 text-right">
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
                  colSpan={6}
                  className="py-12 text-center text-sm text-slate-400 italic bg-white dark:bg-brand-card"
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
