"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  LOCALE_COOKIE,
  localeCookieHeaderValue,
  parseLocaleCookie,
} from "@/lib/locale-cookie";
import type { PublicLocale } from "@/lib/locale";

export type { PublicLocale as Locale };

interface LocaleContextType {
  locale: PublicLocale;
  setLocale: (locale: PublicLocale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function readCookieLocale(): PublicLocale | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`));

  if (!match) return null;
  return parseLocaleCookie(match.slice(LOCALE_COOKIE.length + 1));
}

function persistLocale(next: PublicLocale) {
  document.cookie = localeCookieHeaderValue(next);
  localStorage.setItem(LOCALE_COOKIE, next);
  document.documentElement.lang = next;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: PublicLocale;
}) {
  const [locale, setLocaleState] = useState<PublicLocale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const cookieLocale = readCookieLocale();
    if (cookieLocale) {
      localStorage.setItem(LOCALE_COOKIE, cookieLocale);
      return;
    }

    const saved = parseLocaleCookie(localStorage.getItem(LOCALE_COOKIE));
    if (saved) {
      requestAnimationFrame(() => {
        setLocaleState(saved);
        persistLocale(saved);
      });
      return;
    }

    persistLocale(initialLocale);
  }, [initialLocale]);

  const setLocale = (next: PublicLocale) => {
    setLocaleState(next);
    persistLocale(next);
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
