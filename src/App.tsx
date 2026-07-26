import { useEffect, useState } from 'react';
import {
  ArrowRight, BadgeCheck, Check, ChevronLeft, ChevronRight, Clock3,
  Layers3, MapPin, Menu, MessageCircle, Phone, Ruler, ShieldCheck,
  Sparkles, WandSparkles, X, Zap
} from 'lucide-react';

const phone = '+380977347767';
const facebook = 'https://www.facebook.com/share/1a1yhR8bGs/?mibextid=wwXIfr';

const works = [
  { src: '/portfolio-1-enhanced.jpg', title: 'Контурне освітлення', tag: 'Світлове рішення' },
  { src: '/portfolio-2-enhanced.jpg', title: 'Графітовий глянець', tag: 'Класичний інтер’єр' },
  { src: '/portfolio-3-enhanced.jpg', title: 'Теплий глянець', tag: 'Візуально більше простору' },
  { src: '/portfolio-4-enhanced.jpg', title: 'Срібна фактура', tag: 'Декоративне полотно' },
  { src: '/portfolio-5-enhanced.jpg', title: 'Орхідеї у ванній', tag: 'Фотодрук' },
  { src: '/portfolio-6-enhanced.jpg', title: 'Небо над головою', tag: 'Фотодрук' },
  { src: '/portfolio-7-enhanced.jpg', title: 'Контрастна геометрія', tag: 'Глянцеве полотно' },
  { src: '/portfolio-8-enhanced.jpg', title: 'Кругла композиція', tag: 'Багаторівнева конструкція' },
  { src: '/portfolio-9-enhanced.jpg', title: 'Плавна хвиля', tag: 'Фігурна конструкція' },
  { src: '/portfolio-10-enhanced.jpg', title: 'Лінійна абстракція', tag: 'Декоративне полотно' },
];

const benefits = [
  { icon: Ruler, n: '01', title: 'Точний замір', text: 'Приїдемо, оцінимо приміщення, допоможемо з типом полотна та освітленням.' },
  { icon: BadgeCheck, n: '02', title: 'Чесна ціна', text: 'Фіксуємо остаточну вартість після заміру. Без несподіваних доплат у кінці.' },
  { icon: ShieldCheck, n: '03', title: 'Безпечний монтаж', text: 'Використовуємо професійне обладнання та вибухобезпечні композитні балони.' },
  { icon: Sparkles, n: '04', title: 'Чистий результат', text: 'Акуратні примикання, рівна геометрія та порядок після завершення робіт.' },
];

