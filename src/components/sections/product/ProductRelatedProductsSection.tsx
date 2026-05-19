import ProductCard from "@/components/sections/product-category/ProductCard";

type RelatedProduct = {
  title: string;
  description: string;
  image: string;
  badges?: string[];
  href?: string;
};

type ProductRelatedProductsSectionProps =
  {
    title: string;
    description: string;
    products: RelatedProduct[];
  };

export default function ProductRelatedProductsSection({
  title,
  description,
  products,
}: ProductRelatedProductsSectionProps) {
  return (
    <section className="bg-white py-6 text-black sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:mt-4 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={
                product.description
              }
              image={product.image}
              badges={product.badges}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
