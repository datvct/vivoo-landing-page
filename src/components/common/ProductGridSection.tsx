import Image from "next/image";
import Link from "next/link";

type ProductItem = {
  title: string;
  description: string;
  image: string;
  linkLabel: string;
  href?: string;
};

type ProductGridSectionProps = {
  title: string;
  description: string;
  products: ProductItem[];
  showViewAll?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export default function ProductGridSection({
  title,
  description,
  products,
  showViewAll = true,
  viewAllHref = "#",
  viewAllLabel = "View all products",
}: ProductGridSectionProps) {
  return (
    <section className="bg-[#f6f6f6] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[24px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:mt-5 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.title}
              className="overflow-hidden bg-white shadow-[0_10px_28px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="px-4 py-5 text-center sm:px-6 sm:py-6">
                <h3 className="text-[16px] leading-6 font-semibold text-black sm:text-[18px] sm:leading-7">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-black/65 sm:mt-4 sm:text-[15px] sm:leading-7">
                  {product.description}
                </p>

                <Link
                  href={
                    product.href || "#"
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 sm:mt-5 sm:text-[15px]"
                >
                  {product.linkLabel}
                  <span aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-8 text-center sm:mt-10">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 sm:text-[15px]"
            >
              {viewAllLabel}
              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