const steps = [
  { n: '01', title: 'Заявка', text: 'Телефонуєте або пишете нам. Уточнюємо ваші побажання.' },
  { n: '02', title: 'Безкоштовний замір', text: 'Майстер приїжджає у зручний час із каталогом матеріалів.' },
  { n: '03', title: 'Рішення й ціна', text: 'Підбираємо конструкцію, освітлення та фіксуємо вартість.' },
  { n: '04', title: 'Монтаж', text: 'Встановлюємо стелю швидко, точно й залишаємо після себе чистоту.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen || selected !== null ? 'hidden' : '';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelected(null); setMenuOpen(false); }
      if (selected !== null && event.key === 'ArrowRight') setSelected((selected + 1) % works.length);
      if (selected !== null && event.key === 'ArrowLeft') setSelected((selected - 1 + works.length) % works.length);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [menuOpen, selected]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return <div className="site-shell">
    <header className="topbar">
      <button className="brand" onClick={() => scrollTo('home')} aria-label="Steli Lux — на початок сторінки">
        <img src="/brand-mark.png" alt="" aria-hidden="true" />
        <span className="wordmark"><b>STELI</b><em>LUX</em><small>натяжні стелі</small></span>
      </button>
      <nav className="desktop-nav" aria-label="Головна навігація">
        <button onClick={() => scrollTo('solutions')}>Переваги</button>
        <button onClick={() => scrollTo('works')}>Портфоліо</button>
        <button onClick={() => scrollTo('process')}>Як працюємо</button>
        <button onClick={() => scrollTo('contacts')}>Контакти</button>
      </nav>
      <a className="header-phone" href={`tel:${phone}`}><Phone size={17} /> 097 734 77 67</a>
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Відкрити меню"><Menu /></button>
    </header>

    {menuOpen && <div className="mobile-menu">
      <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Закрити меню"><X /></button>
      <span className="mobile-menu-label">Навігація</span>
      {['solutions', 'works', 'process', 'contacts'].map((id, i) =>
        <button key={id} onClick={() => scrollTo(id)}>{['Переваги', 'Портфоліо', 'Як працюємо', 'Контакти'][i]}</button>
      )}
      <a className="primary" href={`tel:${phone}`}><Phone size={19} /> Зателефонувати</a>
    </div>}

    <main>
      <section className="hero" id="home">
        <div className="hero-media"><img src="/portfolio-8-enhanced.jpg" alt="Сучасна багаторівнева натяжна стеля з круглою композицією" /></div>
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow"><span /> Івано-Франківськ та область</div>
          <h1>Натяжні стелі<br />в Івано-Франківську.<br /><em>Вигляд, що вражає.</em></h1>
          <p>Проєктуємо та монтуємо натяжні стелі з продуманим світлом, чистою геометрією й акуратними примиканнями. Допоможемо знайти рішення саме для вашого інтер’єру.</p>
          <div className="hero-actions">
            <a className="primary" href={`tel:${phone}`}>Замовити безкоштовний замір <ArrowRight size={19} /></a>
            <button className="text-link" onClick={() => scrollTo('works')}>Переглянути роботи</button>
          </div>
          <div className="hero-proof">
            <div><strong>5+ років</strong><span>практичного досвіду</span></div>
            <div><strong>1 день</strong><span>для монтажу більшості кімнат</span></div>
            <div><strong>0 доплат</strong><span>після погодження ціни</span></div>
          </div>
        </div>
        <button className="scroll-cue" onClick={() => scrollTo('solutions')} aria-label="Прокрутити далі"><span /></button>
      </section>

      <section className="trust-strip">
        <span><Check /> Безкоштовний замір</span>
        <span><Check /> Матеріали MSD Premium</span>
        <span><Check /> Безпечне обладнання</span>
        <span><Check /> Працюємо по всій області</span>
      </section>

      <section className="section solutions" id="solutions">
        <div className="section-head split">
          <div><span className="kicker">Ваш комфорт — наш стандарт</span><h2>Красива стеля.<br /><i>Без зайвого клопоту.</i></h2></div>
          <p>Не просто натягуємо полотно. Продумуємо вигляд, світло й технічні деталі так, щоб результат пасував інтер’єру та служив роками.</p>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, n, title, text }) => <article className="benefit-card" key={n}>
            <div className="benefit-top"><Icon /><span>{n}</span></div><h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
      </section>

      <section className="section works" id="works">
        <div className="section-head split">
          <div><span className="kicker">Реальні об’єкти</span><h2>Результат, який хочеться<br /><i>показувати.</i></h2></div>
          <p>У портфоліо — наші виконані роботи в Івано-Франківську та області. Натисніть на фото, щоб побачити деталі.</p>
        </div>
        <div className="portfolio-grid">
          {works.map((work, i) => <button key={work.src} className={`portfolio-card card-${i + 1}`} onClick={() => setSelected(i)}>
            <img src={work.src} alt={`${work.title} — робота Steli Lux`} loading={i > 3 ? 'lazy' : undefined} />
            <span className="portfolio-overlay"><small>{work.tag}</small><strong>{work.title}</strong><i><ArrowRight /></i></span>
          </button>)}
        </div>
      </section>

      <section className="portfolio-cta">
        <div><span className="kicker warm">Маєте референс?</span><h2>Покажіть, що подобається —<br />скажемо, як це реалізувати.</h2></div>
        <div><p>Допоможемо адаптувати ідею під ваше приміщення та бюджет.</p><a className="primary" href={facebook} target="_blank" rel="noreferrer">Надіслати фото <MessageCircle size={19} /></a></div>
      </section>

      <section className="materials-section">
        <div className="materials-photo"><img src="/portfolio-7-enhanced.jpg" alt="Деталь контрастної натяжної стелі Steli Lux" loading="lazy" /><span>MSD<br />Premium</span></div>
        <div className="materials-content">
          <span className="kicker">Матеріали мають значення</span>
          <h2>Без запаху.<br />Без пожовтіння.<br /><i>Без компромісів.</i></h2>
          <p>Встановлюємо сертифіковані полотна класу A+. Вони гіпоалергенні, безпечні для дитячих кімнат та витримують навантаження до 100 кг/м².</p>
          <ul><li><Layers3 /><span><b>Стабільний колір</b>Полотно зберігає свій вигляд роками</span></li><li><ShieldCheck /><span><b>Захист від затоплення</b>Допомагає вберегти ремонт і меблі</span></li><li><WandSparkles /><span><b>Легкий догляд</b>Не збирає пил і просто очищується</span></li></ul>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-head center"><span className="kicker">Просто й прозоро</span><h2>Від першого дзвінка<br /><i>до готової стелі.</i></h2></div>
        <div className="steps">
          {steps.map(step => <article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
        <div className="process-note"><Clock3 /><span><b>Працюємо щодня</b> — підберемо зручний час для заміру та монтажу.</span></div>
      </section>

      <section className="faq section">
        <div className="section-head"><span className="kicker">Відповіді без складних слів</span><h2>Що варто знати<br /><i>до заміру.</i></h2></div>
        <div className="faq-list">
          <details><summary>Скільки часу займає монтаж?<span>+</span></summary><p>Більшість стандартних кімнат монтуємо протягом одного дня. Точний час залежить від площі, кількості світильників і складності конструкції.</p></details>
          <details><summary>Чи буде запах після встановлення?<span>+</span></summary><p>Якісне полотно MSD Premium не має різкого хімічного запаху. Приміщенням можна користуватися одразу після провітрювання.</p></details>
          <details><summary>Коли я дізнаюся точну ціну?<span>+</span></summary><p>Майстер розрахує та зафіксує остаточну вартість після заміру й погодження матеріалів, профілю та освітлення.</p></details>
          <details><summary>Ви працюєте за межами Івано-Франківська?<span>+</span></summary><p>Так, виїжджаємо на об’єкти по Івано-Франківській області. Умови виїзду уточнимо телефоном.</p></details>
        </div>
      </section>

      <section className="contact" id="contacts">
        <div className="contact-pin"><MapPin /> Івано-Франківськ та область</div>
        <span className="kicker warm">Безкоштовний замір</span>
        <h2>Почнімо з вашої<br /><i>ідеальної стелі.</i></h2>
        <p>Зателефонуйте або напишіть. Обговоримо приміщення, відповімо на запитання та домовимося про зручний час.</p>
        <div className="contact-actions">
          <a className="primary" href={`tel:${phone}`}><Phone size={19} /> 097 734 77 67</a>
          <a className="ghost" href={facebook} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Написати у Facebook</a>
        </div>
        <span className="availability"><i /> Щодня, 09:00–20:00</span>
      </section>
    </main>

    <footer>
      <div className="footer-brand"><img src="/brand-mark.png" alt="" aria-hidden="true" /><span className="wordmark"><b>STELI</b><em>LUX</em></span></div>
      <span>Натяжні стелі в Івано-Франківську та області</span><a href={`tel:${phone}`}>097 734 77 67</a><span>© {new Date().getFullYear()} Steli Lux</span>
    </footer>
    <a className="mobile-call" href={`tel:${phone}`}><Phone size={18} /> Безкоштовний замір</a>

    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Перегляд роботи" onClick={() => setSelected(null)}>
      <button className="close" onClick={() => setSelected(null)} aria-label="Закрити"><X /></button>
      <button className="prev" onClick={e => { e.stopPropagation(); setSelected((selected - 1 + works.length) % works.length); }} aria-label="Попереднє фото"><ChevronLeft /></button>
      <figure onClick={e => e.stopPropagation()}><img src={works[selected].src} alt={works[selected].title} /><figcaption><small>{works[selected].tag}</small><strong>{works[selected].title}</strong></figcaption></figure>
      <button className="next" onClick={e => { e.stopPropagation(); setSelected((selected + 1) % works.length); }} aria-label="Наступне фото"><ChevronRight /></button>
      <span className="lightbox-count">{selected + 1} / {works.length}</span>
    </div>}
  </div>;
}

export default App;
