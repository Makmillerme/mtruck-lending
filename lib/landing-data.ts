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
  testimonials: Array<{
    id: number;
    quoteEn: string;
    quoteUk: string | null;
    quoteSk?: string | null;
    quoteDe?: string | null;
    authorEn: string;
    authorUk: string | null;
    authorSk?: string | null;
    authorDe?: string | null;
    companyEn: string | null;
    companyUk: string | null;
    companySk?: string | null;
    companyDe?: string | null;
    rating: number;
    orderIndex: number;
    isActive: boolean;
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
    { name: "Startseite", id: "home" },
    { name: "Über uns", id: "about" },
    { name: "Leistungen", id: "services" },
    { name: "Katalog", id: "catalog" },
    { name: "Warum wir", id: "why-us" },
    { name: "FAQ", id: "faq" },
    { name: "Kontakt", id: "contact" },
  ],
} as const;

const content: LandingBundle["content"] = {
  header: {
    en: { navigation: nav.en, ctaText: "Get Quote", logo: { src: "/expert-travel.png", alt: "Expert Travel logo" } },
    uk: { navigation: nav.uk, ctaText: "Отримати пропозицію", logo: { src: "/expert-travel.png", alt: "Expert Travel logo" } },
    sk: { navigation: nav.sk, ctaText: "Získať ponuku", logo: { src: "/expert-travel.png", alt: "Logo Expert Travel" } },
    de: { navigation: nav.de, ctaText: "Angebot anfordern", logo: { src: "/expert-travel.png", alt: "Expert Travel Logo" } },
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
    sk: {
      badge: "O nás",
      title: "Váš spoľahlivý partner v",
      titleHighlight: "komerčnej doprave",
      description:
        "S viac ako 15-ročnými skúsenosťami na európskom trhu úžitkových vozidiel sa špecializujeme na dovoz prémiových nákladných vozidiel, prívesov a úžitkových vozidiel od popredných európskych výrobcov.",
      description2:
        "Náš tím expertov zabezpečí, že každé vozidlo spĺňa najvyššie štandardy kvality pred dodaním. Poskytujeme kompletnú dokumentáciu, záruku a popredajnú podporu.",
      aboutImageAlt: "Prémiové nákladné vozidlo s neónovým osvetlením",
      bridgeTitle: "Reťazec dovozu",
      imageCallouts: ["Priamy dovoz z EÚ", "Kompletná dokumentácia", "Overená kvalita", "Servisná história", "Pripravené na export"],
      importChain: ["Kontrola VIN a kilometrov", "Inšpekcia pred odoslaním", "Balík na registráciu", "Dodanie po celej EÚ"],
      features: [
        { icon: "Building2", title: "Sídlo v Česku", description: "Centrála v Prahe s pôsobnosťou v celej EÚ" },
        { icon: "Users", title: "Expertný tím", description: "Skúsení profesionáli v oblasti úžitkových vozidiel" },
        { icon: "Globe2", title: "Sieť EÚ", description: "Priame partnerstvá s európskymi dodávateľmi" },
        { icon: "TrendingUp", title: "Rýchly rast", description: "500+ vozidiel dodaných spokojným klientom" },
      ],
    },
    de: {
      badge: "Über uns",
      title: "Ihr zuverlässiger Partner in der",
      titleHighlight: "Gewerblichen Transportbranche",
      description:
        "Mit über 15 Jahren Erfahrung auf dem europäischen Nutzfahrzeugmarkt sind wir auf den Import premium Lkw, Auflieger und Nutzfahrzeuge führender europäischer Hersteller spezialisiert.",
      description2:
        "Unser Expertenteam stellt sicher, dass jedes Fahrzeug vor der Auslieferung höchsten Qualitätsstandards entspricht. Wir liefern vollständige Dokumentation, Garantie und After-Sales-Support.",
      aboutImageAlt: "Premium-Lkw mit Neon-Akzentbeleuchtung",
      bridgeTitle: "Importkette",
      imageCallouts: ["Direktimport aus der EU", "Vollständige Dokumentation", "Geprüfte Qualität", "Servicehistorie", "Exportbereit"],
      importChain: ["VIN- und Kilometerstandprüfung", "Inspektion vor Versand", "Registrierungspaket", "EU-weite Lieferung"],
      features: [
        { icon: "Building2", title: "Sitz in Tschechien", description: "Hauptsitz in Prag mit EU-weiten Operationen" },
        { icon: "Users", title: "Expertenteam", description: "Erfahrene Fachkräfte im Nutzfahrzeugbereich" },
        { icon: "Globe2", title: "EU-Netzwerk", description: "Direkte Partnerschaften mit europäischen Lieferanten" },
        { icon: "TrendingUp", title: "Starkes Wachstum", description: "500+ Fahrzeuge an zufriedene Kunden geliefert" },
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
    en: { badge: "FAQ", title: "Frequently Asked", titleHighlight: "Questions", description: "Common questions about our services." },
    uk: { badge: "FAQ", title: "Часті", titleHighlight: "Запитання", description: "Поширені запитання про послуги." },
    sk: { badge: "FAQ", title: "Často kladené", titleHighlight: "otázky", description: "Bežné otázky o našich službách." },
    de: { badge: "FAQ", title: "Häufig gestellte", titleHighlight: "Fragen", description: "Häufige Fragen zu unseren Leistungen." },
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
    sk: {
      cta: { title: "Pripravení nájsť ideálne vozidlo?", description: "Kontaktujte nás ešte dnes.", button: "Kontaktovať" },
      links: { title: "Rýchle odkazy", items: nav.sk },
      services: { title: "Služby" },
      copyright: "© 2026 EXPERT TRAVEL. Všetky práva vyhradené.",
      legal: ["Ochrana súkromia", "Podmienky služby", "Cookies"],
      brandDescription: "Váš spoľahlivý partner pre prémiové úžitkové vozidlá.",
    },
    de: {
      cta: { title: "Bereit, Ihr ideales Fahrzeug zu finden?", description: "Kontaktieren Sie uns noch heute.", button: "Kontakt aufnehmen" },
      links: { title: "Schnelllinks", items: nav.de },
      services: { title: "Leistungen" },
      copyright: "© 2026 EXPERT TRAVEL. Alle Rechte vorbehalten.",
      legal: ["Datenschutz", "Nutzungsbedingungen", "Cookies"],
      brandDescription: "Ihr zuverlässiger Partner für Premium-Nutzfahrzeuge.",
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
];

const faqs: LandingBundle["faqs"] = [
  {
    id: 1,
    questionEn: "How quickly can you deliver equipment?",
    questionUk: "Як швидко ви можете поставити техніку?",
    questionSk: "Ako rýchlo môžete dodať techniku?",
    questionDe: "Wie schnell können Sie die Ausstattung liefern?",
    answerEn: "Typical lead time is 2–4 weeks depending on vehicle type, documentation and delivery route.",
    answerUk: "Типовий термін — 2–4 тижні залежно від типу техніки, документів і маршруту доставки.",
    answerSk: "Typická dodacia lehota je 2–4 týždne v závislosti od typu vozidla, dokumentácie a trasy dodania.",
    answerDe: "Die typische Lieferzeit beträgt 2–4 Wochen — abhängig von Fahrzeugtyp, Dokumentation und Lieferroute.",
    orderIndex: 1,
  },
  {
    id: 2,
    questionEn: "Do you provide full vehicle history?",
    questionUk: "Чи надаєте повну історію техніки?",
    questionSk: "Poskytujete úplnú históriu vozidla?",
    questionDe: "Stellen Sie die vollständige Fahrzeughistorie bereit?",
    answerEn: "Yes. We share service records, mileage verification and condition reports before handover.",
    answerUk: "Так. Надаємо сервісні записи, перевірку пробігу та звіт про стан перед передачею.",
    answerSk: "Áno. Pred odovzdaním zdieľame servisné záznamy, overenie kilometrov a správy o stave.",
    answerDe: "Ja. Vor der Übergabe teilen wir Serviceunterlagen, Kilometerstandverifizierung und Zustandsberichte.",
    orderIndex: 2,
  },
  {
    id: 3,
    questionEn: "Can you source vehicles for a specific contract?",
    questionUk: "Чи можете підібрати техніку під конкретний контракт?",
    questionSk: "Viete zabezpečiť vozidlá pre konkrétnu zmluvu?",
    questionDe: "Können Sie Fahrzeuge für einen bestimmten Vertrag beschaffen?",
    answerEn: "Yes. We align specifications with your routes, cargo profile and fleet standards.",
    answerUk: "Так. Підбираємо специфікації під ваші маршрути, вантаж і стандарти автопарку.",
    answerSk: "Áno. Špecifikácie prispôsobíme vašim trasám, nákladu a štandardom flotily.",
    answerDe: "Ja. Wir passen die Spezifikationen an Ihre Routen, Frachtprofil und Flottenstandards an.",
    orderIndex: 3,
  },
  {
    id: 4,
    questionEn: "Do you help with registration and customs?",
    questionUk: "Допомагаєте з реєстрацією та митницею?",
    questionSk: "Pomáhate s registráciou a colnicou?",
    questionDe: "Unterstützen Sie bei Registrierung und Zoll?",
    answerEn: "We prepare the document package and guide you through registration and customs steps.",
    answerUk: "Готуємо пакет документів і супроводжуємо реєстрацію та митне оформлення.",
    answerSk: "Pripravíme balík dokumentov a prevedieme vás registráciou a colným konaním.",
    answerDe: "Wir bereiten das Dokumentenpaket vor und begleiten Sie durch Registrierung und Zollabwicklung.",
    orderIndex: 4,
  },
];

const testimonials: LandingBundle["testimonials"] = [
  {
    id: 1,
    quoteEn:
      "Expert Travel helped us expand our fleet with quality vehicles at excellent prices. Their service and support have been exceptional.",
    quoteUk:
      "Expert Travel допоміг нам розширити автопарк якісною технікою за відмінними цінами. Їхній сервіс та підтримка були винятковими.",
    quoteSk:
      "Expert Travel nám pomohol rozšíriť flotilu kvalitnými vozidlami za výborné ceny. Ich služby a podpora boli vynikajúce.",
    quoteDe:
      "Expert Travel hat uns geholfen, unsere Flotte mit hochwertigen Fahrzeugen zu wettbewerbsfähigen Preisen zu erweitern. Service und Support waren ausgezeichnet.",
    authorEn: "Martin Novak",
    authorUk: "Мартін Новак",
    authorSk: "Martin Novák",
    authorDe: "Martin Novak",
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
    quoteSk: "Silná technická kontrola a jasná komunikácia počas celého nákupného cyklu.",
    quoteDe: "Gründliche technische Prüfung und klare Kommunikation während des gesamten Kaufprozesses.",
    authorEn: "Petr Sikora",
    authorUk: "Петр Сикора",
    authorSk: "Petr Sikora",
    authorDe: "Petr Sikora",
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
    quoteSk: "Dokumentácia a plánovanie dodania ušetrili nášmu prevádzkovému tímu veľa času.",
    quoteDe: "Dokumentation und Lieferplanung haben unserem Betriebsteam viel Zeit gespart.",
    authorEn: "Iryna Kovalenko",
    authorUk: "Ірина Коваленко",
    authorSk: "Iryna Kovalenko",
    authorDe: "Iryna Kovalenko",
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
    quoteSk: "Výborná komunikácia a realistické termíny.",
    quoteDe: "Ausgezeichnete Kommunikation und realistische Zeitpläne.",
    authorEn: "Jan Krupa",
    authorUk: "Ян Крупа",
    authorSk: "Jan Krupa",
    authorDe: "Jan Krupa",
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
    quoteSk: "Správa z kontroly presne zodpovedala stavu vozidla.",
    quoteDe: "Der Inspektionsbericht entsprach dem Fahrzeugzustand exakt.",
    authorEn: "Olha Danyliuk",
    authorUk: "Ольга Данилюк",
    authorSk: "Olha Danyliuk",
    authorDe: "Olha Danyliuk",
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
    quoteSk: "Rýchla administratíva a hladké prevzatie.",
    quoteDe: "Schnelle Abwicklung der Unterlagen und reibungslose Übergabe.",
    authorEn: "Marek Benes",
    authorUk: "Марек Бенеш",
    authorSk: "Marek Beneš",
    authorDe: "Marek Benes",
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
    quoteSk: "Praktický partner pri rozširovaní prepravných operácií.",
    quoteDe: "Ein pragmatischer Partner beim Skalieren von Transportoperationen.",
    authorEn: "Dmytro Koval",
    authorUk: "Дмитро Коваль",
    authorSk: "Dmytro Koval",
    authorDe: "Dmytro Koval",
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
    quoteSk: "Dobrý výber a žiadne skryté prekvapenia.",
    quoteDe: "Gute Auswahl und keine versteckten Überraschungen.",
    authorEn: "Petra Svobodova",
    authorUk: "Петра Свободова",
    authorSk: "Petra Svobodová",
    authorDe: "Petra Svobodova",
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
  testimonials,
  contact: {
    email: "sales@m-truck.cz",
    phone: "+420 775 123 456",
    addressEn: "Prumyslova 15, Prague 10, Czech Republic",
    addressUk: "Prumyslova 15, Прага 10, Чехія",
    addressSk: "Prumyslova 15, Praha 10, Česká republika",
    addressDe: "Prumyslova 15, Prag 10, Tschechische Republik",
    workingHoursEn: "Mon-Fri 08:00-18:00",
    workingHoursUk: "Пн-Пт 08:00-18:00",
    workingHoursSk: "Po–Pi 08:00–18:00",
    workingHoursDe: "Mo–Fr 08:00–18:00",
    socialLinks: {},
  },
  stats: [
    { id: 1, key: "vehicles_delivered", value: "500+", labelEn: "Vehicles Delivered", labelUk: "Авто доставлено", labelSk: "Dodaných vozidiel", labelDe: "Gelieferte Fahrzeuge", orderIndex: 1 },
    { id: 2, key: "years_experience", value: "15+", labelEn: "Years Experience", labelUk: "Років досвіду", labelSk: "Rokov skúseností", labelDe: "Jahre Erfahrung", orderIndex: 2 },
    { id: 3, key: "client_satisfaction", value: "98%", labelEn: "Client Satisfaction", labelUk: "Задоволених клієнтів", labelSk: "Spokojnosť klientov", labelDe: "Kundenzufriedenheit", orderIndex: 3 },
  ],
};

export function getLandingBundle(): LandingBundle {
  return landingData;
}
