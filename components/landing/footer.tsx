"use client";

import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import type { Locale } from "@/lib/locale";

import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from "@/lib/branding";
import { parseFooterContent, parseNavItems, pickText } from "@/lib/landing-section-parsers";

const defaultContent = {
  en: {
    ctaTitle: "Ready to find your ideal transport?",
    ctaText: "Contact us today for a personalized consultation and a competitive offer.",
    ctaButton: "Contact us",
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
    ctaTitle: "Готові знайти свій ідеальний транспорт?",
    ctaText: "Зверніться до нас сьогодні для персональної консультації та конкурентної пропозиції.",
    ctaButton: "Зв'язатися з нами",
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
} as const;

interface FooterProps {
  locale: Locale;
  onNavigate?: (sectionId: string) => void;
  contactData?: {
    email: string;
    phone: string;
    addressEn: string;
    addressUk: string | null;
    workingHoursEn?: string | null;
    workingHoursUk?: string | null;
  } | null;
  servicesData?: Array<{
    id: number;
    titleEn: string;
    titleUk: string | null;
  }>;
  sectionContent?: Record<string, unknown>;
  fallbackLinks?: unknown;
}

function getLocalizedValue(
  locale: Locale,
  valueEn?: string | null,
  valueUk?: string | null,
) {
  if (locale === "uk") return valueUk || valueEn || "";
  return valueEn || valueUk || "";
}

export function Footer({ locale, onNavigate, contactData, servicesData = [], sectionContent, fallbackLinks }: FooterProps) {
  const cms = parseFooterContent(sectionContent);
  const base = defaultContent[locale];
  const footer = {
    ctaTitle: pickText(cms.ctaTitle, base.ctaTitle),
    ctaText: pickText(cms.ctaText, base.ctaText),
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
    getLocalizedValue(locale, contactData?.addressEn, contactData?.addressUk) ||
    "Europe";
  const workingHours =
    getLocalizedValue(locale, contactData?.workingHoursEn, contactData?.workingHoursUk) ||
    "Mon-Fri 08:00-18:00";
  const serviceLinks = servicesData
    .map((service) => getLocalizedValue(locale, service.titleEn, service.titleUk))
    .filter(Boolean);

  return (
    <footer id="contact" className="section-y-balanced section-blend section-seam-accent">
      <div className="landing-page-container">
        <div className="footer-cta-card">
          <div className="footer-cta-shine" aria-hidden="true" />
          <div className="footer-cta-grid">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {footer.ctaTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                {footer.ctaText}
              </p>
            </div>

            <CtaFormModal
              locale={locale}
              entryPoint="footer"
              contactEmail={email}
              contactPhone={phone}
            >
              <Button
                type="button"
                className="landing-btn landing-btn-primary footer-cta-button w-full min-w-0 px-6 sm:w-auto sm:min-w-48"
              >
                {footer.ctaButton}
              </Button>
            </CtaFormModal>
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
