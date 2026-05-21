import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import LogoSection from "@/components/common/LogoSection";
import SolutionHeroSection from "@/components/common/HeroSection";
import FAQSection from "@/components/common/FAQSection";
import ProductGridSection from "@/components/common/ProductGridSection";
import { constructMetadata } from "@/utils/seo";
import { getSolutionBySlug, getSolutions } from "@/lib/get-solutions";
import { getProducts } from "@/lib/get-products";
import { resolvePageLocale } from "@/i18n/get-locale";
import { localizedPath } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import "../../../../../components/common/TiptapEditor/styles.css";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    const solutions = await getSolutions({ limit: 100, status: "published", locale });
    for (const s of solutions as { slug: string }[]) {
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
  const solution = await getSolutionBySlug(slug, locale);

  if (!solution) {
    return constructMetadata({
      title: "Solution Not Found",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: solution.seoTitle || solution.title,
    description: solution.seoDescription || solution.description || "",
    canonicalUrl: localizedPath(`/solutions/${slug}`, locale),
    ogImage: solution.thumbnailUrl || undefined,
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

export default async function SolutionPage({ params }: SlugPageParams) {
  const { slug } = await params;
  const locale = await resolvePageLocale(params);
  const solution = await getSolutionBySlug(slug, locale);

  if (!solution) {
    notFound();
  }

  // Parse Table of Contents and inject IDs
  const { headings, html: parsedHtml } = parseTableOfContents(solution.content || "");

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
    { label: "Solutions", href: localizedPath("/solutions", locale) },
    { label: solution.title, href: localizedPath(`/solutions/${slug}`, locale) },
  ];

  return (
    <main className="min-h-screen text-black">
      <SolutionHeroSection
        title={solution.title}
        description={solution.description || ""}
        image={solution.thumbnailUrl || "/images/image1.avif"}
        primaryCta={solution.primaryActionHref ? "LEARN MORE" : "REQUEST A QUOTE"}
        secondaryCta={solution.secondaryActionHref ? "DOWNLOAD GUIDE" : undefined}
        primaryActionHref={solution.primaryActionHref || contactPath}
        secondaryActionHref={solution.secondaryActionHref || undefined}
        breadcrumbs={breadcrumbs}
      />

      <LogoSection />

      <section
        id="solution-content"
        className="mx-auto max-w-7xl px-4 py-6 sm:px-10 sm:py-16"
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
                Interested in this solution?
              </h3>
              <p className="text-xs text-black/60 mb-6 leading-relaxed">
                Get in touch with our experts to design a custom security plan tailored to your needs.
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
              <p className="text-gray-500 italic">No detailed content available for this solution.</p>
            )}
          </article>
        </div>
      </section>

      <ProductGridSection
        title="Products and security technology"
        description="Explore our wide range of video security and access control products designed to help you foster a secure environment."
        products={products}
      />

      {/* CTA Section */}
      <section className="bg-[#f6f6f6] py-6 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <h2 className="mb-4 text-xl font-bold sm:text-3xl">
            Ready to secure your {solution.title.toLowerCase()}?
          </h2>
          <p className="mb-8 text-base text-black/60 sm:text-lg">
            Get a free security audit and custom solution for your needs
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center items-center">
            <Link
              href={contactPath}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#0b76ff] px-8 font-semibold text-white transition-colors hover:bg-[#095bd6]"
            >
              Get Free Audit
            </Link>
            <Link
              href={contactPath}
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#0b76ff] px-8 font-semibold text-[#0b76ff] transition-colors hover:bg-[#0b76ff] hover:text-white"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
      <FAQSection />
    </main>
  );
}
