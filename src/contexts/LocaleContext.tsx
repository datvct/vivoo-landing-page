"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/i18n/config";
import { getMessage, type MessageKey } from "@/i18n/messages";
import { localizedPath } from "@/i18n/navigation";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
  /** Prefix a path with current locale, e.g. `/contact` → `/en/contact` */
  lp: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: React.ReactNode;
  initialLocale?: Locale;
};

export function LocaleProvider({ children, initialLocale = DEFAULT_LOCALE }: LocaleProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = initialLocale;
  }, [initialLocale]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  const setLocale = useCallback(
    (next: Locale) => {
      const segment = pathname.split("/").filter(Boolean)[0];
      const currentFromPath = isLocale(segment) ? segment : initialLocale;
      if (next === currentFromPath) return;
      Cookies.set(LOCALE_COOKIE, next, { expires: 365, path: "/" });
      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
      router.push(localizedPath("/", next));
    },
    [initialLocale, pathname, router]
  );

  const t = useCallback((key: MessageKey) => getMessage(initialLocale, key), [initialLocale]);

  const lp = useCallback((path: string) => localizedPath(path, initialLocale), [initialLocale]);

  const value = useMemo(
    () => ({ locale: initialLocale, setLocale, t, lp }),
    [initialLocale, setLocale, t, lp]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
