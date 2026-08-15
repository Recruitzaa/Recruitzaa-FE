import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { switchActiveRole } from '../../store/slices/auth.slice';
import type { UserRole } from '../../types/auth.types';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { Shield, Briefcase, GraduationCap, Laptop, FileText, Moon, Sun } from 'lucide-react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useTheme } from '../../hooks/useTheme';

const ROLE_META: Record<
  UserRole,
  { title: string; desc: string; path: string; icon: React.ElementType }
> = {
  CANDIDATE: {
    title: 'Job Seeker Workspace',
    desc: 'Browse jobs, organize application information, explore career-tool demos, and find mentors.',
    path: '/candidate/dashboard',
    icon: Briefcase,
  },
  EMPLOYER: {
    title: 'Employer Workspace',
    desc: 'Create job positions, review candidate screens, and manage company information.',
    path: '/employer/dashboard',
    icon: Laptop,
  },
  EXPERT: {
    title: 'Expert Workspace',
    desc: 'Set availability calendars, review candidate pre-session briefs, and manage earnings.',
    path: '/expert/dashboard',
    icon: GraduationCap,
  },
  EMPLOYEE: {
    title: 'Employee Workspace',
    desc: 'Track timesheets, view payroll details, and access enterprise internal tools.',
    path: '/employee/dashboard',
    icon: FileText,
  },
  SUPER_ADMIN: {
    title: 'Super Admin Command Center',
    desc: 'Review demo platform data, user permissions, and moderation queues.',
    path: '/admin/dashboard',
    icon: Shield,
  },
};

export const LaunchpadPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDark, toggleTheme } = useTheme();
  const { appUser } = useAppSelector((state) => state.auth);

  if (!appUser) {
    return <Navigate to="/" replace />;
  }

  const availableRoles = (
    appUser.availableRoles?.length ? appUser.availableRoles : [appUser.activeRole || appUser.role]
  ).filter((role): role is UserRole => Boolean(ROLE_META[role]));

  if (availableRoles.length === 0) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (availableRoles.length === 1) {
    return <Navigate to={ROLE_META[availableRoles[0]].path} replace />;
  }

  const handleSelectRole = (role: UserRole) => {
    dispatch(switchActiveRole(role));
    navigate(ROLE_META[role].path);
  };

  return (
    <>
      <PageTransition>
        <SEO
          title="Select Workspace — Recruitzaa Enterprise"
          description="Choose your active profile workspace to get started on Recruitzaa."
        />
        <main
          className="relative min-h-screen bg-slate-50 dark:bg-brand-surface flex flex-col items-center px-4 py-8 lg:py-10"
          tabIndex={-1}
        >
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Use light theme' : 'Use dark theme'}
            title={isDark ? 'Use light theme' : 'Use dark theme'}
            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-brand-primary hover:bg-brand-primary-light hover:text-brand-primary-hover dark:border-slate-700 dark:bg-slate-850 dark:text-slate-200"
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <div className="max-w-5xl w-full space-y-6 my-auto">
            {/* Header branding */}
            <div className="text-center space-y-3">
              <BrandLogo size={40} className="mx-auto justify-center" />
              <h1 className="text-2xl font-black text-[#1e2229] dark:text-white tracking-tight">
                Choose Your Workspace
              </h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Welcome back,{' '}
                <span className="font-extrabold text-brand-primary">{appUser.displayName}</span>.
                Please choose which profile workspace you want to enter for this session.
              </p>
            </div>

            {/* Grid of portal cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {availableRoles.map((role) => {
                const meta = ROLE_META[role];
                if (!meta) return null;
                const IconComponent = meta.icon;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className="group bg-white dark:bg-brand-card border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-left shadow-sm hover:shadow-md hover:border-brand-primary dark:hover:border-brand-primary transition-all flex flex-col justify-between min-h-52 w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
                  >
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 dark:bg-slate-900 group-hover:bg-brand-primary-light text-slate-500 group-hover:text-brand-primary rounded-lg w-fit transition-colors">
                        <IconComponent size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                          {meta.title}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                          {meta.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-brand-primary transition-colors mt-4 block">
                      Open Workspace &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};
export default LaunchpadPage;
