import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../../../store/slices/ui.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeToast } from '../../../store/slices/ui.slice';
import styles from './Toast.module.css';

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
};

const AUTO_DISMISS_MS = 4000;

const ToastItem = ({ toast }: { toast: ToastType }) => {
  const dispatch = useAppDispatch();
  const Icon = ICONS[toast.type];

  useEffect(() => {
    const t = setTimeout(() => dispatch(removeToast(toast.id)), AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [toast.id, dispatch]);

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <Icon size={18} />
      <span>{toast.message}</span>
      <button
        className={styles.close}
        onClick={() => dispatch(removeToast(toast.id))}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const toasts = useAppSelector((s) => s.ui.toasts);
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
};
