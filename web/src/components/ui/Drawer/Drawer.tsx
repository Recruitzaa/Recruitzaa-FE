import styles from './Drawer.module.css';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Drawer = ({ children, className, ...props }: DrawerProps) => {
  return (
    <div className={[styles.drawer, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
