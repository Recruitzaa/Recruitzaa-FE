import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';

import { initAxeAccessibility } from './lib/axe';

// Initialize axe-core for accessibility auditing in development mode
initAxeAccessibility();

// Handle Vite CSS and module preload errors (e.g. under proxy tools like Pastel or after staging redeployments)
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    console.warn('Intercepted Vite CSS/module preload error:', event);
    const reloadKey = 'recruitzaa_vite_preload_reload';
    const lastReload = sessionStorage.getItem(reloadKey);
    const now = Date.now();

    if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
      sessionStorage.setItem(reloadKey, now.toString());
      window.location.reload();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
