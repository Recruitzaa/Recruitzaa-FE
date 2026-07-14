import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ApplicationFilterBar } from '../../features/applications/components/ApplicationList/ApplicationFilterBar';
import { ApplicationTable } from '../../features/applications/components/ApplicationList/ApplicationTable';

/**
 * ApplicationsPage — Main candidate applications history screen.
 * Displays application lists inside a filterable data table.
 */
export const ApplicationsPage = () => {
  const applications = useAppSelector((state) => state.kanban.applications);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.stage === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (id: string) => {
    alert(`Redirecting to details for application: ${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Job Applications History
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review, filter, and track details of all your submitted roles and resumes.
        </p>
      </div>

      <ApplicationFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ApplicationTable applications={filteredApplications} onViewDetails={handleViewDetails} />
    </div>
  );
};
