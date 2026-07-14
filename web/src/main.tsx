import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';

import { initAxeAccessibility } from './lib/axe';

// Initialize axe-core for accessibility auditing in development mode
initAxeAccessibility();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
