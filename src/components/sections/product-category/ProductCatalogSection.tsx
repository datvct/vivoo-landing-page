import ProductCard from "@/components/sections/product-category/ProductCard";
import Link from "next/link";

type CatalogProduct = {
  title: string;
  description: string;
  image: string;
  badges?: string[];
  href?: string;
};

type ProductCatalogSectionProps = {
  title: string;
  subtitle?: string;
  products: CatalogProduct[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ProductCatalogSection({
  title,
  subtitle,
  products,
  ctaLabel = "COMPARE CAMERAS",
  ctaHref = "#",
}: ProductCatalogSectionProps) {
  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-xs text-black/60 sm:mt-4 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.title}
              title={p.title}
              description={
                p.description
              }
              image={p.image}
              badges={p.badges}
              href={p.href}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href={ctaHref}
            className="inline-flex h-9 items-center justify-center rounded-full border border-black bg-white px-4 text-xs font-semibold text-black transition hover:bg-black/5 sm:h-10 sm:px-6 sm:text-sm"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
