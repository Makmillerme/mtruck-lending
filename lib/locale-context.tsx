"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  LOCALE_COOKIE,
  localeCookieHeaderValue,
} from "@/lib/locale-cookie";
import type { PublicLocale } from "@/lib/locale";
import { localeFromPathname, pathForLocale } from "@/lib/locale-path";
import { SITE_METADATA } from "@/lib/site-metadata";

export type { PublicLocale as Locale };

interface LocaleContextType {
  locale: PublicLocale;
  setLocale: (locale: PublicLocale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function syncDocumentTitle(next: PublicLocale) {
  document.title = SITE_METADATA[next]?.title ?? SITE_METADATA.en.title;
}

function persistLocale(next: PublicLocale) {
  document.cookie = localeCookieHeaderValue(next);
  localStorage.setItem(LOCALE_COOKIE, next);
  document.documentElement.lang = next;
  syncDocumentTitle(next);
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
    const onPopState = () => {
      const urlLocale = localeFromPathname(window.location.pathname);
      setLocaleState(urlLocale);
      persistLocale(urlLocale);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setLocale = (next: PublicLocale) => {
    if (next === locale) return;

    const target = `${pathForLocale(next)}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", target);
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
