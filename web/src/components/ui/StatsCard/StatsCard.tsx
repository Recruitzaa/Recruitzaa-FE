import styles from './StatsCard.module.css';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;       // percent, positive = up, negative = down
  trendLabel?: string;
  accent?: string;      // CSS color override for icon bg
}

export const StatsCard = ({
  label, value, icon: Icon, trend, trendLabel, accent,
}: StatsCardProps) => {
  const isUp = trend !== undefined && trend >= 0;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} style={accent ? { background: accent + '20', color: accent } : undefined}>
        <Icon size={22} />
      </div>
      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {trend !== undefined && (
          <span className={`${styles.trend} ${isUp ? styles.up : styles.down}`}>
            {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {Math.abs(trend)}% {trendLabel ?? 'vs last month'}
          </span>
        )}
      </div>
    </div>
  );
};
