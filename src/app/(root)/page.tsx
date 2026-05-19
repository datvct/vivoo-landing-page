import ComplianceSection from "@/components/sections/home/ComplianceSection";
import CustomerStoriesSection from "@/components/common/CustomerStoriesSection";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import LogoSection from "@/components/common/LogoSection";
import ProductGridSection from "@/components/common/ProductGridSection";
import SolutionsSection from "@/components/sections/solution/SolutionsSection";
import BannerSlider from "@/components/sections/home/BannerSlider";
import ServiceListSection from "@/components/sections/services/ServiceListSection";

const defaultFeaturedProducts = [
  {
    title: "AI Camera",
    description:
      "A smart camera solution for surveillance, recognition, and early alerting.",
    image: "/images/camera-1.avif",
    linkLabel: "View product",
    href: "/product/camera-ai",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
  },
  {
    title: "Security Devices",
    description:
      "A hardware suite ideal for enterprise and retail security systems.",
    image: "/images/camera-2.avif",
    linkLabel: "View details",
    href: "/product/security-devices",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
  },
  {
    title: "Monitoring Solutions",
    description:
      "Optimized for various deployment models with flexible scalability.",
    image: "/images/product.avif",
    linkLabel: "Explore",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
    href: "/product/monitoring-solutions",
  },
  {
    title: "AI Camera",
    description:
      "A smart camera solution for surveillance, recognition, and early alerting.",
    image: "/images/camera-1.avif",
    linkLabel: "View product",
    href: "/product/camera-ai",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
  },
  {
    title: "Security Devices",
    description:
      "A hardware suite ideal for enterprise and retail security systems.",
    image: "/images/camera-2.avif",
    linkLabel: "View details",
    href: "/product/security-devices",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
  },
  {
    title: "Monitoring Solutions",
    description:
      "Optimized for various deployment models with flexible scalability.",
    image: "/images/product.avif",
    linkLabel: "Explore",
    href: "/product/monitoring-solutions",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
  },
];

async function getHomeSettings() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  try {
    const res = await fetch(`${backendUrl}/site-settings/home`, {
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

async function getProducts() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  try {
    const res = await fetch(`${apiBase}/products?limit=6&status=PUBLISHED`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.items || [];
    }
  } catch (error) {
    // Ignore
  }
  return [];
}

async function getServices() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  try {
    const res = await fetch(`${apiBase}/services?limit=100&status=PUBLISHED`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.items || [];
    }
  } catch (error) {
    // Ignore
  }
  return [];
}

export default async function HomePage() {
  const homeSettings = await getHomeSettings();
  const dbProducts = await getProducts();
  const dbServices = await getServices();

  const trustedTitle = homeSettings?.trustedTitle || "Trusted by 100,000+ organizations globally";
  const trustedLogos = homeSettings?.trustedLogos || [];

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
    : defaultFeaturedProducts;

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
      <LogoSection title={trustedTitle} logos={trustedLogos} />
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
