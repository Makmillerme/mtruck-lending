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
    titleSk?: string | null;
    titleDe?: string | null;
    descriptionEn: string;
    descriptionUk: string | null;
    descriptionSk?: string | null;
    descriptionDe?: string | null;
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
    tagSk?: string | null;
    tagDe?: string | null;
    descriptionEn: string | null;
    descriptionUk: string | null;
    descriptionSk?: string | null;
    descriptionDe?: string | null;
    catalogMeta: unknown;
    orderIndex: number;
  }>;
  faqs: Array<{
    id: number;
    questionEn: string;
    questionUk: string | null;
    questionSk?: string | null;
    questionDe?: string | null;
    answerEn: string;
    answerUk: string | null;
    answerSk?: string | null;
    answerDe?: string | null;
    orderIndex: number;
  }>;
  contact: {
    email: string;
    phone: string;
    addressEn: string;
    addressUk: string | null;
    addressSk?: string | null;
    addressDe?: string | null;
    workingHoursEn: string | null;
    workingHoursUk: string | null;
    workingHoursSk?: string | null;
    workingHoursDe?: string | null;
    socialLinks: Record<string, unknown>;
  };
  stats: Array<{
    id: number;
    key: string;
    value: string;
    labelEn: string;
    labelUk: string;
    labelSk?: string;
    labelDe?: string;
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
  sk: [
    { name: "Domov", id: "home" },
    { name: "O nás", id: "about" },
    { name: "Služby", id: "services" },
    { name: "Katalóg", id: "catalog" },
    { name: "Prečo my", id: "why-us" },
    { name: "FAQ", id: "faq" },
    { name: "Kontakt", id: "contact" },
  ],
  de: [
    { name: "Start", id: "home" },
    { name: "Über uns", id: "about" },
    { name: "Leistungen", id: "services" },
    { name: "Katalog", id: "catalog" },
    { name: "Vorteile", id: "why-us" },
    { name: "FAQ", id: "faq" },
    { name: "Kontakt", id: "contact" },
  ],
} as const;

