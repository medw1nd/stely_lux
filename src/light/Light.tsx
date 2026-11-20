import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { FACEBOOK, FAQ, HOURS, PHONE, PHONE_LABEL, SOLUTIONS, STEPS, WORKS } from '../site/data';
import { EASE, Reveal, scrollToId } from '../site/ui';
import type { Mode } from './Scene';

const Scene = lazy(() => import('./Scene'));
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const NAV = [
  { id: 'solutions', label: 'Рішення' },
  { id: 'works', label: 'Роботи' },
  { id: 'materials', label: 'Матеріали' },
  { id: 'process', label: 'Процес' },
  { id: 'contacts', label: 'Контакти' },
];

const MODES: { id: Mode; label: string; text: string }[] = [
  { id: 'contour', label: 'Контур', text: 'Світло по периметру — стеля ніби ширяє над кімнатою.' },
  { id: 'lines', label: 'Лінії', text: 'Вбудовані світлові лінії задають геометрію простору.' },
  { id: 'tracks', label: 'Треки', text: 'Магнітні треки врівень зі стелею — акцентне світло.' },
  { id: 'off', label: 'Вимк.', text: 'Вимкнене світло: лише рівна глянцева площина.' },
];

/** Logo: two ceiling corners with a point of light. */
export function Logo() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M4 40V4h36" stroke="currentColor" strokeWidth="6" />
      <path d="M76 40v36H40" stroke="currentColor" strokeWidth="6" />
      <circle cx="40" cy="40" r="17" fill="#f3dfb8" opacity=".14" />
      <circle className="l-logo-dot" cx="40" cy="40" r="7" fill="#f6e6c6" />
    </svg>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const o = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * .6);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <>
      <header className={`l-header${solid ? ' solid' : ''}`}>
        <button className="l-brand" onClick={toTop} aria-label="Steli Lux — нагору"><Logo /><b>Steli Lux</b></button>
        <nav className="l-nav">{NAV.map(n => <button key={n.id} className={active === n.id ? 'on' : ''} onClick={() => go(n.id)}>{n.label}</button>)}</nav>
        <a className="l-head-phone" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
        <button className="l-burger" onClick={() => setOpen(true)} aria-label="Меню"><Menu /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="l-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
            <button className="l-menu-close" onClick={() => setOpen(false)} aria-label="Закрити"><X /></button>
            <nav>{NAV.map((n, i) => <motion.button key={n.id} onClick={() => go(n.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 + i * .05, duration: .5, ease: EASE }}>{n.label}</motion.button>)}</nav>
            <div className="l-menu-foot">
              <a className="l-btn l-btn-light" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
              <a className="l-btn l-btn-ghost" href={FACEBOOK} target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Hero with the 3D configurator ---------------- */
