export type Locale = "en" | "uk" | "sk" | "de";

export type PublicLocale = Locale;

export const PUBLIC_LOCALES: readonly PublicLocale[] = ["en", "uk", "sk", "de"];

export const PUBLIC_LOCALE_LABELS: Record<PublicLocale, string> = {
  en: "English",
  uk: "Українська",
  sk: "Slovenčina",
  de: "Deutsch",
};
