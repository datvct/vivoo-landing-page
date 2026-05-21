import type { Locale } from "../config";
import { enMessages } from "./en";
import type { MessageKey } from "./en";
import { viMessages } from "./vi";

const catalogs: Record<Locale, Record<MessageKey, string>> = {
  en: enMessages,
  vi: viMessages,
};

export function getMessage(locale: Locale, key: MessageKey): string {
  return catalogs[locale][key] ?? catalogs.en[key];
}

export type { MessageKey };
