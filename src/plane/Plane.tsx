import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { FACEBOOK, FAQ, HOURS, PHONE, PHONE_LABEL, SOLUTIONS, STEPS, WORKS } from '../site/data';
import { EASE, Reveal, scrollToId } from '../site/ui';

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const NAV = [
  { id: 'solutions', label: 'Рішення' },
  { id: 'works', label: 'Роботи' },
  { id: 'materials', label: 'Матеріали' },
  { id: 'process', label: 'Процес' },
  { id: 'contacts', label: 'Контакти' },
];

/** Logo «Кути»: two ceiling corners with a spotlight in the middle. */
export function Logo({ light = false }: { light?: boolean }) {
  const ink = light ? '#ffffff' : '#131313';
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M4 40V4h36" stroke={ink} strokeWidth="7" />
      <path d="M76 40v36H40" stroke={ink} strokeWidth="7" />
      <circle cx="40" cy="40" r="15" fill="#2e46f0" opacity=".16" />
      <circle cx="40" cy="40" r="7" fill={light ? '#8f9dff' : '#2e46f0'} />
    </svg>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const o = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const go = (id: string) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <header className="p-header">
        <button className="p-brand" onClick={toTop} aria-label="Steli Lux — нагору"><Logo /><b>Steli Lux</b></button>
        <nav className="p-nav" aria-label="Навігація">
          {NAV.map((n, i) => <button key={n.id} className={active === n.id ? 'on' : ''} onClick={() => go(n.id)}><sup>0{i + 1}</sup>{n.label}</button>)}
        </nav>
        <a className="p-head-phone" href={`tel:${PHONE}`}><i /> {PHONE_LABEL}</a>
        <button className="p-burger" onClick={() => setOpen(true)} aria-label="Меню"><Menu /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="p-menu" initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: .6, ease: EASE }}>
            <button className="p-menu-close" onClick={() => setOpen(false)} aria-label="Закрити"><X /></button>
            <nav>{NAV.map((n, i) => <button key={n.id} onClick={() => go(n.id)}>{n.label}<small>0{i + 1}</small></button>)}</nav>
            <div className="p-menu-foot">
              <a className="p-btn p-btn-ink" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
              <a className="p-btn p-btn-line" href={FACEBOOK} target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ['start end', 'end start'] });
  const inset = useTransform(scrollYProgress, [0, .45], [8, 0]);
  const clip = useTransform(inset, v => `inset(0 ${v}% 0 ${v}%)`);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '6%']);
  const line = (d: number) => ({ initial: { y: '105%' }, animate: { y: 0 }, transition: { duration: 1.1, ease: EASE, delay: d } });
  const fade = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease: EASE, delay: d } });

  return (
    <section className="p-hero" id="home">
      <motion.div className="p-hero-top" {...fade(.1)}>
        <span className="p-label"><b>●</b>Студія натяжних стель</span>
        <span className="p-label">Івано-Франківськ · {new Date().getFullYear()}</span>
      </motion.div>
      <h1 className="p-h1">
        <span className="ln"><motion.span {...line(.2)}>Натяжні стелі</motion.span></span>
        <span className="ln"><motion.span {...line(.32)}>в <em>Івано-Франківську</em></motion.span></span>
      </h1>
      <motion.div className="p-hero-meta" {...fade(.6)}>
        <div><span className="p-label">Що робимо</span><p>Світлові лінії, магнітні треки, тіньовий профіль, приховані карнизи</p></div>
        <div><span className="p-label">Як</span><p>Безкоштовний замір, фіксована ціна, монтаж за один день</p></div>
        <div><span className="p-label">Де</span><p>Івано-Франківськ та вся область</p></div>
        <div><span className="p-label">Зв’язок</span><a className="big" href={`tel:${PHONE}`}>{PHONE_LABEL}</a></div>
      </motion.div>
      <motion.div className="p-hero-img" ref={imgWrap} style={{ clipPath: clip }}>
        <motion.img style={{ y: imgY }} src="/graded/geometric-tracks.jpg" alt="Натяжна стеля з трековими системами біля панорамних вікон — Steli Lux" fetchPriority="high" />
        <span className="p-hero-cap"><i /> Трекові системи · приватний будинок</span>
      </motion.div>
    </section>
  );
}

