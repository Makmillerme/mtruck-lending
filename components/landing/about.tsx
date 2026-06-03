"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LandingGlassCard } from "@/components/landing/landing-glass-card";
import { NeonAvtoAssemble } from "@/components/landing/neon-avto-assemble";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { localizedField, parseAboutContent, parseAboutFeatures, pickText } from "@/lib/landing-section-parsers";

const defaultAbout = {
  en: {
    badge: "About Us",
    title: "Expert Travel — your partner in",
    titleHighlight: "commercial vehicle trade",
    description:
      "Expert Travel s.r.o. is a Slovak company based in Banská Bystrica. We help businesses select, buy, and sell trucks and trailers from Europe — from wholesale and brokerage to full trade administration.",
    description2:
      "Every unit goes through a transparent process: history verification, pre-sale preparation (maintenance without engine work), registration documentation, and coordinated logistics including warehousing services.",
    aboutImageAlt: "Premium commercial truck, neon accent lighting",
    imageCallouts: ["Direct EU sourcing", "Verified history", "Full documentation", "Registration ready", "After-sales support"],
    bridgeTitle: "How we work",
    importChain: ["Vehicle selection", "Inspection & preparation", "Registration pack", "Handover & delivery"],
    stats: [
      { value: "EU", label: "European sourcing" },
      { value: "SK", label: "Slovakia HQ" },
      { value: "55336574", label: "Company ID" },
    ],
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
    imageCallouts: ["Пряме джерело в ЄС", "Перевірена історія", "Повна документація", "Готово до реєстрації", "Підтримка після угоди"],
    bridgeTitle: "Як ми працюємо",
    importChain: ["Підбір техніки", "Огляд і підготовка", "Пакет для реєстрації", "Передача та доставка"],
    stats: [
      { value: "ЄС", label: "Постачання з ЄС" },
      { value: "SK", label: "Словаччина" },
      { value: "55336574", label: "IČO" },
    ],
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
    imageCallouts: ["Priamy dovoz z EÚ", "Overená história", "Kompletná dokumentácia", "Pripravené na registráciu", "Podpora po predaji"],
    bridgeTitle: "Ako pracujeme",
    importChain: ["Výber vozidla", "Kontrola a príprava", "Registračný balík", "Odovzdanie a dodanie"],
    stats: [
      { value: "EÚ", label: "Dovoz z Európy" },
      { value: "SK", label: "Sídlo na Slovensku" },
      { value: "55336574", label: "IČO" },
    ],
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
    imageCallouts: ["Direktbezug aus der EU", "Geprüfte Historie", "Vollständige Dokumentation", "Registrierungsbereit", "Support nach dem Kauf"],
    bridgeTitle: "So arbeiten wir",
    importChain: ["Fahrzeugauswahl", "Prüfung & Vorbereitung", "Registrierungspaket", "Übergabe & Lieferung"],
    stats: [
      { value: "EU", label: "Bezug aus der EU" },
      { value: "SK", label: "Sitz in der Slowakei" },
      { value: "55336574", label: "ID-Nr." },
    ],
    features: [
      { icon: "MapPin", title: "Sitz in der Slowakei", description: "Na Troskách 12, 974 01 Banská Bystrica, Slowakei" },
      { icon: "Globe2", title: "Handel & Vermittlung", description: "Groß- und Einzelhandel mit Fahrzeugen sowie Vermittlung im Handel, bei Dienstleistungen und in der Produktion" },
      { icon: "Truck", title: "Logistik & Lager", description: "Lager-, Hilfs- und Transportleistungen sowie Lieferkoordination in der EU" },
      { icon: "Shield", title: "Dokumentation & Vorbereitung", description: "Administrative Betreuung, Marketingleistungen und verkaufsvorbereitende Aufbereitung" },
    ],
  },
} as const;

const calloutLayout = [
  {
    phase: 0 as const,
    className: "top-3 left-3 sm:top-4 sm:left-4",
  },
  {
    phase: 1 as const,
    className: "top-[40%] right-2 sm:top-[42%] sm:right-4",
  },
  {
    phase: 2 as const,
    className: "bottom-3 left-3 sm:bottom-4 sm:left-4",
  },
  {
    phase: 1 as const,
    className: "bottom-[18%] right-2 sm:bottom-[19%] sm:right-4",
  },
  {
    phase: 2 as const,
    className: "top-[13%] left-[39%] sm:top-[15%] sm:left-[41%]",
  },
];

function AboutFloatingCallout({
  label,
  className,
  phase,
  inView,
  enterStaggerMs,
}: {
  label: string;
  className?: string;
  phase: 0 | 1 | 2;
  inView: boolean;
  enterStaggerMs: number;
}) {
  const lag =
    phase === 0
      ? undefined
      : phase === 1
        ? "about-float-callout--lag-1"
        : "about-float-callout--lag-2";

  return (
    <div
      className={cn("about-float-callout absolute z-10", className, inView && "about-float-callout--in-view")}
      style={{ "--about-callout-stagger": `${enterStaggerMs}ms` } as CSSProperties}
    >
      <div className={cn("about-float-callout-inner", lag)}>
        <span className="landing-pipeline-pill">{label}</span>
      </div>
    </div>
  );
}

interface AboutProps {
  locale: Locale;
  sectionContent?: Record<string, unknown>;
  statsData?: Array<{
    key?: string;
    value: string;
    labelEn: string;
    labelUk: string | null;
    labelSk?: string | null;
    labelDe?: string | null;
    orderIndex: number;
  }>;
}

