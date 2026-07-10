import styles from './Avatar.module.css';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Avatar = ({ children, className, ...props }: AvatarProps) => {
  return (
    <div className={[styles.avatar, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
