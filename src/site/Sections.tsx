import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { PRINCIPLES, SOLUTIONS, SPECS, STEPS } from './data';
import { EASE, Reveal, useEnter, useReveal } from './ui';
import { WordsReveal } from './fx';

const MARQUEE = ['Світлові лінії', 'Трекові системи', 'Тіньовий профіль', 'Контурна підсвітка', 'Приховані карнизи', 'MSD Premium', 'Безкоштовний замір'];

export function Marquee() {
  const row = MARQUEE.map(t => <span key={t}>{t}<i /></span>);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const boost = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    const b = boost.get();
    if (b < -.2) dir.current = -1; else if (b > .2) dir.current = 1;
    let next = x.get() - dir.current * (delta / 1000) * 60 * (1 + Math.abs(b));
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" ref={trackRef} style={{ x, animation: 'none' }}>{row}{row}</motion.div>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className="section ivory">
      <div className="manifesto">
        <Reveal>
          <span className="eyebrow">Підхід</span>
          <p className="manifesto-quote">
            Ідеальна стеля — та, яку не помічаєш, доки <em>не ввімкнеш світло</em>. Тому ще на замірі продумуємо
            освітлення, рівні та примикання, а монтуємо так, щоб не було видно ні щілин, ні кріплень.
          </p>
          <div className="manifesto-sign">Steli Lux · Івано-Франківськ</div>
        </Reveal>
        <ol className="principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * .08}>
              <li><h3>{p.title}</h3><p>{p.text}</p></li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SolutionCard({ s, i }: { key?: string; s: (typeof SOLUTIONS)[number]; i: number }) {
  const { ref, style } = useReveal<HTMLElement>(i * .12, 90, .94);
  return (
    <motion.article ref={ref} className="solution" tabIndex={0} style={style}>
      <img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.position }} />
      <span className="solution-n">{s.n}</span>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
      <div className="solution-line" />
    </motion.article>
  );
}

export function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="sec-head">
        <Reveal>
          <span className="eyebrow">Рішення</span>
          <WordsReveal className="h-section" text={'Архітектура\nсвітла'} em={['світла']} />
        </Reveal>
        <Reveal delay={.1}>
          <p className="lead">Сучасна стеля — це не біла площина, а сценарій освітлення. Поєднуємо полотно, профіль і світло в одну чисту композицію.</p>
        </Reveal>
      </div>
      <div className="solutions-grid">
        {SOLUTIONS.map((s, i) => <SolutionCard key={s.title} s={s} i={i} />)}
      </div>
    </section>
  );
}

export function Materials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '0%']);

  return (
    <section className="section ivory materials" id="materials">
      <div className="materials-visual" ref={ref}>
        <motion.img style={{ y }} src="/graded/portfolio-8.jpg" alt="Багаторівнева натяжна стеля з глянцевим колом — робота Steli Lux" loading="lazy" />
        <div className="materials-seal">
          <svg viewBox="0 0 170 170" aria-hidden="true">
            <defs><path id="sealPath" d="M85 85 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" /></defs>
            <text><textPath href="#sealPath">Сертифіковані полотна · Клас A+ · Без запаху ·</textPath></text>
          </svg>
          <strong>MSD<small>Premium</small></strong>
        </div>
      </div>
      <div className="materials-copy">
        <Reveal>
          <span className="eyebrow">Матеріали</span>
          <h2 className="h-section">Без запаху.<br />Без пожовтіння.<br /><em>Без компромісів.</em></h2>
          <p className="lead">
            Працюємо лише із сертифікованими полотнами MSD Premium: ідеально рівний колір, гіпоалергенний склад,
            дозвіл для дитячих кімнат і захист ремонту від затоплення сусідами.
          </p>
        </Reveal>
        <div className="specs">
          {SPECS.map((s, i) => (
            <Reveal key={s.v} delay={i * .08}>
              <strong>{s.k}{s.unit && <small>{s.unit}</small>}</strong>
              <span>{s.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRail() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useEnter(ref, '85%', '35%');
  return <div className="timeline-rail" ref={ref}><motion.span style={{ scaleX: p }} /></div>;
}

export function Process() {
  return (
    <section className="section night" id="process">
      <div className="sec-head center">
        <Reveal>
          <span className="eyebrow center">Процес</span>
          <WordsReveal className="h-section" text={'Від першого дзвінка\nдо готової стелі'} em={['до', 'готової', 'стелі']} />
        </Reveal>
      </div>
      <div className="timeline">
        <TimelineRail />
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * .14} className="step">
            <div className="step-dot">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="process-note"><Clock3 /><span><b>Працюємо щодня</b> — підберемо зручний час для заміру та монтажу.</span></Reveal>
    </section>
  );
}

export function Region() {
  return (
    <section className="section night region-sec" id="region" aria-labelledby="region-title">
      <div className="region">
        <Reveal>
          <span className="eyebrow">Географія</span>
          <h2 className="h-section" id="region-title">Натяжні стелі<br /><em>в Івано-Франківську</em><br />та області</h2>
        </Reveal>
        <Reveal delay={.1} className="region-text">
          <p>
            <strong>Steli Lux</strong> — студія натяжних стель в Івано-Франківську. Беремо на себе все: замір, підбір
            полотна й освітлення, монтаж і прибирання після роботи. Працюємо з полотнами <strong>MSD Premium</strong> і
            сучасними системами світла — <strong>світловими лініями</strong>, <strong>магнітними треками</strong>,
            <strong> тіньовим профілем</strong> та <strong>прихованими карнизами</strong>.
          </p>
          <p>
            Обслуговуємо Івано-Франківськ та всю область. Приїдемо на безкоштовний замір у зручний для вас час,
            зафіксуємо ціну одразу після нього й змонтуємо більшість кімнат за один день.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
