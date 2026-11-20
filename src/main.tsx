import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Designs live side by side:
 *  - «Сценарій світла» (3D configurator, default) → /
 *  - «Площина» (architectural minimal)          → /?design=plane
 *  - «Контур» (dark graphite + gold)            → /?design=kontur
 *  - «Сяйво» (bright, not chosen)                → /?design=vivid
 * Each design loads only its own stylesheet.
 */
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

const design = new URLSearchParams(window.location.search).get('design');

async function boot() {
  const root = ReactDOM.createRoot(rootElement!);
  if (design === 'compare') {
    // Side-by-side comparison: ?design=compare&a=light&b=kontur
    const q = new URLSearchParams(window.location.search);
    const a = q.get('a') ?? 'light', b = q.get('b') ?? 'kontur';
    const names: Record<string, string> = { light: 'Сценарій світла', kontur: 'Контур v2', plane: 'Площина', vivid: 'Сяйво' };
    const src = (d: string) => `/?design=${d}`;
    document.body.style.cssText = 'margin:0;background:#0c0c0b;color:#ece8e1;font-family:system-ui,sans-serif';
    const bar = { height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 13, borderBottom: '1px solid rgba(236,232,225,.12)' } as const;
    root.render(
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
        {[a, b].map((d, i) => (
          <div key={d} style={{ display: 'flex', flexDirection: 'column', borderLeft: i ? '1px solid rgba(236,232,225,.15)' : 0 }}>
            <div style={bar}><b>{names[d] ?? d}</b><a href={src(d)} target="_blank" rel="noreferrer" style={{ color: '#f6e6c6', textDecoration: 'none', fontSize: 12 }}>відкрити окремо ↗</a></div>
            <iframe src={src(d)} title={names[d] ?? d} style={{ flex: 1, width: '100%', border: 0 }} />
          </div>
        ))}
      </div>
    );
    return;
  }
  if (design === 'kontur') {
    await import('./assets/styles/index.css');
    const { default: App } = await import('./App');
    root.render(<React.StrictMode><App /></React.StrictMode>);
  } else if (design === 'vivid') {
    await import('./vivid/vivid.css');
    const { default: Vivid } = await import('./vivid/Vivid');
    root.render(<React.StrictMode><Vivid /></React.StrictMode>);
  } else if (design === 'plane') {
    await import('./plane/plane.css');
    const { default: Plane } = await import('./plane/Plane');
    root.render(<React.StrictMode><Plane /></React.StrictMode>);
  } else {
    await import('./light/light.css');
    const { default: Light } = await import('./light/Light');
    root.render(<React.StrictMode><Light /></React.StrictMode>);
  }
}

boot();
