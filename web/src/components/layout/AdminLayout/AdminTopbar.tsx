import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

const BREADCRUMB_MAP: Record<string, string> = {
  '/admin/dashboard': 'System Dashboard',
  '/admin/job-approvals': 'Job Approvals',
  '/admin/companies': 'Companies',
  '/admin/employers': 'Employer Accounts',
  '/admin/users': 'Candidate Users',
  '/admin/settings': 'Settings & API',
};

export const AdminTopbar = () => {
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();
  const currentPage = BREADCRUMB_MAP[location.pathname] ?? 'Admin';

  return (
    <header className="h-16 bg-white dark:bg-[#0f1117] border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Breadcrumbs */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
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
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          type="button"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <Button variant="outline" size="sm">
          Generate Report
        </Button>
      </div>
    </header>
  );
};
