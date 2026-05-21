"use client";

import { LOCALES, type Locale } from "@/i18n/config";
import { useLocale } from "@/contexts/LocaleContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code as Locale)}
          className={`min-w-[2.25rem] rounded-full px-2.5 py-1.5 transition ${
            locale === code
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
          aria-pressed={locale === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
