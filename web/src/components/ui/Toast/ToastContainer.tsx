import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../../../store/slices/ui.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeToast } from '../../../store/slices/ui.slice';
import styles from './Toast.module.css';

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const LABELS = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
};

const AUTO_DISMISS_MS = 5000;

const ToastItem = ({ toast }: { toast: ToastType }) => {
  const dispatch = useAppDispatch();
  const [isPaused, setIsPaused] = useState(false);
  const Icon = ICONS[toast.type];

  // Errors persist until dismissed: a timed-out error message is a
  // WCAG 2.2.1 (Timing Adjustable) failure, and users cannot act on
  // feedback they didn't have time to read.
  const shouldAutoDismiss = toast.type !== 'error' && !isPaused;

  useEffect(() => {
    if (!shouldAutoDismiss) return;
    const timer = setTimeout(() => dispatch(removeToast(toast.id)), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch, shouldAutoDismiss]);

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Icon size={18} aria-hidden="true" />
      <span>
        <span className={styles.typeLabel}>{LABELS[toast.type]}:</span> {toast.message}
      </span>
      <button
        type="button"
        className={styles.close}
        onClick={() => dispatch(removeToast(toast.id))}
        aria-label={`Dismiss: ${toast.message}`}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const toasts = useAppSelector((s) => s.ui.toasts);

  // The live region stays mounted at all times. Returning null when empty
  // destroys and recreates it on every toast, and a live region has to
  // already exist in the DOM before content lands in it to be announced
  // reliably — mounting it with the content is the classic reason
  // announcements get missed.
  return (
    <div className={styles.container} role="region" aria-label="Notifications">
      <div aria-live="polite" aria-atomic="false">
        {toasts
          .filter((t) => t.type !== 'error')
          .map((t) => (
            <ToastItem key={t.id} toast={t} />
          ))}
      </div>
      <div role="alert">
        {toasts
          .filter((t) => t.type === 'error')
          .map((t) => (
            <ToastItem key={t.id} toast={t} />
          ))}
      </div>
    </div>
  );
};
