import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import { Spinner } from './components/ui/Spinner/Spinner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Loading Fallback Component
const LoadingSpinner = () => (
  <main
    className="flex h-screen w-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950"
    aria-label="Loading Recruitzaa"
  >
    <div className="flex flex-col items-center gap-4">
      <Spinner className="w-12 h-12 text-[#c14f16] border-4 border-[#c14f16] border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-semibold text-slate-500">Loading Recruitzaa...</p>
    </div>
  </main>
);

// Lazy Loaded Pages
const LandingPage = React.lazy(() =>
  import('./pages/public/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const EmployerLandingPage = React.lazy(() =>
  import('./pages/public/EmployerLandingPage').then((m) => ({ default: m.EmployerLandingPage }))
);
const JobListingsPage = React.lazy(() =>
  import('./pages/public/JobListingsPage').then((m) => ({ default: m.JobListingsPage }))
);
const JobDetailPage = React.lazy(() =>
  import('./pages/public/JobDetailPage').then((m) => ({ default: m.JobDetailPage }))
);
const PrivacyPolicyPage = React.lazy(() =>
  import('./pages/public/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsOfServicePage = React.lazy(() =>
  import('./pages/public/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage }))
);

const AuthPage = React.lazy(() =>
  import('./pages/auth/AuthPage').then((m) => ({ default: m.AuthPage }))
);
const LaunchpadPage = React.lazy(() =>
  import('./pages/auth/LaunchpadPage').then((m) => ({ default: m.LaunchpadPage }))
);

const DashboardPage = React.lazy(() =>
  import('./pages/candidate/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const ApplicationsPage = React.lazy(() =>
  import('./pages/candidate/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage }))
);
const SavedJobsPage = React.lazy(() =>
  import('./pages/candidate/SavedJobsPage').then((m) => ({ default: m.SavedJobsPage }))
);
const KanbanPage = React.lazy(() =>
  import('./pages/candidate/KanbanPage').then((m) => ({ default: m.KanbanPage }))
);
const AIHubPage = React.lazy(() =>
  import('./pages/candidate/AIHubPage').then((m) => ({ default: m.AIHubPage }))
);
const ProfilePage = React.lazy(() =>
  import('./pages/candidate/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);
const ExpertDiscoveryPage = React.lazy(() =>
  import('./pages/candidate/expert-hub/ExpertDiscoveryPage').then((m) => ({
    default: m.ExpertDiscoveryPage,
  }))
);

const EmployerDashboardPage = React.lazy(() =>
  import('./pages/employer/EmployerDashboardPage').then((m) => ({
    default: m.EmployerDashboardPage,
  }))
);
const PostJobPage = React.lazy(() =>
  import('./pages/employer/PostJobPage').then((m) => ({ default: m.PostJobPage }))
);
const MyJobsPage = React.lazy(() =>
  import('./pages/employer/MyJobsPage').then((m) => ({ default: m.MyJobsPage }))
);
const EmployerProfilePage = React.lazy(() =>
  import('./pages/employer/EmployerProfilePage').then((m) => ({ default: m.EmployerProfilePage }))
);
const ExpertDashboardPage = React.lazy(() =>
  import('./pages/expert/dashboard/ExpertDashboardPage').then((m) => ({
    default: m.ExpertDashboardPage,
  }))
);
const CalendarSettingsPage = React.lazy(() =>
  import('./pages/expert/settings/CalendarSettingsPage').then((m) => ({
    default: m.CalendarSettingsPage,
  }))
);
const EmployeeDashboardPage = React.lazy(() =>
  import('./pages/employee/EmployeeDashboardPage').then((m) => ({
    default: m.EmployeeDashboardPage,
  }))
);
const FeatureUnavailablePage = React.lazy(() =>
  import('./pages/shared/FeatureUnavailablePage').then((m) => ({
    default: m.FeatureUnavailablePage,
  }))
);
const SuperAdminDashboardPage = React.lazy(() =>
  import('./pages/admin/dashboard/SuperAdminDashboardPage').then((m) => ({
    default: m.SuperAdminDashboardPage,
  }))
);
const JobApprovalsPage = React.lazy(() =>
  import('./pages/admin/JobApprovalsPage').then((m) => ({ default: m.JobApprovalsPage }))
);
const CompaniesPage = React.lazy(() =>
  import('./pages/admin/CompaniesPage').then((m) => ({ default: m.CompaniesPage }))
);
const UsersPage = React.lazy(() =>
  import('./pages/admin/UsersPage').then((m) => ({ default: m.UsersPage }))
);
const EmployersPage = React.lazy(() =>
  import('./pages/admin/EmployersPage').then((m) => ({ default: m.EmployersPage }))
);
const AdminSettingsPage = React.lazy(() =>
  import('./pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage }))
);

const NotFoundPage = React.lazy(() =>
  import('./pages/error/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const UnauthorizedPage = React.lazy(() =>
  import('./pages/error/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage }))
);

const FocusOnRouteChange = () => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main');
    const shouldMoveFocus = previousPathRef.current !== location.pathname && !location.hash;

    if (shouldMoveFocus && main) {
      main.focus();
    }

    previousPathRef.current = location.pathname;
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  const Router = import.meta.env.VITE_ROUTER_MODE === 'browser' ? BrowserRouter : HashRouter;
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <FocusOnRouteChange />
              <Suspense fallback={<LoadingSpinner />}>
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
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/register" element={<AuthPage />} />

                  {/* ── ENTERPRISE LAUNCHPAD ── */}
                  <Route
                    element={
                      <RoleGuard
                        allowedRoles={[
                          'CANDIDATE',
                          'EMPLOYER',
                          'SUPER_ADMIN',
                          'EXPERT',
                          'EMPLOYEE',
                        ]}
                      />
                    }
                  >
                    <Route path="/launchpad" element={<LaunchpadPage />} />
                  </Route>

                  {/* ── PORTAL (CANDIDATE & EMPLOYER) ── */}
                  <Route
                    element={
                      <RoleGuard
                        allowedRoles={[
                          'CANDIDATE',
                          'EMPLOYER',
                          'EXPERT',
                          'EMPLOYEE',
                          'SUPER_ADMIN',
                        ]}
                      />
                    }
                  >
                    {/* Candidate Only */}
                    <Route element={<RoleGuard allowedRoles={['CANDIDATE']} />}>
                      <Route element={<DashboardLayout />}>
                        <Route path="/candidate/dashboard" element={<DashboardPage />} />
                        <Route path="/candidate/applications" element={<ApplicationsPage />} />
                        <Route path="/candidate/pipeline" element={<KanbanPage />} />
                        <Route path="/candidate/profile" element={<ProfilePage />} />
                        <Route path="/candidate/saved" element={<SavedJobsPage />} />
                        <Route path="/candidate/expert-hub" element={<ExpertDiscoveryPage />} />
                      </Route>
                    </Route>

                    {/* Shared Candidate & Expert Tools */}
                    <Route element={<RoleGuard allowedRoles={['CANDIDATE', 'EXPERT']} />}>
                      <Route element={<DashboardLayout />}>
                        <Route path="/candidate/jobs" element={<JobListingsPage />} />
                        <Route path="/candidate/jobs/:id" element={<JobDetailPage />} />
                        <Route path="/candidate/ai-hub" element={<AIHubPage />} />
                        <Route
                          path="/candidate/inbox"
                          element={
                            <FeatureUnavailablePage
                              title="Candidate messages"
                              description="Employer messaging requires a production application record, delivery service, moderation controls, and notification preferences. This demo does not simulate messages."
                              backTo="/candidate/dashboard"
                            />
                          }
                        />
                      </Route>
                    </Route>

                    {/* Expert Only */}
                    <Route element={<RoleGuard allowedRoles={['EXPERT']} />}>
                      <Route element={<DashboardLayout />}>
                        <Route path="/expert/dashboard" element={<ExpertDashboardPage />} />
                        <Route
                          path="/expert/calendar-settings"
                          element={<CalendarSettingsPage />}
                        />
                        <Route
                          path="/expert/inbox"
                          element={
                            <FeatureUnavailablePage
                              title="Expert messages"
                              description="Expert messaging is not connected to a production delivery and moderation service."
                              backTo="/expert/dashboard"
                            />
                          }
                        />
                      </Route>
                    </Route>

                    {/* Employee Only */}
                    <Route element={<RoleGuard allowedRoles={['EMPLOYEE']} />}>
                      <Route element={<DashboardLayout />}>
                        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
                        <Route
                          path="/employee/timesheets"
                          element={
                            <FeatureUnavailablePage
                              title="Timesheets and leave"
                              description="This workflow is not connected to a production time-tracking service. No hours or leave requests can be submitted from this demo."
                              backTo="/employee/dashboard"
                            />
                          }
                        />
                        <Route
                          path="/employee/payroll"
                          element={
                            <FeatureUnavailablePage
                              title="Payroll and tax"
                              description="Payroll data requires a secured production integration and jurisdictional review. This demo does not display or process payroll information."
                              backTo="/employee/dashboard"
                            />
                          }
                        />
                        <Route
                          path="/employee/inbox"
                          element={
                            <FeatureUnavailablePage
                              title="Employee messages"
                              description="Employee messaging is not connected to a production delivery and access-control service."
                              backTo="/employee/dashboard"
                            />
                          }
                        />
                      </Route>
                    </Route>

                    {/* Employer Only */}
                    <Route element={<RoleGuard allowedRoles={['EMPLOYER']} />}>
                      <Route element={<PortalLayout />}>
                        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
                        <Route path="/employer/post-job" element={<PostJobPage />} />
                        <Route path="/employer/my-jobs" element={<MyJobsPage />} />
                        <Route
                          path="/employer/candidates"
                          element={
                            <FeatureUnavailablePage
                              title="Candidate pipeline"
                              description="Applicant review requires the production applications API, resource ownership checks, structured scorecards, fairness controls, and an audit log. No candidate records or AI rankings are fabricated in this demo."
                              backTo="/employer/dashboard"
                            />
                          }
                        />
                        <Route
                          path="/employer/analytics"
                          element={
                            <FeatureUnavailablePage
                              title="Hiring analytics"
                              description="Hiring metrics require verified production events and a documented methodology. This demo does not manufacture application or conversion totals."
                              backTo="/employer/dashboard"
                            />
                          }
                        />
                        <Route path="/employer/profile" element={<EmployerProfilePage />} />
                        <Route
                          path="/employer/inbox"
                          element={
                            <FeatureUnavailablePage
                              title="Employer messages"
                              description="Candidate communication requires a production application record, access controls, delivery tracking, moderation, and retention policies."
                              backTo="/employer/dashboard"
                            />
                          }
                        />
                      </Route>
                    </Route>
                  </Route>

                  {/* ── SUPER ADMIN PANEL ── */}
                  <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
                    <Route element={<AdminLayout />}>
                      <Route path="/admin/dashboard" element={<SuperAdminDashboardPage />} />
                      <Route path="/admin/job-approvals" element={<JobApprovalsPage />} />
                      <Route path="/admin/companies" element={<CompaniesPage />} />
                      <Route path="/admin/users" element={<UsersPage />} />
                      <Route path="/admin/employers" element={<EmployersPage />} />
                      <Route path="/admin/settings" element={<AdminSettingsPage />} />
                    </Route>
                  </Route>

                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              <ToastContainer />
            </Router>
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
