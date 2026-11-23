export const PHONE = '+380977347767';
export const PHONE_LABEL = '097 734 77 67';
export const FACEBOOK = 'https://www.facebook.com/share/1a1yhR8bGs/?mibextid=wwXIfr';
/** Opens a chat by phone number. Replace with https://t.me/<username> if the business has a Telegram username. */
export const TELEGRAM = `https://t.me/${PHONE}`;
export const HOURS = 'Щодня, 09:00–20:00';

/** Optional endpoint for the lead form (e.g. a Telegram-bot webhook). Set VITE_LEAD_ENDPOINT in .env.local. */
/**
 * Feature switches. Lead form & "measure" buttons are hidden for now (contact is by phone / Facebook only).
 * Flip `leadForm` to true to bring the form, calculator hand-off and "Замір" buttons back.
 */
export const FEATURES = {
  leadForm: false,
};

export const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

export const NAV = [
  { id: 'solutions', label: 'Рішення' },
  { id: 'works', label: 'Портфоліо' },
  { id: 'materials', label: 'Матеріали' },
  { id: 'process', label: 'Процес' },
  { id: 'contacts', label: 'Контакти' },
];

export type Category = 'light' | 'tracks' | 'forms';

export interface Work {
  src: string;
  title: string;
  tag: string;
  category: Category;
  position?: string;
  /** Layout hint for the editorial grid */
  size?: 'tall' | 'wide' | 'big';
}

export const WORKS: Work[] = [
  { src: '/graded/portfolio-8.jpg', title: 'Кругла композиція з дзеркальним глянцем', tag: 'Багаторівнева конструкція', category: 'forms', size: 'big' },
  { src: '/graded/portfolio-1.jpg', title: 'Світловий периметр у ванній', tag: 'Контурна LED-підсвітка', category: 'light', size: 'tall', position: 'center 40%' },
  { src: '/graded/double-light-track.jpg', title: 'Подвійний трек — крупний план', tag: 'Трекові системи', category: 'tracks', size: 'tall', position: 'center 65%' },
  { src: '/graded/geometric-tracks-clean.jpg', title: 'Геометрія треків біля панорамних вікон', tag: 'Трекові системи', category: 'tracks', size: 'wide' },
  { src: '/graded/ceiling-lines-main.jpg', title: 'Лінійні треки та центральний акцент', tag: 'Комбіноване світло', category: 'tracks', size: 'wide' },
];

export const FILTERS: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'Усі роботи' },
  { id: 'light', label: 'Світло' },
  { id: 'tracks', label: 'Треки' },
  { id: 'forms', label: 'Конструкції' },
];

export const SOLUTIONS: { n: string; title: string; text: string; img: string; position?: string }[] = [
  { n: 'I', title: 'Світлові лінії', text: 'Вбудовані лінії світла, що задають ритм простору й замінюють класичні люстри.', img: '/graded/ceiling-lines-main.jpg' },
  { n: 'II', title: 'Трекові системи', text: 'Магнітні треки врівень зі стелею: акцентне світло, яке можна переналаштувати будь-коли.', img: '/graded/geometric-tracks-clean.jpg' },
  { n: 'III', title: 'Контурна підсвітка', text: 'Ефект ширяючої стелі — м’яке світло по периметру, що візуально піднімає простір.', img: '/graded/led-perimeter.jpg' },
  { n: 'IV', title: 'Приховані карнизи', text: 'Ніша під штори без видимих кріплень: тканина ніби виходить зі стелі.', img: '/graded/ceiling-lines-main.jpg' },
];

export const PRINCIPLES = [
  { title: 'Точний замір', text: 'Майстер оцінює приміщення та допомагає з полотном і світлом — безкоштовно.' },
  { title: 'Фіксована ціна', text: 'Вартість фіксуємо після заміру. Жодних доплат «за складність» у кінці.' },
  { title: 'Безпечний монтаж', text: 'Професійне обладнання та вибухобезпечні композитні балони.' },
  { title: 'Бездоганна чистота', text: 'Рівна геометрія, акуратні примикання й порядок після завершення.' },
];

export const TOWNS = [
  'Івано-Франківськ', 'Калуш', 'Коломия', 'Надвірна', 'Долина', 'Бурштин', 'Тисмениця', 'Галич',
  'Богородчани', 'Яремче', 'Болехів', 'Рогатин', 'Снятин', 'Городенка', 'Тлумач', 'Косів', 'Буковель',
];

export const STEPS = [
  { n: '01', title: 'Заявка', text: 'Телефонуєте або пишете в Telegram. Уточнюємо побажання та зручний час.' },
  { n: '02', title: 'Безкоштовний замір', text: 'Майстер приїжджає з каталогом полотен, профілів і світла.' },
  { n: '03', title: 'Рішення й ціна', text: 'Погоджуємо конструкцію, освітлення та фіксуємо вартість.' },
  { n: '04', title: 'Монтаж', text: 'Більшість кімнат — за один день. Після нас лишається тільки чистота.' },
];

export const SPECS = [
  { k: 'A+', v: 'клас екологічності' },
  { k: '100', unit: 'кг/м²', v: 'витримує навантаження' },
  { k: '0', v: 'хімічного запаху' },
  { k: '1', unit: 'день', v: 'монтаж більшості кімнат' },
];

export const FAQ = [
  { q: 'Скільки часу займає монтаж?', a: 'Більшість стандартних кімнат монтуємо за один день. Точний час залежить від площі, кількості світильників і складності конструкції.' },
  { q: 'Чи буде запах після встановлення?', a: 'Полотно MSD Premium не має різкого хімічного запаху. Приміщенням можна користуватися одразу після провітрювання.' },
  { q: 'Коли я дізнаюся точну ціну?', a: 'Майстер розрахує та зафіксує остаточну вартість після заміру й погодження матеріалів, профілю та освітлення. Далі вона не змінюється.' },
  { q: 'Чи можна зробити світлові лінії та треки?', a: 'Так. Проєктуємо світлові лінії, магнітні треки, контурну підсвітку та приховані карнизи — окремо або в поєднанні.' },
  { q: 'Чи захистить стеля від затоплення?', a: 'Полотно витримує до 100 кг/м² і утримує воду, допомагаючи вберегти ремонт і меблі. Після зливу води стеля повертає форму.' },
  { q: 'Ви працюєте за межами Івано-Франківська?', a: 'Так, виїжджаємо на об’єкти по всій Івано-Франківській області. Умови виїзду уточнимо телефоном.' },
];

/** Orientation prices for the calculator (UAH). Confirm with the owner before going live. */
export const PRICES = {
  canvas: { matte: 350, satin: 400, glossy: 380 },
  corner: 100,
  light: 200,
  lineMeter: 900,
};
