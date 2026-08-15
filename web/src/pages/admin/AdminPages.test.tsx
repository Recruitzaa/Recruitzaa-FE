import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CompaniesPage } from './CompaniesPage';
import { EmployersPage } from './EmployersPage';
import { UsersPage } from './UsersPage';

const adminUsers = vi.hoisted(() => ({
  listAdminUsers: vi.fn(),
  createAdminUser: vi.fn(),
  deleteAdminUser: vi.fn(),
  getAdminUser: vi.fn(),
  updateAdminUser: vi.fn(),
}));
const companies = vi.hoisted(() => ({
  createCompany: vi.fn(),
  deleteCompany: vi.fn(),
  getCompany: vi.fn(),
  listAllCompanyOptions: vi.fn(),
  listCompanies: vi.fn(),
  listEmployers: vi.fn(),
  updateCompany: vi.fn(),
  updateEmployer: vi.fn(),
}));
const toast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
}));

vi.mock('../../services/admin-users.service', () => adminUsers);
vi.mock('../../services/companies.service', () => companies);
vi.mock('../../hooks/useToast', () => ({ useToast: () => toast }));

const renderPage = (page: React.ReactNode) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={client}>{page}</QueryClientProvider>
    </MemoryRouter>
  );
};

const user = {
  id: 'user-1',
  email: 'admin@example.com',
  firebaseUid: 'firebase-1',
  primaryRole: 'SUPER_ADMIN',
  availableRoles: ['SUPER_ADMIN'],
  isActive: true,
  createdAt: '2026-07-30T00:00:00Z',
  updatedAt: '2026-07-30T00:00:00Z',
  displayName: 'Admin User',
};

const company = {
  id: 'company-1',
  name: 'Acme',
  domain: 'acme.example',
  status: 'VERIFIED',
  plan: 'PRO',
  employerCount: 1,
  activeJobs: null,
  createdAt: '2026-07-30T00:00:00Z',
  updatedAt: '2026-07-30T00:00:00Z',
};

describe('connected admin pages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    adminUsers.listAdminUsers.mockResolvedValue({
      items: [user],
      total: 1,
      page: 1,
      pageSize: 20,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
    adminUsers.getAdminUser.mockResolvedValue(user);
    adminUsers.createAdminUser.mockResolvedValue(user);
    adminUsers.updateAdminUser.mockResolvedValue(user);
    adminUsers.deleteAdminUser.mockResolvedValue(undefined);
    companies.listCompanies.mockResolvedValue({
      items: [company],
      total: 1,
      page: 1,
      pageSize: 20,
      totalPages: 1,
    });
    companies.getCompany.mockResolvedValue(company);
    companies.createCompany.mockResolvedValue(company);
    companies.updateCompany.mockResolvedValue(company);
    companies.deleteCompany.mockResolvedValue(undefined);
    companies.updateEmployer.mockResolvedValue({});
    companies.listAllCompanyOptions.mockResolvedValue([{ id: company.id, name: company.name }]);
    companies.listEmployers.mockResolvedValue({
      items: [
        {
          id: 'employer-1',
          email: 'owner@acme.example',
          displayName: 'Owner',
          isActive: true,
          createdAt: '2026-07-30T00:00:00Z',
          companyId: company.id,
          companyName: company.name,
          companyStatus: 'VERIFIED',
          memberRole: 'OWNER',
          activeJobs: null,
        },
      ],
      total: 1,
      page: 1,
      pageSize: 20,
      totalPages: 1,
    });
  });

  it('loads user detail before opening the editor and exposes provisioning', async () => {
    renderPage(<UsersPage />);
    expect(await screen.findByText('Admin User')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Manage' }));
    expect(await screen.findByRole('heading', { name: 'Manage user' })).toBeInTheDocument();
    expect(adminUsers.getAdminUser).toHaveBeenCalledWith('user-1');
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(adminUsers.updateAdminUser).toHaveBeenCalled());

    fireEvent.click(screen.getByRole('button', { name: /add user/i }));
    expect(screen.getByRole('heading', { name: 'Add user' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText('Temporary password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create user' }));
    await waitFor(() => expect(adminUsers.createAdminUser).toHaveBeenCalled());

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete user' }));
    await waitFor(() => expect(adminUsers.deleteAdminUser.mock.calls[0]?.[0]).toBe('user-1'));
  });

  it('loads company detail before editing', async () => {
    renderPage(<CompaniesPage />);
    expect(await screen.findByText('Acme')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Manage' }));
    expect(await screen.findByRole('heading', { name: 'Manage company' })).toBeInTheDocument();
    expect(companies.getCompany).toHaveBeenCalledWith('company-1');
    fireEvent.submit(screen.getByRole('button', { name: 'Save changes' }).closest('form')!);
    await waitFor(() => expect(companies.updateCompany).toHaveBeenCalled());

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete company' }));
    await waitFor(() => expect(companies.deleteCompany.mock.calls[0]?.[0]).toBe('company-1'));

    fireEvent.click(screen.getByRole('button', { name: /register company/i }));
    fireEvent.change(screen.getByLabelText('Company name'), {
      target: { value: 'New Company' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Register company' }));
    await waitFor(() => expect(companies.createCompany).toHaveBeenCalled());
  });

  it('loads employer accounts with complete company options', async () => {
    renderPage(<EmployersPage />);
    expect(await screen.findByText('Owner')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Acme' })).toBeInTheDocument();
    expect(companies.listAllCompanyOptions).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Manage' }));
    expect(screen.getByRole('heading', { name: 'Manage employer' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    await waitFor(() => expect(companies.updateEmployer).toHaveBeenCalled());
  });

  it('shows recoverable errors and empty states on admin tables', async () => {
    adminUsers.listAdminUsers.mockRejectedValueOnce(new Error('Users API unavailable'));
    renderPage(<UsersPage />);
    expect(await screen.findByText('Something went wrong. Please try again.')).toBeInTheDocument();
    adminUsers.listAdminUsers.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByText('No users match these filters.')).toBeInTheDocument();
  });
});
