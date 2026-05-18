import ComplianceSection from "@/components/sections/home/ComplianceSection";
import CustomerStoriesSection from "@/components/common/CustomerStoriesSection";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import LogoSection from "@/components/common/LogoSection";
import ProductGridSection from "@/components/common/ProductGridSection";
import SolutionsSection from "@/components/common/SolutionsSection";
import ServiceListSection from "@/components/common/ServiceListSection";
import BannerSlider from "@/components/sections/home/BannerSlider";

const featuredProducts = [
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

export default function HomePage() {
  return (
    <>
      <BannerSlider />
      <LogoSection />
      <ProductGridSection
        title="Featured Products"
        description="A selection of Vivoo's standout products for a quick overview below the logos."
        products={featuredProducts}
        viewAllHref="/product"
        viewAllLabel="View all products"
      />
      <SolutionsSection />
      <ServiceListSection />
      <IndustriesSection />
      <CustomerStoriesSection />

      <ComplianceSection />
    </>
  );
}
