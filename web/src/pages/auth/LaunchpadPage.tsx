import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { switchActiveRole } from '../../store/slices/auth.slice';
import type { UserRole } from '../../types/auth.types';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { Shield, Briefcase, GraduationCap, Laptop, FileText } from 'lucide-react';
import logo from '../../assets/logo.png';

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
    desc: 'Create demo positions, review candidate screens, and manage company information.',
    path: '/employer/dashboard',
    icon: Laptop,
  },
  EXPERT: {
    title: 'Tutor Workspace',
    desc: 'Set availability calendars, review candidate pre-session briefs, and manage earnings.',
    path: '/expert/dashboard',
    icon: GraduationCap,
  },
  EMPLOYEE: {
    title: 'Employee Workspace',
    desc: 'View the employee workspace; payroll and timesheet integrations are not yet connected.',
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
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
          <div className="max-w-5xl w-full space-y-8">
            {/* Header branding */}
            <div className="text-center space-y-3">
              <img src={logo} alt="Recruitzaa Logo" className="h-10 mx-auto" />
              <h1 className="text-2xl font-black text-[#1e2229] dark:text-white tracking-tight">
                Enterprise Launchpad
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Welcome back,{' '}
                <span className="font-extrabold text-[#c14f16]">{appUser.displayName}</span>. Please
                choose which profile workspace you want to enter for this session.
              </p>
            </div>

            {/* Grid of portal cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {availableRoles.map((role) => {
                const meta = ROLE_META[role];
                if (!meta) return null;
                const IconComponent = meta.icon;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className="group bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-left shadow-sm hover:shadow-md hover:border-[#c14f16] dark:hover:border-[#c14f16] transition-all flex flex-col justify-between h-56 w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 dark:bg-slate-900 group-hover:bg-[#fef3ee] text-slate-500 dark:text-slate-400 group-hover:text-[#c14f16] rounded-lg w-fit transition-colors">
                        <IconComponent size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                          {meta.title}
                        </h2>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                          {meta.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-[#c14f16] transition-colors mt-4 block">
                      Enter Portal &rarr;
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
