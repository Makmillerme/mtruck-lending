"use client";

import Image from "next/image";
import { CatalogBodyTypeOfferingCard } from "@/components/landing/catalog-body-type-offering-card";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { CatalogBodyTypeOffering } from "@/lib/catalog-brands";
import { getCatalogBrandLogoFull } from "@/lib/catalog-brand-logo";
import type { Locale } from "@/lib/locale";

export type CatalogBrandCard = {
  id: string;
  name: string;
  logoSrc?: string | null;
  logoKey?: string | null;
  tagline: string;
  highlights: string[];
  overview: string;
  bodyTypes: string[];
  configurations: string[];
  typicalSpecs: string[];
  bodyTypeOfferings?: CatalogBodyTypeOffering[];
};

interface CatalogBrandModalProps {
  brand: CatalogBrandCard;
  locale: Locale;
  onClose: () => void;
}

type ModalLabels = {
  overview: string;
  bodyTypes: string;
  configurations: string;
  typicalSpecs: string;
  modelRange: string;
  note: string;
  quoteCta: string;
};

const labels: Record<Locale, ModalLabels> = {
  en: {
    overview: "About the brand",
    bodyTypes: "Chassis and body types",
    configurations: "Configuration and equipment",
    typicalSpecs: "Supply standard",
    modelRange: "Model range",
    note: "We help shortlist equipment for your routes, cargo profile, and fleet standards — then prepare a commercial quote from verified EU sources.",
    quoteCta: "Get a quote",
  },
  uk: {
    overview: "Про бренд",
    bodyTypes: "Типи шасі та кузовів",
    configurations: "Конфігурація та оснащення",
    typicalSpecs: "Стандарт постачання",
    modelRange: "Моделі",
    note: "Допомагаємо підібрати варіанти техніки під ваші маршрути, вантаж і стандарти автопарку — далі готуємо комерційну пропозицію з перевірених джерел у ЄС.",
    quoteCta: "Отримати пропозицію",
  },
  sk: {
    overview: "O značke",
    bodyTypes: "Typy podvozkov a nadstavieb",
    configurations: "Konfigurácia a výbava",
    typicalSpecs: "Štandard dodávky",
    modelRange: "Modely",
    note: "Pomáhame vybrať varianty techniky podľa vašich trás, nákladu a štandardov flotily — potom pripravíme obchodnú ponuku z overených zdrojov v EÚ.",
    quoteCta: "Získať ponuku",
  },
  de: {
    overview: "Über die Marke",
    bodyTypes: "Fahrgestell- und Aufbautypen",
    configurations: "Konfiguration und Ausstattung",
    typicalSpecs: "Lieferstandard",
    modelRange: "Modellpalette",
    note: "Wir helfen bei der Auswahl passender Fahrzeuge für Ihre Strecken, Frachtprofil und Flottenstandards — anschließend erstellen wir ein Angebot aus verifizierten EU-Quellen.",
    quoteCta: "Angebot anfordern",
  },
};

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${title}-${item}-${index}`}
            className="flex gap-2 text-sm leading-relaxed text-muted-foreground before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-cyan-200/70 before:content-['']"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CatalogBrandModal({ brand, locale, onClose }: CatalogBrandModalProps) {
  const t = labels[locale];
  const modalLogoSrc = getCatalogBrandLogoFull(brand.name) ?? brand.logoSrc;
  const hasTagline = Boolean(brand.tagline?.trim());
  const hasHighlights = brand.highlights.length > 0;
  const hasOverview = Boolean(brand.overview?.trim());
  const bodyTypeOfferings = brand.bodyTypeOfferings ?? [];
  const hasBodyTypeOfferings = bodyTypeOfferings.length > 0;
  const hasMetaLists =
    !hasBodyTypeOfferings &&
    (brand.bodyTypes.length > 0 || brand.configurations.length > 0 || brand.typicalSpecs.length > 0);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto border border-cyan-200/15 bg-background/95 p-0 sm:max-w-2xl lg:max-w-3xl">
        <DialogTitle className="sr-only">{brand.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {hasOverview ? brand.overview : brand.tagline || brand.name}
        </DialogDescription>

        <div className="catalog-brand-modal-header relative overflow-hidden px-6 py-6 lg:px-8 lg:py-7">
          <div className="catalog-brand-card-media-glow absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 space-y-3">
            {modalLogoSrc ? (
              <Image
                src={modalLogoSrc}
                alt={brand.name}
                width={160}
                height={56}
                className="catalog-brand-modal-logo-mark h-12 w-auto max-w-[10rem] object-contain object-left sm:h-14 sm:max-w-[12rem]"
              />
            ) : (
              <h2 className="catalog-brand-modal-title">{brand.name}</h2>
            )}

            {hasTagline || hasHighlights ? (
              <div className="catalog-brand-modal-copy space-y-2.5">
                {hasTagline ? <p className="catalog-brand-modal-tagline">{brand.tagline}</p> : null}

                {hasHighlights ? (
                  <div className="flex flex-wrap gap-2">
                    {brand.highlights.map((item, index) => (
                      <span key={`${brand.id}-highlight-${item}-${index}`} className="catalog-spec-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-8 p-6 lg:p-8">
          {hasOverview ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.overview}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{brand.overview}</p>
            </div>
          ) : null}

          {hasBodyTypeOfferings ? (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">
                {t.modelRange}
              </h3>
              <div className="catalog-body-type-list">
                {bodyTypeOfferings.map((offering) => (
                  <CatalogBodyTypeOfferingCard key={offering.id} offering={offering} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {brand.bodyTypes.length > 0 || brand.configurations.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  <InfoList title={t.bodyTypes} items={brand.bodyTypes} />
                  <InfoList title={t.configurations} items={brand.configurations} />
                </div>
              ) : null}

              <InfoList title={t.typicalSpecs} items={brand.typicalSpecs} />
            </>
          )}

          {hasMetaLists || hasBodyTypeOfferings ? (
            <p className="rounded-xl border border-cyan-200/12 bg-cyan-200/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {t.note}
            </p>
          ) : null}

          <div className="border-t border-cyan-200/12 pt-6">
            <CtaFormModal locale={locale} entryPoint="catalog" brandName={brand.name}>
              <Button type="button" className="landing-btn landing-btn-primary w-full">
                {t.quoteCta}
              </Button>
            </CtaFormModal>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
