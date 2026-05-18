import { ProductItem } from "@/types/product-types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  title,
  description,
  image,
  badges,
  href = "#",
}: ProductItem) {
  return (
    <Link
      href={href}
      className="flex flex-col items-stretch overflow-hidden rounded-md bg-white p-3 text-center shadow-[0_18px_40px_rgba(2,6,23,0.04)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full p-2 sm:p-4">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 20vw"
          className="object-contain"
        />
      </div>

      <h3 className="mt-4 text-[15px] font-semibold text-black sm:mt-6 sm:text-[16px]">
        {title}
      </h3>

      {badges && (
        <div className="mt-2 flex items-center justify-center gap-2 sm:mt-3">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[11px] text-black/60 sm:text-[12px]"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 flex-1 text-sm leading-6 text-black/65 sm:mt-4 sm:text-[14px]">
        {description}
      </p>

      <div className="mt-4 sm:mt-6">
        <div className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Learn More
        </div>
      </div>
    </Link>
  );
}
