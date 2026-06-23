import type { Locale } from "@/lib/locale";
import type { Metadata } from "next";

export type SiteMetadataEntry = {
  title: string;
  description: string;
  keywords: string[];
};

export const SITE_METADATA: Record<Locale, SiteMetadataEntry> = {
  en: {
    title: "Expert Travel | Commercial Transport Partner",
    description:
      "Expert Travel — European B2B partner for trucks, trailers and commercial transport. Cooperation with buyers, sellers, dealers and companies.",
    keywords: ["trucks", "trailers", "commercial vehicles", "Europe", "B2B", "transport"],
  },
  uk: {
    title: "Expert Travel | Партнер у комерційному транспорті",
    description:
      "Expert Travel — європейський B2B-партнер у сфері вантажівок, причепів і комерційного транспорту. Співпраця з покупцями, продавцями, дилерами та компаніями.",
    keywords: ["вантажівки", "причепи", "комерційна техніка", "Європа", "B2B", "транспорт"],
  },
  sk: {
    title: "Expert Travel | Partner v komerčnej doprave",
    description:
      "Expert Travel — európsky B2B partner pre nákladné vozidlá, prívesy a komerčnú dopravu. Spolupráca s kupujúcimi, predajcami, dílermi a firmami.",
    keywords: ["nákladné autá", "prívesy", "úžitkové vozidlá", "Európa", "B2B", "doprava"],
  },
  de: {
    title: "Expert Travel | Partner im gewerblichen Transport",
    description:
      "Expert Travel — europäischer B2B-Partner für Lkw, Auflieger und gewerblichen Transport. Zusammenarbeit mit Käufern, Verkäufern, Händlern und Unternehmen.",
    keywords: ["Lkw", "Auflieger", "Nutzfahrzeuge", "Europa", "B2B", "Transport"],
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
