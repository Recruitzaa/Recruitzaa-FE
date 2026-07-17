import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { logOut } from '../../services/auth.service';
import { useTheme } from '../../hooks/useTheme';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import logo from '../../assets/logo.png';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { getInitials, getRoleLabel, getNavItems } from './DashboardLayoutUtils';

/**
 * DashboardLayout — A responsive, high-fidelity layout shell for authenticated candidates.
 * Features a collapsible hamburger menu for mobile devices, a fixed sidebar for desktop view,
 * a top navigation header, and standard layout outlet spacing.
 */
export const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { appUser } = useAppSelector((state) => state.auth);
  const { toggleTheme, isDark } = useTheme();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navItems = getNavItems(appUser?.activeRole || 'CANDIDATE');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* ── Mobile Sidebar Overlay ── */}
      {isMobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar menu"
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMobileOpen(false);
            }
          }}
        />
      )}

      {/* ── Sidebar (Mobile + Desktop) ── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[260px] bg-white dark:bg-[#131924] border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
            <img
              src={logo}
              alt="recruitZaa"
              width="163"
              height="42"
              className="h-[42px] w-auto dark:brightness-0 dark:invert"
            />
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-brand-primary-light text-brand-primary dark:bg-brand-primary dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <WorkspaceSwitcher />

        {/* Footer / User Profile section */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-2 py-3">
            <Link
              to="/candidate/profile"
              onClick={() => setIsMobileOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="View Profile"
            >
              {appUser ? getInitials(appUser.displayName) : 'U'}
            </Link>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold truncate text-slate-900 dark:text-white">
                {appUser ? appUser.displayName : 'Loading...'}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">
                {appUser ? getRoleLabel(appUser.role) : 'Account'}
              </div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors border border-transparent hover:border-rose-100 dark:hover:border-rose-950/40"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Layout Column ── */}
      <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-6 sticky top-0 z-30">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 md:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:block">
            {appUser ? getRoleLabel(appUser.activeRole) : 'Workspace'} Hub
          </div>

          {/* Quick Sign Out Header Button */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/candidate/profile"
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 flex md:hidden items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="View Profile"
            >
              {appUser ? getInitials(appUser.displayName) : 'U'}
            </Link>
          </div>
        </header>

        {/* Content Outlet spacing */}
        <main className="flex-1 p-6 md:p-8 max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
