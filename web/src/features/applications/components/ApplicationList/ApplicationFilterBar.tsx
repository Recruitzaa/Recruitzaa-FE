import React from 'react';

interface ApplicationFilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export const ApplicationFilterBar: React.FC<ApplicationFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  const statuses: Array<{ label: string; value: string }> = [
    { label: 'All Statuses', value: 'ALL' },
    { label: 'Applied', value: 'APPLIED' },
    { label: 'Screening', value: 'SCREENING' },
    { label: 'Interviewing', value: 'INTERVIEWING' },
    { label: 'Offered', value: 'OFFERED' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-6">
      {/* Search Input */}
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by company or job title..."
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
        />
      </div>

      {/* Dropdown status selector */}
      <div className="w-full sm:w-[180px]">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded outline-none focus:border-indigo-600 text-slate-900 dark:text-slate-100"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
