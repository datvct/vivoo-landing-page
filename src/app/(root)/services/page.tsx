import type { Metadata } from "next";
import ServicesSection from "@/components/sections/services/ServicesSection";
import { constructMetadata } from "@/utils/seo";

async function getGeneralSettings() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  try {
    const res = await fetch(`${backendUrl}/site-settings/general`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.value || null;
    }
  } catch (error) {
    // Ignore and fallback
  }
  return null;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGeneralSettings();

  const title = settings?.seoServicesTitle || "Services";
  const description = settings?.seoServicesDescription || "Our managed security, cloud and integration services.";

  const keywords = settings?.seoServicesKeywords
    ? settings.seoServicesKeywords.split(",").map((k: string) => k.trim())
    : ["services", "security", "cloud", "integration"];

  const noIndex = settings?.seoServicesRobots
    ? settings.seoServicesRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: "/services",
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

import { getServices } from "@/lib/get-services";

export default async function ServicesPage() {
  const services = await getServices({ limit: 100 });

  return (
    <main>
      <ServicesSection services={services} />
    </main>
  );
}