export function About({ locale, sectionContent, statsData = [] }: AboutProps) {
  const cms = parseAboutContent(sectionContent);
  const base = defaultAbout[locale];
  const cmsFeatures = parseAboutFeatures(sectionContent);
  const defaultFeatures = parseAboutFeatures({ features: base.features });
  const mergedFeatures =
    cmsFeatures.length > 0
      ? [
          ...cmsFeatures,
          ...defaultFeatures.filter(
            (feature) => !cmsFeatures.some((item) => item.title.trim() === feature.title.trim()),
          ),
        ]
      : defaultFeatures;
  const about = {
    badge: pickText(cms.badge, base.badge),
    title: pickText(cms.title, base.title),
    titleHighlight: pickText(cms.titleHighlight, base.titleHighlight),
    description: pickText(cms.description, base.description),
    description2: pickText(cms.description2, base.description2),
    aboutImageAlt: pickText(cms.aboutImageAlt, base.aboutImageAlt),
    bridgeTitle: pickText(cms.bridgeTitle, base.bridgeTitle),
    imageCallouts: cms.imageCallouts.length > 0 ? cms.imageCallouts : [...base.imageCallouts],
    importChain: cms.importChain.length > 0 ? cms.importChain : [...base.importChain],
    features: mergedFeatures,
  };
  const statLabelByKey: Record<string, string> = Object.fromEntries(
    base.stats.map((item, index) => {
      const keys = ["eu_sourcing", "sk_headquarters", "company_id"];
      return [keys[index] ?? `stat_${index}`, item.label];
    }),
  );
  const statsFromDb = statsData
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((item) => ({
      value: typeof item.value === "string" ? item.value : "",
      label:
        (item.key ? statLabelByKey[item.key] : "") ||
        localizedField(locale, item.labelEn, item.labelUk, item.labelSk, item.labelDe),
    }))
    .filter((item) => item.value.trim() && item.label.trim());
  const stats = statsFromDb.length > 0 ? statsFromDb : [...base.stats];
  const aboutSectionRef = useRef<HTMLElement>(null);
  const [sectionActive, setSectionActive] = useState(false);
  useEffect(() => {
    const el = aboutSectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setSectionActive(true));
      return;
    }

    let cancelled = false;

    const trigger = () => {
      if (cancelled) return;
      observer.disconnect();
      clearTimeout(fallbackTimer);
      setSectionActive(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting && e.intersectionRatio >= 0.35) trigger();
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    const fallbackTimer = setTimeout(trigger, 800);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section
      id="about"
      ref={aboutSectionRef}
      data-about-active={sectionActive ? "" : undefined}
      className="section-y-balanced section-about-bg section-seam-accent landing-section-contained"
    >
      <div className="landing-page-container">
        <div className="about-layout-grid grid items-stretch gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12">
          <div className="about-visual-column order-2 flex min-h-0 flex-col lg:order-1 lg:h-full">
            <div className="about-visual-shell min-h-0 flex-1 lg:h-full">
            <div className="about-visual-glow" aria-hidden="true" />

            <div className="about-visual-body">
            <div className="about-truck-stage relative w-full overflow-hidden rounded-[1.35rem] border border-white/[0.07] shadow-[0_20px_56px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="about-truck-visual relative h-full w-full origin-center">
                  <NeonAvtoAssemble alt={about.aboutImageAlt || "About visual"} play={sectionActive} />
                </div>
              </div>
              <div className="about-callouts-overlay pointer-events-none absolute inset-0">
                {calloutLayout.map((layout, index) => {
                  const label = about.importChain[index];
                  if (!label) return null;
                  return (
                    <AboutFloatingCallout
                      key={`overlay-${layout.phase}-${index}`}
                      label={label}
                      phase={layout.phase}
                      className={layout.className}
                      inView={sectionActive}
                      enterStaggerMs={index * 120}
                    />
                  );
                })}
              </div>
            </div>

            <div className="about-visual-lower">
              <div className="about-visual-bridge">
                <div className="about-visual-bridge-head">
                  <span className="about-visual-bridge-rule" aria-hidden="true" />
                  <span className="about-visual-bridge-title">{about.bridgeTitle}</span>
                  <span className="about-visual-bridge-rule" aria-hidden="true" />
                </div>
                <div className="about-visual-bridge-pills">
                  {about.importChain.map((step) => (
                    <span key={step} className="landing-pipeline-pill landing-pipeline-pill--compact">
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              <div className="about-stats-strip w-full">
                <div className="about-stats-strip-grid">
                  {stats.map((stat) => (
                    <div key={stat.label} className="about-stats-strip-item">
                      <span className="about-stats-strip-value">{stat.value}</span>
                      <span className="about-stats-strip-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>

          <div className="about-content-column order-1 flex min-h-0 flex-col space-y-7 lg:order-2 lg:h-full lg:space-y-8">
            <div className="about-section-head landing-section-head">
              <span className="landing-section-badge">{about.badge}</span>
              <h2 className="landing-section-title">
                {about.title} <span className="chrome-gradient">{about.titleHighlight}</span>
              </h2>
            </div>

            <div className="max-w-2xl space-y-4">
              <p className="landing-body-text">{about.description}</p>
              <p className="landing-body-text">{about.description2}</p>
            </div>

            <div className="about-features-grid landing-card-grid grid gap-4 sm:grid-cols-2">
              {about.features.map((feature, index) => (
                <LandingGlassCard
                  key={index}
                  index={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
