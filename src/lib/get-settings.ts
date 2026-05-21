import type { Locale } from "@/i18n/config";

function settingsUrl(
  key: string,
  locale?: Locale
) {
  const apiBase =
    process.env
      .NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8080/api";
  const backendUrl = apiBase.replace(
    "/api",
    ""
  );
  const query = locale
    ? `?locale=${encodeURIComponent(locale)}`
    : "";
  return `${backendUrl}/site-settings/${key}${query}`;
}

export async function getHomeSettings(
  locale?: Locale
) {
  try {
    const res = await fetch(
      settingsUrl("home", locale),
      {
        next: { revalidate: 60 * 10 },
      }
    );
    if (res.ok) {
      const result = await res.json();
      return (
        result?.data?.value || null
      );
    }
  } catch {
    // Ignore and fallback
  }
  return null;
}

export async function getGeneralSettings(
  locale?: Locale
) {
  try {
    const res = await fetch(
      settingsUrl("general", locale),
      {
        next: { revalidate: 60 * 10 },
      }
    );
    if (res.ok) {
      const result = await res.json();
      return (
        result?.data?.value || null
      );
    }
  } catch {
    // Ignore and fallback
  }
  return null;
}
