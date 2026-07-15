import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import uiReducer, {
  addToast,
  removeToast,
  openModal,
  closeModal,
  toggleSidebar,
  setMobileDrawer,
  type Toast,
} from './ui.slice';

describe('UI Slice', () => {
  const initialState = {
    toasts: [],
    activeModal: null,
    isSidebarCollapsed: false,
    isMobileDrawerOpen: false,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToast', () => {
    const toastPayload = { message: 'Success!', type: 'success' as const };
    const actual = uiReducer(initialState, addToast(toastPayload));

    expect(actual.toasts).toHaveLength(1);
    expect(actual.toasts[0].message).toBe('Success!');
    expect(actual.toasts[0].type).toBe('success');
    expect(actual.toasts[0].id).toBe(Date.now().toString());
  });

  it('should handle removeToast', () => {
    const stateWithToast = {
      ...initialState,
      toasts: [{ id: 'toast123', message: 'Error!', type: 'error' as const }],
    };
    const actual = uiReducer(stateWithToast, removeToast('toast123'));
    expect(actual.toasts).toHaveLength(0);
  });

  it('should handle openModal', () => {
    const actual = uiReducer(initialState, openModal('login'));
    expect(actual.activeModal).toBe('login');
  });

  it('should handle closeModal', () => {
    const stateWithModal = { ...initialState, activeModal: 'login' };
    const actual = uiReducer(stateWithModal, closeModal());
    expect(actual.activeModal).toBeNull();
  });

  it('should toggleSidebar', () => {
    const actual = uiReducer(initialState, toggleSidebar());
    expect(actual.isSidebarCollapsed).toBe(true);

    const actual2 = uiReducer({ ...initialState, isSidebarCollapsed: true }, toggleSidebar());
    expect(actual2.isSidebarCollapsed).toBe(false);
  });

  it('should handle setMobileDrawer', () => {
    const actual = uiReducer(initialState, setMobileDrawer(true));
    expect(actual.isMobileDrawerOpen).toBe(true);

    const actual2 = uiReducer(
      { ...initialState, isMobileDrawerOpen: true },
      setMobileDrawer(false)
    );
    expect(actual2.isMobileDrawerOpen).toBe(false);
  });
});
