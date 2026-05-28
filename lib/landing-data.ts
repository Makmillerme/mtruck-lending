import { catalogBrands } from "@/lib/catalog-brands";
import type { Locale } from "@/lib/locale";

export type LandingSectionKey =
  | "header"
  | "hero"
  | "about"
  | "why-us"
  | "services-meta"
  | "catalog-meta"
  | "faq-meta"
  | "footer";

type SectionPayload = Record<string, unknown>;

export type LandingBundle = {
  content: Record<LandingSectionKey, Record<Locale, SectionPayload>>;
  services: Array<{
    id: number;
    titleEn: string;
    titleUk: string | null;
    descriptionEn: string;
    descriptionUk: string | null;
    icon: string;
    orderIndex: number;
  }>;
  vehicles: Array<{
    id: number;
    brand: string;
    category: string;
    specs: string[];
    tagEn: string | null;
    tagUk: string | null;
    descriptionEn: string | null;
    descriptionUk: string | null;
    catalogMeta: unknown;
    orderIndex: number;
  }>;
  faqs: Array<{
    id: number;
    questionEn: string;
    questionUk: string | null;
    answerEn: string;
    answerUk: string | null;
    orderIndex: number;
  }>;
  testimonials: Array<{
    id: number;
    quoteEn: string;
    quoteUk: string | null;
    authorEn: string;
    authorUk: string | null;
    companyEn: string | null;
    companyUk: string | null;
    rating: number;
    orderIndex: number;
    isActive: boolean;
  }>;
  contact: {
    email: string;
    phone: string;
    addressEn: string;
    addressUk: string | null;
    workingHoursEn: string | null;
    workingHoursUk: string | null;
    socialLinks: Record<string, unknown>;
  };
  stats: Array<{
    id: number;
    key: string;
    value: string;
    labelEn: string;
    labelUk: string;
    orderIndex: number;
  }>;
};

export const LANDING_SECTION_ORDER = [
  "header",
  "hero",
  "about",
  "services",
  "catalog",
  "why-us",
  "faq",
  "footer",
] as const;

