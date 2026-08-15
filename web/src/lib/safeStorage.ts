/**
 * Guarded wrappers around the Web Storage API.
 *
 * Safari private browsing throws on every call to `localStorage`/`sessionStorage`,
 * and any browser can throw `QuotaExceededError` on `setItem`. Reading or
 * writing storage directly can crash a component (or, at module-evaluation
 * time, the whole app before React even mounts). These wrappers absorb those
 * throws and report success via a boolean instead.
 */
interface SafeStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): boolean;
  removeItem(key: string): boolean;
  clear(): boolean;
}

const createSafeStorage = (getStorage: () => Storage): SafeStorage => ({
  getItem(key) {
    try {
      return getStorage().getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key, value) {
    try {
      getStorage().setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key) {
    try {
      getStorage().removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  clear() {
    try {
      getStorage().clear();
      return true;
    } catch {
      return false;
    }
  },
});

export const safeLocalStorage = createSafeStorage(() => window.localStorage);
export const safeSessionStorage = createSafeStorage(() => window.sessionStorage);
