import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUp, Menu, Phone, X } from 'lucide-react';
import { FACEBOOK, NAV, PHONE, PHONE_LABEL } from '../site/data';
import { EASE, scrollToId } from '../site/ui';

export const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/** «Контур стелі» mark in the bright palette. */
export function Mark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="30" height="30" rx="8" stroke="#16130f" strokeWidth="2" />
      <path d="M12 12h16" stroke="#ee5a24" strokeWidth="6" strokeLinecap="round" opacity=".2" />
      <path d="M12 12h16" stroke="#ee5a24" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <motion.header className="v-header" initial={{ y: -80, x: '-50%' }} animate={{ y: 0, x: '-50%' }} transition={{ duration: .9, ease: EASE, delay: .1 }}>
        <button className="v-brand" onClick={toTop} aria-label="Steli Lux — нагору"><Mark /><b>steli<span>lux</span></b></button>
        <nav className="v-nav" aria-label="Навігація">
          {NAV.map(n => <button key={n.id} className={active === n.id ? 'on' : ''} onClick={() => go(n.id)}>{n.label}</button>)}
        </nav>
        <a className="v-btn v-btn-main" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
        <button className="v-burger" onClick={() => setOpen(true)} aria-label="Меню"><Menu /></button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="v-menu" initial={{ clipPath: 'circle(0% at 92% 6%)' }} animate={{ clipPath: 'circle(150% at 92% 6%)' }} exit={{ clipPath: 'circle(0% at 92% 6%)' }} transition={{ duration: .7, ease: EASE }}>
            <button className="v-menu-close" onClick={() => setOpen(false)} aria-label="Закрити"><X /></button>
            <nav>
              {NAV.map((n, i) => (
                <motion.button key={n.id} onClick={() => go(n.id)} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2 + i * .06, duration: .6, ease: EASE }}>{n.label}</motion.button>
              ))}
            </nav>
            <div className="v-menu-foot">
              <a className="v-btn v-btn-ink" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
              <a className="v-btn v-btn-soft" href={FACEBOOK} target="_blank" rel="noreferrer">Написати у Facebook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Floating() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * .9);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.button key="top" className="v-top" onClick={toTop} aria-label="Нагору"
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <svg className="ring" viewBox="0 0 68 68" aria-hidden="true">
              <circle className="trk" cx="34" cy="34" r="31" />
              <motion.circle className="bar" cx="34" cy="34" r="31" style={{ pathLength: scrollYProgress }} />
            </svg>
            <ArrowUp />
          </motion.button>
          <motion.a key="cta" className="v-btn v-btn-main v-mcta" href={`tel:${PHONE}`}
            initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ duration: .5, ease: EASE }}>
            <Phone /> Зателефонувати
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
