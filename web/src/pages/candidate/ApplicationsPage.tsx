import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ApplicationFilterBar } from '../../features/applications/components/ApplicationList/ApplicationFilterBar';
import { ApplicationTable } from '../../features/applications/components/ApplicationList/ApplicationTable';
import { useToast } from '../../hooks/useToast';
import { SEO } from '../../components/seo/SEO';

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
    if (import.meta.env.DEV) {
      toast.info(`Application ${id} has no linked production record in this demo.`);
    } else {
      toast.info(`Opening application details...`);
    }
  };

  return (
    <div className="flex flex-col">
      <SEO
        title="My Applications | Recruitzaa"
        description="Track all the roles you've applied to."
      />
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">My Applications</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {import.meta.env.DEV
            ? 'Illustrative browser-only records. No employer has received these applications.'
            : "Track all the roles you've applied to."}
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