const content: LandingBundle["content"] = {
  header: {
    en: { navigation: nav.en, ctaText: "Get Quote", logo: { src: "/expert-travel.png", alt: "Expert Travel logo" } },
    uk: { navigation: nav.uk, ctaText: "Пропозиція", logo: { src: "/expert-travel.png", alt: "Expert Travel logo" } },
    sk: { navigation: nav.sk, ctaText: "Získať ponuku", logo: { src: "/expert-travel.png", alt: "Logo Expert Travel" } },
    de: { navigation: nav.de, ctaText: "Angebot", logo: { src: "/expert-travel.png", alt: "Expert Travel Logo" } },
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
    sk: {
      badge: "Európska kvalita",
      title: "Prémiová komerčná",
      titleHighlight: "technika",
      subtitle: "z Európy",
      description: "Váš spoľahlivý partner pre nákladné vozidlá, prívesy a úžitkovú techniku.",
      cta: "Prezrieť katalóg",
      secondary: "Kontaktujte nás",
    },
    de: {
      badge: "Europäische Qualität",
      title: "Premium-Nutzfahrzeuge",
      titleHighlight: "und Auflieger",
      subtitle: "aus Europa",
      description: "Ihr zuverlässiger Partner für Lkw, Auflieger und Nutzfahrzeuge.",
      cta: "Katalog ansehen",
      secondary: "Kontakt aufnehmen",
    },
  },
  about: {
    en: {
      badge: "About Us",
      title: "Expert Travel — your partner in",
      titleHighlight: "commercial vehicle trade",
      description:
        "Expert Travel s.r.o. is a Slovak company based in Banská Bystrica. We help businesses select, buy, and sell trucks and trailers from Europe — from wholesale and brokerage to full trade administration.",
      description2:
        "Every unit goes through a transparent process: history verification, pre-sale preparation (maintenance without engine work), registration documentation, and coordinated logistics including warehousing services.",
      aboutImageAlt: "Premium commercial truck, neon accent lighting",
      bridgeTitle: "How we work",
      imageCallouts: ["Direct EU sourcing", "Verified history", "Full documentation", "Registration ready", "After-sales support"],
      importChain: ["Vehicle selection", "Inspection & preparation", "Registration pack", "Handover & delivery"],
      features: [
        { icon: "MapPin", title: "Based in Slovakia", description: "Na Troskách 12, 974 01 Banská Bystrica, Slovakia" },
        { icon: "Globe2", title: "Trade & brokerage", description: "Wholesale and retail vehicle sales plus brokerage across trade, services, and production" },
        { icon: "Truck", title: "Logistics & storage", description: "Warehousing, auxiliary transport services, and delivery coordination across the EU" },
        { icon: "Shield", title: "Documentation & prep", description: "Administrative support, marketing services, and pre-sale vehicle preparation" },
      ],
    },
    uk: {
      badge: "Про нас",
      title: "Expert Travel — ваш партнер у",
      titleHighlight: "торгівлі комерційною технікою",
      description:
        "Expert Travel s.r.o. — словацька компанія з Банської Бистриці. Допомагаємо бізнесу обирати, купувати та продавати вантажівки й причепи з Європи: від опту й посередництва до повного супроводу угоди.",
      description2:
        "Кожна одиниця проходить прозорий процес: перевірка історії, передпродажна підготовка (обслуговування без втручання в силову частину), реєстраційні документи та координація логістики, зокрема складських послуг.",
      aboutImageAlt: "Комерційна вантажівка з неоновим підсвічуванням",
      bridgeTitle: "Як ми працюємо",
      imageCallouts: ["Пряме джерело в ЄС", "Перевірена історія", "Повна документація", "Готово до реєстрації", "Підтримка після угоди"],
      importChain: ["Підбір техніки", "Огляд і підготовка", "Пакет для реєстрації", "Передача та доставка"],
      features: [
        { icon: "MapPin", title: "База в Словаччині", description: "Na Troskách 12, 974 01 Banská Bystrica, Словаччина" },
        { icon: "Globe2", title: "Торгівля та посередництво", description: "Оптовий і роздрібний продаж техніки, посередницькі послуги в торгівлі та виробництві" },
        { icon: "Truck", title: "Логістика та склад", description: "Складські, допоміжні та транспортні послуги, координація доставки по ЄС" },
        { icon: "Shield", title: "Документи та підготовка", description: "Адміністративний супровід, маркетинг і передпродажна підготовка авто" },
      ],
    },
    sk: {
      badge: "O nás",
      title: "Expert Travel — partner v",
      titleHighlight: "obchode s úžitkovými vozidlami",
      description:
        "Expert Travel s.r.o. je slovenská spoločnosť so sídlom v Banskej Bystrici. Pomáhame firmám s výberom, kúpou a predajom nákladných vozidiel a prívesov z Európy — od veľkoobchodu a sprostredkovania až po kompletnú administratívu obchodu.",
      description2:
        "Každé vozidlo prechádza transparentným procesom: overenie histórie, predajná príprava (údržba bez zásahu do motorickej časti vozidla), registračná dokumentácia a koordinácia logistiky vrátane skladových a prepravných služieb.",
      aboutImageAlt: "Prémiové nákladné vozidlo s neónovým osvetlením",
      bridgeTitle: "Ako pracujeme",
      imageCallouts: ["Priamy dovoz z EÚ", "Overená história", "Kompletná dokumentácia", "Pripravené na registráciu", "Podpora po predaji"],
      importChain: ["Výber vozidla", "Kontrola a príprava", "Registračný balík", "Odovzdanie a dodanie"],
      features: [
        { icon: "MapPin", title: "Sídlo na Slovensku", description: "Na Troskách 12, 974 01 Banská Bystrica, Slovensko" },
        { icon: "Globe2", title: "Obchod a sprostredkovanie", description: "Veľkoobchodný a maloobchodný predaj vozidiel a sprostredkovateľská činnosť v obchode a službách" },
        { icon: "Truck", title: "Logistika a sklad", description: "Skladové, pomocné a prepravné služby v doprave a koordinácia dodania po EÚ" },
        { icon: "Shield", title: "Dokumentácia a príprava", description: "Administratívna správa, marketingové služby a predajná príprava vozidla" },
      ],
    },
    de: {
      badge: "Über uns",
      title: "Expert Travel — Ihr Partner im",
      titleHighlight: "Nutzfahrzeughandel",
      description:
        "Expert Travel s.r.o. ist ein slowakisches Unternehmen mit Sitz in Banská Bystrica. Wir unterstützen Firmen bei Auswahl, Kauf und Verkauf von Lkw und Aufliegern aus Europa — vom Großhandel und der Vermittlung bis zur vollständigen Abwicklung.",
      description2:
        "Jedes Fahrzeug durchläuft einen transparenten Prozess: Historienprüfung, verkaufsvorbereitende Wartung (ohne Eingriff in den Motor), Registrierungsunterlagen und koordinierte Logistik inklusive Lager- und Transportleistungen.",
      aboutImageAlt: "Premium-Lkw mit Neon-Akzentbeleuchtung",
      bridgeTitle: "So arbeiten wir",
      imageCallouts: ["Direktbezug aus der EU", "Geprüfte Historie", "Vollständige Dokumentation", "Registrierungsbereit", "Support nach dem Kauf"],
      importChain: ["Fahrzeugauswahl", "Prüfung & Vorbereitung", "Registrierungspaket", "Übergabe & Lieferung"],
      features: [
        { icon: "MapPin", title: "Sitz in der Slowakei", description: "Na Troskách 12, 974 01 Banská Bystrica, Slowakei" },
        { icon: "Globe2", title: "Handel & Vermittlung", description: "Groß- und Einzelhandel mit Fahrzeugen sowie Vermittlung im Handel, bei Dienstleistungen und in der Produktion" },
        { icon: "Truck", title: "Logistik & Lager", description: "Lager-, Hilfs- und Transportleistungen sowie Lieferkoordination in der EU" },
        { icon: "Shield", title: "Dokumentation & Vorbereitung", description: "Administrative Betreuung, Marketingleistungen und verkaufsvorbereitende Aufbereitung" },
      ],
    },
  },
  "why-us": {
    en: {
      badge: "Why Choose Us",
      title: "The Expert Travel",
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
      titleHighlight: "Expert Travel",
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
    sk: {
      badge: "Prečo si vybrať nás",
      title: "Výhoda",
      titleHighlight: "Expert Travel",
      description:
        "Medzi konkurenciou vynikáme záväzkom ku kvalite, transparentnosti a spokojnosti zákazníkov.",
      carouselTitle: "Hodnotenia klientov",
      reasons: [
        { title: "Priamy dovoz z Európy", description: "Bez sprostredkovateľov — vozidlá získavame priamo od európskych dodávateľov za najlepšie ceny." },
        { title: "Kompletná dokumentácia", description: "Úplná história vozidla, servisné záznamy a všetky potrebné dovozné dokumenty sú súčasťou dodávky." },
        { title: "Záruka kvality", description: "Každé vozidlo prechádza dôkladnou kontrolou pred dodaním so záručným krytím." },
        { title: "Konkurenčné ceny", description: "Model priameho dovozu nám umožňuje ponúkať prémiovú techniku za konkurenčné trhové ceny." },
        { title: "Odborné poradenstvo", description: "Náš tím vám pomôže nájsť ideálne vozidlo pre vaše konkrétne obchodné potreby." },
        { title: "Popredajná podpora", description: "Vyhradený tím podpory pre akékoľvek otázky alebo problémy po nákupe." },
      ],
    },
    de: {
      badge: "Warum wir",
      title: "Der Expert Travel",
      titleHighlight: "Vorteil",
      description:
        "Wir heben uns durch unser Engagement für Qualität, Transparenz und Kundenzufriedenheit von der Konkurrenz ab.",
      carouselTitle: "Kundenbewertungen",
      reasons: [
        { title: "Direktimport aus Europa", description: "Ohne Zwischenhändler — wir beziehen Fahrzeuge direkt von europäischen Lieferanten zu besten Preisen." },
        { title: "Vollständige Dokumentation", description: "Komplette Fahrzeughistorie, Serviceunterlagen und alle erforderlichen Importdokumente inklusive." },
        { title: "Qualitätsgarantie", description: "Jedes Fahrzeug durchläuft vor der Auslieferung eine gründliche Prüfung mit Garantieabdeckung." },
        { title: "Wettbewerbsfähige Preise", description: "Das Direktimportmodell ermöglicht uns Premium-Fahrzeuge zu wettbewerbsfähigen Marktpreisen anzubieten." },
        { title: "Fachberatung", description: "Unser Team hilft Ihnen, das passende Fahrzeug für Ihre spezifischen Geschäftsanforderungen zu finden." },
        { title: "After-Sales-Support", description: "Dediziertes Support-Team für alle Fragen oder Anliegen nach Ihrem Kauf." },
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
    sk: {
      badge: "Naše služby",
      title: "Komplexné riešenia pre",
      titleHighlight: "váš biznis",
      description:
        "Od výberu vozidla až po dodanie a popredajnú podporu poskytujeme komplexné služby prispôsobené vašim potrebám.",
      pipeline: ["Výber", "Kontrola", "Dokumenty", "Dodanie"],
    },
    de: {
      badge: "Unsere Leistungen",
      title: "Komplettlösungen für",
      titleHighlight: "Ihr Unternehmen",
      description:
        "Von der Fahrzeugauswahl bis zur Lieferung und After-Sales-Support bieten wir umfassende, auf Ihre Bedürfnisse zugeschnittene Leistungen.",
      pipeline: ["Auswahl", "Inspektion", "Dokumente", "Lieferung"],
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
    sk: {
      badge: "Náš katalóg",
      title: "Prémiová technika",
      titleHighlight: "pripravená na dodanie",
      description: "Prezrite si našu ponuku.",
      viewDetails: "Viac informácií",
      categories: [
        { icon: "Truck", name: "Nákladné vozidlá", count: "120+", description: "Ťažké nákladné vozidlá", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Prívesy", count: "80+", description: "Návesy", brands: ["Schmitz", "Krone"] },
      ],
    },
    de: {
      badge: "Unser Katalog",
      title: "Premium-Ausstattung",
      titleHighlight: "Lieferbereit",
      description: "Durchsuchen Sie unser Angebot.",
      viewDetails: "Mehr erfahren",
      categories: [
        { icon: "Truck", name: "Lkw", count: "120+", description: "Schwere Lkw", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Auflieger", count: "80+", description: "Sattelauflieger", brands: ["Schmitz", "Krone"] },
      ],
    },
  },
  "faq-meta": {
    en: {
      badge: "FAQ",
      title: "Frequently Asked",
      titleHighlight: "Questions",
      description: "Practical answers about buying vehicles, paperwork, and working with Expert Travel.",
    },
    uk: {
      badge: "FAQ",
      title: "Часті",
      titleHighlight: "запитання",
      description: "Практичні відповіді про купівлю техніки, документи та співпрацю з Expert Travel.",
    },
    sk: {
      badge: "FAQ",
      title: "Často kladené",
      titleHighlight: "Otázky",
      description: "Praktické odpovede o kúpe vozidiel, dokumentoch a spolupráci s Expert Travel.",
    },
    de: {
      badge: "FAQ",
      title: "Häufig gestellte",
      titleHighlight: "Fragen",
      description: "Praktische Antworten zu Fahrzeugkauf, Unterlagen und der Zusammenarbeit mit Expert Travel.",
    },
  },
  footer: {
    en: {
      cta: { title: "Ready to Find Your Perfect Vehicle?", description: "Contact us today.", button: "Get in Touch" },
      links: { title: "Quick Links", items: nav.en },
      services: { title: "Services" },
      copyright: "© 2026 Expert Travel s.r.o. · ID 55336574. All rights reserved.",
      legal: ["Privacy Policy", "Terms of Service", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — premium commercial vehicles from Europe. Banská Bystrica, Slovakia.",
    },
    uk: {
      cta: { title: "Готові знайти свій ідеальний транспорт?", description: "Зверніться до нас сьогодні.", button: "Зв'язатися" },
      links: { title: "Швидкі посилання", items: nav.uk },
      services: { title: "Послуги" },
      copyright: "© 2026 Expert Travel s.r.o. · IČO 55336574. Всі права захищені.",
      legal: ["Приватність", "Умови", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — комерційна техніка з Європи. Словаччина, Banská Bystrica.",
    },
    sk: {
      cta: { title: "Pripravení nájsť ideálne vozidlo?", description: "Kontaktujte nás ešte dnes.", button: "Kontaktovať" },
      links: { title: "Rýchle odkazy", items: nav.sk },
      services: { title: "Služby" },
      copyright: "© 2026 Expert Travel s.r.o. · IČO 55336574. Všetky práva vyhradené.",
      legal: ["Ochrana súkromia", "Podmienky služby", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — prémiové úžitkové vozidlá z Európy. Sídlo: Banská Bystrica, Slovensko.",
    },
    de: {
      cta: { title: "Bereit, Ihr ideales Fahrzeug zu finden?", description: "Kontaktieren Sie uns noch heute.", button: "Kontakt aufnehmen" },
      links: { title: "Schnelllinks", items: nav.de },
      services: { title: "Leistungen" },
      copyright: "© 2026 Expert Travel s.r.o. · ID 55336574. Alle Rechte vorbehalten.",
      legal: ["Datenschutz", "Nutzungsbedingungen", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — Premium-Nutzfahrzeuge aus Europa. Sitz in Banská Bystrica, Slowakei.",
    },
  },
};

const services: LandingBundle["services"] = [
  {
    id: 1,
    titleEn: "Vehicle Sourcing",
    titleUk: "Підбір техніки",
    titleSk: "Výber vozidiel",
    titleDe: "Fahrzeugbeschaffung",
    descriptionEn:
      "We source trucks and trailers directly from verified European auctions and fleet operators — matched to your budget, payload, route profile, and compliance requirements.",
    descriptionUk:
      "Підбираємо вантажівки та причепи напряму з перевірених європейських аукціонів і корпоративних автопарків — під ваш бюджет, вантажність, профіль маршрутів і регуляторні вимоги.",
    descriptionSk:
      "Získavame nákladné vozidlá a prívesy priamo z overených európskych aukcií a firemných flotíl — podľa vášho rozpočtu, nosnosti, profilu trás a regulačných požiadaviek.",
    descriptionDe:
      "Wir beschaffen Lkw und Auflieger direkt aus verifizierten europäischen Auktionen und Flottenbetreibern — abgestimmt auf Ihr Budget, Ihre Nutzlast, Routenprofil und Compliance-Anforderungen.",
    icon: "Truck",
    orderIndex: 1,
  },
  {
    id: 2,
    titleEn: "Technical Inspection",
    titleUk: "Технічна перевірка",
    titleSk: "Technická kontrola",
    titleDe: "Technische Inspektion",
    descriptionEn:
      "Independent pre-purchase checks with detailed photos, defect notes, and mileage verification before you commit.",
    descriptionUk:
      "Незалежна передкупівельна перевірка з детальними фото, фіксацією дефектів та верифікацією пробігу перед прийняттям рішення.",
    descriptionSk:
      "Nezávislá predkúpna kontrola s detailnými fotografiami, záznamom závad a overením kilometrov pred vaším rozhodnutím.",
    descriptionDe:
      "Unabhängige Vor-Kauf-Prüfungen mit detaillierten Fotos, Mängelprotokoll und Kilometerstandverifizierung vor Ihrer Entscheidung.",
    icon: "FileCheck",
    orderIndex: 2,
  },
  {
    id: 3,
    titleEn: "Documentation",
    titleUk: "Документи",
    titleSk: "Dokumentácia",
    titleDe: "Dokumentation",
    descriptionEn:
      "Complete registration, customs, and accounting package prepared for smooth handover in your country.",
    descriptionUk:
      "Повний пакет документів для реєстрації, митниці та бухгалтерії — готовий до безперебійної передачі техніки у вашій країні.",
    descriptionSk:
      "Kompletný balík pre registráciu, colnicu a účtovníctvo pripravený na hladké prevzatie vozidla vo vašej krajine.",
    descriptionDe:
      "Vollständiges Paket für Registrierung, Zoll und Buchhaltung — vorbereitet für eine reibungslose Übergabe in Ihrem Land.",
    icon: "ShieldCheck",
    orderIndex: 3,
  },
  {
    id: 4,
    titleEn: "Logistics & Delivery",
    titleUk: "Логістика і доставка",
    titleSk: "Logistika a dodanie",
    titleDe: "Logistik & Lieferung",
    descriptionEn:
      "End-to-end delivery planning with clear ETA, route coordination, and a structured handover checklist.",
    descriptionUk:
      "Планування доставки від початку до кінця: чіткий ETA, координація маршруту та структурований чекліст передачі.",
    descriptionSk:
      "Plánovanie dodania od začiatku do konca s jasným ETA, koordináciou trasy a štruktúrovaným odovzdávacím checklistom.",
    descriptionDe:
      "End-to-End-Lieferplanung mit klarem ETA, Routenkoordination und strukturierter Übergabe-Checkliste.",
    icon: "MapPin",
    orderIndex: 4,
  },
  {
    id: 5,
    titleEn: "Pre-sale Preparation",
    titleUk: "Підготовка до продажу",
    titleSk: "Predajná príprava",
    titleDe: "Verkaufsvorbereitung",
    descriptionEn:
      "Maintenance and cosmetic preparation without engine work — so every unit is registration-ready and presentable before handover.",
    descriptionUk:
      "Обслуговування та косметична підготовка без втручання в силову частину — техніка готова до реєстрації та презентації перед передачею.",
    descriptionSk:
      "Údržba a kozmetická príprava bez zásahu do motorickej časti — vozidlo je pripravené na registráciu a odovzdanie.",
    descriptionDe:
      "Wartung und Aufbereitung ohne Motoreingriff — jedes Fahrzeug ist registrierungs- und übergabebereit.",
    icon: "Wrench",
    orderIndex: 5,
  },
  {
    id: 6,
    titleEn: "Brokerage & Trade Support",
    titleUk: "Посередництво та супровід угод",
    titleSk: "Sprostredkovanie a podpora obchodu",
    titleDe: "Vermittlung & Handelsbegleitung",
    descriptionEn:
      "Wholesale, retail, and brokerage across EU trade flows — we structure the deal, paperwork, and coordination end to end.",
    descriptionUk:
      "Опт, роздріб і посередництво в торгівлі по ЄС — структуруємо угоду, документи та координацію від початку до кінця.",
    descriptionSk:
      "Veľkoobchod, maloobchod a sprostredkovanie v EÚ — zabezpečíme štruktúru obchodu, dokumentáciu a koordináciu.",
    descriptionDe:
      "Großhandel, Einzelhandel und Vermittlung in der EU — wir strukturieren Deal, Unterlagen und Koordination durchgängig.",
    icon: "CreditCard",
    orderIndex: 6,
  },
];

const faqs: LandingBundle["faqs"] = [
  {
    id: 1,
    questionEn: "What affects delivery timing?",
    questionUk: "Від чого залежать строки доставки?",
    questionSk: "Od čoho závisí termín dodania?",
    questionDe: "Wovon hängt der Liefertermin ab?",
    answerEn:
      "Timing depends on vehicle type, seller location, paperwork, and how the handover route is arranged. We agree on a realistic schedule in advance and coordinate logistics — we do not promise a fixed date for every case.",
    answerUk:
      "Строки залежать від типу техніки, місця продажу, документів і способу передачі. Заздалегідь погоджуємо реалістичний графік і координуємо логістику — фіксовану дату для кожного випадку не обіцяємо.",
    answerSk:
      "Termín závisí od typu vozidla, miesta predaja, dokumentov a spôsobu prevzatia. Vopred sa dohodneme na realistickom harmonograme a skoordinujeme logistiku — pevný dátum pre každý prípad nesľubujeme.",
    answerDe:
      "Der Zeitrahmen hängt von Fahrzeugtyp, Verkaufsort, Unterlagen und der Übergabe ab. Wir vereinbaren einen realistischen Plan im Voraus und koordinieren die Logistik — ein festes Datum für jeden Fall versprechen wir nicht.",
    orderIndex: 1,
  },
  {
    id: 2,
    questionEn: "What vehicle history do I see before buying?",
    questionUk: "Яку історію авто я бачу до покупки?",
    questionSk: "Akú históriu vozidla vidím pred kúpou?",
    questionDe: "Welche Fahrzeughistorie sehe ich vor dem Kauf?",
    answerEn:
      "Before you commit, we provide available service records, mileage checks, photos, and a clear summary of condition and equipment. If something is missing from the seller, we tell you openly.",
    answerUk:
      "До рішення про купівлю надаємо наявні сервісні записи, перевірку пробігу, фото та зрозумілий опис стану й комплектації. Якщо продавець чогось не надає — скажемо про це прямо.",
    answerSk:
      "Pred rozhodnutím o kúpe poskytneme dostupné servisné záznamy, kontrolu kilometrov, fotografie a prehľad stavu a výbavy. Ak predajca niečo nemá, povieme to otvorene.",
    answerDe:
      "Vor Ihrer Entscheidung liefern wir verfügbare Serviceunterlagen, Kilometerstandsprüfung, Fotos und eine verständliche Zusammenfassung von Zustand und Ausstattung. Fehlende Angaben des Verkäufers nennen wir offen.",
    orderIndex: 2,
  },
  {
    id: 3,
    questionEn: "Can you match vehicles to our fleet profile?",
    questionUk: "Чи підберете техніку під профіль нашого автопарку?",
    questionSk: "Viete prispôsobiť vozidlá profilu našej flotily?",
    questionDe: "Können Sie Fahrzeuge an unser Flottenprofil anpassen?",
    answerEn:
      "Yes. We shortlist units by axle layout, cab type, payload needs, annual mileage, and budget — whether you are adding one truck or renewing several units for a contract.",
    answerUk:
      "Так. Формуємо попередній список за схемою осей, типом кабіни, вантажністю, річним пробігом і бюджетом — чи то одна вантажівка, чи оновлення кількох одиниць під контракт.",
    answerSk:
      "Áno. Výber zúžime podľa náprav, typu kabíny, nosnosti, ročného nájazdu a rozpočtu — či ide o jedno vozidlo alebo obnovu viacerých kusov pre zmluvu.",
    answerDe:
      "Ja. Wir grenzen die Auswahl nach Achslayout, Kabinentyp, Nutzlast, Jahreskilometer und Budget ein — ob ein einzelner Lkw oder mehrere Einheiten für einen Vertrag.",
    orderIndex: 3,
  },
  {
    id: 4,
    questionEn: "Do you handle registration and customs paperwork?",
    questionUk: "Чи берете на себе документи для реєстрації та митниці?",
    questionSk: "Zabezpečíte dokumenty na registráciu a colnicu?",
    questionDe: "Übernehmen Sie Registrierungs- und Zollunterlagen?",
    answerEn:
      "We prepare the core document set for EU handover — purchase papers, technical data, and guidance for registration and customs in your country. Requirements differ by member state; we outline what applies to your case.",
    answerUk:
      "Готуємо базовий пакет для передачі в ЄС — угоди купівлі-продажу, технічні дані та супровід реєстрації й митного оформлення у вашій країні. Вимоги різняться за державами — пояснимо, що стосується вашої ситуації.",
    answerSk:
      "Pripravíme základný balík pre prevzatie v EÚ — kúpno-predajné podklady, technické údaje a usmernenie pre registráciu a colné konanie vo vašej krajine. Požiadavky sa líšia podľa štátu — vysvetlíme, čo platí pre vás.",
    answerDe:
      "Wir bereiten den Kern-Unterlagensatz für die EU-Übergabe vor — Kaufunterlagen, technische Daten und Orientierung zu Registrierung und Zoll in Ihrem Land. Die Anforderungen variieren je Mitgliedstaat — wir erläutern, was für Sie gilt.",
    orderIndex: 4,
  },
  {
    id: 5,
    questionEn: "When does brokerage make sense instead of a direct sale?",
    questionUk: "Коли посередництво доречніше за прямий продаж?",
    questionSk: "Kedy dáva sprostredkovanie zmysel namiesto priameho predaja?",
    questionDe: "Wann ist Vermittlung sinnvoller als ein Direktverkauf?",
    answerEn:
      "Brokerage helps when buyer and seller are in different countries, terms need negotiation, or you want Expert Travel to structure the deal, communication, and handover while both parties keep clear roles.",
    answerUk:
      "Посередництво доречне, коли покупець і продавець в різних країнах, треба узгодити умови, або ви хочете, щоб Expert Travel структурував угоду, комунікацію й передачу, зберігаючи зрозумілі ролі сторін.",
    answerSk:
      "Sprostredkovanie sa hodí, keď sú kupujúci a predávajúci v rôznych krajinách, treba dohodnúť podmienky, alebo chcete, aby Expert Travel nastavil obchod, komunikáciu a prevzatie pri jasných rolách oboch strán.",
    answerDe:
      "Vermittlung lohnt sich, wenn Käufer und Verkäufer in verschiedenen Ländern sind, Konditionen verhandelt werden müssen oder Expert Travel Deal, Kommunikation und Übergabe strukturieren soll — mit klaren Rollen für beide Seiten.",
    orderIndex: 5,
  },
  {
    id: 6,
    questionEn: "What is included in pre-sale preparation?",
    questionUk: "Що входить у передпродажну підготовку?",
    questionSk: "Čo zahŕňa predajná príprava vozidla?",
    questionDe: "Was umfasst die verkaufsvorbereitende Aufbereitung?",
    answerEn:
      "We focus on presentation and checks: cleaning, visual inspection, minor fixes, and documentation of visible condition. We do not perform engine or powertrain overhauls — that scope is outside our pre-sale preparation.",
    answerUk:
      "Орієнтуємось на презентацію й перевірки: мийка, візуальний огляд, дрібні доопрацювання, фіксація видимого стану. Ремонт двигуна чи силового агрегата не виконуємо — це поза межами нашої передпродажної підготовки.",
    answerSk:
      "Zameriavame sa na prezentáciu a kontroly: umytie, vizuálna kontrola, drobné úpravy a záznam viditeľného stavu. Zásah do motora alebo hnacieho ústrojenstva nerobíme — to nie je súčasť predajnej prípravy.",
    answerDe:
      "Im Fokus stehen Präsentation und Kontrollen: Reinigung, Sichtprüfung, kleinere Nacharbeiten und Dokumentation des sichtbaren Zustands. Motor- oder Antriebsstrang-Reparaturen führen wir nicht durch — das liegt außerhalb unserer verkaufsvorbereitenden Aufbereitung.",
    orderIndex: 6,
  },
  {
    id: 7,
    questionEn: "How do we start working together?",
    questionUk: "Як розпочати співпрацю з вами?",
    questionSk: "Ako s vami začať spoluprácu?",
    questionDe: "Wie starten wir die Zusammenarbeit?",
    answerEn:
      "Send your request via the contact form or catalog — describe the vehicle type, quantity, and country. We clarify details, send a commercial offer, and after agreement arrange contract and handover.",
    answerUk:
      "Надішліть запит через форму або каталог — вкажіть тип техніки, кількість і країну. Уточнимо деталі, надішлемо комерційну пропозицію, після узгодження — договір і передачу.",
    answerSk:
      "Pošlite dopyt cez formulár alebo katalóg — uveďte typ vozidla, počet kusov a krajinu. Upresníme detaily, pošleme obchodnú ponuku a po dohode zabezpečíme zmluvu a prevzatie.",
    answerDe:
      "Senden Sie Ihre Anfrage über das Formular oder den Katalog — Fahrzeugtyp, Stückzahl und Land. Wir klären Details, senden ein Angebot und nach der Einigung vereinbaren wir Vertrag und Übergabe.",
    orderIndex: 7,
  },
];

const vehicles: LandingBundle["vehicles"] = catalogBrands.map((brand, index) => ({
  id: index + 1,
  brand: brand.name,
  category: brand.category,
  specs: brand.highlights.en,
  tagEn: brand.tagline.en,
  tagUk: brand.tagline.uk,
  tagSk: brand.tagline.sk,
  tagDe: brand.tagline.de,
  descriptionEn: brand.overview.en,
  descriptionUk: brand.overview.uk,
  descriptionSk: brand.overview.sk,
  descriptionDe: brand.overview.de,
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
  contact: {
    email: "sales@m-truck.cz",
    phone: "+420 775 123 456",
    addressEn: "Na Troskách 12, 974 01 Banská Bystrica, Slovakia",
    addressUk: "Na Troskách 12, 974 01 Banská Bystrica, Словаччина",
    addressSk: "Na Troskách 12, 974 01 Banská Bystrica, Slovensko",
    addressDe: "Na Troskách 12, 974 01 Banská Bystrica, Slowakei",
    workingHoursEn: "Mon-Fri 08:00-18:00",
    workingHoursUk: "Пн-Пт 08:00-18:00",
    workingHoursSk: "Po–Pi 08:00–18:00",
    workingHoursDe: "Mo–Fr 08:00–18:00",
    socialLinks: {},
  },
  stats: [
    { id: 1, key: "eu_sourcing", value: "EU", labelEn: "European sourcing", labelUk: "Постачання з ЄС", labelSk: "Dovoz z Európy", labelDe: "Bezug aus der EU", orderIndex: 1 },
    { id: 2, key: "sk_headquarters", value: "SK", labelEn: "Slovakia HQ", labelUk: "Словаччина", labelSk: "Sídlo na Slovensku", labelDe: "Sitz in der Slowakei", orderIndex: 2 },
    { id: 3, key: "company_id", value: "55336574", labelEn: "Company ID", labelUk: "IČO", labelSk: "IČO", labelDe: "ID-Nr.", orderIndex: 3 },
  ],
};

export function getLandingBundle(): LandingBundle {
  return landingData;
}
