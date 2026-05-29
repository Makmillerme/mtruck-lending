import type { Locale } from "@/lib/locale";
import type { Metadata } from "next";

export type SiteMetadataEntry = {
  title: string;
  description: string;
  keywords: string[];
};

export const SITE_METADATA: Record<Locale, SiteMetadataEntry> = {
  en: {
    title: "Expert Travel | Commercial Vehicles from Europe",
    description:
      "Expert Travel — premium commercial trucks, trailers and cargo vehicles from Europe. Full documentation, warranty and after-sales support.",
    keywords: ["trucks", "trailers", "commercial vehicles", "Europe", "Czech Republic", "cargo"],
  },
  uk: {
    title: "Expert Travel | Комерційна техніка з Європи",
    description:
      "Expert Travel — преміальні вантажівки, причепи та комерційна техніка з Європи. Повна документація, гарантія та післяпродажна підтримка.",
    keywords: ["вантажівки", "причепи", "комерційна техніка", "Європа", "Чехія", "вантажоперевезення"],
  },
  sk: {
    title: "Expert Travel | Úžitkové vozidlá z Európy",
    description:
      "Expert Travel — prémiové nákladné vozidlá, prívesy a úžitková technika z Európy. Kompletná dokumentácia, záruka a popredajná podpora.",
    keywords: ["nákladné autá", "prívesy", "úžitkové vozidlá", "Európa", "Česko", "doprava"],
  },
  de: {
    title: "Expert Travel | Nutzfahrzeuge aus Europa",
    description:
      "Expert Travel — Premium-Lkw, Auflieger und Nutzfahrzeuge aus Europa. Vollständige Dokumentation, Garantie und After-Sales-Support.",
    keywords: ["Lkw", "Auflieger", "Nutzfahrzeuge", "Europa", "Tschechien", "Transport"],
  },
};

export function metadataForLocale(locale: Locale): Metadata {
  const entry = SITE_METADATA[locale] ?? SITE_METADATA.en;
  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    generator: "v0.app",
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}
