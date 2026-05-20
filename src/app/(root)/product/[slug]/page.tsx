import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailHeroSection from "@/components/sections/product/ProductDetailHeroSection";
import ProductInsightsSection from "@/components/sections/product/ProductInsightsSection";
import ProductRelatedProductsSection from "@/components/sections/product/ProductRelatedProductsSection";
import { constructMetadata } from "@/utils/seo";
import { getProductBySlug, getProducts } from "@/lib/get-products";
import "../../../../components/common/TiptapEditor/styles.css";

export async function generateStaticParams() {
  const products = await getProducts({ limit: 100 });
  return products.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
    canonicalUrl: `/product/${slug}`,
    ogImage,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
  const breadcrumbs = [
    { label: "Home", href: "/" },
    {
      label: product.category?.title || "Products",
      href: product.category?.slug ? `/product-category/${product.category.slug}` : "/products",
    },
    {
      label: product.title,
      href: `/product/${product.slug}`,
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
  let displayRelated = (product.relatedProducts || []).map((p: any) => ({
    title: p.title,
    description: p.description,
    image: p.thumbnailUrl || "/images/product.avif",
    badges: p.badges || [],
    href: `/product/${p.slug}`,
  }));

  if (displayRelated.length === 0 && product.categoryId) {
    const categoryProducts = await getProducts({ categoryId: product.categoryId, limit: 4 });
    displayRelated = categoryProducts
      .filter((p: any) => p.id !== product.id)
      .slice(0, 3)
      .map((p: any) => ({
        title: p.title,
        description: p.description,
        image: p.thumbnailUrl || "/images/product.avif",
        badges: p.badges || [],
        href: `/product/${p.slug}`,
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
        primaryActionHref={product.primaryActionHref || "/contact"}
        thumbnails={thumbnails}
      />

      {mappedInsights.length > 0 && (
        <ProductInsightsSection
          title={`Key benefits of ${product.title}`}
          description={product.description || ""}
          items={mappedInsights}
          ctaLabel={product.primaryActionLabel || "GET PRICING"}
          ctaHref={product.primaryActionHref || "/contact"}
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

