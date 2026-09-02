"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import type { Locale } from "@/lib/locale";

import { parseHeroContent, pickText } from "@/lib/landing-section-parsers";

const content = {
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
  pl: {
    badge: "Europejska jakość",
    title: "Expert Travel",
    titleHighlight: "handel międzynarodowy",
    subtitle: "w transporcie komercyjnym",
    description:
      "Współpracujemy z kupującymi i sprzedającymi transportem komercyjnym. Otwarci na partnerstwo z firmami, dealerami i właścicielami pojazdów.",
    cta: "Zobacz oferty",
    secondary: "Wyślij zapytanie",
  },
};

interface HeroProps {
  locale: Locale;
  onNavigate: (sectionId: string) => void;
  contactEmail?: string;
  contactPhone?: string;
  sectionContent?: Record<string, unknown>;
}

export function Hero({ locale, onNavigate, contactEmail, contactPhone, sectionContent }: HeroProps) {
  const cms = parseHeroContent(sectionContent);
  const base = content[locale];
  const t = {
    badge: pickText(cms.badge, base.badge),
    title: pickText(cms.title, base.title),
    titleHighlight: pickText(cms.titleHighlight, base.titleHighlight),
    subtitle: pickText(cms.subtitle, base.subtitle),
    description: pickText(cms.description, base.description),
    cta: pickText(cms.cta, base.cta),
    secondary: pickText(cms.secondary, base.secondary),
  };

  return (
    <section id="home" className="relative section-seam-accent">
      <div className="hero-shell relative overflow-hidden">
        <div className="hero-bg-layer" aria-hidden="true">
          <picture className="absolute inset-0 block">
            <source
              media="(max-width: 639px)"
              srcSet="/images/hero-road-bg-mobile.webp"
              type="image/webp"
            />
            <source srcSet="/images/hero-road-bg.webp" type="image/webp" />
            <img
              src="/images/hero-road-bg.png"
              alt=""
              decoding="async"
              fetchPriority="high"
              className="hero-bg-image absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <div className="hero-bg-scrim" />
        </div>

        <div className="hero-content-grid landing-page-container">
          <div className="hero-copy-panel justify-self-start space-y-5 sm:space-y-6 lg:space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-secondary/45 px-4 py-2">
              <Shield className="h-4 w-4 text-cyan-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.09em] text-cyan-100/90">{t.badge}</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight chrome-gradient sm:text-5xl lg:text-6xl">
                {t.titleHighlight}
              </h1>
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.subtitle}
              </h1>
            </div>

            <p className="max-w-lg text-sm font-medium text-cyan-50/90 sm:text-base">{t.description}</p>

            <div className="hero-cta-row">
              <Button
                onClick={() => onNavigate("catalog")}
                className="landing-btn landing-btn-primary px-6"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <CtaFormModal
                locale={locale}
                entryPoint="hero"
                contactEmail={contactEmail}
                contactPhone={contactPhone}
              >
                <Button type="button" variant="ghost" className="landing-btn landing-btn-secondary px-5">
                  <Phone className="h-4 w-4" />
                  {t.secondary}
                </Button>
              </CtaFormModal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
