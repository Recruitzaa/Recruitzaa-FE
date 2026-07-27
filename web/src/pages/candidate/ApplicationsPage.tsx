import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ApplicationFilterBar } from '../../features/applications/components/ApplicationList/ApplicationFilterBar';
import { ApplicationTable } from '../../features/applications/components/ApplicationList/ApplicationTable';
import { useToast } from '../../hooks/useToast';

/**
 * ApplicationsPage — Main candidate applications history screen.
 * Displays application lists inside a filterable data table.
 */
export const ApplicationsPage = () => {
  const applications = useAppSelector((state) => state.kanban.applications);
  const toast = useToast();

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
    toast.info(`Application ${id} has no linked production record in this demo.`);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Job Applications History
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Illustrative browser-only records. No employer has received these applications.
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
