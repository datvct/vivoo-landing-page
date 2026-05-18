import { ProductGridSectionProps } from "@/types/product-types";
import ProductCard from "../sections/product-category/ProductCard";

export default function ProductGridSection({
  title,
  description,
  products,
}: ProductGridSectionProps) {
  return (
    <section
      aria-labelledby="products-heading"
      className="bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="products-heading"
            className="text-3xl font-semibold tracking-tight text-gray-900"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, index) => (
            <ProductCard
              key={index}
              title={p.title}
              description={
                p.description
              }
              linkLabel={"Learn more"}
              image={p.image}
              badges={p.badges}
              href={p.href}
            />
          ))}
        </div>

        {/* {showViewAll && (
          <div className="mt-10 text-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-sm font-medium text-[#0b76ff] transition hover:text-[#095bd6]"
            >
              {viewAllLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}
