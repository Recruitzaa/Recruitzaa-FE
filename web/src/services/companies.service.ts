import api from '../lib/axios';

export type CompanyStatus = 'PENDING' | 'VERIFIED' | 'SUSPENDED';
export type CompanyPlan = 'FREE' | 'PRO' | 'ENTERPRISE';
export type CompanyMemberRole = 'OWNER' | 'ADMIN' | 'RECRUITER';

export interface Company {
  id: string;
  name: string;
  domain?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  companyType?: string;
  hqLocation?: string;
  status: CompanyStatus;
  plan: CompanyPlan;
  employerCount: number;
  activeJobs: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyInput {
  name: string;
  website?: string;
  industry?: string;
  companySize?: string;
  companyType?: string;
  hqLocation?: string;
  status: CompanyStatus;
  plan: CompanyPlan;
}

export interface CompanyPage {
  items: Company[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface EmployerAccount {
  id: string;
  email: string;
  displayName?: string;
  isActive: boolean;
  createdAt: string;
  companyId?: string;
  companyName?: string;
  companyStatus?: CompanyStatus;
  memberRole?: CompanyMemberRole;
  activeJobs: number | null;
}

export interface EmployerPage {
  items: EmployerAccount[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const registerEmployerCompany = async (
  companyName: string,
  companyWebsite?: string
): Promise<Company> => {
  const { data } = await api.post<Company>('/companies/register', {
    companyName,
    companyWebsite,
  });
  return data;
};

export const listCompanies = async (params: {
  page: number;
  pageSize: number;
  search?: string;
  status?: CompanyStatus;
}): Promise<CompanyPage> => {
  const { data } = await api.get<CompanyPage>('/admin/companies', {
    params: {
      page: params.page,
      page_size: params.pageSize,
      search: params.search || undefined,
      status: params.status,
    },
  });
  return data;
};

export const createCompany = async (input: CompanyInput): Promise<Company> => {
  const { data } = await api.post<Company>('/admin/companies', input);
  return data;
};

export const updateCompany = async (companyId: string, input: CompanyInput): Promise<Company> => {
  const { data } = await api.put<Company>(`/admin/companies/${companyId}`, input);
  return data;
};

export const getCompany = async (companyId: string): Promise<Company> => {
  const { data } = await api.get<Company>(`/admin/companies/${companyId}`);
  return data;
};

export const deleteCompany = async (companyId: string): Promise<void> => {
  await api.delete(`/admin/companies/${companyId}`);
};

export const listAllCompanyOptions = async (): Promise<{ id: string; name: string }[]> => {
  const firstPage = await listCompanies({ page: 1, pageSize: 100 });
  const pages = Array.from(
    { length: Math.max(firstPage.totalPages - 1, 0) },
    (_, index) => index + 2
  );
  const remaining = await Promise.all(pages.map((page) => listCompanies({ page, pageSize: 100 })));
  return [firstPage, ...remaining]
    .flatMap((result) => result.items)
    .map(({ id, name }) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name));
};

export const listEmployers = async (params: {
  page: number;
  pageSize: number;
  search?: string;
  isActive?: boolean;
  companyId?: string;
}): Promise<EmployerPage> => {
  const { data } = await api.get<EmployerPage>('/admin/employers', {
    params: {
      page: params.page,
      page_size: params.pageSize,
      search: params.search || undefined,
      is_active: params.isActive,
      company_id: params.companyId,
    },
  });
  return data;
};

export const updateEmployer = async (
  userId: string,
  input: {
    companyId?: string | null;
    memberRole: CompanyMemberRole;
    isActive: boolean;
  }
): Promise<EmployerAccount> => {
  const { data } = await api.put<EmployerAccount>(`/admin/employers/${userId}`, input);
  return data;
};
