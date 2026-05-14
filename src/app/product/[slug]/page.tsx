import { notFound } from "next/navigation";
import ProductDetailHeroSection from "@/components/sections/product/ProductDetailHeroSection";
import ProductFlexibleSetupSection from "@/components/sections/product/ProductFlexibleSetupSection";
import ProductInsightsSection from "@/components/sections/product/ProductInsightsSection";
import ProductRelatedProductsSection from "@/components/sections/product/ProductRelatedProductsSection";

type ProductDetail = {
  slug: string;
  breadcrumbs: string[];
  title: string;
  categoryLabel: string;
  badges: string[];
  description: string;
  features: string[];
  primaryActionLabel: string;
  primaryActionHref: string;
  thumbnails: {
    src: string;
    alt: string;
  }[];
  detailLinks: {
    label: string;
    href: string;
    icon: "datasheet" | "support";
  }[];
};

const productDetails: Record<
  string,
  ProductDetail
> = {
  "h6a-dome-camera": {
    slug: "h6a-dome-camera",
    breadcrumbs: [
      "Products",
      "Security Cameras",
      "Dome Camera",
      "H6A Dome Camera",
    ],
    title: "H6A Dome Camera",
    categoryLabel:
      "Video Management Software:",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
    description:
      "Detect critical events with integrated video and audio for enhanced awareness and faster response times.",
    features: [
      "Resolution up to 8 MP",
      "AI-powered video and audio analytics",
      "Built-in IR illumination",
      "IK10/11 and Type 4X rated",
      "ONVIF S, T, G & M conformant",
    ],
    primaryActionLabel: "GET PRICING",
    primaryActionHref: "#",
    thumbnails: [
      {
        src: "/images/product.avif",
        alt: "H6A dome camera front view",
      },
      {
        src: "/images/camera-1.avif",
        alt: "H6A dome camera alternate view",
      },
      {
        src: "/images/camera-2.avif",
        alt: "H6A dome camera top view",
      },
      {
        src: "/images/product.avif",
        alt: "H6A dome camera side view",
      },
      {
        src: "/images/camera-1.avif",
        alt: "H6A dome camera rear view",
      },
    ],
    detailLinks: [
      {
        label: "Alta Datasheet",
        href: "#",
        icon: "datasheet",
      },
      {
        label: "Unity Datasheet",
        href: "#",
        icon: "datasheet",
      },
      {
        label: "Support",
        href: "#",
        icon: "support",
      },
    ],
  },
  "h6xp-dome-camera": {
    slug: "h6xp-dome-camera",
    breadcrumbs: [
      "Products",
      "Security Cameras",
      "Dome Camera",
      "H6XP Dome Camera",
    ],
    title: "H6XP Dome Camera",
    categoryLabel:
      "Video Management Software:",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
    description:
      "A flexible dome camera designed for dependable monitoring and efficient deployment.",
    features: [
      "Resolution up to 8 MP",
      "Advanced analytics and audio",
      "Weather-resistant design",
      "Simple integration with existing systems",
      "ONVIF conformant",
    ],
    primaryActionLabel: "GET PRICING",
    primaryActionHref: "#",
    thumbnails: [
      {
        src: "/images/product.avif",
        alt: "H6XP dome camera front view",
      },
      {
        src: "/images/camera-1.avif",
        alt: "H6XP dome camera alternate view",
      },
      {
        src: "/images/camera-2.avif",
        alt: "H6XP dome camera top view",
      },
      {
        src: "/images/product.avif",
        alt: "H6XP dome camera side view",
      },
      {
        src: "/images/camera-1.avif",
        alt: "H6XP dome camera rear view",
      },
    ],
    detailLinks: [
      {
        label: "Alta Datasheet",
        href: "#",
        icon: "datasheet",
      },
      {
        label: "Unity Datasheet",
        href: "#",
        icon: "datasheet",
      },
      {
        label: "Support",
        href: "#",
        icon: "support",
      },
    ],
  },
};

