import type { Metadata } from "next";
import ServicesSection from "@/components/sections/services/ServicesSection";
import { constructMetadata } from "@/utils/seo";
import { getGeneralSettings } from "@/lib/get-settings";
import { getServices } from "@/lib/get-services";
import { resolvePageLocale } from "@/i18n/get-locale";
import { localizedPath } from "@/i18n/navigation";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const settings = await getGeneralSettings(locale);

  const title = settings?.seoServicesTitle || "Services";
  const description =
    settings?.seoServicesDescription || "Our managed security, cloud and integration services.";

  const keywords = settings?.seoServicesKeywords
    ? settings.seoServicesKeywords.split(",").map((k: string) => k.trim())
    : ["services", "security", "cloud", "integration"];

  const noIndex = settings?.seoServicesRobots
    ? settings.seoServicesRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: localizedPath("/services", locale),
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

export default async function ServicesPage({ params }: PageParams) {
  const locale = await resolvePageLocale(params);
  const services = await getServices({ limit: 100, status: "published", locale });

  return (
    <main>
      <ServicesSection services={services} locale={locale} />
    </main>
  );
}
