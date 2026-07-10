import styles from './Badge.module.css';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge = ({ children, className, variant = 'neutral', ...props }: BadgeProps) => {
  const classes = [
    styles.badge,
    styles[`variant-\${variant}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
