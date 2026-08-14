import { useEffect, useState } from 'react';
import { safeLocalStorage } from '../lib/safeStorage';

export type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'recruitzaa-theme-v2';

/**
 * useTheme — React hook to manage light and dark mode state.
 * - Defaults first-time visitors to light mode.
 * - Persists theme selection to localStorage.
 * - Dynamically toggles the `.dark` class on the <html> element to trigger Tailwind.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = safeLocalStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    safeLocalStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};
