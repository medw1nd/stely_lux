import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { FILTERS, WORKS, type Category } from '../site/data';
import { EASE, Reveal } from '../site/ui';

export default function Works() {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (filter === 'all' ? WORKS : WORKS.filter(w => w.category === filter)), [filter]);
  const rail = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 200, damping: 30 });
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onScroll = () => {
    const el = rail.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    progress.set(max > 0 ? Math.max(.08, el.scrollLeft / max) : 1);
  };
  useEffect(() => { rail.current?.scrollTo({ left: 0 }); onScroll(); }, [filter]);

  const page = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * .8, behavior: 'smooth' });

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen(i => (i! + 1) % list.length);
      if (e.key === 'ArrowLeft') setOpen(i => (i! - 1 + list.length) % list.length);
    };
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); };
  }, [open, list.length]);

  return (
    <section className="v-sec v-works" id="works">
      <div className="v-head">
        <Reveal>
          <span className="v-kicker" style={{ background: "rgba(255,255,255,.08)", color: "#fff", borderColor: "rgba(255,255,255,.15)" }}><i /> Портфоліо</span>
          <h2 className="v-h2">Наші роботи <span className="v-mark">наживо</span></h2>
        </Reveal>
        <Reveal delay={.12}>
          <div className="v-pills">
            {FILTERS.map(f => <button key={f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>)}
          </div>
        </Reveal>
      </div>

      <div
        ref={rail}
        className={`v-rail${dragging ? ' drag' : ''}`}
        onScroll={onScroll}
        onPointerDown={e => { if (e.pointerType !== 'mouse') return; drag.current = { down: true, x: e.clientX, left: rail.current!.scrollLeft, moved: false }; }}
        onPointerMove={e => {
          const d = drag.current; if (!d.down) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) { d.moved = true; setDragging(true); }
          rail.current!.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => { drag.current.down = false; setTimeout(() => setDragging(false), 0); }}
        onPointerLeave={() => { drag.current.down = false; setDragging(false); }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((w, i) => (
            <motion.button
              key={w.src}
              className="v-slide"
              onClick={() => { if (!drag.current.moved) setOpen(i); }}
              initial={{ opacity: 0, scale: .9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .9 }}
              viewport={{ amount: .3 }}
              transition={{ duration: .8, ease: EASE, delay: (i % 3) * .08 }}
              aria-label={`Відкрити: ${w.title}`}
            >
              <img src={w.src} alt={`${w.title} — робота Steli Lux`} loading="lazy" style={{ objectPosition: w.position }} draggable={false} />
              <span className="v-slide-cap"><span><small>{w.tag}</small><strong>{w.title}</strong></span><i><ArrowUpRight /></i></span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="v-works-foot">
        <div className="v-progress"><motion.span style={{ scaleX: smooth }} /></div>
        <div className="v-rail-nav">
          <button onClick={() => page(-1)} aria-label="Назад"><ArrowLeft /></button>
          <button onClick={() => page(1)} aria-label="Далі"><ArrowRight /></button>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="v-lb" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button className="v-lb-btn v-lb-close" onClick={() => setOpen(null)} aria-label="Закрити"><X /></button>
            <motion.figure key={list[open].src} initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .5, ease: EASE }} onClick={e => e.stopPropagation()}>
              <img src={list[open].src} alt={list[open].title} />
              <figcaption>
                <span><small>{list[open].tag}</small>{list[open].title}</span>
                <span className="v-lb-arrows">
                  <button className="v-lb-btn" onClick={() => setOpen((open - 1 + list.length) % list.length)} aria-label="Попереднє"><ArrowLeft /></button>
                  <button className="v-lb-btn" onClick={() => setOpen((open + 1) % list.length)} aria-label="Наступне"><ArrowRight /></button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
