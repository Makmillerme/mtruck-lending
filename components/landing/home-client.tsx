"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/locale-context";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Services } from "@/components/landing/services";
import { Catalog } from "@/components/landing/catalog";
import { WhyUs } from "@/components/landing/why-us";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import type { LandingBundle } from "@/lib/landing-data";
import type { Locale } from "@/lib/locale";

type SectionKey = "header" | "hero" | "about" | "services" | "catalog" | "why-us" | "faq" | "footer";

interface HomeClientProps {
  initialData: LandingBundle;
  sectionOrder: SectionKey[];
}

export function HomeClient({ initialData, sectionOrder }: HomeClientProps) {
  const { locale, setLocale } = useLocale();
  const data = initialData;
  const contentLocale = locale as Locale;

  useEffect(() => {
    if (window.location.hash) return;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      history.scrollRestoration = "auto";
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const headerContent = data.content.header[contentLocale];
  const heroContent = data.content.hero[contentLocale];
  const aboutContent = data.content.about[contentLocale];
  const footerContent = data.content.footer[contentLocale];

  const sections = {
    header: (
      <Header
        locale={locale}
        onLocaleChange={(l) => setLocale(l)}
        onNavigate={scrollToSection}
        contactEmail={data.contact.email}
        contactPhone={data.contact.phone}
        sectionContent={headerContent}
      />
    ),
    hero: (
      <Hero
        locale={contentLocale}
        onNavigate={scrollToSection}
        contactEmail={data.contact.email}
        contactPhone={data.contact.phone}
        sectionContent={heroContent}
      />
    ),
    about: (
      <About locale={contentLocale} sectionContent={aboutContent} statsData={data.stats} />
    ),
    services: (
      <Services
        locale={contentLocale}
        servicesData={data.services}
        metaContent={data.content["services-meta"][contentLocale]}
      />
    ),
    catalog: (
      <Catalog
        locale={contentLocale}
        vehiclesData={data.vehicles}
        metaContent={data.content["catalog-meta"][contentLocale]}
      />
    ),
    "why-us": (
      <WhyUs
        locale={contentLocale}
        metaContent={data.content["why-us"][contentLocale]}
        testimonials={data.testimonials}
      />
    ),
    faq: (
      <FAQ locale={contentLocale} faqsData={data.faqs} metaContent={data.content["faq-meta"][contentLocale]} />
    ),
    footer: (
      <Footer
        locale={contentLocale}
        onNavigate={scrollToSection}
        contactData={data.contact}
        servicesData={data.services}
        sectionContent={footerContent}
        fallbackLinks={headerContent?.navigation}
      />
    ),
  } as const;

  return (
    <main className="min-h-screen landing-bg">
      {sectionOrder.map((key) => (
        <div
          key={key}
          className={key === "header" ? "landing-header-slot" : "landing-section-slot"}
        >
          {sections[key]}
        </div>
      ))}
    </main>
  );
}
