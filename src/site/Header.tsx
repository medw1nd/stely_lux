import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { FACEBOOK, FEATURES, NAV, PHONE, PHONE_LABEL } from './data';
import { Brand, EASE, scrollToId } from './ui';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <motion.header
        className={`header${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: .2 }}
      >
        <Brand onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <nav className="nav" aria-label="Головна навігація">
          {NAV.map(({ id, label }) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <a className="header-phone" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
        <button className="burger" onClick={() => setOpen(true)} aria-label="Відкрити меню"><span /><span /></button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: .8, ease: EASE }}
          >
            <button className="menu-close" onClick={() => setOpen(false)} aria-label="Закрити меню"><X /></button>
            <span className="eyebrow">Навігація</span>
            <nav style={{ marginTop: 30 }}>
              {NAV.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .8, ease: EASE, delay: .25 + i * .06 }}
                >
                  <small>0{i + 1}</small>{label}
                </motion.button>
              ))}
            </nav>
            <div className="menu-foot">
              <a className="btn btn-gold" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
              {FEATURES.leadForm
                ? <button className="btn btn-ghost" onClick={() => go('contacts')}>Залишити заявку</button>
                : <a className="btn btn-ghost" href={FACEBOOK} target="_blank" rel="noreferrer">Написати у Facebook</a>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
