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
import { getGeneralSettings, getHomeSettings } from "@/lib/get-settings";
import type { Product } from "@/types/types";

const DEFAULT_HERO_IMAGE = "/images/camera-2.avif";
const DEFAULT_PRIMARY_CTA = "GET PRICING";

function splitFeatureBody(body: string | null | undefined): string[] {
  if (!body?.trim()) return [];
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function mapProductsToCatalog(products: Product[]) {
  return products.map((p) => ({
    title: p.title,
    description: p.description || "",
    image: p.thumbnailUrl || "/images/product.avif",
    badges: p.badges || [],
    href: `/product/${p.slug}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const settings = await getGeneralSettings();

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
    canonicalUrl: `/product-category/${slug}`,
    ogImage: category.thumbnailUrl || DEFAULT_HERO_IMAGE,
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

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
    }),
    getGeneralSettings(),
  ]);
  const products = mapProductsToCatalog(dbProducts);

  const featureParagraphs = splitFeatureBody(category.featureBody);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category.title },
  ];

  const catalogTitle =
    category.subtitle ||
    `Explore ${category.title} models`;

  const catalogSubtitle = category.description || undefined;



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
        primaryCta={category.heroCtaLabel?.trim() || DEFAULT_PRIMARY_CTA}
        breadcrumbs={breadcrumbs}
      />

      <LogoSection />

      <ProductCatalogSection
        title={catalogTitle}
        subtitle={catalogSubtitle}
        products={products}
        ctaLabel={category.heroCtaLabel?.trim()}
        ctaHref={category.heroCtaHref?.trim()}
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

      <FAQSection />
    </div>
  );
}
