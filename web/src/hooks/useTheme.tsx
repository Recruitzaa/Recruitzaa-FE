import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { safeLocalStorage } from '../lib/safeStorage';

export type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'recruitzaa-theme-v2';

/**
 * Dynamically adjusts the browser favicon pixels for dark mode.
 * Replaces dark/black pixels with white so the favicon is visible on dark browser tabs.
 */
const updateFaviconTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  const links = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
  links.forEach((link: Element) => {
    const htmlLink = link as HTMLLinkElement;
    const originalHref = htmlLink.getAttribute('data-original-href') || htmlLink.href;

    // Store original href on first run so we can revert back to it in light mode
    if (!htmlLink.getAttribute('data-original-href')) {
      const hrefAttr = htmlLink.getAttribute('href') || '';
      htmlLink.setAttribute('data-original-href', hrefAttr);
    }

    if (!originalHref) return;

    // Only process PNG favicons
    if (originalHref.endsWith('.png') || originalHref.includes('favicon-')) {
      const img = new Image();
      // Ensure cross-origin is set if loaded from external hosts, though these are local
      img.crossOrigin = 'anonymous';
      img.src = originalHref;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        if (theme === 'dark') {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // If the pixel has opacity and is dark (r,g,b < 80), make it white
            if (a > 30 && r < 80 && g < 80 && b < 80) {
              data[i] = 255;
              data[i + 1] = 255;
              data[i + 2] = 255;
            }
          }
          ctx.putImageData(imgData, 0, 0);
          htmlLink.href = canvas.toDataURL();
        } else {
          htmlLink.href = originalHref;
        }
      };
    }
  });
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * ThemeProvider — holds the single, app-wide light/dark state.
 * Every `useTheme()` call reads from this one source, so toggling
 * the theme anywhere re-renders every consumer immediately — no
 * stale components left showing the old theme until their next mount.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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
    updateFaviconTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme — React hook to read/toggle the app-wide light/dark theme.
 * Must be used within a <ThemeProvider> (mounted once at the app root).
 */
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
