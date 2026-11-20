import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { FILTERS, WORKS, type Category } from './data';
import { EASE, Reveal } from './ui';

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [index, setIndex] = useState<number | null>(null);
  const list = useMemo(() => (filter === 'all' ? WORKS : WORKS.filter(w => w.category === filter)), [filter]);

  const step = (d: number) => setIndex(i => (i === null ? i : (i + d + list.length) % list.length));

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [index, list.length]);

  const current = index !== null ? list[index] : null;

  return (
    <section className="section" id="works">
      <div className="sec-head">
        <Reveal>
          <span className="eyebrow">Портфоліо</span>
          <h2 className="h-section">Роботи, які<br /><em className="gold-text">говорять самі</em></h2>
        </Reveal>
        <Reveal delay={.1}>
          <div className="filters" role="tablist" aria-label="Фільтр робіт">
            {FILTERS.map(f => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div layout className="gallery">
        <AnimatePresence mode="popLayout">
          {list.map((w, i) => (
            <motion.button
              layout
              key={w.src}
              className={`tile${w.size && filter === 'all' ? ' ' + w.size : ''}`}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: .96 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .9, ease: EASE, delay: (i % 4) * .07 }}
              aria-label={`Відкрити: ${w.title}`}
            >
              <img src={w.src} alt={`${w.title} — робота Steli Lux`} loading={i > 3 ? 'lazy' : undefined} style={{ objectPosition: w.position }} />
              <span className="tile-plus"><Plus /></span>
              <span className="tile-info"><small>{w.tag}</small><strong>{w.title}</strong></span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>


      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox" role="dialog" aria-modal="true" aria-label="Перегляд роботи"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}
            onClick={() => setIndex(null)}
          >
            <div className="lb-top" onClick={e => e.stopPropagation()}>
              <span>{String(index! + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
              <button className="icon-btn" onClick={() => setIndex(null)} aria-label="Закрити"><X /></button>
            </div>
            <div className="lb-stage">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.title}
                  onClick={e => e.stopPropagation()}
                  initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .99 }}
                  transition={{ duration: .6, ease: EASE }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.4}
                  onDragEnd={(_, info) => { if (info.offset.x < -80) step(1); if (info.offset.x > 80) step(-1); }}
                />
              </AnimatePresence>
            </div>
            <div className="lb-bottom" onClick={e => e.stopPropagation()}>
              <div><small>{current.tag}</small><strong>{current.title}</strong></div>
              <div className="lb-arrows">
                <button className="icon-btn" onClick={() => step(-1)} aria-label="Попереднє фото"><ArrowLeft /></button>
                <button className="icon-btn" onClick={() => step(1)} aria-label="Наступне фото"><ArrowRight /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
