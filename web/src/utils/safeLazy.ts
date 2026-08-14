import React from 'react';
import { safeSessionStorage } from '../lib/safeStorage';

/**
 * Resilient wrapper for React.lazy dynamic imports.
 * Intercepts Vite CSS preload and module chunk failures caused by proxy tools (e.g., Pastel usepastel.com),
 * staging redeployments, or dynamic asset hash changes.
 */
export function safeLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return React.lazy(async () => {
    try {
      return await factory();
    } catch (error: any) {
      const message = error?.message || '';
      const isPreloadOrChunkError =
        message.includes('Unable to preload CSS') ||
        message.includes('Failed to fetch dynamically imported module') ||
        message.includes('Importing a module script failed');

      if (isPreloadOrChunkError) {
        console.warn('Vite asset/CSS preload failure detected:', message);

        const reloadKey = 'recruitzaa_lazy_reload_' + window.location.pathname;
        const hasReloaded = safeSessionStorage.getItem(reloadKey);

        if (!hasReloaded) {
          safeSessionStorage.setItem(reloadKey, 'true');
          window.location.reload();
          return new Promise<{ default: T }>(() => {});
        }
      }

      throw error;
    }
  });
}
