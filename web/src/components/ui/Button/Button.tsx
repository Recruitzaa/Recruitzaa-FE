import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ children, className, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
