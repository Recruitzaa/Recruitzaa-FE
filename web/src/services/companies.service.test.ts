import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../lib/axios', () => ({ default: api }));

import {
  createCompany,
  deleteCompany,
  getCompany,
  listAllCompanyOptions,
  listCompanies,
  listEmployers,
  registerEmployerCompany,
  updateCompany,
  updateEmployer,
} from './companies.service';

describe('companies service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('registers an employer company using the public contract', async () => {
    api.post.mockResolvedValue({ data: { id: 'company-1' } });
    await registerEmployerCompany('Acme', 'https://acme.example');
    expect(api.post).toHaveBeenCalledWith('/companies/register', {
      companyName: 'Acme',
      companyWebsite: 'https://acme.example',
    });
  });

  it('loads every company page for assignment options', async () => {
    api.get
      .mockResolvedValueOnce({
        data: {
          items: [{ id: '2', name: 'Zulu' }],
          totalPages: 2,
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: [{ id: '1', name: 'Acme' }],
          totalPages: 2,
        },
      });

    await expect(listAllCompanyOptions()).resolves.toEqual([
      { id: '1', name: 'Acme' },
      { id: '2', name: 'Zulu' },
    ]);
    expect(api.get).toHaveBeenNthCalledWith(2, '/admin/companies', {
      params: {
        page: 2,
        page_size: 100,
        search: undefined,
        status: undefined,
      },
    });
  });

  it('gets and deletes a company', async () => {
    api.get.mockResolvedValue({ data: { id: '1' } });
    api.delete.mockResolvedValue({ data: undefined });
    await getCompany('1');
    await deleteCompany('1');
    expect(api.get).toHaveBeenCalledWith('/admin/companies/1');
    expect(api.delete).toHaveBeenCalledWith('/admin/companies/1');
  });

  it('lists, creates, updates companies and employers', async () => {
    api.get.mockResolvedValue({
      data: { items: [], total: 0, page: 1, pageSize: 20, totalPages: 1 },
    });
    api.post.mockResolvedValue({ data: { id: '1' } });
    api.put.mockResolvedValue({ data: { id: '1' } });

    await listCompanies({ page: 1, pageSize: 20, search: 'acme', status: 'VERIFIED' });
    await createCompany({
      name: 'Acme',
      status: 'PENDING',
      plan: 'FREE',
    });
    await updateCompany('1', {
      name: 'Acme Updated',
      status: 'VERIFIED',
      plan: 'PRO',
    });
    await listEmployers({
      page: 1,
      pageSize: 20,
      search: 'owner',
      isActive: true,
      companyId: '1',
    });
    await updateEmployer('1', {
      companyId: '1',
      memberRole: 'RECRUITER',
      isActive: true,
    });

    expect(api.get).toHaveBeenCalledWith('/admin/companies', {
      params: { page: 1, page_size: 20, search: 'acme', status: 'VERIFIED' },
    });
    expect(api.post).toHaveBeenCalledWith('/admin/companies', {
      name: 'Acme',
      status: 'PENDING',
      plan: 'FREE',
    });
    expect(api.put).toHaveBeenCalledWith('/admin/companies/1', {
      name: 'Acme Updated',
      status: 'VERIFIED',
      plan: 'PRO',
    });
    expect(api.get).toHaveBeenCalledWith('/admin/employers', {
      params: {
        page: 1,
        page_size: 20,
        search: 'owner',
        is_active: true,
        company_id: '1',
      },
    });
    expect(api.put).toHaveBeenCalledWith('/admin/employers/1', {
      companyId: '1',
      memberRole: 'RECRUITER',
      isActive: true,
    });
  });
});
