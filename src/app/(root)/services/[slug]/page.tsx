import LogoSection from "@/components/common/LogoSection";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";
import { serviceDetails } from "@/lib/service-details";
import FAQSection from "@/components/common/FAQSection";
import ProductGridSection from "@/components/common/ProductGridSection";

type Props = {
  params: { slug: string };
};

function slugToTitle(slug: string) {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() +
        w.slice(1)
    )
    .join(" ");
}

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

export default function ServiceDetailPage({
  params,
}: Props) {
  const slug = params.slug;
  const title = slugToTitle(slug);

  const sourced = serviceDetails[slug];
  const detail = {
    category:
      sourced?.category ?? "Service",
    title:
      sourced?.title ??
      "Services Detail",
    subtitle:
      sourced?.subtitle ??
      "Solutions and services to keep your organisation secure and operational.",
    heroImage:
      sourced?.heroImage ??
      "/images/product.avif",
    guideLabel:
      sourced?.guideLabel ??
      "REQUEST A QUOTE",
    guideHref:
      sourced?.guideHref ?? "#quote",
    toc: sourced?.toc ?? [
      "Overview",
      "Features",
      "Benefits",
      "Implementation",
      "FAQ",
    ],
    intro: sourced?.intro ?? [
      `This page describes our ${title} service. Use this page as a starting point — replace with real content from your CMS or API.`,
    ],
    sections: sourced?.sections ?? [
      {
        id: "overview",
        title: "Overview",
        content: [
          "High-level summary of the service, its objectives and the problems it solves.",
        ],
      },
      {
        id: "features",
        title: "Features",
        content: [
          "Key features and technical highlights that customers will value.",
        ],
      },
      {
        id: "benefits",
        title: "Benefits",
        content: [
          "Business benefits, ROI considerations and case uses.",
        ],
      },
      {
        id: "implementation",
        title: "Implementation",
        content: [
          "How we deliver the service: timelines, phases and responsibilities.",
        ],
      },
      {
        id: "faq",
        title: "FAQ",
        content: [
          "Frequently asked questions about the service.",
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen text-black">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Services",
                href: "/services",
              },
            ]}
            currentLabel={detail.title}
          />
        </div>

        <div className="mx-auto mt-6 max-w-7xl px-4 pb-8 sm:px-6 lg:px-10 lg:pb-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-xl">
              <div className="text-sm font-medium tracking-[0.2em] text-black/45 uppercase">
                {detail.category}
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-black sm:text-5xl lg:text-[48px]">
                {detail.title}
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-7 text-black/65 sm:text-base">
                {detail.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#table-of-contents"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  VIEW DETAILS
                </a>
                <a
                  href={
                    detail.guideHref
                  }
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/45 bg-white px-6 text-sm font-semibold text-black transition hover:border-black hover:bg-black/5"
                >
                  {detail.guideLabel}
                </a>
              </div>
            </div>

            <div className="relative min-h-70 overflow-hidden bg-[#ece7e0] lg:min-h-90">
              <div className="absolute top-0 left-[-6%] hidden h-full w-[62%] skew-x-[-24deg] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04)] lg:block" />
              <div className="absolute inset-0">
                <Image
                  src={detail.heroImage}
                  alt={detail.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoSection />

      <section
        id="table-of-contents"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14"
      >
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="text-sm font-semibold text-black">
              Table of Contents
            </div>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-black/70">
              {detail.toc.map(
                (item, index) => {
                  const section =
                    detail.sections[
                      index
                    ];
                  return (
                    <li key={item}>
                      <a
                        href={`#${section.id}`}
                        className="transition hover:text-black"
                      >
                        {index + 1}.{" "}
                        {item}
                      </a>
                    </li>
                  );
                }
              )}
            </ol>

            <a
              id="quote"
              href="#"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/85"
            >
              REQUEST A QUOTE
            </a>
          </aside>

          <article className="space-y-12 text-[15px] leading-7 text-black/65">
            {detail.intro.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              )
            )}

            {detail.sections.map(
              (section) => (
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
                      (paragraph) => (
                        <p
                          key={
                            paragraph
                          }
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </section>
              )
            )}
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
      <FAQSection />
    </main>
  );
}
