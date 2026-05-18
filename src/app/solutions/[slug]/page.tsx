import { notFound } from "next/navigation";
import LogoSection from "@/components/common/LogoSection";
import SolutionHeroSection from "@/components/common/HeroSection";
import FAQSection from "@/components/common/FAQSection";
import ProductGridSection from "@/components/common/ProductGridSection";

type IndustryContent = {
  slug: string;
  title: string;
  description: string;
  image: string;
  heroBadges: string[];
  logoNames: string[];
};

const SolutionPages: Record<
  string,
  IndustryContent
> = {
  construction: {
    slug: "construction",
    title:
      "Construction security solutions",
    description:
      "Safeguard your jobsite, improve worker safety and protect your equipment with construction site security solutions, including cameras, access control and alarms.",
    image: "/images/image1.avif",
    heroBadges: [
      "GET PRICING",
      "FREE SECURITY AUDIT GUIDE",
    ],
    logoNames: [
      "The University of Tennessee",
      "Alabama Power",
      "Zendesk",
      "University of Virginia",
      "Allegion",
      "Domino's",
      "Police",
      "American School of the Deaf",
    ],
  },
};

const solutionSections = {
  overview: {
    title: "Overview",
    content: [
      "Construction sites face unique security challenges with expensive equipment, remote locations, and rotating workforce. A comprehensive security solution combines video surveillance, access control, and real-time monitoring to protect assets and personnel.",
      "Modern construction security goes beyond simple camera placement. It requires intelligent systems that can detect intrusions, monitor restricted areas, and provide actionable insights to your security team.",
    ],
  },
  benefits: {
    title: "Benefits",
    content: [
      "Equipment Protection: Monitor expensive machinery and materials to prevent theft and vandalism",
      "Worker Safety: Enhance site safety with real-time surveillance and emergency response coordination",
      "Insurance Compliance: Meet insurance requirements with documented security measures and incident records",
      "Remote Management: Access your site from anywhere with cloud-based monitoring and alerts",
      "Incident Prevention: Deter criminal activity with visible cameras and comprehensive coverage",
    ],
  },
  features: {
    title: "Key Features",
    content: [
      "AI-Powered Video Analytics: Detect unauthorized access and unusual activities in real-time",
      "Mobile Access: Monitor your site anytime, anywhere with secure mobile applications",
      "Cloud Storage: Secure backup of footage with redundant storage and easy playback",
      "Integration Capabilities: Connect with access control and alarm systems for unified management",
      "Scalability: Expand coverage as your project grows and needs change",
    ],
  },
  implementation: {
    title: "Implementation",
    content: [
      "Planning: Site survey and assessment to determine optimal camera placement and coverage",
      "Installation: Professional installation ensuring proper angles, coverage, and cable management",
      "Configuration: System setup with motion detection, alerts, and user access controls",
      "Training: Team training on system operation and emergency response procedures",
      "Support: Ongoing monitoring and technical support to ensure system reliability",
    ],
  },
};

const productSection = {
  title:
    "Products and casino security technology",
  description:
    "Explore our wide range of video security and access control products designed to help you foster a secure gaming environment.",
  products: [
    {
      title: "Avigilon Unity Video",
      description:
        "An intuitive, AI-enabled video management platform to bring you the most critical information, ensuring you never miss a moment.",
      image: "/images/image1.avif",
      linkLabel: "View product",
    },
    {
      title: "Avigilon Unity Access",
      description:
        "Secure back offices and sensitive areas with our browser-based solution, offering the flexibility to respond from anywhere.",
      image: "/images/camera-1.avif",
      linkLabel: "View product",
    },
    {
      title: "H5A Modular Camera",
      description:
        "Built-in analytics for enhanced object detection and classification. Ready for discrete installation at every game table.",
      image: "/images/camera-2.avif",
      linkLabel: "View product",
    },
    {
      title: "H5A Multisensor Camera",
      description:
        "Be covered from all angles with the H5A Multisensor camera that can deliver 180, 270 or 360-degree views.",
      image: "/images/image1.avif",
      linkLabel: "Learn More",
    },
    {
      title: "NVR6",
      description:
        "High-performance recording and dense storage options with Avigilon Network Video Recorders (NVR).",
      image: "/images/camera-1.avif",
      linkLabel: "View product",
    },
    {
      title: "VB400 Body-Worn Camera",
      description:
        "Capture an entire shift of live video and audio. Connect seamlessly to Unity Video.",
      image: "/images/camera-2.avif",
      linkLabel: "View product",
    },
  ],
};

export function generateStaticParams() {
  return [
    { slug: "construction" },
    { slug: "education" },
    { slug: "automotive-dealerships" },
  ];
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content =
    SolutionPages[slug] ??
    SolutionPages.construction;

  if (!content) {
    notFound();
  }

  const sections = Object.entries(
    solutionSections
  ).map(([key, section]) => ({
    id: key,
    ...section,
  }));

  return (
    <main className="min-h-screen text-black">
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
      />

      <LogoSection />

      {/* TOC and Content Section */}
      <section
        id="solution-content"
        className="mx-auto max-w-7xl px-4 py-6 sm:px-10 sm:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="text-sm font-semibold text-black">
              Table of Contents
            </div>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-black/70">
              {sections.map(
                (section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="transition hover:text-black"
                    >
                      {index + 1}.{" "}
                      {section.title}
                    </a>
                  </li>
                )
              )}
            </ol>
            <button className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/85">
              REQUEST A QUOTE
            </button>
          </aside>

          {/* Main Content */}
          <article className="space-y-12 text-[15px] leading-7 text-black/65">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-8"
              >
                <h2 className="text-[30px] font-medium tracking-[-0.03em] text-black sm:text-[34px]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.content.map(
                    (text, idx) => (
                      <p key={idx}>
                        {text}
                      </p>
                    )
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
      <ProductGridSection
        title={productSection.title}
        description={
          productSection.description
        }
        products={
          productSection.products
        }
      />

      {/* CTA Section */}
      <section className="bg-[#f6f6f6] py-6 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <h2 className="mb-4 text-xl font-bold sm:text-3xl">
            Ready to secure your
            construction site?
          </h2>
          <p className="mb-8 text-base text-black/60 sm:text-lg">
            Get a free security audit
            and custom solution for your
            needs
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-[#0b76ff] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#095bd6]">
              Get Free Audit
            </button>
            <button className="rounded-full border-2 border-[#0b76ff] px-8 py-3 font-semibold text-[#0b76ff] transition-colors hover:bg-[#0b76ff] hover:text-white">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      <FAQSection />
    </main>
  );
}
