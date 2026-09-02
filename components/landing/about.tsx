"use client";

import { useEffect, useRef, useState } from "react";
import { LandingGlassCard } from "@/components/landing/landing-glass-card";
import { NeonAvtoAssemble } from "@/components/landing/neon-avto-assemble";
import type { Locale } from "@/lib/locale";
import { localizedField, parseAboutContent, parseAboutFeatures, pickText } from "@/lib/landing-section-parsers";

const defaultAbout = {
  en: {
    badge: "About Us",
    title: "Expert Travel s.r.o. — your partner in",
    titleHighlight: "the European transport market",
    description:
      "Expert Travel s.r.o. is a Slovak company specializing in international trade in trucks, trailers, and commercial transport. We support a complete B2B cooperation cycle for companies and partners.",
    description2: "",
    aboutImageAlt: "Commercial truck with neon accent lighting",
    imageCallouts: ["Partner request", "Commercial terms", "Request coordination", "Vehicle handover"],
    bridgeTitle: "How we work",
    importChain: ["Partner request", "Commercial terms", "Coordination", "Vehicle handover"],
    stats: [
      { value: "3+", label: "Years on the market" },
      { value: "11", label: "Brands in work" },
    ],
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
    imageCallouts: ["Партнерський запит", "Комерційні умови", "Координація запиту", "Передача транспорту"],
    bridgeTitle: "Як ми працюємо",
    importChain: ["Партнерський запит", "Комерційні умови", "Координація", "Передача транспорту"],
    stats: [
      { value: "3+", label: "роки на ринку" },
      { value: "11", label: "брендів у роботі" },
    ],
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
    imageCallouts: ["Partnerský dopyt", "Obchodné podmienky", "Koordinácia dopytu", "Odovzdanie vozidla"],
    bridgeTitle: "Ako pracujeme",
    importChain: ["Partnerský dopyt", "Obchodné podmienky", "Koordinácia", "Odovzdanie vozidla"],
    stats: [
      { value: "3+", label: "roky na trhu" },
      { value: "11", label: "značiek v práci" },
    ],
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
    imageCallouts: ["Partneranfrage", "Geschäftsbedingungen", "Koordination der Anfrage", "Fahrzeugübergabe"],
    bridgeTitle: "So arbeiten wir",
    importChain: ["Partneranfrage", "Geschäftsbedingungen", "Koordination", "Fahrzeugübergabe"],
    stats: [
      { value: "3+", label: "Jahre am Markt" },
      { value: "11", label: "Marken im Fokus" },
    ],
    features: [
      { icon: "MapPin", title: "Sitz in der Slowakei", description: "Na Troskách 12, 974 01 Banská Bystrica, Slowakei" },
      { icon: "Globe2", title: "Internationaler Handel", description: "Zusammenarbeit mit Käufern, Verkäufern und Händlern von gewerblichem Transport" },
      { icon: "Truck", title: "Logistikkoordination", description: "Wir koordinieren Übergabe und Lieferung von gewerblichem Transport im Rahmen vereinbarter Geschäfte" },
      { icon: "Shield", title: "Begleitung der Zusammenarbeit", description: "Wir helfen, die wichtigsten Phasen der Zusammenarbeit, Kommunikation und Fahrzeugübergabe abzustimmen" },
    ],
  },
  pl: {
    badge: "O nas",
    title: "Expert Travel s.r.o. — partner na",
    titleHighlight: "europejskim rynku transportu",
    description:
      "Expert Travel s.r.o. to słowacka firma specjalizująca się w międzynarodowym handlu ciężarówkami, naczepami i transportem komercyjnym. Zapewniamy pełny cykl współpracy B2B dla firm i partnerów.",
    description2: "",
    aboutImageAlt: "Ciężarówka komercyjna z neonowym oświetleniem",
    imageCallouts: ["Zapytanie partnerskie", "Warunki handlowe", "Koordynacja zapytania", "Przekazanie pojazdu"],
    bridgeTitle: "Jak pracujemy",
    importChain: ["Zapytanie partnerskie", "Warunki handlowe", "Koordynacja", "Przekazanie pojazdu"],
    stats: [
      { value: "3+", label: "lat na rynku" },
      { value: "11", label: "marek w ofercie" },
    ],
    features: [
      { icon: "MapPin", title: "Siedziba na Słowacji", description: "Na Troskách 12, 974 01 Banská Bystrica, Słowacja" },
      { icon: "Globe2", title: "Handel międzynarodowy", description: "Współpraca z kupującymi, sprzedającymi i dealerami transportu komercyjnego" },
      { icon: "Truck", title: "Koordynacja logistyki", description: "Koordynujemy przekazanie i dostawę transportu komercyjnego w ramach umów" },
      { icon: "Shield", title: "Wsparcie współpracy", description: "Pomagamy uzgodnić główne etapy współpracy, komunikacji i przekazania pojazdu" },
    ],
  },
} as const;


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
    importChain: cms.importChain.length > 0 ? cms.importChain : [...base.importChain],
    features: mergedFeatures,
  };
  const statLabelByKey: Record<string, string> = Object.fromEntries(
    base.stats.map((item, index) => {
      const keys = ["years_on_market", "brands_in_work"];
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
                  <NeonAvtoAssemble
                    key="about-neon-truck"
                    alt={about.aboutImageAlt || "About visual"}
                    play={sectionActive}
                  />
                </div>
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
              {about.description2 ? <p className="landing-body-text">{about.description2}</p> : null}
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
