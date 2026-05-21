import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailHeroSection from "@/components/sections/product/ProductDetailHeroSection";
import ProductInsightsSection from "@/components/sections/product/ProductInsightsSection";
import ProductRelatedProductsSection from "@/components/sections/product/ProductRelatedProductsSection";
import { constructMetadata } from "@/utils/seo";
import { getProductBySlug, getProducts } from "@/lib/get-products";
import { resolvePageLocale } from "@/i18n/get-locale";
import { localizedPath } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import "../../../../../components/common/TiptapEditor/styles.css";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    const products = await getProducts({ limit: 100, status: "published", locale });
    for (const p of products as { slug: string }[]) {
      params.push({ locale, slug: p.slug });
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
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found",
      noIndex: true,
    });
  }

  const ogImage = product.thumbnailUrl || "/images/og-default.jpg";

  return constructMetadata({
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.description,
    canonicalUrl: localizedPath(`/product/${slug}`, locale),
    ogImage,
  });
}

export default async function ProductDetailPage({ params }: SlugPageParams) {
  const { slug } = await params;
  const locale = await resolvePageLocale(params);
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  // Parse benefits
  let displayBenefits = [];
  if (product.benefits) {
    try {
      displayBenefits = typeof product.benefits === "string"
        ? JSON.parse(product.benefits)
        : product.benefits;
    } catch (e) {
      // ignore
    }
  }

  // Map to format required by ProductInsightsSection
  const mappedInsights = displayBenefits.map((b: any) => ({
    title: b.title || "",
    description: b.description || "",
    image: b.image || "/images/product.avif",
    imageAlt: b.imageAlt || b.title || "benefit image",
    iconKey: (b.iconKey || "shield") as "shield" | "mic" | "camera" | "sun",
  }));

  // Build breadcrumbs
  const contactPath = localizedPath("/contact", locale);
  const breadcrumbs = [
    { label: "Home", href: localizedPath("/", locale) },
    {
      label: product.category?.title || "Products",
      href: product.category?.slug
        ? localizedPath(`/product-category/${product.category.slug}`, locale)
        : localizedPath("/", locale),
    },
    {
      label: product.title,
      href: localizedPath(`/product/${product.slug}`, locale),
    },
  ];

  // Build thumbnails
  const thumbnails = [
    {
      src: product.thumbnailUrl || "/images/product.avif",
      alt: product.title,
    },
    ...(product.productGalleryItems || [])
      .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((item: any, idx: number) => ({
        src: item.url,
        alt: item.title || `${product.title} gallery image ${idx + 1}`,
      })),
  ];

  // Related products logic
  let displayRelated = (product.relatedProducts || []).map((p: { slug: string; title: string; description?: string; thumbnailUrl?: string; badges?: string[] }) => ({
    title: p.title,
    description: p.description,
    image: p.thumbnailUrl || "/images/product.avif",
    badges: p.badges || [],
    href: localizedPath(`/product/${p.slug}`, locale),
  }));

  if (displayRelated.length === 0 && product.categoryId) {
    const categoryProducts = await getProducts({
      categoryId: product.categoryId,
      limit: 4,
      status: "published",
      locale,
    });
    displayRelated = categoryProducts
      .filter((p: { id: string }) => p.id !== product.id)
      .slice(0, 3)
      .map((p: { slug: string; title: string; description?: string; thumbnailUrl?: string; badges?: string[] }) => ({
        title: p.title,
        description: p.description,
        image: p.thumbnailUrl || "/images/product.avif",
        badges: p.badges || [],
        href: localizedPath(`/product/${p.slug}`, locale),
      }));
  }

  return (
    <main className="bg-white text-black">
      <ProductDetailHeroSection
        breadcrumbs={breadcrumbs}
        title={product.title}
        categoryLabel={product.categoryLabel || product.category?.title || "Product"}
        deviceInfo={product.contents}
        badges={product.badges || []}
        description={product.description || ""}
        features={product.features || []}
        videoUrl={product.video || ""}
        primaryActionLabel={product.primaryActionLabel || "GET PRICING"}
        primaryActionHref={product.primaryActionHref || contactPath}
        thumbnails={thumbnails}
      />

      {mappedInsights.length > 0 && (
        <ProductInsightsSection
          title={`Key benefits of ${product.title}`}
          description={product.description || ""}
          items={mappedInsights}
          ctaLabel={product.primaryActionLabel || "GET PRICING"}
          ctaHref={product.primaryActionHref || contactPath}
        />
      )}

      {displayRelated.length > 0 && (
        <ProductRelatedProductsSection
          title="You may also be interested in these products"
          description="Our video security solutions deliver clear images and AI-powered analytics that help you quickly detect and respond to site activity in real time."
          products={displayRelated}
        />
      )}
    </main>
  );
}

