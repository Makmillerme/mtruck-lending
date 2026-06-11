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
      titleHighlight: "equipment",
      subtitle: "for your business",
      description:
        "Your trusted partner in the European market for trucks, trailers, and specialist vehicles. Wholesale, retail, and full documentary deal support.",
      cta: "View Catalog",
      secondary: "Contact Us",
    },
    uk: {
      badge: "Європейська якість",
      title: "Преміальна комерційна",
      titleHighlight: "техніка",
      subtitle: "для вашого бізнесу",
      description:
        "Ваш надійний партнер на європейському ринку з продажу вантажівок, причепів та спецтехніки. Опт, роздріб та повний документальний супровід угод.",
      cta: "Переглянути каталог",
      secondary: "Зв'язатися з нами",
    },
    sk: {
      badge: "Európska kvalita",
      title: "Prémiová komerčná",
      titleHighlight: "technika",
      subtitle: "pre váš biznis",
      description:
        "Váš spoľahlivý partner na európskom trhu s predajom nákladných vozidiel, prívesov a špeciálnej techniky. Veľkoobchod, maloobchod a kompletný dokumentárny sprievod obchodov.",
      cta: "Prezrieť katalóg",
      secondary: "Kontaktujte nás",
    },
    de: {
      badge: "Europäische Qualität",
      title: "Premium-Nutzfahrzeug-",
      titleHighlight: "technik",
      subtitle: "für Ihr Unternehmen",
      description:
        "Ihr zuverlässiger Partner auf dem europäischen Markt für Lkw, Auflieger und Spezialfahrzeuge. Großhandel, Einzelhandel und vollständige dokumentarische Abwicklung.",
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
        "Expert Travel s.r.o. is a Slovak company with headquarters in Banská Bystrica — a full participant in the European commercial vehicle market. We cover the full B2B supply cycle: from fleet sales within the EU to organising official export of trucks and trailers to Eastern Europe and CIS countries.",
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
        "Expert Travel s.r.o. — словацька компанія з головним офісом у Банській Бистриці, повноцінний учасник європейського ринку комерційної техніки. Ми забезпечуємо повний цикл B2B-поставок: від продажу автопаркам всередині ЄС до організації офіційного експорту вантажівок та причепів у країни Східної Європи та СНД.",
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
        "Expert Travel s.r.o. je slovenská spoločnosť so sídlom v Banskej Bystrici, plnohodnotný účastník európskeho trhu s úžitkovými vozidlami. Zabezpečujeme celý cyklus B2B dodávok: od predaja flotilám v rámci EÚ až po organizáciu oficiálneho exportu nákladných vozidiel a prívesov do krajín východnej Európy a SNŠ.",
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
        "Expert Travel s.r.o. ist ein slowakisches Unternehmen mit Hauptsitz in Banská Bystrica — ein vollwertiger Akteur auf dem europäischen Nutzfahrzeugmarkt. Wir decken den gesamten B2B-Lieferzyklus ab: vom Flottenverkauf innerhalb der EU bis zur Organisation des offiziellen Exports von Lkw und Aufliegern in Länder Osteuropas und der GUS.",
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
          title: "Direct access to the EU market",
          description:
            "We operate within the European market. We acquire vehicles directly from leasing companies and corporate fleets without unnecessary middlemen.",
        },
        {
          title: "Transparent history and documents",
          description:
            "Each vehicle has verified European service history. We prepare a full document package for local registration or further export.",
        },
        {
          title: "Quality Guarantee",
          description:
            "Before sale, every vehicle undergoes a detailed technical audit and cosmetic preparation at our base to meet high operational standards.",
        },
        {
          title: "Net sales (VAT-free)",
          description:
            "We structure export deals at zero VAT (VAT 0% / Netto) for foreign buyers, ensuring full financial and legal transparency.",
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
          title: "Власний доступ до ринку ЄС",
          description:
            "Ми працюємо всередині європейського ринку. Викуповуємо техніку напряму з лізингових компаній та корпоративних автопарків без зайвих посередників.",
        },
        {
          title: "Прозора історія та документи",
          description:
            "Кожен транспортний засіб має підтверджену європейську сервісну історію. Ми готуємо повний пакет документів для локальної реєстрації або подальшого експорту.",
        },
        {
          title: "Гарантія якості",
          description:
            "Перед продажем техніка проходить детальний технічний аудит та косметичну підготовку на нашій базі, щоб відповідати високим стандартам експлуатації.",
        },
        {
          title: "Продаж без ПДВ (Netto)",
          description:
            "Оформлюємо експортні угоди за нульовою ставкою ПДВ (VAT 0% / Netto) для іноземних покупців, забезпечуючи повну фінансову та юридичну прозорість.",
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
        { title: "Vlastný prístup na trh EÚ", description: "Pôsobíme na európskom trhu. Vozidlá vykupujeme priamo od lízingových spoločností a firemných flotíl bez zbytočných sprostredkovateľov." },
        { title: "Transparentná história a dokumenty", description: "Každé vozidlo má overenú európsku servisnú históriu. Pripravíme kompletný balík dokumentov na lokálnu registráciu alebo ďalší export." },
        { title: "Záruka kvality", description: "Pred predajom vozidlo prechádza detailným technickým auditom a kozmetickou prípravou v našej základni, aby spĺňalo vysoké prevádzkové štandardy." },
        { title: "Predaj bez DPH (Netto)", description: "Exportné obchody vybavujeme s nulovou sadzbou DPH (VAT 0% / Netto) pre zahraničných kupujúcich s plnou finančnou a právnou transparentnosťou." },
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
        { title: "Eigener Zugang zum EU-Markt", description: "Wir arbeiten innerhalb des europäischen Marktes. Wir erwerben Fahrzeuge direkt von Leasinggesellschaften und Firmenflotten ohne unnötige Zwischenhändler." },
        { title: "Transparente Historie und Dokumente", description: "Jedes Fahrzeug hat eine nachgewiesene europäische Servicehistorie. Wir bereiten ein vollständiges Dokumentenpaket für die lokale Zulassung oder den weiteren Export vor." },
        { title: "Qualitätsgarantie", description: "Vor dem Verkauf durchläuft jedes Fahrzeug ein detailliertes technisches Audit und eine kosmetische Aufbereitung in unserer Basis, um hohe Betriebsstandards zu erfüllen." },
        { title: "Netto-Verkauf (ohne MwSt.)", description: "Exportgeschäfte führen wir mit Null-Mehrwertsteuer (VAT 0% / Netto) für ausländische Käufer — mit vollständiger finanzieller und rechtlicher Transparenz." },
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
      badge: "Supply focus",
      title: "Brands we",
      titleHighlight: "work with",
      description:
        "We source, acquire, and officially export equipment from leading European manufacturers tailored to your business requirements.",
      viewDetails: "Get a quote",
      categories: [
        { icon: "Truck", name: "Trucks", count: "120+", description: "Heavy duty trucks", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Trailers", count: "80+", description: "Semi trailers", brands: ["Schmitz", "Krone"] },
      ],
    },
    uk: {
      badge: "Напрямки постачання",
      title: "Бренди, з",
      titleHighlight: "якими працюємо",
      description:
        "Ми забезпечуємо підбір, викуп та офіційний експорт техніки від провідних європейських виробників під ваші індивідуальні бізнес-задачі.",
      viewDetails: "Отримати пропозицію",
      categories: [
        { icon: "Truck", name: "Вантажівки", count: "120+", description: "Важкі вантажівки", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Причепи", count: "80+", description: "Напівпричепи", brands: ["Schmitz", "Krone"] },
      ],
    },
    sk: {
      badge: "Smery dodávok",
      title: "Značky, s",
      titleHighlight: "ktorými pracujeme",
      description:
        "Zabezpečujeme výber, výkup a oficiálny export techniky od popredných európskych výrobcov podľa vašich obchodných požiadaviek.",
      viewDetails: "Získať ponuku",
      categories: [
        { icon: "Truck", name: "Nákladné vozidlá", count: "120+", description: "Ťažké nákladné vozidlá", brands: ["MAN", "Scania"] },
        { icon: "Container", name: "Prívesy", count: "80+", description: "Návesy", brands: ["Schmitz", "Krone"] },
      ],
    },
    de: {
      badge: "Lieferrichtungen",
      title: "Marken, mit",
      titleHighlight: "denen wir arbeiten",
      description:
        "Wir übernehmen Auswahl, Ankauf und offiziellen Export von Fahrzeugen führender europäischer Hersteller — passend zu Ihren Geschäftsanforderungen.",
      viewDetails: "Angebot anfordern",
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
      description: "Practical answers about supply terms, paperwork, and working with Expert Travel.",
    },
    uk: {
      badge: "FAQ",
      title: "Часті",
      titleHighlight: "запитання",
      description: "Практичні відповіді про умови постачання, документи та співпрацю з Expert Travel.",
    },
    sk: {
      badge: "FAQ",
      title: "Často kladené",
      titleHighlight: "Otázky",
      description: "Praktické odpovede o podmienkach dodávok, dokumentoch a spolupráci s Expert Travel.",
    },
    de: {
      badge: "FAQ",
      title: "Häufig gestellte",
      titleHighlight: "Fragen",
      description: "Praktische Antworten zu Lieferbedingungen, Unterlagen und der Zusammenarbeit mit Expert Travel.",
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
      "We source trucks and trailers from verified European auctions and closed corporate fleets — matched to your budget, payload, route profile, and compliance requirements.",
    descriptionUk:
      "Підбираємо вантажівки та причепи з перевірених європейських аукціонів і закритих корпоративних баз — під ваш бюджет, вантажність, профіль маршрутів і регуляторні вимоги.",
    descriptionSk:
      "Vyberáme nákladné vozidlá a prívesy z overených európskych aukcií a uzavretých firemných báz — podľa vášho rozpočtu, nosnosti, profilu trás a regulačných požiadaviek.",
    descriptionDe:
      "Wir beschaffen Lkw und Auflieger aus verifizierten europäischen Auktionen und geschlossenen Firmenflotten — abgestimmt auf Budget, Nutzlast, Routenprofil und Compliance-Anforderungen.",
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
      "Customs and export clearance: We prepare a full export document package (including EX-1 declarations, transit plates, and certificates of origin) for fast and legal customs processing.",
    descriptionUk:
      "Митне та експортне оформлення: Готуємо повний пакет документів для експорту (включаючи декларації EX-1, транзитні номери та сертифікати походження), що гарантує швидке та легальне проходження митниці.",
    descriptionSk:
      "Colné a exportné vybavenie: Pripravíme kompletný balík exportných dokumentov (vrátane deklarácií EX-1, tranzitných značiek a certifikátov pôvodu) pre rýchle a legálne colné konanie.",
    descriptionDe:
      "Zoll- und Exportabwicklung: Wir bereiten ein vollständiges Exportdokumentenpaket vor (einschließlich EX-1-Erklärungen, Transitkennzeichen und Ursprungszeugnisse) für eine schnelle und rechtmäßige Zollabfertigung.",
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
      "International logistics: We organise delivery from our Slovakia warehouse to any point in Europe or to importer country borders. Clear timelines, verified drivers, and cargo insurance.",
    descriptionUk:
      "Міжнародна логістика: Організовуємо доставку техніки зі складу в Словаччині до будь-якої точки Європи чи до кордонів країн-імпортерів. Чіткі терміни, перевірені водії та страхування вантажу.",
    descriptionSk:
      "Medzinárodná logistika: Organizujeme dodanie techniky zo skladu na Slovensku do ľubovoľného miesta v Európe alebo k hraniciam krajín dovozcov. Jasné termíny, overení vodiči a poistenie nákladu.",
    descriptionDe:
      "Internationale Logistik: Wir organisieren die Lieferung von unserem Lager in der Slowakei zu jedem Punkt in Europa oder an die Grenzen der Importländer. Klare Termine, geprüfte Fahrer und Frachtversicherung.",
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
      "Wholesale, retail, and B2B partnerships. We structure deals, prepare supporting documents, and coordinate the process from first inspection to key handover.",
    descriptionUk:
      "Опт, роздріб та B2B-партнерство. Структуруємо угоди, готуємо супровідні документи та координуємо процес від першого огляду до передачі ключів.",
    descriptionSk:
      "Veľkoobchod, maloobchod a B2B partnerstvo. Štruktúrujeme obchody, pripravíme sprievodné dokumenty a koordinujeme proces od prvého obhliadnutia po odovzdanie kľúčov.",
    descriptionDe:
      "Großhandel, Einzelhandel und B2B-Partnerschaften. Wir strukturieren Geschäfte, bereiten Begleitdokumente vor und koordinieren den Prozess von der ersten Besichtigung bis zur Schlüsselübergabe.",
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
  {
    id: 8,
    questionEn: "Can vehicles be purchased at Netto price (without VAT)?",
    questionUk: "Чи можна отримати техніку за ціною Нетто (без ПДВ)?",
    questionSk: "Je možné kúpiť vozidlo za cenu Netto (bez DPH)?",
    questionDe: "Kann die Technik zum Netto-Preis (ohne MwSt.) gekauft werden?",
    answerEn:
      "Yes. When purchasing for export outside the EU or for a VAT-registered company in another EU country, the deal is priced Netto with a zero VAT rate.",
    answerUk:
      "Так. При оформленні постачання на експорт за межі ЄС або на компанію-платника ПДВ в іншій країні Євросоюзу, угода оформлюється за ціною Netto з нульовою ставкою VAT.",
    answerSk:
      "Áno. Pri kúpe na export mimo EÚ alebo na spoločnosť platcu DPH v inej krajine EÚ sa obchod uzatvára za cenu Netto s nulovou sadzbou DPH.",
    answerDe:
      "Ja. Beim Kauf für den Export außerhalb der EU oder für ein mehrwertsteuerpflichtiges Unternehmen in einem anderen EU-Land wird der Deal zum Netto-Preis mit Null-Mehrwertsteuersatz abgeschlossen.",
    orderIndex: 8,
  },
  {
    id: 9,
    questionEn: "What export documents do you provide?",
    questionUk: "Які експортні документи ви надаєте?",
    questionSk: "Aké exportné dokumenty poskytujete?",
    questionDe: "Welche Exportdokumente stellen Sie bereit?",
    answerEn:
      "We handle the export declaration (EX-1), transit documents (T1/T2 as needed), insurance, and assistance obtaining compliance certificates for customs clearance in your country.",
    answerUk:
      "Ми повністю беремо на себе відкриття експортної декларації (EX-1), оформлення транзитних документів (T1/T2 за потреби), страхування та допомогу в отриманні сертифікатів відповідності для розмитнення у вашій країні.",
    answerSk:
      "Kompletne zabezpečíme exportnú deklaráciu (EX-1), tranzitné dokumenty (T1/T2 podľa potreby), poistenie a pomoc pri získaní certifikátov zhody pre colné konanie vo vašej krajine.",
    answerDe:
      "Wir übernehmen die Ausfuhranmeldung (EX-1), Transitdokumente (T1/T2 bei Bedarf), Versicherung und Unterstützung bei Konformitätszertifikaten für die Zollabfertigung in Ihrem Land.",
    orderIndex: 9,
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
