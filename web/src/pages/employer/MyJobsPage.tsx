import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateJobStatus, deleteJob } from '../../store/slices/jobsSlice';
import { useToast } from '../../hooks/useToast';
import { useState } from 'react';
import styles from './MyJobsPage.module.css';

export const MyJobsPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { jobsList } = useAppSelector((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const handleStatusChange = (id: string, currentStatus: 'Active' | 'Draft' | 'Closed') => {
    const nextStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    dispatch(updateJobStatus({ id, status: nextStatus }));
    toast.success(`Job listing is now ${nextStatus.toLowerCase()}.`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      dispatch(deleteJob(id));
      toast.info('Job listing deleted.');
    }
  };

  // Filter listings based on search and status
  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Active Listings</h1>
          <p className={styles.subtitle}>Manage your current and past job postings.</p>
        </div>
        <Link to="/employer/post-job" className="no-underline">
          <Button>+ Post New Job</Button>
        </Link>
      </div>

      <Card className={styles.card}>
        <form className={styles.toolbar} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.searchBox}>
            <Input
              placeholder="Search job titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filters}>
            <select
              className={styles.select}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
          </div>
        </form>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applications</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-500 text-xs">
                    No active job listings found matching your search.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className={styles.roleText}>{job.title}</div>
                      <div className={styles.subText}>
                        {job.location}{' '}
                        <span className="mx-1" aria-hidden="true">
                          &bull;
                        </span>{' '}
                        {job.salary}
                      </div>
                    </td>
                    <td>
                      <Badge
                        variant={
                          job.status === 'Active'
                            ? 'success'
                            : job.status === 'Draft'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td>
                      <span className={styles.highlightText}>
                        {job.status === 'Active'
                          ? `${Math.floor(job.matchScore / 2)} candidates`
                          : '0 candidates'}
                      </span>
                    </td>
                    <td>
                      <span className={styles.subText}>{job.postedAt}</span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(job.id, job.status)}
                        >
                          {job.status === 'Active' ? 'Close' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(job.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
