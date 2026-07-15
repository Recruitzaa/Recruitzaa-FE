import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToast } from './useToast';
import { addToast } from '../store/slices/ui.slice';

// Mock the hooks
const mockDispatch = vi.fn();
vi.mock('../store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

// Mock the slice action
vi.mock('../store/slices/ui.slice', () => ({
  addToast: vi.fn((payload) => ({ type: 'ui/addToast', payload })),
}));

describe('useToast Hook', () => {
  it('should dispatch addToast action for success notification', () => {
    const { result } = renderHook(() => useToast());

    result.current.success('Operation successful');

    expect(addToast).toHaveBeenCalledWith({
      type: 'success',
      message: 'Operation successful',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ui/addToast',
      payload: { type: 'success', message: 'Operation successful' },
    });
  });

  it('should dispatch addToast action for error notification', () => {
    const { result } = renderHook(() => useToast());

    result.current.error('Operation failed');

    expect(addToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Operation failed',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ui/addToast',
      payload: { type: 'error', message: 'Operation failed' },
    });
  });

  it('should dispatch addToast action for warning notification', () => {
    const { result } = renderHook(() => useToast());

    result.current.warning('Warning message');

    expect(addToast).toHaveBeenCalledWith({
      type: 'warning',
      message: 'Warning message',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ui/addToast',
      payload: { type: 'warning', message: 'Warning message' },
    });
  });

  it('should dispatch addToast action for info notification', () => {
    const { result } = renderHook(() => useToast());

    result.current.info('Info message');

    expect(addToast).toHaveBeenCalledWith({
      type: 'info',
      message: 'Info message',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ui/addToast',
      payload: { type: 'info', message: 'Info message' },
    });
  });
});
