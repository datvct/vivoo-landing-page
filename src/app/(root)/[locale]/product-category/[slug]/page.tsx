import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SolutionHeroSection from "@/components/common/HeroSection";
import ProductCatalogSection from "@/components/sections/product-category/ProductCatalogSection";
import LogoSection from "@/components/common/LogoSection";
import FAQSection from "@/components/common/FAQSection";
import ProductBenefitsSection from "@/components/sections/product-category/ProductBenefitsSection";
import ResourcesSection from "@/components/sections/product-category/ResourcesSection";
import { constructMetadata } from "@/utils/seo";
import { getCategoryBySlug } from "@/lib/get-product-categories";
import { getProducts } from "@/lib/get-products";
import { getGeneralSettings } from "@/lib/get-settings";
import { resolvePageLocale } from "@/i18n/get-locale";
import { getMessage } from "@/i18n/messages";
import { localizedPath } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";
import type { Product } from "@/types/types";

const DEFAULT_HERO_IMAGE = "/images/camera-2.avif";

function splitFeatureBody(body: string | null | undefined): string[] {
  if (!body?.trim()) return [];
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function mapProductsToCatalog(products: Product[], locale: Locale) {
  return products.map((p) => ({
    title: p.title,
    description: p.description || "",
    image: p.thumbnailUrl || "/images/product.avif",
    badges: p.badges || [],
    href: localizedPath(`/product/${p.slug}`, locale),
  }));
}

type CategoryPageParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolvePageLocale(params);
  const category = await getCategoryBySlug(slug, locale);
  const settings = await getGeneralSettings(locale);

  if (!category || category.status !== "published") {
    return constructMetadata({
      title: "Category Not Found",
      noIndex: true,
      faviconUrl: settings?.faviconUrl,
    });
  }

  const title = category.seoTitle || category.title;
  const description =
    category.seoDescription ||
    category.description ||
    category.subtitle ||
    settings?.siteDescription ||
    "";

  const keywords = category.seoKeywords
    ? category.seoKeywords.split(",").map((k) => k.trim())
    : undefined;

  const noIndex = category.seoRobots
    ? category.seoRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: localizedPath(`/product-category/${slug}`, locale),
    ogImage: category.thumbnailUrl || DEFAULT_HERO_IMAGE,
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

export default async function ProductCategoryPage({
  params,
}: CategoryPageParams) {
  const { slug } = await params;
  const locale = await resolvePageLocale(params);
  const category = await getCategoryBySlug(slug, locale);

  if (!category || category.status !== "published") {
    notFound();
  }

  const [dbProducts, generalSettings] = await Promise.all([
    getProducts({
      categoryId: category.id,
      limit: 50,
      page: 1,
      status: "published",
      sortBy: "sortOrder",
      sortOrder: "ASC",
      locale,
    }),
    getGeneralSettings(locale),
  ]);

  const products = mapProductsToCatalog(dbProducts, locale);
  const featureParagraphs = splitFeatureBody(category.featureBody);

  const breadcrumbs = [
    { label: getMessage(locale, "breadcrumb.home"), href: localizedPath("/", locale) },
    { label: category.title },
  ];

  const catalogTitle =
    category.subtitle?.trim() ||
    `Explore ${category.title} models`;

  const catalogSubtitle = category.description?.trim() || undefined;

  const heroCtaLabel =
    category.heroCtaLabel?.trim() || getMessage(locale, "hero.getPricing");
  const heroCtaHref = category.heroCtaHref?.trim() || "#";

  const catalogCtaLabel =
    category.heroCtaLabel?.trim() || getMessage(locale, "catalog.compareProducts");
  const catalogCtaHref = category.heroCtaHref?.trim() || "#";

  const faqItems =
    generalSettings?.faqs?.map((faq: { question: string; answer: string }) => ({
      question: faq.question,
      answer: faq.answer,
    })) ?? undefined;

  return (
    <div className="bg-[#f6f6f6] text-black">
      <SolutionHeroSection
        title={category.heroTitle?.trim() || category.title}
        description={
          category.heroDescription?.trim() ||
          category.description ||
          category.subtitle ||
          ""
        }
        image={category.thumbnailUrl || DEFAULT_HERO_IMAGE}
        primaryCta={heroCtaLabel}
        primaryActionHref={heroCtaHref}
        breadcrumbs={breadcrumbs}
      />

      <LogoSection />

      <ProductCatalogSection
        title={catalogTitle}
        subtitle={catalogSubtitle}
        products={products}
        ctaLabel={catalogCtaLabel}
        ctaHref={catalogCtaHref}
      />

      <ProductBenefitsSection
        title={category.benefitsTitle || undefined}
        intro={category.benefitsDescription || undefined}
        imageSrc={category.featureImageUrl || undefined}
        heading={category.featureTitle || undefined}
        paragraphs={featureParagraphs.length > 0 ? featureParagraphs : undefined}
        ctaLabel={category.featureLinkLabel || undefined}
        ctaHref={category.featureLinkHref || undefined}
      />

      <ResourcesSection items={generalSettings?.resources} />

      <FAQSection items={faqItems} />
    </div>
  );
}
