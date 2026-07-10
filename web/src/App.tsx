import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { PublicLayout } from './components/layout/PublicLayout/PublicLayout';
import { PortalLayout } from './components/layout/PortalLayout/PortalLayout';
import { AdminLayout } from './components/layout/AdminLayout/AdminLayout';

import { LandingPage } from './pages/public/LandingPage';
import { EmployerLandingPage } from './pages/public/EmployerLandingPage';
import { JobListingsPage } from './pages/public/JobListingsPage';
import { JobDetailPage } from './pages/public/JobDetailPage';

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
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/employers" element={<EmployerLandingPage />} />
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
          </Route>

          {/* AUTH */}
          <Route path="/auth" element={<AuthPage />} />

          {/* CANDIDATE (No auth guard yet per Phase 1) */}
          <Route element={<PortalLayout />}>
            <Route path="/candidate/dashboard" element={<DashboardPage />} />
            <Route path="/candidate/applications" element={<ApplicationsPage />} />
            <Route path="/candidate/pipeline" element={<KanbanPage />} />
            <Route path="/candidate/ai-hub" element={<AIHubPage />} />
            <Route path="/candidate/profile" element={<ProfilePage />} />
          </Route>

          {/* EMPLOYER (No auth guard yet per Phase 1) */}
          <Route element={<PortalLayout />}>
            <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
            <Route path="/employer/post-job" element={<PostJobPage />} />
            <Route path="/employer/my-jobs" element={<MyJobsPage />} />
            <Route path="/employer/candidates" element={<CandidatesPage />} />
            <Route path="/employer/analytics" element={<AnalyticsPage />} />
          </Route>

          {/* SUPER ADMIN (No auth guard yet per Phase 1) */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/job-approvals" element={<JobApprovalsPage />} />
            <Route path="/admin/companies" element={<CompaniesPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/employers" element={<EmployersPage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
