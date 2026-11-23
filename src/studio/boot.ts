import page from './page.html?raw';
import css from './studio.css?raw';
import { FACEBOOK, PHONE, PHONE_LABEL, TELEGRAM } from '../site/data';

const STYLES = ['system.css', 'ui/cards.css', 'motion/motion.css', 'layout/layout.css', 'icons/icon.css'];
const SCRIPTS = ['system.js', 'motion/motion.js', 'layout/layout.js'];
const FONT = 'https://fonts.googleapis.com/css2?family=Onest:wght@400..700&display=swap';

const addStyle = (href: string) => new Promise<void>(done => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.onload = link.onerror = () => done();
  document.head.appendChild(link);
});

const addMeta = (name: string, content: string) => {
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
};

/** The before/after light switch: drag, keyboard, or the button. */
function initCompare() {
  const box = document.querySelector<HTMLElement>('[data-compare]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-compare-toggle]');
  if (!box || !toggle) return;
  let pos = 50;
  let dragging = false;
  const set = (value: number, glide = false) => {
    pos = Math.min(100, Math.max(0, value));
    box.classList.toggle('is-gliding', glide);
    box.style.setProperty('--pos', `${pos}%`);
    box.setAttribute('aria-valuenow', String(Math.round(pos)));
    box.setAttribute('aria-valuetext', `Без світла ${Math.round(pos)}% кадру, зі світлом ${100 - Math.round(pos)}%`);
    toggle.textContent = pos < 50 ? 'Вимкнути світло' : 'Увімкнути світло';
  };
  const fromPointer = (x: number) => {
    const rect = box.getBoundingClientRect();
    set(((x - rect.left) / rect.width) * 100);
  };
  box.addEventListener('pointerdown', e => { dragging = true; box.setPointerCapture(e.pointerId); fromPointer(e.clientX); });
  box.addEventListener('pointermove', e => { if (dragging) fromPointer(e.clientX); });
  ['pointerup', 'pointercancel'].forEach(type => box.addEventListener(type, () => { dragging = false; }));
  box.addEventListener('keydown', e => {
    const next = ({ ArrowLeft: pos - 5, ArrowDown: pos - 5, ArrowRight: pos + 5, ArrowUp: pos + 5, Home: 0, End: 100 } as Record<string, number>)[e.key];
    if (next === undefined) return;
    e.preventDefault();
    set(next);
  });
  toggle.addEventListener('click', () => set(pos < 50 ? 100 : 0, true));
  set(50);
}

export default async function bootStudio() {
  const html = document.documentElement;
  html.lang = 'uk';
  Object.assign(html.dataset, { type: 'service', radius: 'soft', buttons: 'arrow', motion: '' });
  addMeta('site-kind', 'other');
  addMeta('page-type', 'service');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#d2cabd');

  html.classList.add('m-enter', 'mo-js');
  setTimeout(() => html.classList.add('m-enter-done'), 700);
  setTimeout(() => html.classList.add('mo-safe'), 2500);

  await Promise.all([addStyle(FONT), ...STYLES.map(file => addStyle(`/assets/${file}`))]);
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const filled = page
    .replaceAll('{{PHONE}}', PHONE)
    .replaceAll('{{PHONE_LABEL}}', PHONE_LABEL)
    .replaceAll('{{TELEGRAM}}', TELEGRAM)
    .replaceAll('{{FACEBOOK}}', FACEBOOK)
    .replaceAll('{{YEAR}}', String(new Date().getFullYear()));
  const template = document.createElement('template');
  template.innerHTML = filled;
  document.getElementById('root')!.replaceWith(template.content);

  initCompare();
  SCRIPTS.forEach(file => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `/assets/${file}`;
    document.body.appendChild(script);
  });
}
