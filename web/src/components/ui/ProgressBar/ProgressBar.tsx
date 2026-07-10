import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;       // 0–100
  label?: string;
  showPercent?: boolean;
  color?: string;
  height?: string;
}

export const ProgressBar = ({
  value, label, showPercent = true, color, height = '8px',
}: ProgressBarProps) => (
  <div className={styles.wrap}>
    {(label || showPercent) && (
      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        {showPercent && <span className={styles.percent}>{value}%</span>}
      </div>
    )}
    <div className={styles.track} style={{ height }}>
      <div
        className={styles.fill}
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  </div>
);
