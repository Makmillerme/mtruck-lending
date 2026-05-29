"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
};

interface CatalogBrandModalProps {
  brand: CatalogBrandCard;
  locale: Locale;
  onClose: () => void;
}

const labels = {
  en: {
    overview: "About the brand",
    bodyTypes: "Body types",
    configurations: "Configurations",
    typicalSpecs: "Typical specifications",
    note: "We help select and import equipment that matches your routes, cargo profile, and fleet standards.",
    close: "Close",
  },
  uk: {
    overview: "Про бренд",
    bodyTypes: "Типи кузовів",
    configurations: "Комплектації",
    typicalSpecs: "Типові характеристики",
    note: "Допомагаємо підібрати та імпортувати техніку під ваші маршрути, вантаж і стандарти автопарку.",
    close: "Закрити",
  },
  sk: {
    overview: "O značke",
    bodyTypes: "Typy nadstavieb",
    configurations: "Konfigurácie",
    typicalSpecs: "Typické špecifikácie",
    note: "Pomáhame vybrať a doviezť techniku podľa vašich trás, nákladu a štandardov flotily.",
    close: "Zavrieť",
  },
  de: {
    overview: "Über die Marke",
    bodyTypes: "Aufbauten",
    configurations: "Konfigurationen",
    typicalSpecs: "Typische Spezifikationen",
    note: "Wir helfen bei Auswahl und Import von Fahrzeugen passend zu Ihren Strecken, Frachtprofil und Flottenstandards.",
    close: "Schließen",
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
  const hasTagline = Boolean(brand.tagline?.trim());
  const hasHighlights = brand.highlights.length > 0;
  const hasOverview = Boolean(brand.overview?.trim());
  const hasMetaLists = brand.bodyTypes.length > 0 || brand.configurations.length > 0 || brand.typicalSpecs.length > 0;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto border border-cyan-200/15 bg-background/95 p-0 sm:max-w-2xl lg:max-w-3xl">
        <DialogTitle className="sr-only">{brand.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {hasOverview ? brand.overview : brand.tagline || brand.name}
        </DialogDescription>

        <div className="catalog-brand-modal-header relative overflow-hidden px-6 py-8 lg:px-8">
          <div className="catalog-brand-card-media-glow absolute inset-0" aria-hidden="true" />
          {brand.logoSrc ? (
            <div className="relative z-10 mb-4 h-12 w-44 max-w-full">
              <Image
                src={brand.logoSrc}
                alt={`${brand.name} logo`}
                fill
                className="object-contain object-left"
              />
            </div>
          ) : null}
          {hasTagline ? (
            <p className="relative z-10 mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100/80">
              {brand.tagline}
            </p>
          ) : null}
          <h2 className="relative z-10 text-3xl font-bold text-foreground lg:text-4xl">{brand.name}</h2>
          {hasHighlights ? (
            <div className="relative z-10 mt-3 flex flex-wrap gap-2">
              {brand.highlights.map((item, index) => (
                <span key={`${brand.id}-highlight-${item}-${index}`} className="catalog-spec-pill">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-8 p-6 lg:p-8">
          {hasOverview ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.overview}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{brand.overview}</p>
            </div>
          ) : null}

          {brand.bodyTypes.length > 0 || brand.configurations.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2">
              <InfoList title={t.bodyTypes} items={brand.bodyTypes} />
              <InfoList title={t.configurations} items={brand.configurations} />
            </div>
          ) : null}

          <InfoList title={t.typicalSpecs} items={brand.typicalSpecs} />

          {hasMetaLists ? (
            <p className="rounded-xl border border-cyan-200/12 bg-cyan-200/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {t.note}
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
