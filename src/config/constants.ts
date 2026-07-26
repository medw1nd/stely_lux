import { ShieldCheck, Zap, Award, Users, BadgeCheck, Leaf, Sparkles, HeartHandshake } from 'lucide-react';
import { ServiceFeature, PortfolioItem } from '../types';

export const FEATURES: ServiceFeature[] = [
  {
    icon: Users,
    title: "Професійна Команда",
    description: "Наші майстри мають досвід роботи від 5 років. Ми знаємо всі нюанси складних конструкцій, світлових ліній та тіньових швів."
  },
  {
    icon: ShieldCheck,
    title: "Безпечний Монтаж",
    description: "Ми використовуємо виключно полімерно-композитні газові балони, які є вибухобезпечними. Ваша безпека для нас на першому місці."
  },
  {
    icon: HeartHandshake,
    title: "Індивідуальний Підхід",
    description: "Ми не просто монтуємо стелі, а допомагаємо підібрати ідеальне рішення саме для вашого інтер'єру, враховуючи всі побажання та бюджет."
  },
  {
    icon: BadgeCheck,
    title: "Чесна Ціна",
    description: "Остаточна вартість озвучується на замірі і не змінюється в процесі роботи. Ніяких прихованих доплат за 'складність' в кінці."
  }
];

export const MATERIAL_BENEFITS = [
  {
    icon: Award,
    title: "MSD Premium",
    description: "Ми працюємо лише з сертифікованою плівкою MSD Premium. Це еталон якості: ідеально біла, міцна та довговічна."
  },
  {
    icon: Leaf,
    title: "Екологічність",
    description: "Матеріали мають маркування A+, не виділяють токсинів, гіпоалергенні та дозволені для дитячих кімнат."
  },
  {
    icon: Zap,
    title: "Без Запаху",
    description: "Дешеві стелі пахнуть тижнями. Наші матеріали не мають різкого хімічного запаху навіть у день монтажу."
  },
  {
    icon: ShieldCheck,
    title: "Надійність",
    description: "Полотно витримує навантаження до 100 кг/м². Ваш ремонт захищений від затоплення сусідами зверху."
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Світлові Лінії",
    category: "Сучасне освітлення",
    imageUrl: "/portfolio-1.jpg"
  },
  {
    id: 2,
    title: "Фотодрук на Стелі",
    category: "Унікальний дизайн",
    imageUrl: "/portfolio-2.jpg"
  },
  {
    id: 3,
    title: "Арт-Текстура",
    category: "Декоративні рішення",
    imageUrl: "/portfolio-3.jpg"
  },
  {
    id: 4,
    title: "Багаторівнева Конструкція",
    category: "Ексклюзив",
    imageUrl: "/portfolio-4.jpg"
  },
  {
    id: 5,
    title: "Комбінована Стеля",
    category: "Зонування простору",
    imageUrl: "/portfolio-5.jpg"
  },
  {
    id: 6,
    title: "Натяжна Стеля 6",
    category: "Інтер'єр",
    imageUrl: "/portfolio-6.jpg"
  },
  {
    id: 7,
    title: "Натяжна Стеля 7",
    category: "Інтер'єр",
    imageUrl: "/portfolio-7.jpg"
  },
  {
    id: 8,
    title: "Натяжна Стеля 8",
    category: "Інтер'єр",
    imageUrl: "/portfolio-8.jpg"
  },
  {
    id: 9,
    title: "Натяжна Стеля 9",
    category: "Інтер'єр",
    imageUrl: "/portfolio-9.jpg"
  },
  {
    id: 10,
    title: "Натяжна Стеля 10",
    category: "Інтер'єр",
    imageUrl: "/portfolio-10.jpg"
  }
];
