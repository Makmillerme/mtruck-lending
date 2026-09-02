import { DEFAULT_PUBLIC_LOCALE, PUBLIC_LOCALES, type PublicLocale } from "@/lib/locale";

export const LOCALE_HEADER = "x-locale";


/** Locales that use a URL prefix (all except default English). */
export const PREFIXED_PUBLIC_LOCALES = PUBLIC_LOCALES.filter((locale) => locale !== DEFAULT_PUBLIC_LOCALE);

export function pathForLocale(locale: PublicLocale): string {
  return locale === DEFAULT_PUBLIC_LOCALE ? "/" : `/${locale}`;
}

export function isPublicLocaleSegment(segment: string): segment is PublicLocale {
  return PUBLIC_LOCALES.includes(segment as PublicLocale);
}

export function localeFromPathSegment(segment: string): PublicLocale | null {
  return isPublicLocaleSegment(segment) ? segment : null;
}

export function localeFromPathname(pathname: string): PublicLocale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return DEFAULT_PUBLIC_LOCALE;
  return localeFromPathSegment(segment) ?? DEFAULT_PUBLIC_LOCALE;
}
