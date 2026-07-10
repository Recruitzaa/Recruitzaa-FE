import styles from './ConfirmDialog.module.css';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  isOpen, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm, onCancel,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()} role="alertdialog" aria-modal="true">
        <div className={`${styles.iconWrap} ${styles[variant]}`}>
          <AlertTriangle size={24} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>{cancelLabel}</button>
          <button className={`${styles.confirm} ${styles[variant]}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
