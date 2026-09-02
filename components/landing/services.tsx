"use client";

import {
  CreditCard,
  FileCheck,
  MapPin,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LandingGlassCard } from "@/components/landing/landing-glass-card";
import type { Locale } from "@/lib/locale";
import { pickEntityLocale } from "@/lib/pick-locale";
import { parseStringArray, pickMetaString, pickText } from "@/lib/landing-section-parsers";

const content = {
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
  pl: {
    badge: "Nasze usługi",
    title: "Obszary pracy",
    titleHighlight: "dla partnerów",
    description:
      "Współpracujemy z firmami, sprzedającymi, dealerami i właścicielami transportu komercyjnego. Pomagamy uporządkować współpracę od pierwszego zapytania do przekazania pojazdu.",
    pipeline: ["Zapytanie", "Warunki", "Wsparcie", "Przekazanie"],
  },
};

const iconMap: Record<string, LucideIcon> = {
  Truck,
  FileCheck,
  Wrench,
  CreditCard,
  ShieldCheck,
  MapPin,
};

interface ServicesProps {
  locale: Locale;
  servicesData?: Array<{
    id: number;
    titleEn: string;
    titleUk: string | null;
    titleSk?: string | null;
    titleDe?: string | null;
    titlePl?: string | null;
    descriptionEn: string;
    descriptionUk: string | null;
    descriptionSk?: string | null;
    descriptionDe?: string | null;
    descriptionPl?: string | null;
    icon: string;
  }>;
  metaContent?: Record<string, unknown>;
}

export function Services({ locale, servicesData = [], metaContent }: ServicesProps) {
  const base = content[locale];
  const badge = pickText(pickMetaString(metaContent, "badge"), base.badge);
  const title = pickText(pickMetaString(metaContent, "title"), base.title);
  const titleHighlight = pickText(pickMetaString(metaContent, "titleHighlight"), base.titleHighlight);
  const description = pickText(pickMetaString(metaContent, "description"), base.description);
  const pipelineRaw = parseStringArray(metaContent?.pipeline);
  const pipeline = pipelineRaw.length > 0 ? pipelineRaw : base.pipeline;

  const services = servicesData.map((service) => ({
    id: service.id,
    icon: iconMap[service.icon] ?? Truck,
    title: pickEntityLocale(locale, {
      en: service.titleEn,
      uk: service.titleUk,
      sk: service.titleSk,
      de: service.titleDe,
      pl: service.titlePl,
    }),
    description: pickEntityLocale(locale, {
      en: service.descriptionEn,
      uk: service.descriptionUk,
      sk: service.descriptionSk,
      de: service.descriptionDe,
      pl: service.descriptionPl,
    }),
  }));

  const servicesGridClass =
    services.length <= 1
      ? "services-stage-grid landing-card-grid grid grid-cols-1 max-w-xl gap-4"
      : services.length === 2
        ? "services-stage-grid landing-card-grid grid grid-cols-1 gap-4 md:grid-cols-2"
        : "services-stage-grid landing-card-grid grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";

  return (
    <section id="services" className="section-y-balanced section-services-bg section-seam-accent landing-section-contained">
      <div className="services-section-ambient" aria-hidden="true" />

      <div className="relative landing-page-container">
        <div className="services-header-row section-head-balanced items-stretch">
          <div className="services-section-head landing-section-head">
            <span className="landing-section-badge">{badge}</span>
            <h2 className="landing-section-title">
              {title} <span className="chrome-gradient">{titleHighlight}</span>
            </h2>
            <p className="landing-section-description">{description}</p>
          </div>

          {pipeline.length > 0 ? (
            <div className="services-pipeline" aria-label="Service flow">
              {pipeline.map((step) => (
                <span key={step} className="landing-pipeline-pill services-pipeline-step">
                  {step}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="services-stage mt-8 lg:mt-10">
          <div className="services-stage-shine" aria-hidden="true" />
          <div className={servicesGridClass}>
            {services.map((service, index) => (
              <LandingGlassCard
                key={service.id}
                index={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
