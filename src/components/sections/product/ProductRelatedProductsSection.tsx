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
    <section className="bg-[#f6f6f6] py-20 text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-black/60 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
