import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { FEATURES, PHONE, PHONE_LABEL } from './data';
import { EASE, scrollToId } from './ui';
import { CountUp, Magnetic } from './fx';

const lines = [
  <>Стеля, що</>,
  <>стає <em className="gold-text">світлом</em></>,
];

const SLIDES = [
  { src: '/graded/portfolio-1.jpg', caption: 'Контурна підсвітка · ванна', pos: 'center 35%' },
  { src: '/graded/geometric-tracks.jpg', caption: 'Трекові системи · вітальня', pos: '60% center' },
  { src: '/graded/portfolio-8.jpg', caption: 'Багаторівнева композиція', pos: '35% center' },
  { src: '/graded/double-light-track.jpg', caption: 'Подвійний трек · деталь', pos: 'center 60%' },
];
const SLIDE_MS = 5200;

const stats = [
  { k: '5+', v: 'років практичного досвіду' },
  { k: '1', v: 'день на монтаж більшості кімнат' },
  { k: '0', v: 'доплат після погодження ціни' },
  { k: 'A+', v: 'клас полотен MSD Premium' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const fade = useTransform(scrollYProgress, [0, .55], [1, 0]);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setSlide(i => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [slide, paused]);

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-glow" />

      <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
        <h1 className="h-display">
          <motion.span className="eyebrow hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: .5 }}>
            Натяжні стелі в Івано-Франківську
          </motion.span>
          {lines.map((l, i) => (
            <span className="line" key={i}>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.3, ease: EASE, delay: .55 + i * .14 }}>{l}</motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 1 }}>
          Проєктуємо та монтуємо натяжні стелі зі вбудованим світлом, тіньовими примиканнями
          й бездоганною геометрією. Для тих, хто помічає деталі.
        </motion.p>

        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 1.15 }}>
          {FEATURES.leadForm
            ? <button className="btn btn-gold" onClick={() => scrollToId('contacts')}>Безкоштовний замір <ArrowRight /></button>
            : <Magnetic><a className="btn btn-gold" href={`tel:${PHONE}`}><Phone /> {PHONE_LABEL}</a></Magnetic>}
          <button className="link-line" onClick={() => scrollToId('works')}>Портфоліо робіт</button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: .96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: .3 }}
      >
        <div className="hero-frame" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div className="hero-slides" style={{ y: imgY }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={SLIDES[slide].src}
                src={SLIDES[slide].src}
                alt={`${SLIDES[slide].caption} — натяжна стеля Steli Lux`}
                fetchPriority={slide === 0 ? 'high' : undefined}
                style={{ objectPosition: SLIDES[slide].pos }}
                initial={{ opacity: 0, scale: 1.18 }}
                animate={{ opacity: 1, scale: 1.08 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: SLIDE_MS / 1000 + 1.4, ease: 'linear' } }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="hero-dots" role="tablist" aria-label="Фото робіт">
          {SLIDES.map((sl, i) => (
            <button key={sl.src} role="tab" aria-selected={i === slide} aria-label={sl.caption} onClick={() => setSlide(i)} className={i === slide ? 'on' : ''}>
              <span style={i === slide && !paused ? { animationDuration: `${SLIDE_MS}ms` } : undefined} />
            </button>
          ))}
        </div>
        <svg className="hero-contour" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9c7a45" />
              <stop offset=".45" stopColor="#f1dfb7" />
              <stop offset="1" stopColor="#c8a46a" />
            </linearGradient>
          </defs>
          <motion.rect
            x=".5" y=".5" width="99" height="99"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1], delay: 1 }}
          />
        </svg>
        <motion.div className="hero-badge" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 2.1 }}>
          <small>Фірмове рішення</small>
          <strong>Світло, вбудоване<br />в архітектуру</strong>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span key={slide} className="hero-caption" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .5 }}>
            {SLIDES[slide].caption}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.5 }}>
        {stats.map(s => <div key={s.k}><strong><CountUp value={s.k} /></strong><span>{s.v}</span></div>)}
      </motion.div>
    </section>
  );
}
