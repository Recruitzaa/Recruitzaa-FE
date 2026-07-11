import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
}

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  radius = 'var(--radius-sm)',
  className = '',
}: SkeletonProps) => (
  <div
    className={`${styles.skeleton} ${className}`}
    style={{ width, height, borderRadius: radius }}
  />
);

export const SkeletonCard = () => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <Skeleton width="40px" height="40px" radius="50%" />
      <div style={{ flex: 1 }}>
        <Skeleton height="0.9rem" width="60%" />
        <Skeleton height="0.75rem" width="40%" />
      </div>
    </div>
    <Skeleton height="0.85rem" />
    <Skeleton height="0.85rem" width="80%" />
    <Skeleton height="0.85rem" width="55%" />
  </div>
);
