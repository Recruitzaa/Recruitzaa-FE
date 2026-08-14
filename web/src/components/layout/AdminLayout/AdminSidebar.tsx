import { useCallback, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import { WorkspaceSwitcher } from '../WorkspaceSwitcher';
import {
  LayoutDashboard,
  CheckSquare,
  Building2,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  X,
} from 'lucide-react';
import styles from './AdminSidebar.module.css';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { ROUTES } from '../../../config/routes';
import { BRAND } from '../../../config/content';
import { UserAvatar } from '../../ui/UserAvatar/UserAvatar';

const NAV = [
  {
    section: 'Platform Core',
    items: [
      { label: 'System Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Job Approvals', path: '/admin/job-approvals', icon: CheckSquare },
    ],
  },
  {
    section: 'Entities',
    items: [
      { label: 'Companies', path: '/admin/companies', icon: Building2 },
      { label: 'Employer Accounts', path: '/admin/employers', icon: Briefcase },
      { label: 'Candidate Users', path: '/admin/users', icon: Users },
    ],
  },
  {
    section: 'System',
    items: [{ label: 'Settings & API', path: '/admin/settings', icon: Settings }],
  },
];

export const AdminSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const closeSidebar = useCallback(onClose, [onClose]);
  useFocusTrap(isOpen, sidebarRef, { onEscape: closeSidebar });
  const navigate = useNavigate();
  const { appUser } = useAppSelector((s) => s.auth);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={onClose}
          aria-label="Close admin navigation"
        />
      )}
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Admin navigation"
        tabIndex={-1}
      >
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={12} className="text-white" />
            </div>
            <span className={styles.logoText}>
              {BRAND.name}{' '}
              <span className="text-sm text-red-600 font-bold ml-1 uppercase tracking-wide">
                Admin
              </span>
            </span>
          </Link>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close admin navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <ul className={styles.menu}>
          {NAV.map((group) => (
            <li key={group.section}>
              <p className={styles.sectionLabel}>{group.section}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ''}`
                      }
                    >
                      <span className="flex items-center gap-2.5">
                        <item.icon size={14} className="shrink-0" />
                        {item.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={handleSignOut}
              className={styles.linkButton}
              aria-label="Sign out of admin console"
            >
              <span className="flex items-center gap-2.5">
                <LogOut size={14} className="shrink-0" />
                Sign Out
              </span>
            </button>
          </li>
        </ul>

        <WorkspaceSwitcher />

        {/* User Footer */}
        <div className={styles.user}>
          <div className={`${styles.avatar} bg-red-600`}>
            <UserAvatar
              photoUrl={appUser?.photoUrl}
              name={appUser?.displayName}
              fallbackText="SA"
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{appUser?.displayName ?? 'Super Admin'}</div>
            <div className={styles.userRole}>System Operator</div>
          </div>
        </div>
      </aside>
    </>
  );
};
