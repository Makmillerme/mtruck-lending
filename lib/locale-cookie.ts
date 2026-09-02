import { DEFAULT_PUBLIC_LOCALE, PUBLIC_LOCALES, type PublicLocale } from "@/lib/locale";

export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function parseLocaleCookie(value: string | undefined | null): PublicLocale | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === "uk") return DEFAULT_PUBLIC_LOCALE;
  return PUBLIC_LOCALES.includes(normalized as PublicLocale) ? (normalized as PublicLocale) : null;
}

export function resolveInitialLocale(
  cookieValue: string | null | undefined,
  _acceptLanguage?: string | null,
): PublicLocale {
  return parseLocaleCookie(cookieValue) ?? DEFAULT_PUBLIC_LOCALE;
}

export function localeCookieHeaderValue(locale: PublicLocale): string {
  return `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
