import {
  Building2,
  Container,
  Globe2,
  TrendingUp,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { normalizeBrandLogoSrc } from "@/lib/branding";
import type { CatalogCategory } from "@/lib/catalog-vehicle";
import type { Locale, PublicLocale } from "@/lib/locale";

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function pickText(value: string, fallback: string): string {
  return value.trim() ? value : fallback;
}

export function asNonEmptyString(value: unknown, fallback: string): string {
  const raw = typeof value === "string" ? value.trim() : "";
  return raw || fallback;
}

export function pickMetaString(meta: Record<string, unknown> | undefined, key: string): string {
  return asString(meta?.[key]);
}

export function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function parseNavItems(
  value: unknown,
): Array<{ name: string; id: string }> {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const name = asString(row.name).trim();
      const id = asString(row.id).trim();
      if (!name || !id) return null;
      return { name, id };
    })
    .filter((item): item is { name: string; id: string } => item !== null);
}

export function parseMetaSection(
  meta: Record<string, unknown> | undefined,
  keys: string[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of keys) {
    out[key] = pickMetaString(meta, key);
  }
  return out;
}

export function parseHeaderContent(meta?: Record<string, unknown>) {
  const cta = meta?.cta;
  const ctaObj = cta && typeof cta === "object" ? (cta as Record<string, unknown>) : {};
  const logo = meta?.logo;
  const logoObj = logo && typeof logo === "object" ? (logo as Record<string, unknown>) : {};

  return {
    navigation: parseNavItems(meta?.navigation),
    ctaText: asString(ctaObj.text),
    ctaTargetId: asString(ctaObj.targetId, "contact"),
    logoSrc: normalizeBrandLogoSrc(asNonEmptyString(logoObj.src, "/expert-travel.png")),
    logoAlt: asNonEmptyString(logoObj.alt, "Expert Travel logo"),
    languageSwitcher: parseLanguageSwitcher(meta),
  };
}

export function parseHeroContent(meta?: Record<string, unknown>) {
  return {
    badge: pickMetaString(meta, "badge"),
    title: pickMetaString(meta, "title"),
    titleHighlight: pickMetaString(meta, "titleHighlight"),
    subtitle: pickMetaString(meta, "subtitle"),
    description: pickMetaString(meta, "description"),
    cta: pickMetaString(meta, "cta"),
    secondary: pickMetaString(meta, "secondary"),
  };
}

const featureIconMap: Record<string, LucideIcon> = {
  Building2,
  Users,
  Globe2,
  TrendingUp,
  Truck,
  Container,
};

export function parseAboutFeatures(meta?: Record<string, unknown>) {
  const raw = meta?.features;
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const title = asString(row.title).trim();
      const description = asString(row.description).trim();
      const iconName = asString(row.icon).trim();
      if (!title && !description) return null;
      return {
        icon: featureIconMap[iconName] ?? Building2,
        title,
        description,
      };
    })
    .filter(
      (
        item,
      ): item is { icon: LucideIcon; title: string; description: string } => item !== null,
    );
}

export function parseAboutContent(meta?: Record<string, unknown>) {
  return {
    badge: pickMetaString(meta, "badge"),
    title: pickMetaString(meta, "title"),
    titleHighlight: pickMetaString(meta, "titleHighlight"),
    description: pickMetaString(meta, "description"),
    description2: pickMetaString(meta, "description2"),
    aboutImageAlt: pickMetaString(meta, "aboutImageAlt"),
    bridgeTitle: pickMetaString(meta, "bridgeTitle"),
    imageCallouts: parseStringArray(meta?.imageCallouts),
    importChain: parseStringArray(meta?.importChain),
    features: parseAboutFeatures(meta),
  };
}

export function parseFooterContent(meta?: Record<string, unknown>) {
  const cta = meta?.cta;
  const ctaObj = cta && typeof cta === "object" ? (cta as Record<string, unknown>) : {};
  const links = meta?.links;
  const linksObj = links && typeof links === "object" ? (links as Record<string, unknown>) : {};
  const services = meta?.services;
  const servicesObj = services && typeof services === "object" ? (services as Record<string, unknown>) : {};

  return {
    ctaTitle: asString(ctaObj.title),
    ctaText: asString(ctaObj.description),
    ctaButton: asString(ctaObj.button),
    brandText: pickMetaString(meta, "brandDescription"),
    linksTitle: asString(linksObj.title),
    links: parseNavItems(linksObj.items ?? linksObj.links),
    servicesTitle: asString(servicesObj.title),
    contactTitle: pickMetaString(meta, "contactTitle"),
    copyright: pickMetaString(meta, "copyright"),
    legal: parseStringArray(meta?.legal),
  };
}

export function parseWhyUsReasons(meta?: Record<string, unknown>) {
  const raw = meta?.reasons;
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const title = asString(row.title).trim();
      const description = asString(row.description).trim();
      if (!title || !description) return null;
      return { title, description };
    })
    .filter((item): item is { title: string; description: string } => item !== null);
}

export function parseWhyUsContent(meta?: Record<string, unknown>) {
  return {
    badge: pickMetaString(meta, "badge"),
    title: pickMetaString(meta, "title"),
    titleHighlight: pickMetaString(meta, "titleHighlight"),
    description: pickMetaString(meta, "description"),
    carouselTitle: pickMetaString(meta, "carouselTitle"),
    reasons: parseWhyUsReasons(meta),
  };
}

