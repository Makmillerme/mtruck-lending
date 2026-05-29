"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import { PUBLIC_LOCALE_LABELS, PUBLIC_LOCALES, type PublicLocale } from "@/lib/locale";

import { parseHeaderContent, pickText } from "@/lib/landing-section-parsers";

const navigation = {
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

const ctaText = {
  en: "Get Quote",
  uk: "Отримати пропозицію",
  sk: "Získať ponuku",
  de: "Angebot",
} as const;

const languageItems: Array<{ locale: PublicLocale; label: string }> = PUBLIC_LOCALES.map((locale) => ({
  locale,
  label: PUBLIC_LOCALE_LABELS[locale],
}));

interface HeaderProps {
  locale: PublicLocale;
  onLocaleChange: (locale: PublicLocale) => void;
  onNavigate: (sectionId: string) => void;
  contactEmail?: string;
  contactPhone?: string;
  sectionContent?: Record<string, unknown>;
}

export function Header({ locale, onLocaleChange, onNavigate, contactEmail, contactPhone, sectionContent }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const header = parseHeaderContent(sectionContent);
  const navItems = header.navigation.length > 0 ? header.navigation : [...navigation[locale]];
  const ctaLabel = pickText(header.ctaText, ctaText[locale]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 12;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="landing-header-spacer" aria-hidden="true" />
      <header
        className={`landing-site-header transition-[background-color,box-shadow,border-color] duration-300 ${
          isScrolled
            ? "bg-[linear-gradient(180deg,rgba(14,30,56,0.94)_0%,rgba(10,24,44,0.9)_100%)] border-b border-cyan-100/35 shadow-[0_14px_34px_rgba(0,0,0,0.28)]"
            : "bg-[linear-gradient(180deg,rgba(16,34,62,0.96)_0%,rgba(12,28,52,0.92)_100%)] border-b border-cyan-100/28"
        }`}
      >
        <div className="landing-header-inner landing-page-container w-full">
          <div className="landing-header-logo">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="block transition-opacity hover:opacity-85"
              aria-label="Go home"
            >
              <div className="landing-header-logo-box">
                <Image
                  src={header.logoSrc}
                  alt={header.logoAlt}
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </button>
          </div>

          <nav className="landing-header-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="landing-header-nav-link"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="landing-header-actions">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="default"
                  className="landing-btn landing-btn-ghost h-9 px-2.5 sm:px-3 hover:text-white"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm uppercase">{locale}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border bg-card">
                {languageItems.map((item) => (
                  <DropdownMenuItem
                    key={item.locale}
                    onSelect={() => onLocaleChange(item.locale)}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <CtaFormModal
              locale={locale}
              entryPoint="header"
              contactEmail={contactEmail}
              contactPhone={contactPhone}
            >
              <Button
                type="button"
                className="landing-btn landing-btn-primary hidden h-9 px-4 text-xs sm:inline-flex sm:px-5 sm:text-sm lg:px-3 lg:text-xs xl:px-5 xl:text-sm 2xl:px-6"
              >
                {ctaLabel}
              </Button>
            </CtaFormModal>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-cyan-50/90 transition-colors hover:text-white lg:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="landing-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div id="landing-mobile-menu" className="landing-header-mobile-panel lg:hidden">
            <nav className="landing-header-mobile-nav" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={`m-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="landing-header-mobile-link"
                >
                  {item.name}
                </button>
              ))}
              <div className="landing-header-mobile-cta">
                <CtaFormModal
                  locale={locale}
                  entryPoint="header"
                  contactEmail={contactEmail}
                  contactPhone={contactPhone}
                >
                  <Button type="button" className="landing-btn landing-btn-primary w-full">
                    {ctaLabel}
                  </Button>
                </CtaFormModal>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
