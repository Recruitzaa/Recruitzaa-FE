import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import styles from './Sidebar.module.css';

export interface SidebarLinkDef {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  links: SidebarLinkDef[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Sidebar = ({ links, logo, footer }: SidebarProps) => (
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
