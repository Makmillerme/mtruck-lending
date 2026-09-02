export type Locale = "en" | "uk" | "sk" | "de" | "pl";

export type PublicLocale = "en" | "sk" | "de" | "pl";

export const DEFAULT_PUBLIC_LOCALE: PublicLocale = "en";

export const PUBLIC_LOCALES: readonly PublicLocale[] = ["en", "sk", "de", "pl"];

export const PUBLIC_LOCALE_LABELS: Record<PublicLocale, string> = {
  en: "English",
  sk: "Slovenčina",
  de: "Deutsch",
  pl: "Polski",
};
