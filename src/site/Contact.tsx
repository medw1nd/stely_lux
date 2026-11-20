import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowUpRight, Check, MapPin, Phone } from 'lucide-react';
import { FACEBOOK, FEATURES, HOURS, LEAD_ENDPOINT, NAV, PHONE, PHONE_LABEL } from './data';
import { BrandMark, EASE, Reveal, scrollToId } from './ui';
import { Magnetic, WordsReveal } from './fx';

const ROOMS = ['Вітальня', 'Спальня', 'Кухня', 'Ванна', 'Вся квартира', 'Будинок'];

export function Contact({ estimate }: { estimate: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [rooms, setRooms] = useState<string[]>([]);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => { if (estimate) setNote(estimate); }, [estimate]);

  const toggle = (r: string) => setRooms(rs => (rs.includes(r) ? rs.filter(x => x !== r) : [...rs, r]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 9) { setState('error'); return; }
    setState('sending');
    const lead = { name, phone, rooms, note, page: window.location.href, at: new Date().toISOString() };
    try {
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        console.info('[Steli Lux] Lead endpoint not configured, lead not sent:', lead);
        await new Promise(r => setTimeout(r, 700));
      }
      setState('done');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="section contact" id="contacts">
      <div className="contact-glow" />
      <Reveal className="contact-copy">
        <span className="eyebrow">Безкоштовний замір</span>
        <WordsReveal className="h-section" text={'Почнімо\nз вашої стелі'} em={['стелі']} />
        <p className="lead">
          {FEATURES.leadForm
            ? 'Залиште контакт — передзвонимо протягом робочого дня, відповімо на питання та домовимося про зручний час заміру.'
            : 'Зателефонуйте або напишіть у Facebook — відповімо на питання та домовимося про зручний час заміру в Івано-Франківську чи області.'}
        </p>
        {FEATURES.leadForm && <div className="contact-lines">
          <a href={`tel:${PHONE}`}><span><small>Телефон</small><strong>{PHONE_LABEL}</strong></span><Phone /></a>
          <a href={FACEBOOK} target="_blank" rel="noreferrer"><span><small>Facebook</small><strong>Написати повідомлення</strong></span><ArrowUpRight /></a>
          <div><span><small><i className="live-dot" />Графік</small><strong>{HOURS}</strong></span><MapPin /></div>
        </div>}
      </Reveal>

      {!FEATURES.leadForm && (
        <Reveal delay={.12}>
          <div className="call-card">
            <span className="call-card-kicker"><i className="live-dot" />На зв’язку {HOURS.toLowerCase()}</span>
            <a className="call-card-phone" href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
            <p>Майстер проконсультує щодо полотна, світла та вартості й підбере зручний час для безкоштовного заміру.</p>
            <div className="call-card-actions">
              <Magnetic strength={.2}><a className="btn btn-gold" href={`tel:${PHONE}`}><Phone /> Зателефонувати</a></Magnetic>
              <a className="btn btn-ghost" href={FACEBOOK} target="_blank" rel="noreferrer">Facebook <ArrowUpRight /></a>
            </div>
          </div>
        </Reveal>
      )}

      {FEATURES.leadForm && <Reveal delay={.12}>
        <form className="form" onSubmit={submit} noValidate>
          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <motion.div key="done" className="form-done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE }}>
                <div className="seal"><Check /></div>
                <h3>Дякуємо{name ? `, ${name}` : ''}!</h3>
                <p>Заявку прийнято. Ми зателефонуємо на {phone} найближчим часом.</p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0, y: -10 }}>
                <h3>Заявка на замір</h3>
                <p>Займе менше хвилини. Ні до чого не зобов’язує.</p>
                <div className="input">
                  <input id="f-name" placeholder=" " value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
                  <label htmlFor="f-name">Ваше ім’я</label>
                </div>
                <div className="input">
                  <input id="f-phone" placeholder=" " value={phone} onChange={e => { setPhone(e.target.value); if (state === 'error') setState('idle'); }} type="tel" inputMode="tel" autoComplete="tel" required />
                  <label htmlFor="f-phone">Телефон *</label>
                </div>
                <div className="chips">
                  <span>Приміщення</span>
                  <div>{ROOMS.map(r => <button type="button" key={r} className={rooms.includes(r) ? 'on' : ''} onClick={() => toggle(r)}>{r}</button>)}</div>
                </div>
                <div className="input" style={{ marginTop: 18 }}>
                  <textarea id="f-note" placeholder=" " value={note} onChange={e => setNote(e.target.value)} rows={3} />
                  <label htmlFor="f-note">Побажання або площа</label>
                </div>
                {state === 'error' && <div className="form-error">Перевірте номер телефону та спробуйте ще раз.</div>}
                <button className="btn btn-gold" type="submit" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Надсилаємо…' : <>Отримати замір <ArrowRight /></>}
                </button>
                <div className="form-legal">Ваші дані використовуються лише для зв’язку щодо заміру.</div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Reveal>}
    </section>
  );
}

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <button className="footer-brand" onClick={toTop} aria-label="Steli Lux — нагору"><BrandMark /><span className="footer-big">steli<span>lux</span></span></button>
        <nav className="footer-nav">
          {NAV.map(n => <button key={n.id} onClick={() => scrollToId(n.id)}>{n.label}</button>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <button className="footer-copy" onClick={toTop}>© {new Date().getFullYear()} Steli Lux · Натяжні стелі в Івано-Франківську та області</button>
        <a href={`tel:${PHONE}`}>{PHONE_LABEL}</a>
      </div>
    </footer>
  );
}

export function MobileCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contacts = document.getElementById('contacts');
      const nearForm = contacts ? contacts.getBoundingClientRect().top < window.innerHeight * .9 : false;
      setShow(window.scrollY > window.innerHeight * .85 && !nearForm);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        FEATURES.leadForm ? (
          <motion.button
            className="btn btn-gold mobile-cta"
            onClick={() => scrollToId('contacts')}
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }}
            transition={{ duration: .6, ease: EASE }}
          >
            Безкоштовний замір <ArrowRight />
          </motion.button>
        ) : (
          <motion.a
            className="btn btn-gold mobile-cta"
            href={`tel:${PHONE}`}
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }}
            transition={{ duration: .6, ease: EASE }}
          >
            <Phone /> Зателефонувати
          </motion.a>
        )
      )}
    </AnimatePresence>
  );
}

/** Floating "back to top" arrow with a ring that fills as you scroll. */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          onClick={toTop}
          aria-label="Нагору"
          initial={{ opacity: 0, y: 20, scale: .8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .8 }}
          transition={{ duration: .5, ease: EASE }}
          whileHover={{ y: -4 }}
        >
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="24" className="to-top-track" />
            <motion.circle cx="26" cy="26" r="24" className="to-top-ring" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
