import type { Locale } from "@/lib/locale";

export type EntityLocaleFields = {
  en?: string | null;
  uk?: string | null;
  sk?: string | null;
  de?: string | null;
};

const LOCALE_FALLBACK_ORDER: readonly Locale[] = ["en", "uk", "sk", "de"];

export function pickEntityLocale(locale: Locale, fields: EntityLocaleFields): string {
  const direct = fields[locale];
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  for (const key of LOCALE_FALLBACK_ORDER) {
    const value = fields[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return "";
}

export function pickLocalizedRecord<T>(record: Partial<Record<Locale, T>>, locale: Locale, fallback: T): T {
  const direct = record[locale];
  if (direct !== undefined && direct !== null) return direct;

  for (const key of LOCALE_FALLBACK_ORDER) {
    const value = record[key];
    if (value !== undefined && value !== null) return value;
  }

  return fallback;
}
