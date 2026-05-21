import type { Metadata } from "next";
import ContactForm from "@/components/common/ContactForm";
import LogoSection from "@/components/common/LogoSection";
import { constructMetadata } from "@/utils/seo";
import { getGeneralSettings } from "@/lib/get-settings";
import { resolvePageLocale } from "@/i18n/get-locale";
import { localizedPath } from "@/i18n/navigation";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const settings = await getGeneralSettings(locale);

  const title = settings?.seoContactTitle || "Contact Us";
  const description =
    settings?.seoContactDescription ||
    "Provide us some quick information about your security needs and our team of experts will get your no obligation pricing right away.";

  const keywords = settings?.seoContactKeywords
    ? settings.seoContactKeywords.split(",").map((k: string) => k.trim())
    : ["contact", "quote", "pricing", "security support"];

  const noIndex = settings?.seoContactRobots
    ? settings.seoContactRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: localizedPath("/contact", locale),
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

export default function ContactPage() {
  return (
    <div className="bg-white py-8 text-black lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-2xl font-bold sm:text-4xl">Contact us</h1>
            <p className="mt-4 text-base text-black/70">
              Provide us some quick information about your security needs and our team of experts will
              get your no obligation pricing right away.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <LogoSection />
    </div>
  );
}
