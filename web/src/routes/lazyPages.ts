import { safeLazy } from '../utils/safeLazy';

// ─── PUBLIC PAGES ────────────────────────────────────────────────────────────
export const LandingPage = safeLazy(() =>
  import('../pages/public/LandingPage').then((m) => ({ default: m.LandingPage }))
);
export const EmployerLandingPage = safeLazy(() =>
  import('../pages/public/EmployerLandingPage').then((m) => ({ default: m.EmployerLandingPage }))
);
export const JobListingsPage = safeLazy(() =>
  import('../pages/public/JobListingsPage').then((m) => ({ default: m.JobListingsPage }))
);
export const JobDetailPage = safeLazy(() =>
  import('../pages/public/JobDetailPage').then((m) => ({ default: m.JobDetailPage }))
);
export const PrivacyPolicyPage = safeLazy(() =>
  import('../pages/public/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
export const TermsOfServicePage = safeLazy(() =>
  import('../pages/public/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage }))
);

// ─── AUTH & LAUNCHPAD ────────────────────────────────────────────────────────
export const AuthPage = safeLazy(() =>
  import('../pages/auth/AuthPage').then((m) => ({ default: m.AuthPage }))
);
export const LaunchpadPage = safeLazy(() =>
  import('../pages/auth/LaunchpadPage').then((m) => ({ default: m.LaunchpadPage }))
);

// ─── CANDIDATE WORKSPACE ─────────────────────────────────────────────────────
export const DashboardPage = safeLazy(() =>
  import('../pages/candidate/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
export const ApplicationsPage = safeLazy(() =>
  import('../pages/candidate/ApplicationsPage').then((m) => ({ default: m.ApplicationsPage }))
);
export const SavedJobsPage = safeLazy(() =>
  import('../pages/candidate/SavedJobsPage').then((m) => ({ default: m.SavedJobsPage }))
);
export const KanbanPage = safeLazy(() =>
  import('../pages/candidate/KanbanPage').then((m) => ({ default: m.KanbanPage }))
);
export const AIHubPage = safeLazy(() =>
  import('../pages/candidate/AIHubPage').then((m) => ({ default: m.AIHubPage }))
);
export const ProfilePage = safeLazy(() =>
  import('../pages/candidate/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);
export const ExpertDiscoveryPage = safeLazy(() =>
  import('../pages/candidate/expert-hub/ExpertDiscoveryPage').then((m) => ({
    default: m.ExpertDiscoveryPage,
  }))
);

// ─── EMPLOYER & EXPERT & EMPLOYEE WORKSPACES ────────────────────────────────
export const EmployerDashboardPage = safeLazy(() =>
  import('../pages/employer/EmployerDashboardPage').then((m) => ({
    default: m.EmployerDashboardPage,
  }))
);
export const PostJobPage = safeLazy(() =>
  import('../pages/employer/PostJobPage').then((m) => ({ default: m.PostJobPage }))
);
export const MyJobsPage = safeLazy(() =>
  import('../pages/employer/MyJobsPage').then((m) => ({ default: m.MyJobsPage }))
);
export const EmployerProfilePage = safeLazy(() =>
  import('../pages/employer/EmployerProfilePage').then((m) => ({ default: m.EmployerProfilePage }))
);
export const ExpertDashboardPage = safeLazy(() =>
  import('../pages/expert/dashboard/ExpertDashboardPage').then((m) => ({
    default: m.ExpertDashboardPage,
  }))
);
export const CalendarSettingsPage = safeLazy(() =>
  import('../pages/expert/settings/CalendarSettingsPage').then((m) => ({
    default: m.CalendarSettingsPage,
  }))
);
export const EmployeeDashboardPage = safeLazy(() =>
  import('../pages/employee/EmployeeDashboardPage').then((m) => ({
    default: m.EmployeeDashboardPage,
  }))
);

// ─── ADMIN & SHARED ──────────────────────────────────────────────────────────
export const SuperAdminDashboardPage = safeLazy(() =>
  import('../pages/admin/dashboard/SuperAdminDashboardPage').then((m) => ({
    default: m.SuperAdminDashboardPage,
  }))
);
export const JobApprovalsPage = safeLazy(() =>
  import('../pages/admin/JobApprovalsPage').then((m) => ({ default: m.JobApprovalsPage }))
);
export const CompaniesPage = safeLazy(() =>
  import('../pages/admin/CompaniesPage').then((m) => ({ default: m.CompaniesPage }))
);
export const UsersPage = safeLazy(() =>
  import('../pages/admin/UsersPage').then((m) => ({ default: m.UsersPage }))
);
export const EmployersPage = safeLazy(() =>
  import('../pages/admin/EmployersPage').then((m) => ({ default: m.EmployersPage }))
);
export const AdminSettingsPage = safeLazy(() =>
  import('../pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage }))
);
export const FeatureUnavailablePage = safeLazy(() =>
  import('../pages/shared/FeatureUnavailablePage').then((m) => ({
    default: m.FeatureUnavailablePage,
  }))
);
export const NotFoundPage = safeLazy(() =>
  import('../pages/error/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
export const UnauthorizedPage = safeLazy(() =>
  import('../pages/error/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage }))
);
