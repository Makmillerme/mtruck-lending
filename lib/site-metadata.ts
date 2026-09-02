import { DEFAULT_PUBLIC_LOCALE, PUBLIC_LOCALES, type Locale, type PublicLocale } from "@/lib/locale";
import { pathForLocale } from "@/lib/locale-path";
import type { Metadata } from "next";

export type SiteMetadataEntry = {
  title: string;
  description: string;
  keywords: string[];
};

const DEFAULT_SITE_ORIGIN = "https://experttravelsro.com";

/** Absolute site origin without www or trailing slash. */
export function siteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    DEFAULT_SITE_ORIGIN;
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    const host = url.hostname.replace(/^www\./i, "");
    return `${url.protocol}//${host}`;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function absoluteUrlForLocale(locale: PublicLocale): string {
  const path = pathForLocale(locale);
  const origin = siteOrigin();
  return path === "/" ? `${origin}/` : `${origin}${path}`;
}

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
  pl: {
    title: "Expert Travel | Partner w transporcie komercyjnym",
    description:
      "Expert Travel — europejski partner B2B w zakresie ciężarówek, naczep i transportu komercyjnego. Współpraca z kupującymi, sprzedającymi, dealerami i firmami.",
    keywords: ["ciężarówki", "naczepy", "pojazdy użytkowe", "Europa", "B2B", "transport"],
  },
};

export function metadataAlternatesForLocale(locale: PublicLocale): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const loc of PUBLIC_LOCALES) {
    languages[loc] = absoluteUrlForLocale(loc);
  }
  languages["x-default"] = absoluteUrlForLocale(DEFAULT_PUBLIC_LOCALE);
  return {
    canonical: absoluteUrlForLocale(locale),
    languages,
  };
}

/** Title/description/icons only — canonical/hreflang live on `[locale]` page metadata. */
export function metadataForLocale(locale: Locale): Metadata {
  const entry = SITE_METADATA[locale] ?? SITE_METADATA.en;
  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}
