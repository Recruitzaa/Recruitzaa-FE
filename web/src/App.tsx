import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from './components/ui/Toast/ToastContainer';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { store } from './store';
import { queryClient } from './config/queryClient';

import { PublicLayout } from './components/layout/PublicLayout/PublicLayout';
import { PortalLayout } from './components/layout/PortalLayout/PortalLayout';
import { AdminLayout } from './components/layout/AdminLayout/AdminLayoutV2';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { RoleGuard } from './components/auth/RoleGuard';

import { LandingPage } from './pages/public/LandingPage';
import { EmployerLandingPage } from './pages/public/EmployerLandingPage';
import { JobListingsPage } from './pages/public/JobListingsPage';
import { JobDetailPage } from './pages/public/JobDetailPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/public/TermsOfServicePage';

import { AuthPage } from './pages/auth/AuthPage';

import { DashboardPage } from './pages/candidate/DashboardPage';
import { ApplicationsPage } from './pages/candidate/ApplicationsPage';
import { KanbanPage } from './pages/candidate/KanbanPage';
import { AIHubPage } from './pages/candidate/AIHubPage';
import { ProfilePage } from './pages/candidate/ProfilePage';

import { EmployerDashboardPage } from './pages/employer/EmployerDashboardPage';
import { PostJobPage } from './pages/employer/PostJobPage';
import { MyJobsPage } from './pages/employer/MyJobsPage';
import { CandidatesPage } from './pages/employer/CandidatesPage';
import { AnalyticsPage } from './pages/employer/AnalyticsPage';

import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { JobApprovalsPage } from './pages/admin/JobApprovalsPage';
import { CompaniesPage } from './pages/admin/CompaniesPage';
import { UsersPage } from './pages/admin/UsersPage';
import { EmployersPage } from './pages/admin/EmployersPage';

import { NotFoundPage } from './pages/error/NotFoundPage';
import { UnauthorizedPage } from './pages/error/UnauthorizedPage';

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HashRouter>
            <Routes>
              {/* ── PUBLIC ── */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/employers" element={<EmployerLandingPage />} />
                <Route path="/jobs" element={<JobListingsPage />} />
                <Route path="/jobs/:id" element={<JobDetailPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
              </Route>

              {/* ── AUTH ── */}
              <Route path="/auth" element={<AuthPage />} />

              {/* ── PORTAL (CANDIDATE & EMPLOYER) ── */}
              <Route element={<RoleGuard allowedRoles={['CANDIDATE', 'EMPLOYER']} />}>
                {/* Candidate Only */}
                <Route element={<RoleGuard allowedRoles={['CANDIDATE']} />}>
                  <Route element={<DashboardLayout />}>
                    <Route path="/candidate/dashboard" element={<DashboardPage />} />
                    <Route path="/candidate/applications" element={<ApplicationsPage />} />
                    <Route path="/candidate/pipeline" element={<KanbanPage />} />
                    <Route path="/candidate/ai-hub" element={<AIHubPage />} />
                    <Route path="/candidate/profile" element={<ProfilePage />} />
                    <Route path="/candidate/jobs" element={<JobListingsPage />} />
                    <Route path="/candidate/jobs/:id" element={<JobDetailPage />} />
                  </Route>
                </Route>

                {/* Employer Only */}
                <Route element={<RoleGuard allowedRoles={['EMPLOYER']} />}>
                  <Route element={<PortalLayout />}>
                    <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
                    <Route path="/employer/post-job" element={<PostJobPage />} />
                    <Route path="/employer/my-jobs" element={<MyJobsPage />} />
                    <Route path="/employer/candidates" element={<CandidatesPage />} />
                    <Route path="/employer/analytics" element={<AnalyticsPage />} />
                  </Route>
                </Route>
              </Route>

              {/* ── SUPER ADMIN PANEL ── */}
              <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/job-approvals" element={<JobApprovalsPage />} />
                  <Route path="/admin/companies" element={<CompaniesPage />} />
                  <Route path="/admin/users" element={<UsersPage />} />
                  <Route path="/admin/employers" element={<EmployersPage />} />
                </Route>
              </Route>

              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer />
          </HashRouter>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