/* ---------------- Intro + services index ---------------- */
function Intro() {
  return (
    <section className="p-sec">
      <div className="p-intro">
        <span className="p-label"><b>01</b>Підхід</span>
        <Reveal className="p-intro-text">
          <p>Найкраща стеля — та, яку не помічаєш, доки <em>не ввімкнеш світло</em>. Ми продумуємо освітлення, рівні й примикання ще на замірі — і монтуємо без щілин та видимих кріплень.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });
  const move = (e: RPointerEvent) => { x.set(e.clientX + 24); y.set(e.clientY - 105); };

  return (
    <section className="p-sec" id="solutions" style={{ paddingTop: 0 }}>
      <div className="p-sec-head">
        <span className="p-label"><b>02</b>Рішення</span>
        <Reveal><h2 className="p-h2">Світло, вбудоване <em>в площину</em></h2></Reveal>
      </div>
      <div className="p-index" onPointerMove={move} onPointerLeave={() => setHover(null)}>
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * .08}>
            <div className="p-row" onPointerEnter={e => { if (hover === null) { x.jump(e.clientX + 24); y.jump(e.clientY - 105); sx.jump(e.clientX + 24); sy.jump(e.clientY - 105); } setHover(i); }}>
              <span className="p-row-n">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="p-row-thumb"><img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.position }} /></div>
            </div>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {hover !== null && (
          <motion.div className="p-follow" style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .85 }} transition={{ duration: .35 }}>
            <AnimatePresence mode="popLayout">
              <motion.img key={hover} src={SOLUTIONS[hover].img} alt="" style={{ objectPosition: SOLUTIONS[hover].position }} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Pinned horizontal works ---------------- */
const RATIOS: Record<string, string> = {
  '/graded/portfolio-1.jpg': '9 / 16', '/graded/double-light-track.jpg': '3 / 4', '/graded/concealed-curtain-track.jpg': '9 / 16',
  '/graded/portfolio-3.jpg': '3 / 4', '/graded/portfolio-7.jpg': '4 / 3', '/graded/portfolio-8.jpg': '4 / 3',
};

function Works() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [height, setHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const measure = () => {
      const t = track.current; if (!t) return;
      const d = Math.max(0, t.scrollWidth - window.innerWidth);
      setDist(d);
      setHeight(window.innerHeight + d);
    };
    measure();
    const imgs = track.current?.querySelectorAll('img') ?? [];
    imgs.forEach(i => i.addEventListener('load', measure));
    window.addEventListener('resize', measure);
    return () => { window.removeEventListener('resize', measure); imgs.forEach(i => i.removeEventListener('load', measure)); };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const raw = useTransform(scrollYProgress, v => -v * dist);
  const x = useSpring(raw, { stiffness: 120, damping: 28, mass: .4 });
  const [n, setN] = useState(1);
  useEffect(() => scrollYProgress.on('change', v => setN(Math.min(WORKS.length, Math.max(1, Math.round(v * (WORKS.length - 1)) + 1)))), [scrollYProgress]);

  return (
    <section className="p-works" id="works" ref={wrap} style={{ height }}>
      <div className="p-works-pin">
        <div className="p-works-head">
          <div>
            <span className="p-label"><b>03</b>Роботи</span>
            <h2 className="p-h2" style={{ marginTop: 14 }}>Реальні об’єкти</h2>
          </div>
          <span className="p-works-count"><b>{String(n).padStart(2, '0')}</b> / {String(WORKS.length).padStart(2, '0')}</span>
        </div>
        <motion.div className="p-track" ref={track} style={{ x }}>
          {WORKS.map(w => (
            <figure key={w.src} className="p-shot" style={{ margin: 0, ['--ar' as string]: RATIOS[w.src] ?? '16 / 10' }}>
              <img src={w.src} alt={`${w.title} — робота Steli Lux`} loading="lazy" style={{ objectPosition: w.position }} />
              <figcaption><b style={{ fontWeight: 400 }}>{w.title}</b><span>{w.tag}</span></figcaption>
            </figure>
          ))}
        </motion.div>
        <div className="p-works-bar"><motion.span style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </section>
  );
}

