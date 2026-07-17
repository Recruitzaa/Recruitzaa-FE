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
    desc: 'Browse jobs, track applications, prepare with AI career tools, and connect with mentors.',
    path: '/candidate/dashboard',
    icon: Briefcase,
  },
  EMPLOYER: {
    title: 'Employer Workspace',
    desc: 'Post new positions, manage applicant screening queues, and track hiring analytics.',
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
    desc: 'Manage your active contracts, view payslips, and track internal tasks.',
    path: '/employee/dashboard',
    icon: FileText,
  },
  SUPER_ADMIN: {
    title: 'Super Admin Command Center',
    desc: 'Monitor platform health, manage user permissions, and moderate content.',
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

  // Display all 5 roles on the Launchpad for demo/testing purposes
  // (In production, you might want to restrict this to only appUser.availableRoles)
  const displayRoles: UserRole[] = ['CANDIDATE', 'EMPLOYER', 'EXPERT', 'EMPLOYEE', 'SUPER_ADMIN'];

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
          <div className="max-w-5xl w-full space-y-8">
            {/* Header branding */}
            <div className="text-center space-y-3">
              <img src={logo} alt="Recruitzaa Logo" className="h-10 mx-auto" />
              <h1 className="text-2xl font-black text-[#1e2229] dark:text-white tracking-tight">
                Enterprise Launchpad
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Welcome back,{' '}
                <span className="font-extrabold text-[#c14f16]">{appUser.displayName}</span>. Please
                choose which profile workspace you want to enter for this session.
              </p>
            </div>

            {/* Grid of portal cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {displayRoles.map((role) => {
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
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-[#c14f16] transition-colors mt-4 block">
                      Enter Portal &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};
export default LaunchpadPage;