const nav = {
  en: [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Catalog", id: "catalog" },
    { name: "Why Us", id: "why-us" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ],
  uk: [
    { name: "Головна", id: "home" },
    { name: "Про нас", id: "about" },
    { name: "Послуги", id: "services" },
    { name: "Каталог", id: "catalog" },
    { name: "Чому ми", id: "why-us" },
    { name: "FAQ", id: "faq" },
    { name: "Контакти", id: "contact" },
  ],
} as const;

const content: LandingBundle["content"] = {
  header: {
    en: { navigation: nav.en, ctaText: "Get Quote", logo: { src: "/expert-travel-logo.svg", alt: "EXPERT TRAVEL" } },
    uk: { navigation: nav.uk, ctaText: "Отримати пропозицію", logo: { src: "/expert-travel-logo.svg", alt: "EXPERT TRAVEL" } },
  },
  hero: {
    en: {
      badge: "European Quality",
      title: "Premium Commercial",
      titleHighlight: "Equipment",
      subtitle: "from Europe",
      description: "Your trusted partner for commercial trucks, trailers, and cargo vehicles.",
      cta: "View Catalog",
      secondary: "Contact Us",
    },
    uk: {
      badge: "Європейська якість",
      title: "Преміальна комерційна",
      titleHighlight: "Техніка",
      subtitle: "з Європи",
      description: "Ваш надійний партнер з продажу вантажівок, причепів та комерційної техніки.",
      cta: "Переглянути каталог",
      secondary: "Зв'язатися з нами",
    },
  },
  about: {
    en: {
      badge: "About Us",
      title: "Your Reliable Partner in",
      titleHighlight: "Commercial Transport",
      description:
        "With over 15 years of experience in the European commercial vehicle market, we specialize in importing premium trucks, trailers, and cargo vehicles from leading European manufacturers.",
      description2:
        "Our team of experts ensures every vehicle meets the highest quality standards before delivery. We provide complete documentation, warranty, and after-sales support.",
      aboutImageAlt: "Premium commercial truck, neon accent lighting",
      bridgeTitle: "Import chain",
      imageCallouts: ["EU direct import", "Full documentation", "Verified quality", "Service record", "Export ready"],
      importChain: ["VIN & mileage check", "Pre-shipment inspection", "Registration pack", "EU-wide delivery"],
      features: [
        { icon: "Building2", title: "Czech Based", description: "Headquartered in Prague with EU-wide operations" },
        { icon: "Users", title: "Expert Team", description: "Experienced professionals in commercial vehicles" },
        { icon: "Globe2", title: "EU Network", description: "Direct partnerships with European suppliers" },
        { icon: "TrendingUp", title: "Growing Fast", description: "500+ vehicles delivered to satisfied clients" },
      ],
    },
    uk: {
      badge: "Про нас",
      title: "Ваш надійний партнер у",
      titleHighlight: "комерційних перевезеннях",
      description:
        "Маючи понад 15 років досвіду на європейському ринку комерційної техніки, ми спеціалізуємося на імпорті преміальних вантажівок, причепів та комерційних автомобілів від провідних європейських виробників.",
      description2:
        "Наша команда експертів забезпечує відповідність кожного транспортного засобу найвищим стандартам якості перед доставкою. Ми надаємо повну документацію, гарантію та післяпродажну підтримку.",
      aboutImageAlt: "Комерційна вантажівка з неоновим підсвічуванням",
      bridgeTitle: "Ланцюг імпорту",
      imageCallouts: ["Прямий імпорт з ЄС", "Повна документація", "Перевірена якість", "Сервісна історія", "Готово до експорту"],
      importChain: ["Перевірка VIN та пробігу", "Огляд перед відправкою", "Пакет для реєстрації", "Доставка по ЄС"],
      features: [
        { icon: "Building2", title: "Базуємося в Чехії", description: "Штаб-квартира в Празі з операціями по всьому ЄС" },
        { icon: "Users", title: "Експертна команда", description: "Досвідчені професіонали в комерційній техніці" },
        { icon: "Globe2", title: "Мережа ЄС", description: "Прямі партнерства з європейськими постачальниками" },
        { icon: "TrendingUp", title: "Швидкий ріст", description: "500+ авто доставлено задоволеним клієнтам" },
      ],
    },
  },
  "why-us": {
    en: {
      badge: "Why Choose Us",
      title: "The EuroTruck",
      titleHighlight: "Advantage",
      description:
        "We stand out from the competition with our commitment to quality, transparency, and customer satisfaction.",
      carouselTitle: "Client Reviews",
      reasons: [
        {
          title: "Direct European Imports",
          description:
            "No middlemen — we source vehicles directly from European suppliers ensuring best prices.",
        },
        {
          title: "Full Documentation",
          description:
            "Complete vehicle history, service records, and all necessary import documents included.",
        },
        {
          title: "Quality Guarantee",
          description:
            "Every vehicle undergoes rigorous inspection before delivery with warranty coverage.",
        },
        {
          title: "Competitive Pricing",
          description:
            "Direct import model allows us to offer premium vehicles at competitive market prices.",
        },
        {
          title: "Expert Consultation",
          description: "Our team helps you find the perfect vehicle for your specific business needs.",
        },
        {
          title: "After-Sales Support",
          description: "Dedicated support team for any questions or issues after your purchase.",
        },
      ],
    },
    uk: {
      badge: "Чому ми",
      title: "Переваги",
      titleHighlight: "EuroTruck",
      description:
        "Ми виділяємося серед конкурентів завдяки нашій відданості якості, прозорості та задоволеності клієнтів.",
      carouselTitle: "Відгуки клієнтів",
      reasons: [
        {
          title: "Прямий імпорт з Європи",
          description:
            "Без посередників — ми закуповуємо техніку безпосередньо у європейських постачальників за найкращими цінами.",
        },
        {
          title: "Повна документація",
          description:
            "Повна історія авто, сервісні записи та всі необхідні імпортні документи включені.",
        },
        {
          title: "Гарантія якості",
          description:
            "Кожен транспортний засіб проходить ретельну перевірку перед доставкою з гарантійним покриттям.",
        },
        {
          title: "Конкурентні ціни",
          description:
            "Модель прямого імпорту дозволяє нам пропонувати преміальну техніку за конкурентними цінами.",
        },
        {
          title: "Експертна консультація",
          description: "Наша команда допоможе знайти ідеальний транспорт для ваших конкретних бізнес-потреб.",
        },
        {
          title: "Післяпродажна підтримка",
          description: "Спеціалізована команда підтримки для будь-яких питань після покупки.",
        },
      ],
    },
  },
  "services-meta": {
    en: {
      badge: "Our Services",
      title: "Complete Solutions for",
      titleHighlight: "Your Business",
      description:
        "From vehicle selection to delivery and after-sales support, we provide comprehensive services tailored to your needs.",
      pipeline: ["Selection", "Inspection", "Documents", "Delivery"],
    },
    uk: {
      badge: "Наші послуги",
      title: "Комплексні рішення для",
      titleHighlight: "Вашого бізнесу",
      description:
        "Від вибору транспорту до доставки та післяпродажної підтримки ми надаємо комплексні послуги, адаптовані до ваших потреб.",
      pipeline: ["Підбір", "Перевірка", "Документи", "Доставка"],
    },
  },
  "catalog-meta": {
    en: {
      badge: "Our Catalog",
      title: "Premium Equipment",
      titleHighlight: "Ready for Delivery",
      description: "Browse our offer.",
      viewDetails: "Learn more",
      categories: [
        { icon: "Truck", name: "Trucks", count: "120+", description: "Heavy duty trucks", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Trailers", count: "80+", description: "Semi trailers", brands: ["Schmitz", "Krone"] },
      ],
    },
    uk: {
      badge: "Наш каталог",
      title: "Преміальна техніка",
      titleHighlight: "Готова до доставки",
      description: "Перегляньте нашу пропозицію.",
      viewDetails: "Дізнатися більше",
      categories: [
        { icon: "Truck", name: "Вантажівки", count: "120+", description: "Важкі вантажівки", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Причепи", count: "80+", description: "Напівпричепи", brands: ["Schmitz", "Krone"] },
      ],
    },
  },
  "faq-meta": {
    en: { badge: "FAQ", title: "Frequently Asked", titleHighlight: "Questions", description: "Common questions about our services." },
    uk: { badge: "FAQ", title: "Часті", titleHighlight: "Запитання", description: "Поширені запитання про послуги." },
  },
  footer: {
    en: {
      cta: { title: "Ready to Find Your Perfect Vehicle?", description: "Contact us today.", button: "Get in Touch" },
      links: { title: "Quick Links", items: nav.en },
      services: { title: "Services" },
      copyright: "© 2026 EXPERT TRAVEL. All rights reserved.",
      legal: ["Privacy Policy", "Terms of Service", "Cookies"],
      brandDescription: "Your trusted partner for premium commercial vehicles.",
    },
    uk: {
      cta: { title: "Готові знайти свій ідеальний транспорт?", description: "Зверніться до нас сьогодні.", button: "Зв'язатися" },
      links: { title: "Швидкі посилання", items: nav.uk },
      services: { title: "Послуги" },
      copyright: "© 2026 EXPERT TRAVEL. Всі права захищені.",
      legal: ["Приватність", "Умови", "Cookies"],
      brandDescription: "Ваш надійний партнер з комерційної техніки.",
    },
  },
};

const services: LandingBundle["services"] = [
  {
    id: 1,
    titleEn: "Vehicle Sourcing",
    titleUk: "Підбір техніки",
    descriptionEn:
      "We source trucks and trailers directly from verified European auctions and fleet operators — matched to your budget, payload, route profile, and compliance requirements.",
    descriptionUk:
      "Підбираємо вантажівки та причепи напряму з перевірених європейських аукціонів і корпоративних автопарків — під ваш бюджет, вантажність, профіль маршрутів і регуляторні вимоги.",
    icon: "Truck",
    orderIndex: 1,
  },
  {
    id: 2,
    titleEn: "Technical Inspection",
    titleUk: "Технічна перевірка",
    descriptionEn:
      "Independent pre-purchase checks with detailed photos, defect notes, and mileage verification before you commit.",
    descriptionUk:
      "Незалежна передкупівельна перевірка з детальними фото, фіксацією дефектів та верифікацією пробігу перед прийняттям рішення.",
    icon: "FileCheck",
    orderIndex: 2,
  },
  {
    id: 3,
    titleEn: "Documentation",
    titleUk: "Документи",
    descriptionEn:
      "Complete registration, customs, and accounting package prepared for smooth handover in your country.",
    descriptionUk:
      "Повний пакет документів для реєстрації, митниці та бухгалтерії — готовий до безперебійної передачі техніки у вашій країні.",
    icon: "ShieldCheck",
    orderIndex: 3,
  },
  {
    id: 4,
    titleEn: "Logistics & Delivery",
    titleUk: "Логістика і доставка",
    descriptionEn:
      "End-to-end delivery planning with clear ETA, route coordination, and a structured handover checklist.",
    descriptionUk:
      "Планування доставки від початку до кінця: чіткий ETA, координація маршруту та структурований чекліст передачі.",
    icon: "MapPin",
    orderIndex: 4,
  },
];

const faqs: LandingBundle["faqs"] = [
  {
    id: 1,
    questionEn: "How quickly can you deliver equipment?",
    questionUk: "Як швидко ви можете поставити техніку?",
    answerEn: "Typical lead time is 2–4 weeks depending on vehicle type, documentation and delivery route.",
    answerUk: "Типовий термін — 2–4 тижні залежно від типу техніки, документів і маршруту доставки.",
    orderIndex: 1,
  },
  {
    id: 2,
    questionEn: "Do you provide full vehicle history?",
    questionUk: "Чи надаєте повну історію техніки?",
    answerEn: "Yes. We share service records, mileage verification and condition reports before handover.",
    answerUk: "Так. Надаємо сервісні записи, перевірку пробігу та звіт про стан перед передачею.",
    orderIndex: 2,
  },
  {
    id: 3,
    questionEn: "Can you source vehicles for a specific contract?",
    questionUk: "Чи можете підібрати техніку під конкретний контракт?",
    answerEn: "Yes. We align specifications with your routes, cargo profile and fleet standards.",
    answerUk: "Так. Підбираємо специфікації під ваші маршрути, вантаж і стандарти автопарку.",
    orderIndex: 3,
  },
  {
    id: 4,
    questionEn: "Do you help with registration and customs?",
    questionUk: "Допомагаєте з реєстрацією та митницею?",
    answerEn: "We prepare the document package and guide you through registration and customs steps.",
    answerUk: "Готуємо пакет документів і супроводжуємо реєстрацію та митне оформлення.",
    orderIndex: 4,
  },
];

const testimonials: LandingBundle["testimonials"] = [
  {
    id: 1,
    quoteEn:
      "EuroTruck helped us expand our fleet with quality vehicles at excellent prices. Their service and support have been exceptional.",
    quoteUk:
      "EuroTruck допоміг нам розширити автопарк якісною технікою за відмінними цінами. Їхній сервіс та підтримка були винятковими.",
    authorEn: "Martin Novak",
    authorUk: "Мартін Новак",
    companyEn: "TransCargo s.r.o.",
    companyUk: "TransCargo s.r.o.",
    rating: 5,
    orderIndex: 1,
    isActive: true,
  },
  {
    id: 2,
    quoteEn:
      "Strong technical checks and clear communication through the whole purchase cycle.",
    quoteUk: "Сильна технічна перевірка і чітка комунікація на всіх етапах закупівлі.",
    authorEn: "Petr Sikora",
    authorUk: "Петр Сикора",
    companyEn: "Bohemia Logistics",
    companyUk: "Bohemia Logistics",
    rating: 5,
    orderIndex: 2,
    isActive: true,
  },
  {
    id: 3,
    quoteEn:
      "Documentation and delivery planning saved our operations team a lot of time.",
    quoteUk: "Документація та планування доставки суттєво зекономили час нашій команді.",
    authorEn: "Iryna Kovalenko",
    authorUk: "Ірина Коваленко",
    companyEn: "EastWest Transport",
    companyUk: "EastWest Transport",
    rating: 5,
    orderIndex: 3,
    isActive: true,
  },
  {
    id: 4,
    quoteEn: "Excellent communication and realistic timelines.",
    quoteUk: "Відмінна комунікація та реальні строки.",
    authorEn: "Jan Krupa",
    authorUk: "Ян Крупа",
    companyEn: "NorthLine Cargo",
    companyUk: "NorthLine Cargo",
    rating: 5,
    orderIndex: 4,
    isActive: true,
  },
  {
    id: 5,
    quoteEn: "The inspection report matched the vehicle condition precisely.",
    quoteUk: "Звіт перевірки точно відповідав стану техніки.",
    authorEn: "Olha Danyliuk",
    authorUk: "Ольга Данилюк",
    companyEn: "Transit Group",
    companyUk: "Transit Group",
    rating: 5,
    orderIndex: 5,
    isActive: true,
  },
  {
    id: 6,
    quoteEn: "Fast paperwork and smooth handover.",
    quoteUk: "Швидкі документи та безшовна передача.",
    authorEn: "Marek Benes",
    authorUk: "Марек Бенеш",
    companyEn: "Cargo One",
    companyUk: "Cargo One",
    rating: 4,
    orderIndex: 6,
    isActive: true,
  },
  {
    id: 7,
    quoteEn: "A practical partner for scaling transport operations.",
    quoteUk: "Практичний партнер для масштабування перевезень.",
    authorEn: "Dmytro Koval",
    authorUk: "Дмитро Коваль",
    companyEn: "RouteX",
    companyUk: "RouteX",
    rating: 5,
    orderIndex: 7,
    isActive: true,
  },
  {
    id: 8,
    quoteEn: "Good selection and no hidden surprises.",
    quoteUk: "Хороший вибір і без прихованих сюрпризів.",
    authorEn: "Petra Svobodova",
    authorUk: "Петра Свободова",
    companyEn: "EuroMove",
    companyUk: "EuroMove",
    rating: 4,
    orderIndex: 8,
    isActive: true,
  },
];

const vehicles: LandingBundle["vehicles"] = catalogBrands.map((brand, index) => ({
  id: index + 1,
  brand: brand.name,
  category: brand.category,
  specs: brand.highlights.en,
  tagEn: brand.tagline.en,
  tagUk: brand.tagline.uk,
  descriptionEn: brand.overview.en,
  descriptionUk: brand.overview.uk,
  catalogMeta: {
    bodyTypes: brand.bodyTypes,
    configurations: brand.configurations,
    typicalSpecs: brand.typicalSpecs,
  },
  orderIndex: index + 1,
}));

export const landingData: LandingBundle = {
  content,
  services,
  vehicles,
  faqs,
  testimonials,
  contact: {
    email: "sales@m-truck.cz",
    phone: "+420 775 123 456",
    addressEn: "Prumyslova 15, Prague 10, Czech Republic",
    addressUk: "Prumyslova 15, Прага 10, Чехія",
    workingHoursEn: "Mon-Fri 08:00-18:00",
    workingHoursUk: "Пн-Пт 08:00-18:00",
    socialLinks: {},
  },
  stats: [
    { id: 1, key: "vehicles_delivered", value: "500+", labelEn: "Vehicles Delivered", labelUk: "Авто доставлено", orderIndex: 1 },
    { id: 2, key: "years_experience", value: "15+", labelEn: "Years Experience", labelUk: "Років досвіду", orderIndex: 2 },
    { id: 3, key: "client_satisfaction", value: "98%", labelEn: "Client Satisfaction", labelUk: "Задоволених клієнтів", orderIndex: 3 },
  ],
};

export function getLandingBundle(): LandingBundle {
  return landingData;
}
