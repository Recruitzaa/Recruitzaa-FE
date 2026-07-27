import { useEffect, type RefObject } from 'react';

interface FocusTrapOptions {
  onEscape?: () => void;
  lockScroll?: boolean;
}

export const useFocusTrap = (
  isOpen: boolean,
  ref: RefObject<HTMLElement | null>,
  { onEscape, lockScroll = true }: FocusTrapOptions = {}
) => {
  useEffect(() => {
    if (!isOpen) return;
    const el = ref.current;
    if (!el) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = 'hidden';

    const getFocusable = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((node) => !node.hasAttribute('hidden'));

    const focusable = getFocusable();
    (focusable[0] ?? el).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key !== 'Tab') return;
      const currentFocusable = getFocusable();
      if (currentFocusable.length === 0) {
        e.preventDefault();
        el.focus();
        return;
      }
      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !el.contains(document.activeElement)) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, ref, onEscape, lockScroll]);
};
