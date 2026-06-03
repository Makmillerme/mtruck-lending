"use client";

import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import type { Locale } from "@/lib/locale";
import { pickEntityLocale } from "@/lib/pick-locale";

import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from "@/lib/branding";
import { parseFooterContent, parseNavItems, pickText } from "@/lib/landing-section-parsers";

const defaultContent = {
  en: {
    ctaEyebrow: "Your next step",
    ctaTitle: "Let us match the right commercial vehicle to your business",
    ctaText:
      "Share your routes, payload, and budget — we will shortlist vetted options from Europe with clear terms and no pushy sales.",
    ctaPoints: ["Tailored sourcing", "Inspection & paperwork", "Delivery support"],
    ctaHint: "We reply on business days, often the same day",
    ctaButton: "Request a shortlist",
    brandText: "Your reliable partner for premium commercial vehicles from Europe.",
    linksTitle: "Quick links",
    servicesTitle: "Services",
    contactTitle: "Contact",
    copyright: "© 2026 EXPERT TRAVEL. All rights reserved.",
    legal: ["Privacy Policy", "Terms of Service"],
    links: [
      { id: "home", name: "Home" },
      { id: "about", name: "About" },
      { id: "services", name: "Services" },
      { id: "catalog", name: "Catalog" },
      { id: "faq", name: "FAQ" },
    ],
  },
  uk: {
    ctaEyebrow: "Наступний крок",
    ctaTitle: "Підберемо комерційну техніку під ваш бізнес",
    ctaText:
      "Розкажіть про маршрути, вантаопідйомність і бюджет — запропонуємо перевірені варіанти з Європи з прозорими умовами, без нав'язливих продажів.",
    ctaPoints: ["Підбір під задачі", "Перевірка та документи", "Доставка та супровід"],
    ctaHint: "Відповідаємо в робочий час, зазвичай того ж дня",
    ctaButton: "Отримати підбір",
    brandText: "Ваш надійний партнер з преміальної комерційної техніки з Європи.",
    linksTitle: "Швидкі посилання",
    servicesTitle: "Послуги",
    contactTitle: "Контакти",
    copyright: "© 2026 EXPERT TRAVEL. Всі права захищені.",
    legal: ["Політика конфіденційності", "Умови сервісу"],
    links: [
      { id: "home", name: "Головна" },
      { id: "about", name: "Про нас" },
      { id: "services", name: "Послуги" },
      { id: "catalog", name: "Каталог" },
      { id: "faq", name: "FAQ" },
    ],
  },
  sk: {
    ctaEyebrow: "Ďalší krok",
    ctaTitle: "Pomôžeme nájsť správne úžitkové vozidlo pre váš biznis",
    ctaText:
      "Opíšte trasy, nosnosť a rozpočet — pripravíme overené ponuky z Európy s jasnými podmienkami a bez nátlaku.",
    ctaPoints: ["Individuálny výber", "Kontrola a dokumenty", "Doručenie a podpora"],
    ctaHint: "Odpovedáme v pracovných dňoch, často v ten istý deň",
    ctaButton: "Požiadať o výber",
    brandText: "Váš spoľahlivý partner pre prémiové úžitkové vozidlá z Európy.",
    linksTitle: "Rýchle odkazy",
    servicesTitle: "Služby",
    contactTitle: "Kontakt",
    copyright: "© 2026 EXPERT TRAVEL. Všetky práva vyhradené.",
    legal: ["Ochrana súkromia", "Podmienky služby"],
    links: [
      { id: "home", name: "Domov" },
      { id: "about", name: "O nás" },
      { id: "services", name: "Služby" },
      { id: "catalog", name: "Katalóg" },
      { id: "faq", name: "FAQ" },
    ],
  },
  de: {
    ctaEyebrow: "Ihr nächster Schritt",
    ctaTitle: "Wir finden das passende Nutzfahrzeug für Ihr Geschäft",
    ctaText:
      "Beschreiben Sie Strecken, Nutzlast und Budget — wir schlagen geprüfte Optionen aus Europa mit klaren Konditionen vor, ohne Verkaufsdruck.",
    ctaPoints: ["Individuelle Auswahl", "Prüfung & Unterlagen", "Lieferung & Betreuung"],
    ctaHint: "Antwort an Werktagen, oft noch am selben Tag",
    ctaButton: "Auswahl anfragen",
    brandText: "Ihr zuverlässiger Partner für Premium-Nutzfahrzeuge aus Europa.",
    linksTitle: "Schnelllinks",
    servicesTitle: "Leistungen",
    contactTitle: "Kontakt",
    copyright: "© 2026 EXPERT TRAVEL. Alle Rechte vorbehalten.",
    legal: ["Datenschutz", "Nutzungsbedingungen"],
    links: [
      { id: "home", name: "Start" },
      { id: "about", name: "Über uns" },
      { id: "services", name: "Leistungen" },
      { id: "catalog", name: "Katalog" },
      { id: "faq", name: "FAQ" },
    ],
  },
} as const;

interface FooterProps {
  locale: Locale;
  onNavigate?: (sectionId: string) => void;
  contactData?: {
    email: string;
    phone: string;
    addressEn: string;
    addressUk: string | null;
    addressSk?: string | null;
    addressDe?: string | null;
    workingHoursEn?: string | null;
    workingHoursUk?: string | null;
    workingHoursSk?: string | null;
    workingHoursDe?: string | null;
  } | null;
  servicesData?: Array<{
    id: number;
    titleEn: string;
    titleUk: string | null;
    titleSk?: string | null;
    titleDe?: string | null;
  }>;
  sectionContent?: Record<string, unknown>;
  fallbackLinks?: unknown;
}



