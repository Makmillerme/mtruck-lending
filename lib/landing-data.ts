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
    en: { navigation: nav.en, ctaText: "Send a request", logo: { src: "/expert-travel.png", alt: "Expert Travel logo" } },
    uk: { navigation: nav.uk, ctaText: "Зв'язатися", logo: { src: "/expert-travel.png", alt: "Expert Travel logo" } },
    sk: { navigation: nav.sk, ctaText: "Odoslať dopyt", logo: { src: "/expert-travel.png", alt: "Logo Expert Travel" } },
    de: { navigation: nav.de, ctaText: "Anfrage senden", logo: { src: "/expert-travel.png", alt: "Expert Travel Logo" } },
  },
  hero: {
    en: {
      badge: "European quality",
      title: "Expert Travel",
      titleHighlight: "international trade",
      subtitle: "in commercial transport",
      description:
        "We work with buyers and sellers of commercial transport. Open to partnerships with companies, dealers, and vehicle owners.",
      cta: "View offers",
      secondary: "Send a request",
    },
    uk: {
      badge: "Європейська якість",
      title: "Expert Travel",
      titleHighlight: "міжнародна торгівля",
      subtitle: "комерційним транспортом",
      description:
        "Працюємо з покупцями та продавцями комерційного транспорту. Відкриті до партнерства з компаніями, дилерами та власниками техніки.",
      cta: "Переглянути пропозиції",
      secondary: "Зв'язатися",
    },
    sk: {
      badge: "Európska kvalita",
      title: "Expert Travel",
      titleHighlight: "medzinárodný obchod",
      subtitle: "s komerčnou dopravou",
      description:
        "Pracujeme s kupujúcimi aj predávajúcimi komerčnej dopravy. Sme otvorení partnerstvu s firmami, dílermi a vlastníkmi techniky.",
      cta: "Pozrieť ponuky",
      secondary: "Odoslať dopyt",
    },
    de: {
      badge: "Europäische Qualität",
      title: "Expert Travel",
      titleHighlight: "internationaler Handel",
      subtitle: "mit gewerblichem Transport",
      description:
        "Wir arbeiten mit Käufern und Verkäufern von gewerblichem Transport. Offen für Partnerschaften mit Unternehmen, Händlern und Fahrzeugeigentümern.",
      cta: "Angebote ansehen",
      secondary: "Anfrage senden",
    },
  },
  about: {
    en: {
      badge: "About Us",
      title: "Expert Travel s.r.o. — your partner in",
      titleHighlight: "the European transport market",
      description:
        "Expert Travel s.r.o. is a Slovak company specializing in international trade in trucks, trailers, and commercial transport. We support a complete B2B cooperation cycle for companies and partners.",
      description2: "",
      aboutImageAlt: "Commercial truck with neon accent lighting",
      bridgeTitle: "How we work",
      imageCallouts: ["Partner request", "Commercial terms", "Request coordination", "Vehicle handover"],
      importChain: ["Partner request", "Commercial terms", "Coordination", "Vehicle handover"],
      features: [
        { icon: "MapPin", title: "Based in Slovakia", description: "Na Troskách 12, 974 01 Banská Bystrica, Slovakia" },
        { icon: "Globe2", title: "International trade", description: "Cooperation with buyers, sellers, and dealers of commercial transport" },
        { icon: "Truck", title: "Logistics coordination", description: "We coordinate vehicle transfer and delivery within agreed business arrangements" },
        { icon: "Shield", title: "Cooperation support", description: "We help align the main stages of cooperation, communication, and vehicle handover" },
      ],
    },
    uk: {
      badge: "Про нас",
      title: "Expert Travel s.r.o. — ваш партнер на",
      titleHighlight: "європейському ринку транспорту",
      description:
        "Expert Travel s.r.o. — словацька компанія, що спеціалізується на міжнародній торгівлі вантажівками, причепами та комерційною технікою. Ми забезпечуємо повний цикл B2B-співпраці для компаній і партнерів.",
      description2: "",
      aboutImageAlt: "Комерційна вантажівка з неоновим підсвічуванням",
      bridgeTitle: "Як ми працюємо",
      imageCallouts: ["Партнерський запит", "Комерційні умови", "Координація запиту", "Передача транспорту"],
      importChain: ["Партнерський запит", "Комерційні умови", "Координація", "Передача транспорту"],
      features: [
        { icon: "MapPin", title: "База в Словаччині", description: "Na Troskách 12, 974 01 Banská Bystrica, Словаччина" },
        { icon: "Globe2", title: "Міжнародна торгівля", description: "Співпраця з покупцями, продавцями та дилерами комерційного транспорту" },
        { icon: "Truck", title: "Координація логістики", description: "Організовуємо передачу та доставку комерційного транспорту в межах угод" },
        { icon: "Shield", title: "Супровід співпраці", description: "Допомагаємо узгодити основні етапи співпраці, комунікації та передачі транспорту" },
      ],
    },
    sk: {
      badge: "O nás",
      title: "Expert Travel s.r.o. — partner na",
      titleHighlight: "európskom trhu dopravy",
      description:
        "Expert Travel s.r.o. je slovenská spoločnosť špecializovaná na medzinárodný obchod s nákladnými vozidlami, prívesmi a komerčnou dopravou. Zabezpečujeme celý cyklus B2B spolupráce pre firmy a partnerov.",
      description2: "",
      aboutImageAlt: "Komerčné nákladné vozidlo s neónovým osvetlením",
      bridgeTitle: "Ako pracujeme",
      imageCallouts: ["Partnerský dopyt", "Obchodné podmienky", "Koordinácia dopytu", "Odovzdanie vozidla"],
      importChain: ["Partnerský dopyt", "Obchodné podmienky", "Koordinácia", "Odovzdanie vozidla"],
      features: [
        { icon: "MapPin", title: "Sídlo na Slovensku", description: "Na Troskách 12, 974 01 Banská Bystrica, Slovensko" },
        { icon: "Globe2", title: "Medzinárodný obchod", description: "Spolupráca s kupujúcimi, predávajúcimi a dílermi komerčnej dopravy" },
        { icon: "Truck", title: "Koordinácia logistiky", description: "Koordinujeme odovzdanie a dodanie komerčnej dopravy v rámci dohôd" },
        { icon: "Shield", title: "Podpora spolupráce", description: "Pomáhame zladiť hlavné fázy spolupráce, komunikáciu a odovzdanie vozidla" },
      ],
    },
    de: {
      badge: "Über uns",
      title: "Expert Travel s.r.o. — Ihr Partner im",
      titleHighlight: "europäischen Transportmarkt",
      description:
        "Expert Travel s.r.o. ist ein slowakisches Unternehmen, spezialisiert auf den internationalen Handel mit Lkw, Aufliegern und gewerblichem Transport. Wir begleiten den gesamten B2B-Kooperationszyklus für Unternehmen und Partner.",
      description2: "",
      aboutImageAlt: "Gewerblicher Lkw mit Neon-Akzentbeleuchtung",
      bridgeTitle: "So arbeiten wir",
      imageCallouts: ["Partneranfrage", "Geschäftsbedingungen", "Koordination der Anfrage", "Fahrzeugübergabe"],
      importChain: ["Partneranfrage", "Geschäftsbedingungen", "Koordination", "Fahrzeugübergabe"],
      features: [
        { icon: "MapPin", title: "Sitz in der Slowakei", description: "Na Troskách 12, 974 01 Banská Bystrica, Slowakei" },
        { icon: "Globe2", title: "Internationaler Handel", description: "Zusammenarbeit mit Käufern, Verkäufern und Händlern von gewerblichem Transport" },
        { icon: "Truck", title: "Logistikkoordination", description: "Wir koordinieren Übergabe und Lieferung von gewerblichem Transport im Rahmen vereinbarter Geschäfte" },
        { icon: "Shield", title: "Begleitung der Zusammenarbeit", description: "Wir helfen, die wichtigsten Phasen der Zusammenarbeit, Kommunikation und Fahrzeugübergabe abzustimmen" },
      ],
    },
  },
  "why-us": {
    en: {
      badge: "Why Choose Us",
      title: "The Expert Travel",
      titleHighlight: "Advantage",
      description:
        "A clear business process for companies, sellers, dealers, and partners in commercial transport.",
      carouselTitle: "Client Reviews",
      reasons: [
        {
          title: "European market presence",
          description:
            "We work in the European commercial transport market and help parties align their cooperation format.",
        },
        {
          title: "Transparent cooperation",
          description:
            "We keep the process clear from the first request through agreed terms and vehicle handover.",
        },
        {
          title: "Business-focused approach",
          description:
            "We prepare cooperation options around the company request, vehicle type, and practical deal conditions.",
        },
        {
          title: "Partner network",
          description:
            "We work with buyers, sellers, dealers, and owners of commercial transport across different markets.",
        },
        {
          title: "Clear communication",
          description: "We help the parties align expectations, key terms, and next steps without unnecessary complexity.",
        },
        {
          title: "Handover coordination",
          description: "We coordinate the final stage so the vehicle moves from agreement to partner or client handover.",
        },
      ],
    },
    uk: {
      badge: "Чому ми",
      title: "Переваги",
      titleHighlight: "Expert Travel",
      description:
        "Зрозумілий бізнес-процес для компаній, продавців, дилерів і партнерів у сфері комерційного транспорту.",
      carouselTitle: "Відгуки клієнтів",
      reasons: [
        {
          title: "Робота на ринку ЄС",
          description:
            "Працюємо на європейському ринку комерційного транспорту та допомагаємо сторонам узгодити формат співпраці.",
        },
        {
          title: "Прозора співпраця",
          description:
            "Тримаємо процес зрозумілим від першого запиту до погоджених умов і передачі транспорту.",
        },
        {
          title: "Бізнес-підхід",
          description:
            "Формуємо варіанти співпраці під запит компанії, тип транспорту та практичні умови угоди.",
        },
        {
          title: "Партнерська мережа",
          description:
            "Працюємо з покупцями, продавцями, дилерами та власниками комерційного транспорту на різних ринках.",
        },
        {
          title: "Чітка комунікація",
          description: "Допомагаємо сторонам узгодити очікування, ключові умови та наступні кроки без зайвої складності.",
        },
        {
          title: "Координація передачі",
          description: "Координуємо фінальний етап, щоб транспорт перейшов від домовленості до партнера або клієнта.",
        },
      ],
    },
    sk: {
      badge: "Prečo si vybrať nás",
      title: "Výhoda",
      titleHighlight: "Expert Travel",
      description:
        "Jasný obchodný proces pre firmy, predajcov, dílerov a partnerov v oblasti komerčnej dopravy.",
      carouselTitle: "Hodnotenia klientov",
      reasons: [
        { title: "Pôsobenie na trhu EÚ", description: "Pracujeme na európskom trhu komerčnej dopravy a pomáhame stranám dohodnúť formát spolupráce." },
        { title: "Transparentná spolupráca", description: "Proces držíme jasný od prvého dopytu cez dohodnuté podmienky až po odovzdanie vozidla." },
        { title: "Obchodný prístup", description: "Pripravujeme možnosti spolupráce podľa dopytu firmy, typu vozidla a praktických podmienok obchodu." },
        { title: "Partnerská sieť", description: "Pracujeme s kupujúcimi, predávajúcimi, dílermi a vlastníkmi komerčnej dopravy na rôznych trhoch." },
        { title: "Jasná komunikácia", description: "Pomáhame stranám zladiť očakávania, hlavné podmienky a ďalšie kroky bez zbytočnej zložitosti." },
        { title: "Koordinácia odovzdania", description: "Koordinujeme záverečnú fázu, aby vozidlo prešlo od dohody k partnerovi alebo klientovi." },
      ],
    },
    de: {
      badge: "Warum wir",
      title: "Der Expert Travel",
      titleHighlight: "Vorteil",
      description:
        "Ein klarer Geschäftsprozess für Unternehmen, Verkäufer, Händler und Partner im gewerblichen Transport.",
      carouselTitle: "Kundenbewertungen",
      reasons: [
        { title: "Präsenz im EU-Markt", description: "Wir arbeiten auf dem europäischen Markt für gewerblichen Transport und helfen den Parteien, das Format der Zusammenarbeit abzustimmen." },
        { title: "Transparente Zusammenarbeit", description: "Wir halten den Prozess von der ersten Anfrage über abgestimmte Bedingungen bis zur Fahrzeugübergabe klar." },
        { title: "Geschäftlicher Ansatz", description: "Wir entwickeln Kooperationsoptionen nach Unternehmensanfrage, Fahrzeugtyp und praktischen Geschäftsbedingungen." },
        { title: "Partnernetzwerk", description: "Wir arbeiten mit Käufern, Verkäufern, Händlern und Eigentümern von gewerblichem Transport in verschiedenen Märkten." },
        { title: "Klare Kommunikation", description: "Wir helfen den Parteien, Erwartungen, Hauptbedingungen und nächste Schritte ohne unnötige Komplexität abzustimmen." },
        { title: "Koordination der Übergabe", description: "Wir koordinieren die finale Phase, damit das Fahrzeug von der Vereinbarung an Partner oder Kunden übergeben wird." },
      ],
    },
  },
  "services-meta": {
    en: {
      badge: "Our services",
      title: "Work areas",
      titleHighlight: "for partners",
      description:
        "We work with companies, sellers, dealers, and owners of commercial transport. We help structure cooperation from the first request to vehicle handover.",
      pipeline: ["Request", "Terms", "Support", "Handover"],
    },
    uk: {
      badge: "Наші послуги",
      title: "Напрями роботи",
      titleHighlight: "для партнерів",
      description:
        "Працюємо з компаніями, продавцями, дилерами та власниками комерційного транспорту. Допомагаємо структурувати співпрацю від першого запиту до передачі транспорту.",
      pipeline: ["Запит", "Умови", "Супровід", "Передача"],
    },
    sk: {
      badge: "Naše služby",
      title: "Oblasti práce",
      titleHighlight: "pre partnerov",
      description:
        "Pracujeme s firmami, predajcami, dílermi a vlastníkmi komerčnej dopravy. Pomáhame nastaviť spoluprácu od prvého dopytu až po odovzdanie vozidla.",
      pipeline: ["Dopyt", "Podmienky", "Podpora", "Odovzdanie"],
    },
    de: {
      badge: "Unsere Leistungen",
      title: "Arbeitsbereiche",
      titleHighlight: "für Partner",
      description:
        "Wir arbeiten mit Unternehmen, Verkäufern, Händlern und Eigentümern von gewerblichem Transport. Wir helfen, die Zusammenarbeit von der ersten Anfrage bis zur Fahrzeugübergabe zu strukturieren.",
      pipeline: ["Anfrage", "Bedingungen", "Begleitung", "Übergabe"],
    },
  },
  "catalog-meta": {
    en: {
      badge: "Supply focus",
      title: "Brands we",
      titleHighlight: "work with",
      description:
        "We work with leading European commercial transport brands and help companies find suitable cooperation options for their fleet needs.",
      viewDetails: "Send a request",
      categories: [
        { icon: "Truck", name: "Trucks", count: "120+", description: "Heavy duty trucks", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Trailers", count: "80+", description: "Semi trailers", brands: ["Schmitz", "Krone"] },
      ],
    },
    uk: {
      badge: "Напрями роботи",
      title: "Бренди, з",
      titleHighlight: "якими працюємо",
      description:
        "Працюємо з провідними європейськими брендами комерційного транспорту та допомагаємо компаніям знайти відповідні варіанти співпраці для автопарку.",
      viewDetails: "Надіслати запит",
      categories: [
        { icon: "Truck", name: "Вантажні авто", count: "120+", description: "Комерційний транспорт", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Причепи", count: "80+", description: "Напівпричепи", brands: ["Schmitz", "Krone"] },
      ],
    },
    sk: {
      badge: "Smery práce",
      title: "Značky, s",
      titleHighlight: "ktorými pracujeme",
      description:
        "Pracujeme s poprednými európskymi značkami komerčnej dopravy a pomáhame firmám nájsť vhodné možnosti spolupráce pre ich flotilu.",
      viewDetails: "Odoslať dopyt",
      categories: [
        { icon: "Truck", name: "Nákladné vozidlá", count: "120+", description: "Ťažké nákladné vozidlá", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Prívesy", count: "80+", description: "Návesy", brands: ["Schmitz", "Krone"] },
      ],
    },
    de: {
      badge: "Arbeitsbereiche",
      title: "Marken, mit",
      titleHighlight: "denen wir arbeiten",
      description:
        "Wir arbeiten mit führenden europäischen Marken im gewerblichen Transport und helfen Unternehmen, passende Kooperationsoptionen für ihren Fuhrpark zu finden.",
      viewDetails: "Anfrage senden",
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
      description: "Practical answers about requests, cooperation terms, and working with Expert Travel.",
    },
    uk: {
      badge: "FAQ",
      title: "Часті",
      titleHighlight: "запитання",
      description: "Практичні відповіді про запити, умови співпраці та роботу з Expert Travel.",
    },
    sk: {
      badge: "FAQ",
      title: "Často kladené",
      titleHighlight: "Otázky",
      description: "Praktické odpovede o dopytoch, podmienkach spolupráce a práci s Expert Travel.",
    },
    de: {
      badge: "FAQ",
      title: "Häufig gestellte",
      titleHighlight: "Fragen",
      description: "Praktische Antworten zu Anfragen, Kooperationsbedingungen und der Zusammenarbeit mit Expert Travel.",
    },
  },
  footer: {
    en: {
      cta: { title: "Ready to discuss a commercial transport request?", description: "Contact us today.", button: "Get in Touch" },
      links: { title: "Quick Links", items: nav.en },
      services: { title: "Services" },
      copyright: "© 2026 Expert Travel s.r.o. · ID 55336574. All rights reserved.",
      legal: ["Privacy Policy", "Terms of Service", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — European B2B partner in international commercial transport trade.",
    },
    uk: {
      cta: { title: "Готові обговорити запит на комерційний транспорт?", description: "Зверніться до нас сьогодні.", button: "Зв'язатися" },
      links: { title: "Швидкі посилання", items: nav.uk },
      services: { title: "Послуги" },
      copyright: "© 2026 Expert Travel s.r.o. · IČO 55336574. Всі права захищені.",
      legal: ["Приватність", "Умови", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — європейський B2B-партнер у міжнародній торгівлі комерційним транспортом.",
    },
    sk: {
      cta: { title: "Pripravení prediskutovať dopyt na komerčnú dopravu?", description: "Opíšte trasy, nosnosť a rozpočet — pripravíme jasné možnosti spolupráce s praktickými podmienkami.", button: "Kontaktovať" },
      links: { title: "Rýchle odkazy", items: nav.sk },
      services: { title: "Služby" },
      copyright: "© 2026 Expert Travel s.r.o. · IČO 55336574. Všetky práva vyhradené.",
      legal: ["Ochrana súkromia", "Podmienky služby", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — európsky B2B partner v medzinárodnom obchode s komerčnou dopravou.",
    },
    de: {
      cta: { title: "Bereit, Ihre Anfrage für gewerblichen Transport zu besprechen?", description: "Beschreiben Sie Strecken, Nutzlast und Budget — wir erstellen klare Kooperationsoptionen mit praktischen Bedingungen.", button: "Kontakt aufnehmen" },
      links: { title: "Schnelllinks", items: nav.de },
      services: { title: "Leistungen" },
      copyright: "© 2026 Expert Travel s.r.o. · ID 55336574. Alle Rechte vorbehalten.",
      legal: ["Datenschutz", "Nutzungsbedingungen", "Cookies"],
      brandDescription: "Expert Travel s.r.o. — europäischer B2B-Partner im internationalen Handel mit gewerblichem Transport.",
    },
  },
};

const services: LandingBundle["services"] = [
  {
    id: 1,
    titleEn: "Partner cooperation",
    titleUk: "Партнерська співпраця",
    titleSk: "Partnerská spolupráca",
    titleDe: "Partnerkooperation",
    descriptionEn:
      "We work with buyers, sellers, and dealers of commercial transport on the European market.",
    descriptionUk:
      "Працюємо з покупцями, продавцями та дилерами комерційного транспорту на європейському ринку.",
    descriptionSk:
      "Pracujeme s kupujúcimi, predávajúcimi a dílermi komerčnej dopravy na európskom trhu.",
    descriptionDe:
      "Wir arbeiten mit Käufern, Verkäufern und Händlern von gewerblichem Transport auf dem europäischen Markt.",
    icon: "Truck",
    orderIndex: 1,
  },
  {
    id: 2,
    titleEn: "Commercial offers",
    titleUk: "Комерційні пропозиції",
    titleSk: "Obchodné ponuky",
    titleDe: "Kommerzielle Angebote",
    descriptionEn:
      "We prepare clear cooperation options based on the company request, vehicle type, and deal terms.",
    descriptionUk:
      "Формуємо зрозумілі варіанти співпраці під запит компанії, тип транспорту та умови угоди.",
    descriptionSk:
      "Pripravujeme jasné možnosti spolupráce podľa dopytu firmy, typu vozidla a podmienok obchodu.",
    descriptionDe:
      "Wir erarbeiten klare Kooperationsoptionen auf Basis der Anfrage, des Fahrzeugtyps und der Geschäftsbedingungen.",
    icon: "CreditCard",
    orderIndex: 2,
  },
  {
    id: 3,
    titleEn: "Deal coordination",
    titleUk: "Координація угоди",
    titleSk: "Koordinácia obchodu",
    titleDe: "Koordination der Vereinbarung",
    descriptionEn:
      "We support communication between the parties and help align the main terms of vehicle handover.",
    descriptionUk:
      "Супроводжуємо комунікацію між сторонами та допомагаємо узгодити основні умови передачі транспорту.",
    descriptionSk:
      "Podporujeme komunikáciu medzi stranami a pomáhame zladiť hlavné podmienky odovzdania vozidla.",
    descriptionDe:
      "Wir begleiten die Kommunikation zwischen den Parteien und helfen, die wichtigsten Bedingungen der Fahrzeugübergabe abzustimmen.",
    icon: "ShieldCheck",
    orderIndex: 3,
  },
  {
    id: 4,
    titleEn: "Vehicle handover",
    titleUk: "Передача транспорту",
    titleSk: "Odovzdanie vozidla",
    titleDe: "Fahrzeugübergabe",
    descriptionEn:
      "We coordinate the final stage of cooperation and the handover of commercial transport to a partner or client.",
    descriptionUk:
      "Координуємо фінальний етап співпраці та передачу комерційного транспорту партнеру або клієнту.",
    descriptionSk:
      "Koordinujeme záverečnú fázu spolupráce a odovzdanie komerčného vozidla partnerovi alebo klientovi.",
    descriptionDe:
      "Wir koordinieren die abschließende Phase der Zusammenarbeit und die Übergabe des gewerblichen Fahrzeugs an Partner oder Kunden.",
    icon: "MapPin",
    orderIndex: 4,
  },
  {
    id: 5,
    titleEn: "Market communication",
    titleUk: "Ринкова комунікація",
    titleSk: "Trhová komunikácia",
    titleDe: "Marktkommunikation",
    descriptionEn:
      "We help parties exchange key information quickly and move toward a clear business agreement.",
    descriptionUk:
      "Допомагаємо сторонам швидко обмінюватися ключовою інформацією та рухатися до зрозумілої домовленості.",
    descriptionSk:
      "Pomáhame stranám rýchlo si vymeniť kľúčové informácie a smerovať k jasnej obchodnej dohode.",
    descriptionDe:
      "Wir helfen den Parteien, wichtige Informationen schnell auszutauschen und zu einer klaren geschäftlichen Vereinbarung zu kommen.",
    icon: "FileCheck",
    orderIndex: 5,
  },
  {
    id: 6,
    titleEn: "Fleet needs",
    titleUk: "Потреби автопарку",
    titleSk: "Potreby flotily",
    titleDe: "Fuhrparkbedarf",
    descriptionEn:
      "We help companies navigate transport options according to fleet tasks, priorities, and available offers.",
    descriptionUk:
      "Допомагаємо компаніям зорієнтуватися у варіантах транспорту під задачі автопарку, пріоритети та доступні пропозиції.",
    descriptionSk:
      "Pomáhame firmám zorientovať sa v možnostiach dopravy podľa úloh flotily, priorít a dostupných ponúk.",
    descriptionDe:
      "Wir helfen Unternehmen, Transportoptionen nach Fuhrparkaufgaben, Prioritäten und verfügbaren Angeboten einzuordnen.",
    icon: "Wrench",
    orderIndex: 6,
  },
];

const faqs: LandingBundle["faqs"] = [
  {
    id: 1,
    questionEn: "What affects vehicle handover timing?",
    questionUk: "Від чого залежать строки передачі транспорту?",
    questionSk: "Od čoho závisí termín odovzdania vozidla?",
    questionDe: "Wovon hängt der Zeitpunkt der Fahrzeugübergabe ab?",
    answerEn:
      "Timing depends on vehicle type, seller location, availability, and the agreed handover format. We discuss a realistic schedule before cooperation starts.",
    answerUk:
      "Строки залежать від типу транспорту, місця продавця, доступності техніки та погодженого формату передачі. Реалістичний графік обговорюємо до початку співпраці.",
    answerSk:
      "Termín závisí od typu vozidla, miesta predajcu, dostupnosti techniky a dohodnutého formátu odovzdania. Realistický harmonogram riešime pred začiatkom spolupráce.",
    answerDe:
      "Der Zeitrahmen hängt von Fahrzeugtyp, Standort des Verkäufers, Verfügbarkeit und vereinbartem Übergabeformat ab. Einen realistischen Ablauf klären wir vor Beginn der Zusammenarbeit.",
    orderIndex: 1,
  },
  {
    id: 2,
    questionEn: "What information do I receive before a decision?",
    questionUk: "Яку інформацію я отримую до рішення?",
    questionSk: "Aké informácie dostanem pred rozhodnutím?",
    questionDe: "Welche Informationen erhalte ich vor einer Entscheidung?",
    answerEn:
      "We share the available vehicle information, photos, key parameters, and a clear summary of the cooperation option. If something needs clarification, we say it directly.",
    answerUk:
      "Надаємо доступну інформацію про транспорт, фото, ключові параметри та зрозумілий опис варіанту співпраці. Якщо щось потребує уточнення — говоримо про це прямо.",
    answerSk:
      "Poskytneme dostupné informácie o vozidle, fotografie, hlavné parametre a jasný opis možnosti spolupráce. Ak niečo treba upresniť, povieme to priamo.",
    answerDe:
      "Wir teilen verfügbare Fahrzeuginformationen, Fotos, zentrale Parameter und eine klare Zusammenfassung der Kooperationsoption. Wenn etwas zu klären ist, sprechen wir es direkt an.",
    orderIndex: 2,
  },
  {
    id: 3,
    questionEn: "Can you match vehicles to our fleet profile?",
    questionUk: "Чи підберете техніку під профіль нашого автопарку?",
    questionSk: "Viete prispôsobiť vozidlá profilu našej flotily?",
    questionDe: "Können Sie Fahrzeuge an unser Flottenprofil anpassen?",
    answerEn:
      "Yes. We narrow down options by vehicle type, configuration, intended use, quantity, and budget so the offer fits the company request.",
    answerUk:
      "Так. Звужуємо варіанти за типом транспорту, конфігурацією, призначенням, кількістю та бюджетом, щоб пропозиція відповідала запиту компанії.",
    answerSk:
      "Áno. Možnosti zužujeme podľa typu vozidla, konfigurácie, účelu, počtu kusov a rozpočtu, aby ponuka zodpovedala dopytu firmy.",
    answerDe:
      "Ja. Wir grenzen Optionen nach Fahrzeugtyp, Konfiguration, Einsatzzweck, Stückzahl und Budget ein, damit das Angebot zur Unternehmensanfrage passt.",
    orderIndex: 3,
  },
  {
    id: 4,
    questionEn: "How are cooperation terms agreed?",
    questionUk: "Як погоджуються умови співпраці?",
    questionSk: "Ako sa dohadujú podmienky spolupráce?",
    questionDe: "Wie werden Kooperationsbedingungen abgestimmt?",
    answerEn:
      "We clarify the request, parties involved, vehicle type, budget range, timing, and handover format. After that, we prepare a clear cooperation option.",
    answerUk:
      "Уточнюємо запит, сторони співпраці, тип транспорту, бюджетний діапазон, строки та формат передачі. Після цього формуємо зрозумілий варіант співпраці.",
    answerSk:
      "Upresníme dopyt, zapojené strany, typ vozidla, rozpočet, termíny a formát odovzdania. Potom pripravíme jasnú možnosť spolupráce.",
    answerDe:
      "Wir klären Anfrage, beteiligte Parteien, Fahrzeugtyp, Budgetrahmen, Zeitplan und Übergabeformat. Danach erstellen wir eine klare Kooperationsoption.",
    orderIndex: 4,
  },
  {
    id: 5,
    questionEn: "When does brokerage make sense instead of a direct sale?",
    questionUk: "Коли посередництво доречніше за прямий продаж?",
    questionSk: "Kedy dáva sprostredkovanie zmysel namiesto priameho predaja?",
    questionDe: "Wann ist Vermittlung sinnvoller als ein Direktverkauf?",
    answerEn:
      "Brokerage helps when buyer and seller are in different markets, conditions need alignment, or both sides want a structured process with clear roles.",
    answerUk:
      "Посередництво доречне, коли покупець і продавець працюють на різних ринках, треба узгодити умови або сторонам потрібен структурований процес із чіткими ролями.",
    answerSk:
      "Sprostredkovanie sa hodí, keď kupujúci a predávajúci pôsobia na rôznych trhoch, treba zladiť podmienky alebo obe strany chcú štruktúrovaný proces s jasnými rolami.",
    answerDe:
      "Vermittlung ist sinnvoll, wenn Käufer und Verkäufer in unterschiedlichen Märkten arbeiten, Bedingungen abzustimmen sind oder beide Seiten einen strukturierten Prozess mit klaren Rollen wünschen.",
    orderIndex: 5,
  },
  {
    id: 6,
    questionEn: "Do you work with sellers and dealers?",
    questionUk: "Чи працюєте ви з продавцями та дилерами?",
    questionSk: "Pracujete s predajcami a dílermi?",
    questionDe: "Arbeiten Sie mit Verkäufern und Händlern?",
    answerEn:
      "Yes. We are open to cooperation with companies, sellers, dealers, and commercial transport owners who want to work through a clear business process.",
    answerUk:
      "Так. Ми відкриті до співпраці з компаніями, продавцями, дилерами та власниками комерційного транспорту, яким потрібен зрозумілий бізнес-процес.",
    answerSk:
      "Áno. Sme otvorení spolupráci s firmami, predajcami, dílermi a vlastníkmi komerčnej dopravy, ktorí chcú jasný obchodný proces.",
    answerDe:
      "Ja. Wir sind offen für die Zusammenarbeit mit Unternehmen, Verkäufern, Händlern und Eigentümern von gewerblichem Transport, die einen klaren Geschäftsprozess wünschen.",
    orderIndex: 6,
  },
  {
    id: 7,
    questionEn: "How do we start working together?",
    questionUk: "Як розпочати співпрацю з вами?",
    questionSk: "Ako s vami začať spoluprácu?",
    questionDe: "Wie starten wir die Zusammenarbeit?",
    answerEn:
      "Send your request via the contact form or catalog. Tell us the vehicle type, quantity, country, and cooperation goal, and we will clarify the next steps.",
    answerUk:
      "Надішліть запит через форму або каталог. Вкажіть тип транспорту, кількість, країну та мету співпраці — ми уточнимо наступні кроки.",
    answerSk:
      "Pošlite dopyt cez formulár alebo katalóg. Uveďte typ vozidla, počet kusov, krajinu a cieľ spolupráce — upresníme ďalšie kroky.",
    answerDe:
      "Senden Sie Ihre Anfrage über Formular oder Katalog. Nennen Sie Fahrzeugtyp, Stückzahl, Land und Ziel der Zusammenarbeit, dann klären wir die nächsten Schritte.",
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
    email: "exp.travel.sro@gmail.com",
    phone: "+421 904 752 306",
    addressEn: "Na Troskách 12, 974 01 Banská Bystrica, Slovakia",
    addressUk: "Na Troskách 12, 974 01 Banská Bystrica, Словаччина",
    addressSk: "Na Troskách 12, 974 01 Banská Bystrica, Slovensko",
    addressDe: "Na Troskách 12, 974 01 Banská Bystrica, Slowakei",
    workingHoursEn: "Mon-Fri 08:00-16:00",
    workingHoursUk: "Пн-Пт 08:00-16:00",
    workingHoursSk: "Po–Pi 08:00–16:00",
    workingHoursDe: "Mo–Fr 08:00–16:00",
    socialLinks: {},
  },
  stats: [
    { id: 1, key: "years_on_market", value: "3+", labelEn: "Years on the market", labelUk: "роки на ринку", labelSk: "roky na trhu", labelDe: "Jahre am Markt", orderIndex: 1 },
    { id: 2, key: "brands_in_work", value: "11", labelEn: "Brands in work", labelUk: "брендів у роботі", labelSk: "značiek v práci", labelDe: "Marken im Fokus", orderIndex: 2 },
  ],
};

export function getLandingBundle(): LandingBundle {
  return landingData;
}
