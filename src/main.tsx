import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Three designs live side by side:
 *  - «Площина» (architectural minimal, default) → /
 *  - «Контур» (dark graphite + gold)            → /?design=kontur
 *  - «Сяйво» (bright, not chosen)                → /?design=vivid
 * Each design loads only its own stylesheet.
 */
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

const design = new URLSearchParams(window.location.search).get('design');

async function boot() {
  const root = ReactDOM.createRoot(rootElement!);
  if (design === 'kontur') {
    await import('./assets/styles/index.css');
    const { default: App } = await import('./App');
    root.render(<React.StrictMode><App /></React.StrictMode>);
  } else if (design === 'vivid') {
    await import('./vivid/vivid.css');
    const { default: Vivid } = await import('./vivid/Vivid');
    root.render(<React.StrictMode><Vivid /></React.StrictMode>);
  } else {
    await import('./plane/plane.css');
    const { default: Plane } = await import('./plane/Plane');
    root.render(<React.StrictMode><Plane /></React.StrictMode>);
  }
}

boot();
