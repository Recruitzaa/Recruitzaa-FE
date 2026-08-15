import { Link, useLocation } from 'react-router-dom';
import { getBreadcrumbTrail } from '../../../config/routes.meta';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  /** Override the current page label (e.g. job title). */
  currentLabel?: string;
  className?: string;
}

export const Breadcrumbs = ({ currentLabel, className }: BreadcrumbsProps) => {
  const { pathname } = useLocation();
  const items = getBreadcrumbTrail(pathname, currentLabel);

  if (items.length === 0) return null;

  return (
    <nav className={`${styles.nav} ${className ?? ''}`.trim()} aria-label="Breadcrumb">
      <div className={styles.container}>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className={styles.item}>
                {item.to && !isLast ? (
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
