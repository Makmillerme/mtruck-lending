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
    title: "Your Reliable Partner in",
    titleHighlight: "Commercial Transport",
    description:
      "With over 15 years of experience in the European commercial vehicle market, we specialize in importing premium trucks, trailers, and cargo vehicles from leading European manufacturers.",
    description2:
      "Our team of experts ensures every vehicle meets the highest quality standards before delivery. We provide complete documentation, warranty, and after-sales support.",
    aboutImageAlt: "Premium commercial truck, neon accent lighting",
    imageCallouts: ["EU direct import", "Full documentation", "Verified quality", "Service record", "Export ready"],
    bridgeTitle: "Import chain",
    importChain: ["VIN & mileage check", "Pre-shipment inspection", "Registration pack", "EU-wide delivery"],
    stats: [
      { value: "500+", label: "Vehicles delivered" },
      { value: "15+", label: "Years experience" },
      { value: "98%", label: "Client satisfaction" },
    ],
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
    imageCallouts: ["Прямий імпорт з ЄС", "Повна документація", "Перевірена якість", "Сервісна історія", "Готово до експорту"],
    bridgeTitle: "Ланцюг імпорту",
    importChain: ["Перевірка VIN та пробігу", "Огляд перед відправкою", "Пакет для реєстрації", "Доставка по ЄС"],
    stats: [
      { value: "500+", label: "Авто доставлено" },
      { value: "15+", label: "Років досвіду" },
      { value: "98%", label: "Задоволених клієнтів" },
    ],
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
    imageCallouts: ["Priamy dovoz z EÚ", "Kompletná dokumentácia", "Overená kvalita", "Servisná história", "Pripravené na export"],
    bridgeTitle: "Reťazec dovozu",
    importChain: ["Kontrola VIN a kilometrov", "Inšpekcia pred odoslaním", "Balík na registráciu", "Dodanie po celej EÚ"],
    stats: [
      { value: "500+", label: "Dodaných vozidiel" },
      { value: "15+", label: "Rokov skúseností" },
      { value: "98%", label: "Spokojnosť klientov" },
    ],
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
    imageCallouts: ["Direktimport aus der EU", "Vollständige Dokumentation", "Geprüfte Qualität", "Servicehistorie", "Exportbereit"],
    bridgeTitle: "Importkette",
    importChain: ["VIN- und Kilometerstandprüfung", "Inspektion vor Versand", "Registrierungspaket", "EU-weite Lieferung"],
    stats: [
      { value: "500+", label: "Gelieferte Fahrzeuge" },
      { value: "15+", label: "Jahre Erfahrung" },
      { value: "98%", label: "Kundenzufriedenheit" },
    ],
    features: [
      { icon: "Building2", title: "Sitz in Tschechien", description: "Hauptsitz in Prag mit EU-weiten Operationen" },
      { icon: "Users", title: "Expertenteam", description: "Erfahrene Fachkräfte im Nutzfahrzeugbereich" },
      { icon: "Globe2", title: "EU-Netzwerk", description: "Direkte Partnerschaften mit europäischen Lieferanten" },
      { icon: "TrendingUp", title: "Starkes Wachstum", description: "500+ Fahrzeuge an zufriedene Kunden geliefert" },
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
      const keys = ["vehicles_delivered", "years_experience", "client_satisfaction"];
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
      className="section-y-balanced section-about-bg section-seam-accent landing-section-deferred"
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
                  const label = about.imageCallouts[index];
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

            <div
              className={cn(
                "about-callouts-mobile",
                sectionActive && "about-callouts-mobile--in-view",
              )}
            >
              {about.imageCallouts.map((label, index) => (
                <span
                  key={`mobile-callout-${index}`}
                  className="landing-pipeline-pill landing-pipeline-pill--compact"
                  style={{ transitionDelay: `${index * 80}ms` } as CSSProperties}
                >
                  {label}
                </span>
              ))}
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
              <p className="text-[15px] leading-relaxed text-muted-foreground">{about.description}</p>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{about.description2}</p>
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