export function Footer({ locale, onNavigate, contactData, servicesData = [], sectionContent, fallbackLinks }: FooterProps) {
  const cms = parseFooterContent(sectionContent);
  const base = defaultContent[locale];
  const footer = {
    ctaEyebrow: base.ctaEyebrow,
    ctaTitle: pickText(cms.ctaTitle, base.ctaTitle),
    ctaText: pickText(cms.ctaText, base.ctaText),
    ctaPoints: base.ctaPoints,
    ctaHint: base.ctaHint,
    ctaButton: pickText(cms.ctaButton, base.ctaButton),
    brandText: pickText(cms.brandText, base.brandText),
    linksTitle: pickText(cms.linksTitle, base.linksTitle),
    servicesTitle: pickText(cms.servicesTitle, base.servicesTitle),
    contactTitle: pickText(cms.contactTitle, base.contactTitle),
    copyright: pickText(cms.copyright, base.copyright),
    legal: cms.legal.length > 0 ? cms.legal : [...base.legal],
  };
  const links =
    cms.links.length > 0
      ? cms.links
      : parseNavItems(fallbackLinks).length > 0
        ? parseNavItems(fallbackLinks)
        : [...base.links];
  const email = contactData?.email || "sales@m-truck.cz";
  const phone = contactData?.phone || "+420 775 123 456";
  const address =
    pickEntityLocale(locale, {
      en: contactData?.addressEn,
      uk: contactData?.addressUk,
      sk: contactData?.addressSk,
      de: contactData?.addressDe,
    }) ||
    "Europe";
  const workingHours =
    pickEntityLocale(locale, {
      en: contactData?.workingHoursEn,
      uk: contactData?.workingHoursUk,
      sk: contactData?.workingHoursSk,
      de: contactData?.workingHoursDe,
    }) ||
    "Mon-Fri 08:00-18:00";
  const serviceLinks = servicesData
    .map((service) =>
      pickEntityLocale(locale, {
        en: service.titleEn,
        uk: service.titleUk,
        sk: service.titleSk,
        de: service.titleDe,
      }),
    )
    .filter(Boolean);

  return (
    <footer id="contact" className="section-y-balanced section-blend">
      <div className="landing-page-container">
        <div className="footer-cta-card">
          <div className="footer-cta-shine" aria-hidden="true" />
          <div className="footer-cta-grid">
            <div className="footer-cta-copy">
              <p className="footer-cta-eyebrow">{footer.ctaEyebrow}</p>
              <h2 className="footer-cta-title">{footer.ctaTitle}</h2>
              <p className="footer-cta-lead">{footer.ctaText}</p>
              <ul className="footer-cta-points" aria-label={footer.ctaTitle}>
                {footer.ctaPoints.map((point) => (
                  <li key={point} className="footer-cta-point">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-cta-action">
              <p className="footer-cta-action-hint">{footer.ctaHint}</p>
              <CtaFormModal
                locale={locale}
                entryPoint="footer"
                contactEmail={email}
                contactPhone={phone}
              >
                <Button
                  type="button"
                  className="landing-btn landing-btn-primary footer-cta-button w-full min-w-0 px-6 sm:w-auto sm:min-w-52"
                >
                  {footer.ctaButton}
                </Button>
              </CtaFormModal>
            </div>
          </div>
        </div>

        <div className="footer-main-card mt-8">
          <div className="footer-main-grid">
            <div className="footer-brand-col">
              <button
                type="button"
                onClick={() => onNavigate?.("home")}
                className="footer-brand-logo-btn"
                aria-label="Expert Travel home"
              >
                <div className="footer-brand-logo-box">
                  <Image
                    src={BRAND_LOGO_SRC}
                    alt={BRAND_LOGO_ALT}
                    fill
                    className="object-contain object-center lg:object-left"
                  />
                </div>
              </button>
              <p className="footer-brand-text">{footer.brandText}</p>
            </div>

            <nav className="footer-links-col" aria-label={footer.linksTitle}>
              <h3 className="footer-block-title">{footer.linksTitle}</h3>
              <ul className="footer-link-list">
                {links.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate?.(item.id)}
                      className="footer-nav-link text-sm"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-services-col">
              <h3 className="footer-block-title">{footer.servicesTitle}</h3>
              <ul className="footer-service-list">
                {serviceLinks.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <span className="landing-pipeline-pill">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <address className="footer-contact-col not-italic">
              <h3 className="footer-block-title">{footer.contactTitle}</h3>
              <div className="footer-contact-list">
                <a href={`mailto:${email}`} className="footer-contact-item footer-nav-link">
                  <Mail className="footer-contact-icon" />
                  <span>{email}</span>
                </a>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="footer-contact-item footer-nav-link">
                  <Phone className="footer-contact-icon" />
                  <span>{phone}</span>
                </a>
                <p className="footer-contact-item">
                  <MapPin className="footer-contact-icon" />
                  <span>{address}</span>
                </p>
                <p className="footer-contact-item">
                  <Clock className="footer-contact-icon" />
                  <span>{workingHours}</span>
                </p>
              </div>
            </address>
          </div>

          <div className="footer-legal-row">
            <p className="text-xs text-muted-foreground">{footer.copyright}</p>
            <div className="flex flex-wrap gap-4">
              {footer.legal.map((item) => (
                <span key={item} className="footer-nav-link text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
