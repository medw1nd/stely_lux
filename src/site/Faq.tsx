import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FAQ, PHONE } from './data';
import { EASE, Reveal } from './ui';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section ivory">
      <div className="faq">
        <Reveal className="faq-aside">
          <span className="eyebrow">Питання</span>
          <h2 className="h-section">Що варто знати<br /><em>до заміру</em></h2>
          <p className="lead">Не знайшли відповідь? Зателефонуйте — пояснимо без складних слів.</p>
          <a className="btn btn-ghost dark" href={`tel:${PHONE}`} style={{ marginTop: 34 }}>Поставити питання <ArrowRight /></a>
        </Reveal>
        <div>
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * .05} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {f.q}<span className="faq-icon" />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: .6, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
