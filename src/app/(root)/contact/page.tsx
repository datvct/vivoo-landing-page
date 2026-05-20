import type { Metadata } from "next";
import ContactForm from "@/components/common/ContactForm";
import LogoSection from "@/components/common/LogoSection";
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
  
  const title = settings?.seoContactTitle || "Contact Us";
  const description = settings?.seoContactDescription || "Provide us some quick information about your security needs and our team of experts will get your no obligation pricing right away.";
  
  const keywords = settings?.seoContactKeywords
    ? settings.seoContactKeywords.split(",").map((k: string) => k.trim())
    : ["contact", "quote", "pricing", "security support"];

  const noIndex = settings?.seoContactRobots
    ? settings.seoContactRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: "/contact",
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

export default function ContactPage() {
  return (
    <div className="bg-white py-8 text-black lg:py-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h1 className="text-[34px] font-semibold">
          Get your free quote
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-black/60">
          Provide us some quick
          information about your
          security needs and our team of
          experts will get your no
          obligation pricing right away.
        </p>
      </div>

      <div className="mt-10 flex justify-center px-6">
        <ContactForm />
      </div>

      <div className="mt-6 sm:mt-16">
        <LogoSection />
      </div>
    </div>
  );
}
