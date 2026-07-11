import styles from './Spinner.module.css';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | string;
}

export const Spinner = ({ children, className, ...props }: SpinnerProps) => {
  return (
    <div className={[styles.spinner, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