/* ---------------- Materials ---------------- */
function Materials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '0%']);
  const specs = [
    { k: 'A+', v: 'клас екологічності полотен MSD Premium' },
    { k: '100', u: 'кг/м²', v: 'витримує полотно при затопленні' },
    { k: '1', u: 'день', v: 'монтаж більшості кімнат' },
    { k: '0', u: 'грн', v: 'доплат після фіксації ціни' },
  ];
  return (
    <section className="p-sec" id="materials">
      <div className="p-sec-head">
        <span className="p-label"><b>04</b>Матеріали</span>
        <Reveal><h2 className="p-h2">Без запаху. Без пожовтіння. <em>Без компромісів.</em></h2></Reveal>
      </div>
      <div className="p-specs">
        {specs.map((s, i) => (
          <Reveal key={s.v} delay={i * .08} className="p-spec">
            <strong>{s.k}{s.u && <small>{s.u}</small>}</strong>
            <span>{s.v}</span>
          </Reveal>
        ))}
      </div>
      <div className="p-mat">
        <div className="p-mat-img" ref={ref}><motion.img style={{ y }} src="/graded/portfolio-8.jpg" alt="Багаторівнева натяжна стеля з глянцевим колом" loading="lazy" /></div>
        <Reveal>
          <p className="p-text">Працюємо лише із сертифікованими полотнами MSD Premium: рівний колір на роки, гіпоалергенний склад, дозвіл для дитячих кімнат і захист ремонту від затоплення.</p>
          <ul>
            <li>Запах<span>відсутній</span></li>
            <li>Колір<span>не жовтіє</span></li>
            <li>Догляд<span>не збирає пил</span></li>
            <li>Монтаж<span>композитні балони</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
function Process() {
  return (
    <section className="p-sec" id="process" style={{ paddingTop: 0 }}>
      <div className="p-process">
        <div className="p-process-aside">
          <span className="p-label"><b>05</b>Процес</span>
          <Reveal><h2 className="p-h2">Від дзвінка до готової стелі</h2></Reveal>
          <Reveal delay={.1}><p className="p-text" style={{ marginTop: 22 }}>Працюємо щодня — підберемо зручний час і для заміру, і для монтажу.</p></Reveal>
        </div>
        <div className="p-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * .06} className="p-step">
              <b>{s.n}</b>
              <div><h3>{s.title}</h3><p>{s.text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="p-sec" style={{ paddingTop: 0 }}>
      <div className="p-faq">
        <span className="p-label"><b>06</b>Питання</span>
        <div className="p-faq-list">
          {FAQ.map((f, i) => (
            <div key={f.q} className={`p-q${open === i ? ' open' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{f.q}<span className="p-q-ic" /></button>
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
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 45%'] });
  const digits = PHONE_LABEL.split('');
  return (
    <section className="p-contact" id="contacts">
      <span className="p-label"><b>07</b>Контакти · безкоштовний замір</span>
      <a className="p-contact-num" href={`tel:${PHONE}`} ref={ref} aria-label={`Зателефонувати ${PHONE_LABEL}`}>
        {digits.map((d, i) => <Digit key={i} d={d} i={i} total={digits.length} p={scrollYProgress} />)}
      </a>
      <div className="p-contact-grid">
        <div><span className="p-label">Студія</span><p>Steli Lux — натяжні стелі в Івано-Франківську. Замір, підбір полотна й світла, монтаж і прибирання.</p></div>
        <div><span className="p-label">Регіон</span><p>Івано-Франківськ та вся Івано-Франківська область</p></div>
        <div><span className="p-label">Графік</span><p>{HOURS}</p></div>
        <div className="p-contact-actions">
          <a className="p-btn p-btn-ink" href={`tel:${PHONE}`}>Зателефонувати <Phone /></a>
          <a className="p-btn p-btn-line" href={FACEBOOK} target="_blank" rel="noreferrer">Facebook <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}

function Digit({ d, i, total, p }: { key?: number; d: string; i: number; total: number; p: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const a = (i / total) * .5;
  const y = useTransform(p, [a, a + .5], ['60%', '0%']);
  const o = useTransform(p, [a, a + .5], [0, 1]);
  return <motion.span className="d" style={{ y, opacity: o }}>{d === ' ' ? ' ' : d}</motion.span>;
}

/* ---------------- Footer & floating ---------------- */
function Footer() {
  return (
    <footer className="p-foot">
      <div className="p-foot-in">
        <button className="p-foot-brand" onClick={toTop} aria-label="Steli Lux — нагору"><Logo light /><b>Steli Lux</b></button>
        <button onClick={toTop}>© {new Date().getFullYear()} Steli Lux · Натяжні стелі в Івано-Франківську та області</button>
        <a href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
      </div>
    </footer>
  );
}

function Floating() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const [nearContact, setNear] = useState(false);
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
          <motion.button key="t" className="p-top" onClick={toTop} aria-label="Нагору" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: .4, ease: EASE }}>
            <ArrowUp /><motion.span className="bar" style={{ scaleX: scrollYProgress }} />
          </motion.button>
          {!nearContact && <motion.a key="c" className="p-btn p-btn-ink p-mcta" href={`tel:${PHONE}`} initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ duration: .45, ease: EASE }}>
            <Phone /> Зателефонувати
          </motion.a>}
        </>
      )}
    </AnimatePresence>
  );
}

export default function Plane() {
  return (
    <>
      <div className="p-guides" aria-hidden="true"><span /><span /><span /><span /></div>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
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
