import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';

const phone = '+380977347767';
const works = Array.from({ length: 10 }, (_, i) => ({ src: `/portfolio-${i + 1}.jpg`, alt: `Натяжна стеля Steli Lux — реалізований об’єкт ${i + 1}` }));
const advantages = [
  { icon: ShieldCheck, n: '01', title: 'Безпечний монтаж', text: 'Працюємо з вибухобезпечними композитними балонами та професійним обладнанням.' },
  { icon: Sparkles, n: '02', title: 'Преміум-полотно', text: 'Сертифіковані матеріали MSD Premium без різкого запаху, пожовтіння та шкідливих домішок.' },
  { icon: Zap, n: '03', title: 'Швидко й чисто', text: 'Більшість кімнат монтуємо за один день. Після роботи залишаємо порядок.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [area, setArea] = useState(20);
  const [lights, setLights] = useState(4);
  const [corners, setCorners] = useState(4);
  const estimate = useMemo(() => area * 420 + lights * 280 + Math.max(0, corners - 4) * 160, [area, lights, corners]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelected(null); setMenuOpen(false); }
      if (selected !== null && event.key === 'ArrowRight') setSelected((selected + 1) % works.length);
      if (selected !== null && event.key === 'ArrowLeft') setSelected((selected - 1 + works.length) % works.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return <div className="site-shell">
    <header className="topbar">
      <button className="brand" onClick={() => scrollTo('home')} aria-label="На початок сторінки"><img src="/logo.png" alt="Steli Lux" /></button>
      <nav className="desktop-nav" aria-label="Головна навігація">
        <button onClick={() => scrollTo('benefits')}>Переваги</button><button onClick={() => scrollTo('works')}>Роботи</button>
        <button onClick={() => scrollTo('price')}>Вартість</button><button onClick={() => scrollTo('contacts')}>Контакти</button>
      </nav>
      <a className="header-phone" href={`tel:${phone}`}><Phone size={17} /> 097 734 77 67</a>
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Відкрити меню"><Menu /></button>
    </header>
    {menuOpen && <div className="mobile-menu">
      <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Закрити меню"><X /></button>
      {['benefits', 'works', 'price', 'contacts'].map((id, i) => <button key={id} onClick={() => scrollTo(id)}>{['Переваги', 'Роботи', 'Вартість', 'Контакти'][i]}</button>)}
      <a href={`tel:${phone}`}>Зателефонувати</a>
    </div>}
    <main>
      <section className="hero" id="home">
        <div className="hero-media"><img src="/portfolio-8.jpg" alt="Сучасна натяжна стеля з підсвіткою" /></div><div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow"><span /> Івано-Франківськ та область</div>
          <h1>Стелі, що<br />змінюють <em>простір.</em></h1>
          <p>Проєктуємо та монтуємо натяжні стелі з бездоганною геометрією, світлом і увагою до кожної деталі.</p>
          <div className="hero-actions"><button className="primary" onClick={() => scrollTo('price')}>Розрахувати вартість <ArrowRight size={19} /></button><button className="text-link" onClick={() => scrollTo('works')}>Дивитися роботи</button></div>
          <div className="hero-proof"><div><strong>5+</strong><span>років досвіду</span></div><div><strong>400+</strong><span>готових стель</span></div><div><strong>3 роки</strong><span>гарантії на монтаж</span></div></div>
        </div>
        <button className="scroll-cue" onClick={() => scrollTo('benefits')} aria-label="Прокрутити до переваг"><span /></button>
      </section>
      <section className="section light" id="benefits">
        <div className="section-head"><span className="kicker">Чому Steli Lux</span><h2>Спокійний ремонт.<br /><i>Точний результат.</i></h2><p>Беремо відповідальність за весь процес — від заміру й підбору матеріалів до чистого монтажу.</p></div>
        <div className="advantage-grid">{advantages.map(({ icon: Icon, n, title, text }) => <article className="advantage" key={n}><span className="number">{n}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="material-band">
        <div><span className="kicker warm">Матеріали без компромісів</span><h2>Якість, яку не потрібно<br />перевіряти щороку.</h2></div>
        <div className="material-copy"><p>Використовуємо сертифіковані полотна класу A+: без запаху, безпечні для дитячих кімнат і стійкі до навантаження до 100 кг/м².</p><ul><li><Check /> MSD Premium</li><li><Check /> Екологічність A+</li><li><Check /> Захист від затоплення</li></ul></div>
      </section>
      <section className="section works" id="works">
        <div className="section-head row"><div><span className="kicker">Портфоліо</span><h2>Роботи говорять<br /><i>краще за слова.</i></h2></div><p>Реальні об’єкти в Івано-Франківську та області. Натисніть на фото, щоб роздивитися деталі.</p></div>
        <div className="gallery">{works.slice(0, 6).map((work, i) => <button key={work.src} className={`work work-${i + 1}`} onClick={() => setSelected(i)}><img src={work.src} alt={work.alt} loading={i > 2 ? 'lazy' : undefined} /><span>Переглянути <ArrowRight size={16} /></span></button>)}</div>
      </section>
      <section className="estimate-section" id="price">
        <div className="estimate-intro"><span className="kicker warm">Орієнтовний розрахунок</span><h2>Дізнайтеся бюджет<br />за одну хвилину.</h2><p>Калькулятор дає попередню оцінку. Точну вартість зафіксуємо після безкоштовного заміру.</p><div className="time-note"><Clock3 /><span><b>Безкоштовний замір</b><br />у зручний для вас час</span></div></div>
        <div className="calculator">
          <label><span>Площа приміщення <b>{area} м²</b></span><input type="range" min="5" max="100" value={area} onChange={e => setArea(+e.target.value)} /></label>
          <div className="counter-row"><label><span>Точки світла</span><input type="number" min="0" value={lights} onChange={e => setLights(Math.max(0, +e.target.value))} /></label><label><span>Кути</span><input type="number" min="4" value={corners} onChange={e => setCorners(Math.max(4, +e.target.value))} /></label></div>
          <div className="total"><span>Орієнтовна вартість</span><strong>{estimate.toLocaleString('uk-UA')} ₴</strong></div><a className="primary full" href={`tel:${phone}`}>Уточнити розрахунок <ArrowRight size={19} /></a><small>* Фінальна ціна залежить від матеріалу, профілю та складності освітлення.</small>
        </div>
      </section>
      <section className="contact" id="contacts">
        <span className="kicker warm">Почнемо з розмови</span><h2>Ваша нова стеля —<br /><i>на один дзвінок ближче.</i></h2><p>Розкажіть про приміщення — зорієнтуємо по вартості та домовимося про безкоштовний замір.</p>
        <div className="contact-actions"><a className="primary" href={`tel:${phone}`}><Phone size={19} /> 097 734 77 67</a><a className="ghost" href="https://www.facebook.com/share/1a1yhR8bGs/?mibextid=wwXIfr" target="_blank" rel="noreferrer"><MessageCircle size={19} /> Написати в Facebook</a></div><span className="availability"><i /> Щодня, 09:00–20:00</span>
      </section>
    </main>
    <footer><img src="/logo.png" alt="Steli Lux" /><span>Натяжні стелі в Івано-Франківську та області</span><span>© {new Date().getFullYear()} Steli Lux</span></footer>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Перегляд роботи" onClick={() => setSelected(null)}>
      <button className="close" onClick={() => setSelected(null)} aria-label="Закрити"><X /></button><button className="prev" onClick={e => { e.stopPropagation(); setSelected((selected - 1 + works.length) % works.length); }} aria-label="Попереднє фото"><ChevronLeft /></button><img src={works[selected].src} alt={works[selected].alt} onClick={e => e.stopPropagation()} /><button className="next" onClick={e => { e.stopPropagation(); setSelected((selected + 1) % works.length); }} aria-label="Наступне фото"><ChevronRight /></button><span>{selected + 1} / {works.length}</span>
    </div>}
  </div>;
}
export default App;