function Hero() {
  const [mode, setMode] = useState<Mode>('off');
  const [auto, setAuto] = useState(true);
  const [ready, setReady] = useState(false);

  // switch the light on after load, then cycle scenarios until the visitor picks one
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setMode('contour'), 700);
    return () => clearTimeout(t);
  }, [ready]);
  useEffect(() => {
    if (!auto || !ready || mode === 'off') return;
    const order: Mode[] = ['contour', 'lines', 'tracks'];
    const t = setTimeout(() => setMode(order[(order.indexOf(mode) + 1) % order.length]), 4800);
    return () => clearTimeout(t);
  }, [mode, auto, ready]);

  const pick = (m: Mode) => { setAuto(false); setMode(m); };
  const current = MODES.find(m => m.id === mode)!;
  const fade = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.2, ease: EASE, delay: d } });

  return (
    <section className="l-hero" id="home">
      <Suspense fallback={<div className="l-scene" />}>
        <Scene mode={mode} onReady={() => setReady(true)} />
      </Suspense>
      <div className="l-hero-shade" />
      <div className="l-hero-in">
        <div className="l-hero-copy">
          <motion.span className="l-eyebrow" {...fade(.3)}>Студія натяжних стель · Івано-Франківськ</motion.span>
          <motion.h1 className="l-h1" {...fade(.45)}>Натяжні стелі<br />в Івано-Франківську</motion.h1>
          <motion.p className="l-lead" {...fade(.6)}>Проєктуємо світло ще до монтажу. Оберіть сценарій — і подивіться, як може виглядати ваша стеля.</motion.p>
          <motion.div className="l-hero-actions" {...fade(.75)}>
            <a className="l-btn l-btn-light" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
            <button className="l-btn l-btn-ghost" onClick={() => scrollToId('works')}>Реальні роботи <ArrowRight /></button>
          </motion.div>
        </div>

        <motion.div className="l-config" {...fade(.9)}>
          <span className="l-config-title"><i className={mode === 'off' ? 'off' : ''} /> Сценарій світла</span>
          <div className="l-seg" role="radiogroup" aria-label="Сценарій світла">
            {MODES.map(m => (
              <button key={m.id} role="radio" aria-checked={mode === m.id} className={mode === m.id ? 'on' : ''} onClick={() => pick(m.id)}>
                {mode === m.id && <motion.span layoutId="segpill" className="l-seg-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="l-seg-t">{m.label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={mode} className="l-config-text" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .35 }}>{current.text}</motion.p>
          </AnimatePresence>
          {auto && <span className="l-config-hint">Інтерактивна 3D-модель · рухайте мишкою</span>}
        </motion.div>
      </div>
      <motion.div className="l-hero-stats" {...fade(1.1)}>
        <div><b>5+</b><span>років досвіду</span></div>
        <div><b>1 день</b><span>монтаж кімнати</span></div>
        <div><b>0 грн</b><span>доплат після заміру</span></div>
        <div><b>A+</b><span>полотна MSD Premium</span></div>
      </motion.div>
    </section>
  );
}

/* ---------------- Statement: words light up with the scroll ---------------- */
function Word({ p, i, n, children }: { key?: number; p: MotionValue<number>; i: number; n: number; children: ReactNode }) {
  const a = i / n, b = a + 1.5 / n;
  const o = useTransform(p, [a, b], [.14, 1]);
  const glow = useTransform(p, [a, b, b + .08], ['0 0 0 rgba(246,230,198,0)', '0 0 18px rgba(246,230,198,.55)', '0 0 0 rgba(246,230,198,0)']);
  return <motion.span style={{ opacity: o, textShadow: glow }}>{children} </motion.span>;
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = 'Найкраща стеля — та, яку не помічаєш, доки не ввімкнеш світло. Тому ще на замірі ми продумуємо освітлення, рівні та примикання — і монтуємо без щілин і видимих кріплень.'.split(' ');
  return (
    <section className="l-sec" id="statement">
      <span className="l-eyebrow"><i>01</i>Підхід</span>
      <p className="l-statement" ref={ref}>{words.map((w, i) => <Word key={i} p={scrollYProgress} i={i} n={words.length}>{w}</Word>)}</p>
    </section>
  );
}

/* ---------------- Photo that "switches on" as it reaches the middle of the screen ---------------- */
function LitImage({ src, alt, position, className }: { src: string; alt: string; position?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 55%'] });
  const filter = useTransform(scrollYProgress, [0, 1], ['brightness(.22) saturate(.2)', 'brightness(1) saturate(1)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  return (
    <div className={`l-lit ${className ?? ''}`} ref={ref}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ filter, scale, objectPosition: position }} />
    </div>
  );
}

function Services() {
  return (
    <section className="l-sec" id="solutions">
      <div className="l-head">
        <Reveal><span className="l-eyebrow"><i>02</i>Рішення</span><h2 className="l-h2">Чотири способи вбудувати світло</h2></Reveal>
      </div>
      <div className="l-services">
        {SOLUTIONS.map((s, i) => (
          <article key={s.title} className="l-service">
            <LitImage src={s.img} alt={s.title} position={s.position} />
            <Reveal className="l-service-copy">
              <span className="l-num">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Light switch: drag to turn the light on ---------------- */
function Switch() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const touched = useRef(false);
  const { scrollYProgress } = useScroll({ target: box, offset: ['start end', 'center center'] });
  // until the visitor touches it, the divider sweeps in with the scroll
  useEffect(() => scrollYProgress.on('change', v => { if (!touched.current) setPos(15 + v * 40); }), [scrollYProgress]);
  const set = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <section className="l-sec l-switch-sec">
      <div className="l-head">
        <Reveal><span className="l-eyebrow"><i>03</i>Різниця</span><h2 className="l-h2">Потягніть — і ввімкніть світло</h2></Reveal>
        <Reveal delay={.1}><p className="l-lead">Та сама стеля у ванній: зліва без підсвітки, справа — з контурною LED-лінією. Реальне фото нашого об’єкта.</p></Reveal>
      </div>
      <div
        ref={box}
        className={`l-switch${drag ? ' drag' : ''}`}
        onPointerDown={e => { touched.current = true; setDrag(true); (e.target as HTMLElement).setPointerCapture?.(e.pointerId); set(e.clientX); }}
        onPointerMove={e => { if (drag) set(e.clientX); }}
        onPointerUp={() => setDrag(false)}
        role="slider" aria-label="Порівняння без підсвітки і з підсвіткою" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} tabIndex={0}
        onKeyDown={e => { touched.current = true; if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 5)); if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 5)); }}
      >
        <img src="/graded/led-perimeter.jpg" alt="Стеля з контурною підсвіткою — увімкнено" draggable={false} />
        <img className="off" src="/graded/led-perimeter.jpg" alt="" aria-hidden="true" draggable={false} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <span className="l-switch-line" style={{ left: `${pos}%` }}><i><ArrowLeft /><ArrowRight /></i></span>
        <span className="l-switch-tag left">Без світла</span>
        <span className="l-switch-tag right">Зі світлом</span>
      </div>
    </section>
  );
}

/* ---------------- Works ---------------- */
function Works() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen(i => (i! + 1) % WORKS.length);
      if (e.key === 'ArrowLeft') setOpen(i => (i! - 1 + WORKS.length) % WORKS.length);
    };
    window.addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', k); };
  }, [open]);

  return (
    <section className="l-sec" id="works">
      <div className="l-head">
        <Reveal><span className="l-eyebrow"><i>04</i>Роботи</span><h2 className="l-h2">Реальні об’єкти в Івано-Франківську</h2></Reveal>
        <Reveal delay={.1}><p className="l-lead">Гортайте — і світло вмикається на кожному фото. Натисніть, щоб відкрити.</p></Reveal>
      </div>
      <div className="l-works">
        {WORKS.map((w, i) => (
          <button key={w.src} className={`l-work${w.size ? ' ' + w.size : ''}`} onClick={() => setOpen(i)} aria-label={`Відкрити: ${w.title}`}>
            <LitImage src={w.src} alt={`${w.title} — робота Steli Lux`} position={w.position} />
            <span className="l-work-cap"><small>{w.tag}</small>{w.title}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="l-lb" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button className="l-lb-btn l-lb-close" onClick={() => setOpen(null)} aria-label="Закрити"><X /></button>
            <motion.figure key={open} initial={{ opacity: 0, filter: 'brightness(.2)' }} animate={{ opacity: 1, filter: 'brightness(1)' }} transition={{ duration: .7, ease: EASE }} onClick={e => e.stopPropagation()}>
              <img src={WORKS[open].src} alt={WORKS[open].title} />
              <figcaption>
                <span><small>{WORKS[open].tag}</small>{WORKS[open].title}</span>
                <span className="l-lb-nav">
                  <button className="l-lb-btn" onClick={() => setOpen((open - 1 + WORKS.length) % WORKS.length)} aria-label="Попереднє"><ArrowLeft /></button>
                  <button className="l-lb-btn" onClick={() => setOpen((open + 1) % WORKS.length)} aria-label="Наступне"><ArrowRight /></button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Materials ---------------- */
function Materials() {
  const specs = [
    { k: 'A+', v: 'клас екологічності полотен MSD Premium' },
    { k: '100', u: 'кг/м²', v: 'утримує полотно при затопленні' },
    { k: '1', u: 'день', v: 'монтаж більшості кімнат' },
    { k: '0', u: 'грн', v: 'доплат після фіксації ціни' },
  ];
  return (
    <section className="l-sec" id="materials">
      <div className="l-head">
        <Reveal><span className="l-eyebrow"><i>05</i>Матеріали</span><h2 className="l-h2">Без запаху. Без пожовтіння. Без компромісів.</h2></Reveal>
        <Reveal delay={.1}><p className="l-lead">Лише сертифіковані полотна MSD Premium: рівний колір на роки, гіпоалергенний склад і захист ремонту від затоплення.</p></Reveal>
      </div>
      <div className="l-specs">
        {specs.map((s, i) => (
          <Reveal key={s.v} delay={i * .08} className="l-spec">
            <strong>{s.k}{s.u && <small>{s.u}</small>}</strong>
            <span>{s.v}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Process: a light line runs through the steps ---------------- */
function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  return (
    <section className="l-sec" id="process">
      <div className="l-head">
        <Reveal><span className="l-eyebrow"><i>06</i>Процес</span><h2 className="l-h2">Від дзвінка до готової стелі</h2></Reveal>
      </div>
      <div className="l-steps" ref={ref}>
        <div className="l-steps-line"><motion.span style={{ scaleX: scrollYProgress }} /></div>
        {STEPS.map((s, i) => <Step key={s.n} s={s} i={i} p={scrollYProgress} />)}
      </div>
    </section>
  );
}

function Step({ s, i, p }: { key?: string; s: (typeof STEPS)[number]; i: number; p: MotionValue<number> }) {
  const at = i / (STEPS.length - 1 || 1);
  const on = useTransform(p, [Math.max(0, at - .12), at], [0, 1]);
  const dotBg = useTransform(on, v => `rgba(246,230,198,${.15 + v * .85})`);
  const dotGlow = useTransform(on, v => `0 0 ${v * 22}px rgba(246,230,198,${v * .7})`);
  const textO = useTransform(on, [0, 1], [.35, 1]);
  return (
    <div className="l-step">
      <motion.span className="l-step-dot" style={{ background: dotBg, boxShadow: dotGlow }} />
      <motion.div style={{ opacity: textO }}>
        <span className="l-num">{s.n}</span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </motion.div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="l-sec">
      <div className="l-faq">
        <Reveal><span className="l-eyebrow"><i>07</i>Питання</span><h2 className="l-h2">Що варто знати до заміру</h2></Reveal>
        <div>
          {FAQ.map((f, i) => (
            <div key={f.q} className={`l-q${open === i ? ' open' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{f.q}<span className="l-q-ic" /></button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .45, ease: EASE }} style={{ overflow: 'hidden' }}>
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const glow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bg = useTransform(glow, v => `radial-gradient(60% 70% at 50% 0%, rgba(246,230,198,${v * .16}), transparent 70%)`);
  return (
    <section className="l-contact" id="contacts" ref={ref}>
      <motion.div className="l-contact-glow" style={{ background: bg }} />
      <Reveal className="l-contact-in">
        <span className="l-eyebrow">Безкоштовний замір</span>
        <h2 className="l-h2">Нова натяжна стеля — почнімо з дзвінка</h2>
        <a className="l-contact-num" href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
        <div className="l-hero-actions" style={{ justifyContent: 'center' }}>
          <a className="l-btn l-btn-light" href={`tel:${PHONE}`}><Phone /> Зателефонувати</a>
          <a className="l-btn l-btn-ghost" href={FACEBOOK} target="_blank" rel="noreferrer">Facebook <ArrowUpRight /></a>
        </div>
        <p className="l-contact-meta">{HOURS} · Івано-Франківськ та область</p>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="l-foot">
      <div className="l-foot-top">
        <button className="l-foot-mark" onClick={toTop} aria-label="Steli Lux — нагору"><Logo /><span>Steli Lux</span></button>
        <nav className="l-foot-nav">{NAV.map(n => <button key={n.id} onClick={() => scrollToId(n.id)}>{n.label}</button>)}</nav>
      </div>
      <div className="l-foot-bottom">
        <button className="l-foot-copy" onClick={toTop}>© {new Date().getFullYear()} Steli Lux · Натяжні стелі в Івано-Франківську та області</button>
        <a href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
      </div>
    </footer>
  );
}

function Floating() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const on = () => {
      setShow(window.scrollY > window.innerHeight);
      const c = document.getElementById('contacts');
      setNear(!!c && c.getBoundingClientRect().top < window.innerHeight * .85);
    };
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.button key="t" className="l-top" onClick={toTop} aria-label="Нагору" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
            <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" className="trk" /><motion.circle cx="28" cy="28" r="26" className="bar" style={{ pathLength: scrollYProgress }} /></svg>
            <ArrowUp />
          </motion.button>
          {!near && (
            <motion.a key="c" className="l-btn l-btn-light l-mcta" href={`tel:${PHONE}`} initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ duration: .45, ease: EASE }}>
              <Phone /> Зателефонувати
            </motion.a>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

export default function Light() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Switch />
        <Works />
        <Materials />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </>
  );
}
