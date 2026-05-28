import { PUBLIC_LOCALES, type PublicLocale } from "@/lib/locale";

export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function parseLocaleCookie(value: string | undefined | null): PublicLocale | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return PUBLIC_LOCALES.includes(normalized as PublicLocale) ? (normalized as PublicLocale) : null;
}

function localeFromAcceptLanguage(acceptLanguage: string | null | undefined): PublicLocale | null {
  if (!acceptLanguage) return null;

  const tags = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const tag of tags) {
    if (tag.startsWith("uk")) return "uk";
    if (tag.startsWith("en")) return "en";
  }

  return null;
}

export function resolveInitialLocale(
  cookieValue: string | null | undefined,
  acceptLanguage?: string | null,
): PublicLocale {
  return (
    parseLocaleCookie(cookieValue) ??
    localeFromAcceptLanguage(acceptLanguage) ??
    "uk"
  );
}

export function localeCookieHeaderValue(locale: PublicLocale): string {
  return `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
