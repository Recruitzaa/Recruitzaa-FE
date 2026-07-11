/**
 * Secure and robust wrapper for browser localStorage.
 * Automatically serializes objects to JSON and catches storage disabled errors.
 */
export const storage = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Error writing to localStorage:', e);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Error removing from localStorage:', e);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  },
};
