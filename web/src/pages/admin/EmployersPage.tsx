import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { useToast } from '../../hooks/useToast';
import {
  listCompanies,
  listEmployers,
  updateEmployer,
  type CompanyMemberRole,
  type EmployerAccount,
} from '../../services/companies.service';
import styles from './UsersPage.module.css';

const PAGE_SIZE = 20;

const errorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail || error.message;
  }
  return 'Something went wrong. Please try again.';
};

const initials = (user: EmployerAccount) =>
  (user.displayName || user.email)
    .split(/[\s@._-]+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const EmployerEditor = ({
  user,
  companies,
  isSaving,
  onClose,
  onSave,
}: {
  user: EmployerAccount | null;
  companies: { id: string; name: string }[];
  isSaving: boolean;
  onClose: () => void;
  onSave: (input: {
    companyId: string | null;
    memberRole: CompanyMemberRole;
    isActive: boolean;
  }) => void;
}) => {
  const [companyId, setCompanyId] = useState('');
  const [memberRole, setMemberRole] = useState<CompanyMemberRole>('RECRUITER');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!user) return;
    setCompanyId(user.companyId || '');
    setMemberRole(user.memberRole || 'RECRUITER');
    setIsActive(user.isActive);
  }, [user]);

  return (
    <Modal
      isOpen={Boolean(user)}
      title="Manage employer"
      description={user ? `${user.displayName || 'Unnamed employer'} · ${user.email}` : undefined}
      onClose={onClose}
    >
      {user && (
        <form
          className={styles.editor}
          onSubmit={(event) => {
            event.preventDefault();
            onSave({
              companyId: companyId || null,
              memberRole,
              isActive,
            });
          }}
        >
          <label className={styles.fieldLabel}>
            Company
            <select
              className={styles.select}
              value={companyId}
              onChange={(event) => setCompanyId(event.target.value)}
            >
              <option value="">No company assigned</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.fieldLabel}>
            Company role
            <select
              className={styles.select}
              value={memberRole}
              disabled={!companyId}
              onChange={(event) => setMemberRole(event.target.value as CompanyMemberRole)}
            >
              <option value="OWNER">Owner</option>
              <option value="ADMIN">Administrator</option>
              <option value="RECRUITER">Recruiter</option>
            </select>
          </label>

          <label className={styles.statusToggle}>
            <span>
              <strong>Account enabled</strong>
              <small>Disabled employers cannot access protected features.</small>
            </span>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
            />
          </label>

          <div className={styles.modalActions}>
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export const EmployersPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | ''>('');
  const [companyId, setCompanyId] = useState('');
  const [selectedUser, setSelectedUser] = useState<EmployerAccount | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const companiesQuery = useQuery({
    queryKey: ['admin-companies', 'employer-filter'],
    queryFn: () => listCompanies({ page: 1, pageSize: 100 }),
  });

  const employersQuery = useQuery({
    queryKey: ['admin-employers', page, search, status, companyId],
    queryFn: () =>
      listEmployers({
        page,
        pageSize: PAGE_SIZE,
        search: search || undefined,
        isActive: status ? status === 'active' : undefined,
        companyId: companyId || undefined,
      }),
  });

  const saveEmployer = useMutation({
    mutationFn: (input: {
      companyId: string | null;
      memberRole: CompanyMemberRole;
      isActive: boolean;
    }) => {
      if (!selectedUser) throw new Error('No employer selected.');
      return updateEmployer(selectedUser.id, input);
    },
    onSuccess: async () => {
      setSelectedUser(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['admin-employers'] }),
        queryClient.invalidateQueries({ queryKey: ['admin-companies'] }),
      ]);
      toast.success('Employer account updated.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const employers = employersQuery.data?.items ?? [];
  const companies = companiesQuery.data?.items ?? [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Employer accounts</h1>
          <p className={styles.subtitle}>Manage recruiter access and company membership.</p>
        </div>
        {employersQuery.data && (
          <span className={styles.userCount}>
            {employersQuery.data.total.toLocaleString()} employers
          </span>
        )}
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by name, email, or company..."
              aria-label="Search employer accounts"
            />
          </div>
          <div className={styles.filters}>
            <select
              className={styles.select}
              value={companyId}
              aria-label="Filter by company"
              onChange={(event) => {
                setCompanyId(event.target.value);
                setPage(1);
              }}
            >
              <option value="">All companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={status}
              aria-label="Filter by account status"
              onChange={(event) => {
                setStatus(event.target.value as 'active' | 'inactive' | '');
                setPage(1);
              }}
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employer account</th>
                <th>Company</th>
                <th>Company role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employersQuery.isLoading ? (
                <tr>
                  <td colSpan={6} className={styles.stateCell}>
                    <Spinner size="md" />
                    <span>Loading employers…</span>
                  </td>
                </tr>
              ) : employersQuery.isError ? (
                <tr>
                  <td colSpan={6} className={styles.errorCell}>
                    <span>{errorMessage(employersQuery.error)}</span>
                    <Button size="sm" variant="outline" onClick={() => employersQuery.refetch()}>
                      Try again
                    </Button>
                  </td>
                </tr>
              ) : employers.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.stateCell}>
                    No employer accounts match these filters.
                  </td>
                </tr>
              ) : (
                employers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar}>{initials(user)}</div>
                        <div>
                          <div className={styles.roleText}>
                            {user.displayName || 'Unnamed employer'}
                          </div>
                          <div className={styles.subText}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.subTextDark}>
                        {user.companyName || 'Not assigned'}
                      </span>
                      {user.companyStatus && (
                        <div className={styles.subText}>
                          {user.companyStatus === 'PENDING'
                            ? 'Pending verification'
                            : user.companyStatus}
                        </div>
                      )}
                    </td>
                    <td>
                      <Badge variant="neutral">{user.memberRole || 'Unassigned'}</Badge>
                    </td>
                    <td>
                      <span className={styles.subText}>
                        {new Intl.DateTimeFormat(undefined, {
                          dateStyle: 'medium',
                        }).format(new Date(user.createdAt))}
                      </span>
                    </td>
                    <td>
                      <Badge variant={user.isActive ? 'success' : 'error'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {employersQuery.data && (
          <div className={styles.paginationRow}>
            <span>
              Page {employersQuery.data.page}
              {employersQuery.data.totalPages ? ` of ${employersQuery.data.totalPages}` : ''}
            </span>
            <Pagination
              page={employersQuery.data.page}
              totalPages={employersQuery.data.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>

      <EmployerEditor
        user={selectedUser}
        companies={companies}
        isSaving={saveEmployer.isPending}
        onClose={() => !saveEmployer.isPending && setSelectedUser(null)}
        onSave={(input) => saveEmployer.mutate(input)}
      />
    </div>
  );
};
