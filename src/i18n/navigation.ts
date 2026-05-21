import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

/** Strip leading locale segment if present. */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  const rest = segments.join("/");
  return rest ? `/${rest}` : "/";
}

/** Build path with locale prefix, e.g. `/en/contact`. */
export function localizedPath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutLocale = stripLocalePrefix(normalized);
  if (withoutLocale === "/") {
    return `/${locale}`;
  }
  return `/${locale}${withoutLocale}`;
}

/** Replace locale segment in current pathname. */
export function swapLocaleInPathname(pathname: string, locale: Locale): string {
  const pathWithoutLocale = stripLocalePrefix(pathname);
  return localizedPath(pathWithoutLocale, locale);
}

export function getLocaleFromParams(params: { locale?: string }): Locale {
  return isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
}
