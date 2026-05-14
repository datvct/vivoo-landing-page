import Image from "next/image";
import Link from "next/link";

type ProductItem = {
  title: string;
  description: string;
  image: string;
  linkLabel: string;
};

type SolutionProductSectionProps = {
  title: string;
  description: string;
  products: ProductItem[];
};

export default function SolutionProductSection({
  title,
  description,
  products,
}: SolutionProductSectionProps) {
  return (
    <section className="bg-[#f6f6f6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[30px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/60 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

              <div className="px-6 py-6 text-center">
                <h3 className="text-[18px] leading-7 font-semibold text-black">
                  {product.title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-black/65">
                  {product.description}
                </p>

                <Link
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-blue-600 transition hover:text-blue-700"
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

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-blue-600 transition hover:text-blue-700"
          >
            View all products
            <span aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