const flexibleSetupCards = [
  {
    title: "Alta H6A Dome",
    subtitle: "Cloud-native Alta Video",
    description:
      "Stay ahead of safety risks with the Alta H6A Dome and Alta Video, our cloud-native VMS with intelligent analytics.",
    bullets: [
      "Smart AI for notifications and investigations.",
      "Discover and share videos from any location.",
      "Easily expand your on-camera storage capabilities.",
      "Get started quickly using QR-code onboarding.",
    ],
    image: "/images/product.avif",
    imageAlt:
      "Alta H6A dome camera cloud-native setup",
    accentClassName:
      "bg-gradient-to-r from-blue-600 via-emerald-500 to-lime-500",
  },
  {
    title: "Unity H6A Dome",
    subtitle: "On-premise Unity Video",
    description:
      "Get focused views where they matter most and a fast frame rate up to 60 FPS with the Unity H6A Dome and Unity Video VMS.",
    bullets: [
      "Find people and vehicles using Appearance Search.",
      "Meet privacy needs with Dynamic Privacy Masking.",
      "Cybersecurity with FIPS compliance and Secure Boot.",
      "Interoperability with ONVIF conformance.",
    ],
    image: "/images/camera-1.avif",
    imageAlt:
      "Unity H6A dome camera on-premise setup",
    accentClassName:
      "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400",
  },
];

const productInsights = [
  {
    title:
      "Stay one step ahead of incidents",
    description:
      "Proactively flag important events using AI-powered video analytics.",
    image: "/images/product.avif",
    imageAlt:
      "AI-powered incident detection camera",
    iconKey: "shield" as const,
  },
  {
    title: "Hear what’s most important",
    description:
      "Expand beyond sight with advanced audio alerts for a variety of sounds.",
    image: "/images/camera-1.avif",
    imageAlt:
      "Audio-enabled security camera",
    iconKey: "mic" as const,
  },
  {
    title: "Capture the perfect shot",
    description:
      "See more in low-light with IR illumination and Wide Dynamic Range.",
    image: "/images/camera-2.avif",
    imageAlt:
      "Security camera with IR illumination",
    iconKey: "camera" as const,
  },
  {
    title:
      "Take on any environment with ease",
    description:
      "Help safeguard your site with a modular design and multiple mount options.",
    image: "/images/image1.avif",
    imageAlt:
      "Dome camera in outdoor environment",
    iconKey: "sun" as const,
  },
];

const relatedProducts = [
  {
    title: "H6A Bullet Camera",
    description:
      "See far and wide to help secure large sites with the H6A Bullet. Built-in IR gives clarity in low-light areas.",
    image: "/images/camera-1.avif",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
    href: "#",
  },
  {
    title: "H6SL Dome Camera",
    description:
      "The H6SL Dome is a weatherproof dome camera that secures your site by offering AI-powered video analytics and an optional mic.",
    image: "/images/camera-2.avif",
    badges: [
      "Unity On-Premise",
      "Alta Cloud-Native",
    ],
    href: "#",
  },
  {
    title: "H6X Dome Camera",
    description:
      "Protect your site with the H6X Dome that has been designed with no built-in mic so you can easily meet privacy requirements.",
    image: "/images/product.avif",
    badges: ["Unity On-Premise"],
    href: "#",
  },
];

export function generateStaticParams() {
  return Object.keys(
    productDetails
  ).map((slug) => ({ slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = productDetails[slug];

  if (!detail) {
    notFound();
  }

  return (
    <main className="bg-white text-black">
      <ProductDetailHeroSection
        breadcrumbs={detail.breadcrumbs}
        title={detail.title}
        categoryLabel={
          detail.categoryLabel
        }
        badges={detail.badges}
        description={detail.description}
        features={detail.features}
        primaryActionLabel={
          detail.primaryActionLabel
        }
        primaryActionHref={
          detail.primaryActionHref
        }
        thumbnails={detail.thumbnails}
        detailLinks={detail.detailLinks}
      />
      <ProductInsightsSection
        title="Key benefits of Avigilon’s dome cameras"
        description="Whether you're protecting a large retail store or a small meeting room, obtain the level of image detail you need to safeguard your facility with our robust range of dome security CCTV camera systems."
        items={productInsights}
        ctaLabel="GET PRICING"
      />

      <ProductFlexibleSetupSection
        title="Capture clear details with a flexible setup"
        description="Get the visibility you need, no matter the deployment choice. Available in cloud and on-premise options, the H6A Dome is ready to meet the challenge."
        cards={flexibleSetupCards}
      />

      <ProductRelatedProductsSection
        title="You may also be interested in these products"
        description="Our video security solutions deliver clear images and AI-powered analytics that help you quickly detect and respond to site activity in real time."
        products={relatedProducts}
      />
    </main>
  );
}
