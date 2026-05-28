"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import type { PublicLocale } from "@/lib/locale";

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
} as const;

const ctaText = {
  en: "Get Quote",
  uk: "Отримати пропозицію",
} as const;

const languageItems: Array<{ locale: PublicLocale; label: string }> = [
  { locale: "en", label: "English" },
  { locale: "uk", label: "Українська" },
];

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

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="h-[72px]" aria-hidden="true" />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
          isScrolled
            ? "bg-[linear-gradient(180deg,rgba(14,30,56,0.94)_0%,rgba(10,24,44,0.9)_100%)] border-b border-cyan-100/35 shadow-[0_14px_34px_rgba(0,0,0,0.28)]"
            : "bg-[linear-gradient(180deg,rgba(16,34,62,0.96)_0%,rgba(12,28,52,0.92)_100%)] border-b border-cyan-100/28"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={() => handleNavClick("home")} className="flex items-center gap-3 transition-opacity hover:opacity-85" aria-label="Go home">
            <div className="relative h-10 w-[200px]">
              <Image src={header.logoSrc} alt={header.logoAlt} fill className="object-contain" priority />
            </div>
          </button>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNavClick(item.id)} className="text-sm font-semibold uppercase tracking-[0.07em] text-cyan-50 transition-colors hover:text-white">
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="default" className="landing-btn landing-btn-ghost px-3 hover:text-white">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase text-sm">{locale}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {languageItems.map((item) => (
                  <DropdownMenuItem key={item.locale} onSelect={() => onLocaleChange(item.locale)} className="cursor-pointer">
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <CtaFormModal locale={locale} entryPoint="header" contactEmail={contactEmail} contactPhone={contactPhone}>
              <Button type="button" className="hidden sm:flex landing-btn landing-btn-primary px-6">
                {ctaLabel}
              </Button>
            </CtaFormModal>

            <button type="button" className="lg:hidden p-2 text-cyan-50/85 hover:text-white transition-colors" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen ? (
          <div className="lg:hidden bg-[linear-gradient(180deg,rgba(14,30,56,0.9)_0%,rgba(10,24,44,0.8)_100%)] border-t border-cyan-100/30">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button key={`m-${item.id}`} onClick={() => handleNavClick(item.id)} className="block w-full text-left py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                </button>
              ))}
              <CtaFormModal locale={locale} entryPoint="header" contactEmail={contactEmail} contactPhone={contactPhone}>
                <Button type="button" className="mt-4 w-full landing-btn landing-btn-primary">
                  {ctaLabel}
                </Button>
              </CtaFormModal>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
