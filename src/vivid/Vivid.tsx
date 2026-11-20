import { useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Droplets, Leaf, MapPin, Phone, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { FACEBOOK, FAQ, HOURS, PHONE, PHONE_LABEL, SOLUTIONS, STEPS } from '../site/data';
import { EASE, Reveal, scrollToId, useEnter, useReveal } from '../site/ui';
import { CountUp } from '../site/fx';
import { Floating, Header, Mark, toTop } from './parts';
import Works from './Works';

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const fade = (d: number) => ({ initial: { opacity: 0, scale: .88 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.1, ease: EASE, delay: d } });
  const pop = (d: number) => ({ initial: { opacity: 0, y: 40, scale: .9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 1, ease: EASE, delay: d } });

  return (
    <section className="v-hero" id="home" ref={ref}>
      <div className="v-blobs" aria-hidden="true">
        <motion.div className="v-blob b1" animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="v-blob b2" animate={{ x: [0, 50, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="v-blob b3" animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="v-hero-copy">
        <motion.span className="v-kicker" {...pop(.2)}><i /> Івано-Франківськ та область</motion.span>
        <h1 className="v-h1">
          <motion.span style={{ display: 'block' }} {...pop(.3)}>Натяжні <span className="v-mark">стелі</span></motion.span>
          <motion.span style={{ display: 'block' }} {...pop(.42)}>
            в <span className="v-ul">Івано-Франківську
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                <motion.path d="M4 14 C 80 4, 160 4, 296 10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.1, ease: EASE }} />
              </svg>
            </span>
          </motion.span>
        </h1>
        <motion.p className="v-lead" {...pop(.55)}>
          Світлові лінії, магнітні треки, тіньовий профіль і приховані карнизи. Безкоштовний замір,
          фіксована ціна та монтаж більшості кімнат за один день.
        </motion.p>
        <motion.div className="v-hero-actions" {...pop(.68)}>
          <a className="v-btn v-btn-main" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a>
          <button className="v-btn v-btn-soft" onClick={() => scrollToId('works')}>Дивитись роботи <ArrowRight /></button>
        </motion.div>
        <motion.div className="v-hero-trust" {...pop(.8)}>
          <span><b>Замір безкоштовно</b> · працюємо щодня з 09:00 до 20:00</span>
        </motion.div>
      </div>

      <div className="v-collage">
        <motion.div className="v-ph p1" style={{ y: y1 }} {...fade(.35)}><img src="/graded/portfolio-1.jpg" alt="Контурна LED-підсвітка натяжної стелі у ванній" fetchPriority="high" /></motion.div>
        <motion.div className="v-ph p2" style={{ y: y2 }} {...fade(.5)}><img src="/graded/geometric-tracks.jpg" alt="Трекові системи на натяжній стелі біля панорамних вікон" /></motion.div>
        <motion.div className="v-ph p3" style={{ y: y3 }} {...fade(.65)}><img src="/graded/portfolio-8.jpg" alt="Багаторівнева натяжна стеля з круглою композицією" /></motion.div>
      </div>
    </section>
  );
}

/* ---------------- Tape (crossing marquees) ---------------- */
function TapeRow({ items, dir, className }: { items: string[]; dir: 1 | -1; className: string }) {
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  useAnimationFrame((_, d) => {
    const el = track.current; if (!el) return;
    const half = el.scrollWidth / 2;
    const boost = 1 + Math.min(Math.abs(v.get()) / 1500, 1.5);
    let n = x.get() - dir * (d / 1000) * 30 * boost;
    if (n <= -half) n += half; if (n > 0) n -= half;
    x.set(n);
  });
  const row = items.map((t, i) => <span key={i}>{t}<i>·</i></span>);
  return <div className={`v-tape-row ${className}`}><motion.div className="v-tape-track" ref={track} style={{ x }}>{row}{row}</motion.div></div>;
}

function Tape() {
  return (
    <div className="v-tape" aria-hidden="true">
      <TapeRow className="a" dir={1} items={['Світлові лінії', 'Трекові системи', 'Тіньовий профіль', 'Контурна підсвітка', 'Приховані карнизи', 'MSD Premium', 'Безкоштовний замір']} />
    </div>
  );
}

/* ---------------- Services ---------------- */
function ServiceCard({ s, i }: { key?: string; s: (typeof SOLUTIONS)[number]; i: number }) {
  const { ref, style } = useReveal<HTMLElement>((i % 2) * .14, 90, .92);
  return (
    <motion.article ref={ref} style={style} className={`v-card c${i + 1}`}>
      <div className="v-card-top"><span className="v-card-n">0{i + 1}</span><span className="v-card-arrow"><ArrowUpRight /></span></div>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
      <div className="v-card-img"><img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.position }} /></div>
    </motion.article>
  );
}

function Services() {
  const stats = [
    { k: '5+', v: 'років досвіду монтажу' },
    { k: '1', v: 'день на більшість кімнат', em: true },
    { k: '0', v: 'доплат після заміру' },
    { k: 'A+', v: 'клас полотен MSD Premium', dark: true },
  ];
  return (
    <section className="v-sec" id="solutions">
      <div className="v-head">
        <Reveal>
          <span className="v-kicker"><i /> Що ми робимо</span>
          <h2 className="v-h2">Стеля, яка <span className="v-mark">світить</span> сама</h2>
        </Reveal>
        <Reveal delay={.12}><p className="v-lead">Поєднуємо полотно, профіль і світло в одну чисту композицію — без люстр, що «висять», і без видимих кріплень.</p></Reveal>
      </div>
      <div className="v-bento">
        {SOLUTIONS.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
      </div>
      <div className="v-stats">
        {stats.map((s, i) => (
          <Reveal key={s.k} delay={i * .1} className={`v-stat${s.dark ? ' dark' : ''}`}>
            <strong>{s.em ? <em><CountUp value={s.k} /></em> : <CountUp value={s.k} />}</strong>
            <span>{s.v}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Materials ---------------- */
function Materials() {
  const items = [
    { icon: Sparkles, t: 'Без запаху', d: 'Полотно не має різкого хімічного запаху навіть у день монтажу.' },
    { icon: Droplets, t: 'До 100 кг/м²', d: 'Утримує воду при затопленні й береже ремонт.' },
    { icon: Leaf, t: 'Клас A+', d: 'Гіпоалергенні полотна, дозволені для дитячих кімнат.' },
    { icon: ShieldCheck, t: 'Безпечно', d: 'Вибухобезпечні композитні балони та професійне обладнання.' },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const p = useEnter(ref, '100%', '20%');
  const ringRot = useTransform(p, [0, 1], [-40, 40]);
  return (
    <section className="v-sec" id="materials">
      <div className="v-mat">
        <Reveal className="v-mat-big">
          <div ref={ref} style={{ position: 'absolute', inset: 0 }} />
          <motion.div className="ring" style={{ rotate: ringRot }} />
          <span className="v-kicker" style={{ alignSelf: 'flex-start' }}><i /> Матеріали</span>
          <h2 className="v-h2" style={{ marginTop: 20 }}>Без запаху. Без пожовтіння. Без компромісів.</h2>
          <p>Працюємо лише із сертифікованими полотнами MSD Premium — рівний колір на роки та спокій за здоров’я родини.</p>
          <span className="tag">MSD Premium · клас A+</span>
        </Reveal>
        <div className="v-mat-list">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={(i % 2) * .12 + Math.floor(i / 2) * .1} className="v-mat-item">
              <span className="ic"><it.icon /></span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
function Process() {
  return (
    <section className="v-sec" id="process" style={{ paddingTop: 0 }}>
      <div className="v-head">
        <Reveal>
          <span className="v-kicker"><i /> Як ми працюємо</span>
          <h2 className="v-h2">4 кроки до <span className="v-mark">нової стелі</span></h2>
        </Reveal>
      </div>
      <div className="v-steps">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * .12} className="v-step">
            <b>{s.n}</b>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="v-sec">
      <div className="v-faq">
        <Reveal className="v-faq-aside">
          <span className="v-kicker"><i /> Питання</span>
          <h2 className="v-h2">Часті <span className="v-mark">питання</span></h2>
          <p className="v-lead">Не знайшли відповідь? Зателефонуйте — пояснимо просто й без зобов’язань.</p>
          <a className="v-btn v-btn-ink" href={`tel:${PHONE}`} style={{ marginTop: 24 }}><Phone /> Запитати</a>
        </Reveal>
        <div className="v-faq-list">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * .06} className={`v-q${open === i ? ' open' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{f.q}<span className="v-q-ic"><Plus /></span></button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: .45, ease: EASE }} style={{ overflow: 'hidden' }}>
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

/* ---------------- Call ---------------- */
function Call() {
  return (
    <section className="v-call" id="contacts">
      <Reveal>
        <h2 className="v-h2">Натяжні стелі в Івано-Франківську — почнімо з дзвінка</h2>
        <p>Steli Lux — студія натяжних стель в Івано-Франківську. Беремо на себе все: замір, підбір полотна й світла, монтаж і прибирання. Обслуговуємо місто та всю область.</p>
        <div className="v-region">
          <span><MapPin size={16} /> Івано-Франківськ</span>
          <span><MapPin size={16} /> Івано-Франківська область</span>
        </div>
      </Reveal>
      <Reveal delay={.15} className="v-call-card">
        <small><i /> На зв’язку {HOURS.toLowerCase()}</small>
        <a className="v-call-num" href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
        <a className="v-btn v-btn-main" href={`tel:${PHONE}`}><Phone /> Зателефонувати</a>
        <a className="v-btn v-btn-soft" href={FACEBOOK} target="_blank" rel="noreferrer">Написати у Facebook <ArrowUpRight /></a>
      </Reveal>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const links = [
    { id: 'solutions', label: 'Рішення' }, { id: 'works', label: 'Портфоліо' },
    { id: 'materials', label: 'Матеріали' }, { id: 'process', label: 'Процес' }, { id: 'contacts', label: 'Контакти' },
  ];
  return (
    <footer className="v-foot">
      <div className="v-foot-top">
        <button className="v-foot-brand" onClick={toTop} aria-label="Steli Lux — нагору"><Mark /><b>steli<span>lux</span></b></button>
        <nav className="v-foot-nav">{links.map(l => <button key={l.id} onClick={() => scrollToId(l.id)}>{l.label}</button>)}</nav>
      </div>
      <div className="v-foot-bottom">
        <button onClick={toTop}>© {new Date().getFullYear()} Steli Lux · Натяжні стелі в Івано-Франківську та області</button>
        <a href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
      </div>
    </footer>
  );
}

export default function Vivid() {
  return (
    <div className="v-wrap">
      <Header />
      <main>
        <Hero />
        <Tape />
        <Services />
        <Works />
        <Materials />
        <Process />
        <Faq />
        <Call />
      </main>
      <Footer />
      <Floating />
    </div>
  );
}
