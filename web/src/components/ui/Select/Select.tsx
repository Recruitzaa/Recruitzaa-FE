import styles from './Select.module.css';

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Select = ({ children, className, ...props }: SelectProps) => {
  return (
    <div className={[styles.select, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
