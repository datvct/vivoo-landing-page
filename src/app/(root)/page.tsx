import type { Metadata } from "next";
import ComplianceSection from "@/components/sections/home/ComplianceSection";
import CustomerStoriesSection from "@/components/common/CustomerStoriesSection";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import LogoSection from "@/components/common/LogoSection";
import ProductGridSection from "@/components/common/ProductGridSection";
import SolutionsSection from "@/components/sections/solution/SolutionsSection";
import BannerSlider from "@/components/sections/home/BannerSlider";
import ServiceListSection from "@/components/sections/services/ServiceListSection";
import { constructMetadata } from "@/utils/seo";
import { getGeneralSettings, getHomeSettings } from "@/lib/get-settings";
import { getServices } from "@/lib/get-services";
import { getProducts } from "@/lib/get-products";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGeneralSettings();
  const title = settings?.seoHomeTitle || settings?.siteTitle || "VIVOO - Advanced Security Solutions";
  const description = settings?.seoHomeDescription || settings?.siteDescription || "VIVOO provides state-of-the-art security, cloud and integration services.";
  const keywords = settings?.seoHomeKeywords
    ? settings.seoHomeKeywords.split(",").map((k: string) => k.trim())
    : [
      "VIVOO",
      "Avigilon",
      "Camera giám sát",
      "Camera AI",
      "Hệ thống an ninh",
      "Giải pháp an ninh doanh nghiệp",
      "VMS Alta",
      "VMS Unity",
      "Avigilon Vietnam",
      "Managed Security Services"
    ];


  const noIndex = settings?.seoHomeRobots
    ? settings.seoHomeRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: "/",
    keywords,
    noIndex,
    ogType: "website",
    faviconUrl: settings?.faviconUrl,
    iconsShortcut: settings?.faviconUrl,
  });
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function HomePage() {
  const homeSettings = await getHomeSettings();
  const dbProducts = await getProducts({
    limit: 6,
    page: 1,
    sortOrder: 'ASC',
    sortBy: 'sortOrder',
    status: 'published'
  });
  const dbServices = await getServices({
    page: 1,
    limit: 6,
    status: 'published'
  });

  const productsTitle = homeSettings?.productsTitle || "Featured Products";
  const productsDescription = homeSettings?.productsDescription || "A selection of Vivoo's standout products for a quick overview below the logos.";
  const products = dbProducts.length > 0
    ? dbProducts.map((p: any) => ({
      title: p.title,
      description: p.description || "",
      image: p.thumbnailUrl || "/images/camera-1.avif",
      linkLabel: p.primaryActionLabel || "View product",
      href: `/product/${p.slug}`,
      badges: p.badges || [],
    }))
    : [];

  const solutionsTitle = homeSettings?.solutionsTitle || "Solutions";
  const solutionsDescription = homeSettings?.solutionsDescription || "The Avigilon security suite offers an integrated portfolio of video security products and services powered by intelligence and built for scale.";

  const servicesTitle = homeSettings?.servicesTitle || "Service Groups";
  const servicesDescription = homeSettings?.servicesDescription || "Explore our grouped services — each designed to solve specific security challenges and scale with your business.";

  const industriesTitle = homeSettings?.industriesTitle || "Security for every site, everywhere";
  const industriesDescription = homeSettings?.industriesDescription || "See how people and organizations around the world are better protected with Avigilon's end-to-end video security and access control solutions.";
  const industriesList = homeSettings?.industriesList || [];

  const storiesTitle = homeSettings?.storiesTitle || "Our customer stories";
  const storiesDescription = homeSettings?.storiesDescription || "Hear how Avigilon's security solutions have enabled organizations globally to help keep their people, properties and assets safe and secure.";
  const storiesList = homeSettings?.storiesList || [];

  const complianceTitle = homeSettings?.complianceTitle || "Compliance and certifications";
  const complianceDescription = homeSettings?.complianceDescription || "Our end-to-end security solutions are compliant with global government regulations and built on a trusted, cybersecurity platform - all designed to help you focus on what matters most.";
  const complianceList = homeSettings?.complianceList || [];

  return (
    <>
      <BannerSlider />
      <LogoSection />
      <ProductGridSection
        title={productsTitle}
        description={productsDescription}
        products={products}
        viewAllHref="/product"
        viewAllLabel="View all products"
      />
      <SolutionsSection title={solutionsTitle} description={solutionsDescription} />
      <ServiceListSection title={servicesTitle} description={servicesDescription} services={dbServices} />
      <IndustriesSection title={industriesTitle} description={industriesDescription} industries={industriesList} />
      <CustomerStoriesSection title={storiesTitle} description={storiesDescription} stories={storiesList} />
      <ComplianceSection title={complianceTitle} description={complianceDescription} complianceList={complianceList} />
    </>
  );
}
