import styles from './Modal.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Modal = ({ children, className, ...props }: ModalProps) => {
  return (
    <div className={[styles.modal, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
