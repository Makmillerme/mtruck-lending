"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import type { Locale } from "@/lib/locale";

import { parseHeroContent, pickText } from "@/lib/landing-section-parsers";

const content = {
  en: {
    badge: "European Quality",
    title: "Premium Commercial",
    titleHighlight: "Vehicles",
    subtitle: "from Europe",
    description:
      "Your trusted partner for commercial trucks, trailers, and cargo vehicles. Direct imports from Europe with full documentation and warranty.",
    cta: "View Catalog",
    secondary: "Contact Us",
  },
  uk: {
    badge: "Європейська якість",
    title: "Преміальна комерційна",
    titleHighlight: "Техніка",
    subtitle: "з Європи",
    description:
      "Ваш надійний партнер з продажу вантажівок, причепів та комерційної техніки. Прямий імпорт з Європи з повною документацією та гарантією.",
    cta: "Переглянути каталог",
    secondary: "Зв'язатися з нами",
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
    <section id="home" className="relative section-seam-accent section-seam-full-width">
      <div className="hero-shell relative overflow-hidden">
        <div className="hero-bg-layer" aria-hidden="true">
          <picture className="absolute inset-0 block">
            <source
              media="(max-width: 639px)"
              srcSet="/images/hero-road-bg-mobile.webp"
              type="image/webp"
            />
            <source srcSet="/images/hero-road-bg.avif" type="image/avif" />
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
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>

              <CtaFormModal
                locale={locale}
                entryPoint="hero"
                contactEmail={contactEmail}
                contactPhone={contactPhone}
              >
                <Button type="button" variant="ghost" className="landing-btn landing-btn-secondary px-5">
                  <Phone className="mr-2 h-4 w-4" />
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
