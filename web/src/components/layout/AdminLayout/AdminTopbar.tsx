import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

const BREADCRUMB_MAP: Record<string, string> = {
  '/admin/dashboard': 'System Dashboard',
  '/admin/job-approvals': 'Job Approvals',
  '/admin/companies': 'Companies',
  '/admin/employers': 'Employer Accounts',
  '/admin/users': 'Candidate Users',
  '/admin/settings': 'Settings & API',
};

export const AdminTopbar = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();
  const currentPage = BREADCRUMB_MAP[location.pathname] ?? 'Admin';

  return (
    <header className="h-16 bg-white dark:bg-[#0f1117] border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <button
        type="button"
        onClick={onOpenMenu}
        className="md:hidden min-w-11 min-h-11 inline-flex items-center justify-center rounded-lg border border-slate-200"
        aria-label="Open admin navigation"
      >
        <Menu size={20} />
      </button>
      {/* Breadcrumbs */}
      <div>
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500">
          <Link to="/" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/admin/dashboard"
            className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            Admin
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{currentPage}</span>
        </div>
        <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
          {currentPage}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};
