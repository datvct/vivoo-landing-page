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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[22px] font-medium tracking-[-0.02em] text-black sm:text-[28px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-sm text-black/60">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref}
            className="inline-flex h-10 items-center justify-center rounded-full border border-black bg-white px-6 text-sm font-semibold text-black transition hover:bg-black/5"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
