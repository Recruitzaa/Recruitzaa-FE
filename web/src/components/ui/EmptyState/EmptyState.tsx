import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => (
  <div className={styles.wrap}>
    {icon && <div className={styles.icon}>{icon}</div>}
    <h3 className={styles.title}>{title}</h3>
    {description && <p className={styles.desc}>{description}</p>}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);
