import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { switchActiveRole } from '../../store/slices/auth.slice';
import type { UserRole } from '../../types/auth.types';
import { RefreshCw } from 'lucide-react';

const ROLE_LABELS: Record<UserRole, string> = {
  CANDIDATE: 'Job Seeker',
  EMPLOYER: 'Employer',
  EXPERT: 'Tutor',
  EMPLOYEE: 'Employee',
  SUPER_ADMIN: 'Admin',
};

const ROLE_REDIRECTS: Record<UserRole, string> = {
  CANDIDATE: '/candidate/dashboard',
  EMPLOYER: '/employer/dashboard',
  EXPERT: '/expert/dashboard',
  EMPLOYEE: '/employee/dashboard',
  SUPER_ADMIN: '/admin/dashboard',
};

export const WorkspaceSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { appUser } = useAppSelector((state) => state.auth);

  if (!appUser || !appUser.availableRoles || appUser.availableRoles.length <= 1) {
    return null;
  }

  // Filter out the current active role to display the "other" roles
  const currentActive = appUser.activeRole || appUser.role;
  const otherRoles = appUser.availableRoles.filter((r) => r !== currentActive);

  const handleSwitch = (newRole: UserRole) => {
    dispatch(switchActiveRole(newRole));
    setTimeout(() => {
      navigate(ROLE_REDIRECTS[newRole]);
    }, 0);
  };

  return (
    <>
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-850 space-y-2">
        <span className="text-sm font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
          Switch workspace
        </span>
        <div className="space-y-1">
          {otherRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleSwitch(role)}
              aria-label={`Switch to ${ROLE_LABELS[role]} workspace`}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-bold rounded-lg text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-[#c14f16] dark:hover:text-[#c14f16] transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2"
            >
              <RefreshCw
                size={12}
                className="text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
              <span>{ROLE_LABELS[role]}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default WorkspaceSwitcher;
