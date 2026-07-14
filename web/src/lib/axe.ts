import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Initializes axe-core accessibility auditing in development mode only.
 * Uses dynamic import so the ~500 KB axe-core library is completely
 * tree-shaken out of the production bundle.
 */
export async function initAxeAccessibility(): Promise<void> {
  if (!import.meta.env.DEV) return;

  const axe = await import('@axe-core/react');
  axe.default(React, ReactDOM, 1000);

  console.info(
    '%c♿ axe-core accessibility auditing active — violations will appear in the console.',
    'color: #c14f16; font-weight: bold;'
  );
}