const catalogIconToKey: Record<string, CatalogCategory> = {
  Truck: "truck",
  Container: "trailer",
  Car: "truck",
};

const catalogTabDefaults: Record<Locale, Record<CatalogCategory, string>> = {
  en: { truck: "Trucks", trailer: "Trailers" },
  uk: { truck: "Вантажівки", trailer: "Причепи" },
};

function withCatalogTabDefaults(
  tabs: Array<{ key: CatalogCategory; name: string; icon: LucideIcon }>,
  locale: Locale,
): Array<{ key: CatalogCategory; name: string; icon: LucideIcon }> {
  return tabs.map((tab) => ({
    ...tab,
    name: tab.name.trim() || catalogTabDefaults[locale][tab.key],
  }));
}

export function parseCatalogTabs(
  meta: Record<string, unknown> | undefined,
  locale: Locale,
): Array<{ key: CatalogCategory; name: string; icon: LucideIcon }> {
  const raw = meta?.categories;
  if (!Array.isArray(raw) || raw.length === 0) {
    return withCatalogTabDefaults(
      [
        { key: "truck", name: "", icon: Truck },
        { key: "trailer", name: "", icon: Container },
      ],
      locale,
    );
  }

  const parsed = raw
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const iconName = asString(row.icon).trim();
      const name = asString(row.name).trim();
      const key = catalogIconToKey[iconName] ?? (index === 0 ? "truck" : "trailer");
      const icon = featureIconMap[iconName] ?? (key === "trailer" ? Container : Truck);
      return { key, name, icon };
    })
    .filter(
      (item): item is { key: CatalogCategory; name: string; icon: LucideIcon } => item !== null,
    );

  if (parsed.length >= 2) {
    return withCatalogTabDefaults(parsed.slice(0, 2), locale);
  }
  if (parsed.length === 1) {
    const otherKey: CatalogCategory = parsed[0].key === "truck" ? "trailer" : "truck";
    return withCatalogTabDefaults(
      [
        parsed[0],
        { key: otherKey, name: "", icon: otherKey === "trailer" ? Container : Truck },
      ],
      locale,
    );
  }

  return withCatalogTabDefaults(
    [
      { key: "truck", name: "", icon: Truck },
      { key: "trailer", name: "", icon: Container },
    ],
    locale,
  );
}

export function localizedField(
  locale: Locale,
  en?: string | null,
  uk?: string | null,
): string {
  if (locale === "uk") return uk || en || "";
  return en || uk || "";
}

export type CtaEntryPoint = "header" | "hero" | "footer";

const PUBLIC_LOCALE_LABELS: Record<PublicLocale, string> = {
  en: "English",
  uk: "Українська",
};

function modalGroup(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export function parseLanguageSwitcher(meta?: Record<string, unknown>) {
  const switcher = modalGroup(meta?.languageSwitcher);
  const enabled = switcher.enabled !== false;
  const raw = Array.isArray(switcher.languages) ? switcher.languages : ["en", "uk"];
  const items = raw
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item): item is PublicLocale => (PUBLIC_LOCALE_LABELS as Record<string, string>)[item] !== undefined)
    .map((locale) => ({ locale, label: PUBLIC_LOCALE_LABELS[locale] }));
  return { enabled, items };
}

export function parseHeroMedia(meta?: Record<string, unknown>) {
  const heroMedia = modalGroup(meta?.heroMedia);
  return {
    backgroundImage: asString(heroMedia.backgroundImage) || asString(heroMedia.truckImage),
    backgroundAlt: asString(heroMedia.backgroundAlt) || asString(heroMedia.truckAlt),
  };
}

export type ContactModalCopy = {
  title: Record<CtaEntryPoint, string>;
  description: string;
  fields: { name: string; phone: string; email: string; message: string };
  placeholders: { name: string; phone: string; email: string; message: string };
  submit: string;
  submitting: string;
  success: string;
  errorFallback: string;
  helper: string;
  sourceLabel: Record<CtaEntryPoint, string>;
};

export function parseContactModalContent(meta?: Record<string, unknown>): ContactModalCopy {
  const contact = modalGroup(meta?.contactModal);
  const titles = modalGroup(contact.titles);
  const fields = modalGroup(contact.fields);
  const placeholders = modalGroup(contact.placeholders);
  const sourceLabels = modalGroup(contact.sourceLabels);
  const fallbackTitle = asString(contact.title) || asString(contact.subtitle);

  return {
    title: {
      header: asString(titles.header) || fallbackTitle,
      hero: asString(titles.hero) || fallbackTitle,
      footer: asString(titles.footer) || fallbackTitle,
    },
    description: asString(contact.description) || asString(contact.subtitle),
    fields: {
      name: asString(fields.name),
      phone: asString(fields.phone),
      email: asString(fields.email),
      message: asString(fields.message),
    },
    placeholders: {
      name: asString(placeholders.name),
      phone: asString(placeholders.phone),
      email: asString(placeholders.email),
      message: asString(placeholders.message),
    },
    submit: asString(contact.submit) || asString(contact.submitText),
    submitting: asString(contact.submitting),
    success: asString(contact.success),
    errorFallback: asString(contact.errorFallback),
    helper: asString(contact.helper),
    sourceLabel: {
      header: asString(sourceLabels.header),
      hero: asString(sourceLabels.hero),
      footer: asString(sourceLabels.footer),
    },
  };
}
