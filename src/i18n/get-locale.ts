import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, normalizeLocale, type Locale } from "./config";
import { getLocaleFromParams } from "./navigation";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}

export async function resolvePageLocale(
  params: Promise<{ locale?: string }> | { locale?: string }
): Promise<Locale> {
  const resolved = params instanceof Promise ? await params : params;
  return getLocaleFromParams(resolved);
}

export function getLocaleLabel(locale: Locale): string {
  return locale === "vi" ? "VI" : "EN";
}
