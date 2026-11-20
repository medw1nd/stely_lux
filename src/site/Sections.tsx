import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { PRINCIPLES, SOLUTIONS, SPECS, STEPS, TOWNS } from './data';
import { EASE, Reveal } from './ui';

const MARQUEE = ['Світлові лінії', 'Трекові системи', 'Тіньовий профіль', 'Контурна підсвітка', 'Приховані карнизи', 'MSD Premium', 'Безкоштовний замір'];

export function Marquee() {
  const row = MARQUEE.map(t => <span key={t}>{t}<i /></span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
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

export function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="sec-head">
        <Reveal>
          <span className="eyebrow">Рішення</span>
          <h2 className="h-section">Архітектура<br /><em className="gold-text">світла</em></h2>
        </Reveal>
        <Reveal delay={.1}>
          <p className="lead">Сучасна стеля — це не біла площина, а сценарій освітлення. Поєднуємо полотно, профіль і світло в одну чисту композицію.</p>
        </Reveal>
      </div>
      <div className="solutions-grid">
        {SOLUTIONS.map((s, i) => (
          <motion.article
            key={s.title}
            className="solution"
            tabIndex={0}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: EASE, delay: i * .1 }}
          >
            <img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.position }} />
            <span className="solution-n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="solution-line" />
          </motion.article>
        ))}
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

export function Process() {
  return (
    <section className="section night" id="process">
      <div className="sec-head center">
        <Reveal>
          <span className="eyebrow center">Процес</span>
          <h2 className="h-section" style={{ marginTop: 26 }}>Від першого дзвінка<br /><em className="gold-text">до готової стелі</em></h2>
        </Reveal>
      </div>
      <div className="timeline">
        <motion.div className="timeline-rail" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.span variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: 2.4, ease: EASE }} />
        </motion.div>
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={.25 + i * .2} className="step">
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
            <strong>Steli Lux</strong> — монтаж натяжних стель в Івано-Франківську під ключ: від безкоштовного заміру до
            готової стелі зі світлом. Встановлюємо матові, сатинові та глянцеві полотна MSD Premium, робимо
            <strong> світлові лінії</strong>, <strong>магнітні трекові системи</strong>, <strong>тіньовий профіль</strong>,
            контурну LED-підсвітку та <strong>приховані карнизи</strong> для квартир, будинків і комерційних приміщень.
          </p>
          <p>
            Виїжджаємо на замір по всій Івано-Франківській області. Ціну фіксуємо після заміру — без доплат у кінці,
            а більшість кімнат монтуємо за один день.
          </p>
          <ul className="towns" aria-label="Міста, де ми працюємо">
            {TOWNS.map(t => <li key={t}>{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
