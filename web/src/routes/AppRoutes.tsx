import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout/PublicLayout';
import { PortalLayout } from '../components/layout/PortalLayout/PortalLayout';
import { AdminLayout } from '../components/layout/AdminLayout/AdminLayoutV2';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { RoleGuard } from '../components/auth/RoleGuard';
import { AuthRedirect } from './AuthRedirect';

import * as Pages from './lazyPages';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ── PUBLIC ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Pages.LandingPage />} />
        <Route path="/employers" element={<Pages.EmployerLandingPage />} />
        <Route path="/jobs" element={<Pages.JobListingsPage />} />
        <Route path="/jobs/:id" element={<Pages.JobDetailPage />} />
        <Route path="/privacy" element={<Pages.PrivacyPolicyPage />} />
        <Route path="/terms" element={<Pages.TermsOfServicePage />} />
      </Route>

      {/* ── AUTH ── */}
      <Route path="/login" element={<Pages.AuthPage />} />
      <Route path="/register" element={<Pages.AuthPage />} />
      <Route path="/auth" element={<AuthRedirect />} />

      {/* ── ENTERPRISE LAUNCHPAD ── */}
      <Route
        element={
          <RoleGuard
            allowedRoles={['CANDIDATE', 'EMPLOYER', 'SUPER_ADMIN', 'EXPERT', 'EMPLOYEE']}
          />
        }
      >
        <Route path="/launchpad" element={<Pages.LaunchpadPage />} />
      </Route>

      {/* ── PORTAL (CANDIDATE, EMPLOYER, EXPERT, EMPLOYEE) ──
          Each section below has its own RoleGuard with the exact roles it
          needs. There is deliberately no wrapping "any portal role" guard
          here: it added a second concurrent getMe() resolution per
          navigation without narrowing access any further than the nested
          guards already do. */}

      {/* Candidate Only */}
      <Route element={<RoleGuard allowedRoles={['CANDIDATE']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/candidate/dashboard" element={<Pages.DashboardPage />} />
          <Route path="/candidate/applications" element={<Pages.ApplicationsPage />} />
          <Route path="/candidate/saved-jobs" element={<Pages.SavedJobsPage />} />
          <Route path="/candidate/pipeline" element={<Pages.KanbanPage />} />
          <Route path="/candidate/profile" element={<Pages.ProfilePage />} />
          <Route path="/candidate/expert-hub" element={<Pages.ExpertDiscoveryPage />} />
        </Route>
      </Route>

      {/* Shared Candidate & Expert Tools */}
      <Route element={<RoleGuard allowedRoles={['CANDIDATE', 'EXPERT']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/candidate/jobs" element={<Pages.JobListingsPage />} />
          <Route path="/candidate/jobs/:id" element={<Pages.JobDetailPage />} />
          <Route path="/candidate/ai-hub" element={<Pages.AIHubPage />} />
          <Route path="/candidate/inbox" element={<Pages.FeatureUnavailablePage />} />
        </Route>
      </Route>

      {/* Expert Only */}
      <Route element={<RoleGuard allowedRoles={['EXPERT']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/expert/dashboard" element={<Pages.ExpertDashboardPage />} />
          <Route path="/expert/calendar-settings" element={<Pages.CalendarSettingsPage />} />
          <Route path="/expert/inbox" element={<Pages.FeatureUnavailablePage />} />
        </Route>
      </Route>

      {/* Employee Only */}
      <Route element={<RoleGuard allowedRoles={['EMPLOYEE']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/employee/dashboard" element={<Pages.EmployeeDashboardPage />} />
          <Route path="/employee/timesheets" element={<Pages.EmployeeDashboardPage />} />
          <Route path="/employee/payroll" element={<Pages.EmployeeDashboardPage />} />
          <Route path="/employee/inbox" element={<Pages.FeatureUnavailablePage />} />
        </Route>
      </Route>

      {/* Employer Only */}
      <Route element={<RoleGuard allowedRoles={['EMPLOYER']} />}>
        <Route element={<PortalLayout />}>
          <Route path="/employer/dashboard" element={<Pages.EmployerDashboardPage />} />
          <Route path="/employer/post-job" element={<Pages.PostJobPage />} />
          <Route path="/employer/my-jobs" element={<Pages.MyJobsPage />} />
          <Route path="/employer/candidates" element={<Pages.FeatureUnavailablePage />} />
          <Route path="/employer/analytics" element={<Pages.FeatureUnavailablePage />} />
          <Route path="/employer/profile" element={<Pages.EmployerProfilePage />} />
          <Route path="/employer/inbox" element={<Pages.FeatureUnavailablePage />} />
        </Route>
      </Route>

      {/* ── SUPER ADMIN PANEL ── */}
      <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Pages.SuperAdminDashboardPage />} />
          <Route path="/admin/job-approvals" element={<Pages.JobApprovalsPage />} />
          <Route path="/admin/companies" element={<Pages.CompaniesPage />} />
          <Route path="/admin/users" element={<Pages.UsersPage />} />
          <Route path="/admin/employers" element={<Pages.EmployersPage />} />
          <Route path="/admin/settings" element={<Pages.AdminSettingsPage />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Pages.UnauthorizedPage />} />
      <Route path="*" element={<Pages.NotFoundPage />} />
    </Routes>
  );
};
