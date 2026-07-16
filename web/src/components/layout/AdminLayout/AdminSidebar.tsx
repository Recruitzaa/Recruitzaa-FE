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
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const NAV = [
  {
    section: 'Platform Core',
    items: [
      { label: 'System Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Job Approvals', path: '/admin/job-approvals', icon: CheckSquare, badge: '5' },
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

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { appUser } = useAppSelector((s) => s.auth);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={12} className="text-white" />
          </div>
          <span className={styles.logoText}>
            recruitZaa{' '}
            <span className="text-[10px] text-red-600 font-bold ml-1 uppercase tracking-wide">
              Admin
            </span>
          </span>
        </Link>
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
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon size={14} className="shrink-0" />
                      {item.label}
                    </span>
                    {'badge' in item && item.badge && (
                      <span className={styles.badge}>{item.badge}</span>
                    )}
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
          {appUser ? getInitials(appUser.displayName) : 'SA'}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{appUser?.displayName ?? 'Super Admin'}</div>
          <div className={styles.userRole}>System Operator</div>
        </div>
      </div>
    </aside>
  );
};
