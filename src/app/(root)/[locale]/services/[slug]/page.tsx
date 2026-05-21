import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LogoSection from "@/components/common/LogoSection";
import Breadcrumb from "@/components/common/Breadcrumb";
import FAQSection from "@/components/common/FAQSection";
import ProductGridSection from "@/components/common/ProductGridSection";
import { constructMetadata } from "@/utils/seo";
import { getServiceBySlug, getServices } from "@/lib/get-services";
import { getProducts } from "@/lib/get-products";
import { resolvePageLocale } from "@/i18n/get-locale";
import { localizedPath } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/config";
import "../../../../../components/common/TiptapEditor/styles.css";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    const services = await getServices({ limit: 100, status: "published", locale });
    for (const s of services as { slug: string }[]) {
      params.push({ locale, slug: s.slug });
    }
  }
  return params;
}

type SlugPageParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({
  params,
}: SlugPageParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolvePageLocale(params);
  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    return constructMetadata({
      title: "Service Not Found",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description || "",
    canonicalUrl: localizedPath(`/services/${slug}`, locale),
    ogImage: service.thumbnailUrl || undefined,
  });
}

// Helper function to dynamically parse h2 tags on server-side
function parseTableOfContents(htmlContent: string) {
  const headings: { text: string; id: string }[] = [];
  if (!htmlContent) return { headings, html: htmlContent };

  const idCounts = new Map<string, number>();

  const cleanId = (text: string) => {
    const cleanText = text.replace(/<[^>]*>/g, "").trim();
    let baseId = cleanText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!baseId) baseId = "heading";

    if (idCounts.has(baseId)) {
      const count = idCounts.get(baseId)! + 1;
      idCounts.set(baseId, count);
      return `${baseId}-${count}`;
    } else {
      idCounts.set(baseId, 0);
      return baseId;
    }
  };

  const modifiedHtml = htmlContent.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, content) => {
    if (attrs.includes('id=')) {
      const idMatch = attrs.match(/id="([^"]*)"/);
      if (idMatch) {
        const id = idMatch[1];
        headings.push({ text: content.replace(/<[^>]*>/g, "").trim(), id });
        return match;
      }
    }
    const id = cleanId(content);
    headings.push({ text: content.replace(/<[^>]*>/g, "").trim(), id });
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });

  return { headings, html: modifiedHtml };
}

export default async function ServiceDetailPage({ params }: SlugPageParams) {
  const { slug } = await params;
  const locale = await resolvePageLocale(params);
  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  // Parse Table of Contents and inject IDs
  const { headings, html: parsedHtml } = parseTableOfContents(service.content || "");

  // Fetch related products dynamically
  const rawProducts = await getProducts({ limit: 6, status: "published", locale });
  const products = rawProducts.map((p: { slug: string; title: string; description?: string; thumbnailUrl?: string; badges?: string[] }) => ({
    title: p.title,
    description: p.description || "",
    image: p.thumbnailUrl || "/images/image1.avif",
    badges: p.badges || [],
    href: localizedPath(`/product/${p.slug}`, locale),
  }));

  const contactPath = localizedPath("/contact", locale);
  const breadcrumbs = [
    { label: "Home", href: localizedPath("/", locale) },
    { label: "Services", href: localizedPath("/services", locale) },
  ];

  const heroImage = service.thumbnailUrl || "/images/product.avif";

  return (
    <main className="min-h-screen text-black">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
          <Breadcrumb
            items={breadcrumbs}
            currentLabel={service.title}
          />
        </div>

        <div className="mx-auto mt-6 max-w-7xl px-4 pb-8 sm:px-6 lg:px-10 lg:pb-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-xl">
              <div className="text-sm font-medium tracking-[0.2em] text-black/45 uppercase">
                Service
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-black sm:text-5xl lg:text-[48px]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-7 text-black/65 sm:text-base">
                {service.description || "Solutions and services to keep your organisation secure and operational."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#table-of-contents"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                  VIEW DETAILS
                </a>
                <Link
                  href={contactPath}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/45 bg-white px-6 text-sm font-semibold text-black transition hover:border-black hover:bg-black/5"
                >
                  REQUEST A QUOTE
                </Link>
              </div>
            </div>

            <div className="relative min-h-70 overflow-hidden bg-[#ece7e0] lg:min-h-90">
              <div className="absolute top-0 left-[-6%] hidden h-full w-[62%] skew-x-[-24deg] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04)] lg:block" />
              <div className="absolute inset-0">
                <Image
                  src={heroImage}
                  alt={service.title}
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
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sidebar - Dynamic Table of Contents and Quick Actions */}
          <aside className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {headings.length > 0 && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className="text-sm font-semibold text-black mb-4">
                  Table of Contents
                </div>
                <ol className="space-y-3 text-[13px] leading-5 text-black/70 font-medium">
                  {headings.map((heading, index) => (
                    <li key={heading.id} className="hover:text-black transition">
                      <a href={`#${heading.id}`} className="flex items-start gap-1">
                        <span>{index + 1}.</span>
                        <span>{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h3 className="text-base font-bold text-black mb-2">
                Interested in this service?
              </h3>
              <p className="text-xs text-black/60 mb-6 leading-relaxed">
                Get in touch with our experts to design a custom service plan tailored to your needs.
              </p>
              <Link
                href={contactPath}
                className="inline-flex w-full h-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white transition hover:bg-black/85"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <article className="tiptap-editor-content text-[15px] leading-7 text-black/65">
            {parsedHtml ? (
              <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
            ) : (
              <p className="text-gray-500 italic">No detailed content available for this service.</p>
            )}
          </article>
        </div>
      </section>

      <ProductGridSection
        title="Products and security technology"
        description="Explore our wide range of video security and access control products designed to help you foster a secure environment."
        products={products}
      />
      <FAQSection />
    </main>
  );
}
