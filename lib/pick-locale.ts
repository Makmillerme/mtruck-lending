import type { Locale } from "@/lib/locale";

export type EntityLocaleFields = {
  en?: string | null;
  uk?: string | null;
  sk?: string | null;
  de?: string | null;
  pl?: string | null;
};

const PUBLIC_LOCALE_FALLBACK_ORDER: readonly Locale[] = ["en", "sk", "de", "pl"];
const ADMIN_LOCALE_FALLBACK_ORDER: readonly Locale[] = ["en", "uk", "sk", "de", "pl"];

export function pickEntityLocale(locale: Locale, fields: EntityLocaleFields): string {
  const direct = fields[locale];
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  const order = locale === "uk" ? ADMIN_LOCALE_FALLBACK_ORDER : PUBLIC_LOCALE_FALLBACK_ORDER;
  for (const key of order) {
    if (key === "uk" && locale !== "uk") continue;
    const value = fields[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return "";
}

export function pickLocalizedRecord<T>(record: Partial<Record<Locale, T>>, locale: Locale, fallback: T): T {
  const direct = record[locale];
  if (direct !== undefined && direct !== null) return direct;

  const order = locale === "uk" ? ADMIN_LOCALE_FALLBACK_ORDER : PUBLIC_LOCALE_FALLBACK_ORDER;
  for (const key of order) {
    const value = record[key];
    if (value !== undefined && value !== null) return value;
  }

  return fallback;
}
