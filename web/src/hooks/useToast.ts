import { useAppDispatch } from '../store/hooks';
import { addToast } from '../store/slices/ui.slice';

/**
 * useToast — simple hook to fire toast notifications from anywhere.
 *
 * Usage:
 *   const { success, error, warning, info } = useToast();
 *   success('Profile saved!');
 */
export const useToast = () => {
  const dispatch = useAppDispatch();

  return {
    success: (message: string) => dispatch(addToast({ type: 'success', message })),
    error:   (message: string) => dispatch(addToast({ type: 'error',   message })),
    warning: (message: string) => dispatch(addToast({ type: 'warning', message })),
    info:    (message: string) => dispatch(addToast({ type: 'info',    message })),
  };
};
