import SolutionHeroSection from "@/components/common/HeroSection";
import ProductCatalogSection from "@/components/sections/product-category/ProductCatalogSection";
import LogoSection from "@/components/common/LogoSection";
import FAQSection from "@/components/common/FAQSection";
import ProductBenefitsSection from "@/components/sections/product-category/ProductBenefitsSection";
import ResourcesSection from "@/components/sections/product-category/ResourcesSection";

export function generateStaticParams() {
  return [
    { slug: "cameras" },
    { slug: "access-control" },
  ];
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories: Record<
    string,
    {
      title: string;
      description: string;
      image: string;
      heroBadges: string[];
    }
  > = {
    cameras: {
      title: "Dome security cameras",
      description:
        "Protect what matters most in all environments, with our small yet mighty dome security cameras that offer a low-profile monitoring solution.",
      image: "/images/camera-2.avif",
      heroBadges: [
        "GET PRICING",
        "LEARN MORE",
      ],
    },
    "access-control": {
      title: "Access control systems",
      description:
        "Manage who enters and when with scalable access control solutions.",
      image: "/images/image1.avif",
      heroBadges: [
        "GET PRICING",
        "FREE GUIDE",
      ],
    },
  };

  const content =
    categories[slug] ??
    categories.cameras;

  const products = [
    {
      title: "H6XP Dome Camera",
      description:
        "The H6XP Dome combines multiple use cases into one, offering Z-Wave integration for efficient and comprehensive security.",
      image: "/images/product.avif",
      badges: ["Unity On-Premise"],
      href: "/product/h6a-dome-camera",
    },
    {
      title: "H6A Dome Camera",
      description:
        "Achieve clear detail anytime and anywhere with the versatile H6A Dome, offering both video and audio analytics.",
      image: "/images/product.avif",
      badges: [
        "Unity On-Premise",
        "Alta Cloud-Native",
      ],
      href: "/product/h6a-dome-camera",
    },
    {
      title: "H6X Dome Camera",
      description:
        "Protect your site with the H6X Dome that has been designed with no built-in mic so you can easily meet privacy requirements.",
      image: "/images/product.avif",
      badges: ["Unity On-Premise"],
      href: "/product/h6a-dome-camera",
    },
    {
      title: "H6 Mini Dome Camera",
      description:
        "The H6 Mini Dome delivers sharp images and a wide view in a compact design for protection inside and out.",
      image: "/images/product.avif",
      badges: [
        "Unity On-Premise",
        "Alta Cloud-Native",
      ],
      href: "/product/h6a-dome-camera",
    },
    {
      title: "H6SL Dome Camera",
      description:
        "The H6SL Dome is a weatherproof dome camera that secures your site by offering AI-powered video analytics and an optional mic.",
      image: "/images/camera-1.avif",
      badges: ["Alta Cloud-Native"],
      href: "/product/h6a-dome-camera",
    },
    {
      title: "H5M Camera",
      description:
        "The H5M is an outdoor dome security camera that allows you to be up and running quickly with its tool-free design.",
      image: "/images/camera-2.avif",
      badges: ["Unity On-Premise"],
      href: "/product/h6a-dome-camera",
    },
  ];

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: content.title,
    },
  ];
  return (
    <div className="bg-[#f6f6f6] text-black">
      <SolutionHeroSection
        title={content.title}
        description={
          content.description
        }
        image={content.image}
        primaryCta={
          content.heroBadges[0]
        }
        secondaryCta={
          content.heroBadges[1]
        }
        breadcrumbs={breadcrumbs}
      />

      <LogoSection />

      <ProductCatalogSection
        title="Explore HD dome security camera system models"
        subtitle="See what you've been missing with discreet and easy-to-install dome IP security cameras. Make sense of what you are seeing with built-in AI capabilities."
        products={products}
        ctaLabel="COMPARE CAMERAS"
      />

      <ProductBenefitsSection />

      <ResourcesSection />

      <FAQSection />
    </div>
  );
}
