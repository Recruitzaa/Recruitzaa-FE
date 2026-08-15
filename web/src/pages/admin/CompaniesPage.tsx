import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog/ConfirmDialog';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Pagination } from '../../components/ui/Pagination/Pagination';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { useToast } from '../../hooks/useToast';
import {
  createCompany,
  deleteCompany,
  getCompany,
  listCompanies,
  updateCompany,
  type Company,
  type CompanyInput,
  type CompanyPlan,
  type CompanyStatus,
} from '../../services/companies.service';
import styles from './CompaniesPage.module.css';
import { SEO } from '../../components/seo/SEO';

const PAGE_SIZE = 20;

const errorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail || error.message;
  }
  return 'Something went wrong. Please try again.';
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const emptyCompany: CompanyInput = {
  name: '',
  website: '',
  industry: '',
  companySize: '',
  companyType: '',
  hqLocation: '',
  status: 'PENDING',
  plan: 'FREE',
};

const companyToInput = (company: Company): CompanyInput => ({
  name: company.name,
  website: company.website || '',
  industry: company.industry || '',
  companySize: company.companySize || '',
  companyType: company.companyType || '',
  hqLocation: company.hqLocation || '',
  status: company.status,
  plan: company.plan,
});

const CompanyEditor = ({
  company,
  isOpen,
  isSaving,
  onClose,
  onSave,
}: {
  company: Company | null;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (input: CompanyInput) => void;
}) => {
  const [form, setForm] = useState<CompanyInput>(emptyCompany);

  useEffect(() => {
    if (isOpen) setForm(company ? companyToInput(company) : emptyCompany);
  }, [company, isOpen]);

  const field = (key: keyof CompanyInput) => ({
    value: form[key] || '',
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value })),
  });

  return (
    <Modal
      isOpen={isOpen}
      title={company ? 'Manage company' : 'Register company'}
      description={
        company
          ? 'Update verification, plan, and company information.'
          : 'Create a company record that employer accounts can join.'
      }
      onClose={onClose}
    >
      <form
        className={styles.editor}
        onSubmit={(event) => {
          event.preventDefault();
          onSave(form);
        }}
      >
        <Input label="Company name" required {...field('name')} />
        <Input label="Website" type="url" placeholder="https://example.com" {...field('website')} />
        <div className={styles.formGrid}>
          <Input label="Industry" {...field('industry')} />
          <Input label="Company size" {...field('companySize')} />
          <Input label="Company type" {...field('companyType')} />
          <Input label="Headquarters" {...field('hqLocation')} />
          <label className={styles.fieldLabel}>
            Verification status
            <select
              className={styles.select}
              {...field('status')}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as CompanyStatus,
                }))
              }
            >
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </label>
          <label className={styles.fieldLabel}>
            Plan
            <select
              className={styles.select}
              {...field('plan')}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  plan: event.target.value as CompanyPlan,
                }))
              }
            >
              <option value="FREE">Free</option>
              <option value="PRO">Pro</option>
              <option value="ENTERPRISE">Enterprise</option>
            </select>
          </label>
        </div>
        <div className={styles.modalActions}>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving || !form.name.trim()}>
            {isSaving ? 'Saving…' : company ? 'Save changes' : 'Register company'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const CompaniesPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CompanyStatus | ''>('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const companiesQuery = useQuery({
    queryKey: ['admin-companies', page, search, status],
    queryFn: () =>
      listCompanies({
        page,
        pageSize: PAGE_SIZE,
        search: search || undefined,
        status: status || undefined,
      }),
  });

  const saveCompany = useMutation({
    mutationFn: (input: CompanyInput) =>
      selectedCompany ? updateCompany(selectedCompany.id, input) : createCompany(input),
    onSuccess: async () => {
      setEditorOpen(false);
      setSelectedCompany(null);
      await queryClient.invalidateQueries({ queryKey: ['admin-companies'] });
      toast.success(selectedCompany ? 'Company updated.' : 'Company registered.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const companies = companiesQuery.data?.items ?? [];

  const removeCompany = useMutation({
    mutationFn: deleteCompany,
    onSuccess: async () => {
      setDeleteTarget(null);
      await queryClient.invalidateQueries({ queryKey: ['admin-companies'] });
      toast.success('Company deleted.');
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const openCompany = async (company: Company) => {
    try {
      setSelectedCompany(await getCompany(company.id));
      setEditorOpen(true);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return (
    <div className={styles.page}>
      <SEO
        title="Registered Companies | Recruitzaa Admin"
        description="Manage enterprise employer company accounts and approval status."
      />
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Company directory</h1>
          <p className={styles.subtitle}>Register, verify, and manage employer companies.</p>
        </div>
        <Button
          onClick={() => {
            setSelectedCompany(null);
            setEditorOpen(true);
          }}
        >
          + Register company
        </Button>
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by company name or domain..."
              aria-label="Search companies"
            />
          </div>
          <div className={styles.filters}>
            <select
              className={styles.select}
              value={status}
              aria-label="Filter companies by status"
              onChange={(event) => {
                setStatus(event.target.value as CompanyStatus | '');
                setPage(1);
              }}
            >
              <option value="">All statuses</option>
              <option value="VERIFIED">Verified</option>
              <option value="PENDING">Pending verification</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Plan</th>
                <th>Active jobs</th>
                <th>Employers</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companiesQuery.isLoading ? (
                <tr>
                  <td colSpan={6} className={styles.stateCell}>
                    <Spinner size="md" />
                    <span>Loading companies…</span>
                  </td>
                </tr>
              ) : companiesQuery.isError ? (
                <tr>
                  <td colSpan={6} className={styles.errorCell}>
                    <span>{errorMessage(companiesQuery.error)}</span>
                    <Button size="sm" variant="outline" onClick={() => companiesQuery.refetch()}>
                      Try again
                    </Button>
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.stateCell}>
                    No companies match these filters.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id}>
                    <td>
                      <div className={styles.companyInfo}>
                        <div className={styles.avatar}>{initials(company.name)}</div>
                        <div>
                          <div className={styles.roleText}>{company.name}</div>
                          <div className={styles.subText}>{company.domain || 'No website'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant={company.plan === 'FREE' ? 'neutral' : 'primary'}>
                        {company.plan}
                      </Badge>
                    </td>
                    <td className={styles.subTextDark}>{company.activeJobs ?? '—'}</td>
                    <td className={styles.subTextDark}>{company.employerCount}</td>
                    <td>
                      <Badge
                        variant={
                          company.status === 'VERIFIED'
                            ? 'success'
                            : company.status === 'SUSPENDED'
                              ? 'error'
                              : 'warning'
                        }
                      >
                        {company.status === 'PENDING' ? 'Pending verification' : company.status}
                      </Badge>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <Button size="sm" variant="outline" onClick={() => openCompany(company)}>
                          Manage
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteTarget(company)}
                        >
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

        {companiesQuery.data && (
          <div className={styles.paginationRow}>
            <span>{companiesQuery.data.total.toLocaleString()} companies</span>
            <Pagination
              page={companiesQuery.data.page}
              totalPages={companiesQuery.data.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>

      <CompanyEditor
        company={selectedCompany}
        isOpen={editorOpen}
        isSaving={saveCompany.isPending}
        onClose={() => !saveCompany.isPending && setEditorOpen(false)}
        onSave={(input) => saveCompany.mutate(input)}
      />
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete company?"
        message={
          deleteTarget
            ? `${deleteTarget.name} can only be deleted after all employer accounts are reassigned.`
            : ''
        }
        confirmLabel={removeCompany.isPending ? 'Deleting…' : 'Delete company'}
        variant="danger"
        onCancel={() => !removeCompany.isPending && setDeleteTarget(null)}
        onConfirm={() =>
          deleteTarget && !removeCompany.isPending && removeCompany.mutate(deleteTarget.id)
        }
      />
    </div>
  );
};
