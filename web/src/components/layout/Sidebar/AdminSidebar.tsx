import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import styles from './AdminSidebar.module.css';

export interface AdminSidebarLinkDef {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  links: AdminSidebarLinkDef[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export const AdminSidebar = ({ links, logo, footer }: AdminSidebarProps) => (
  <aside className={styles.sidebar}>
    {logo && <div className={styles.logo}>{logo}</div>}
    <nav className={styles.nav}>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <Icon size={18} className={styles.icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
    {footer && <div className={styles.footer}>{footer}</div>}
  </aside>
);
