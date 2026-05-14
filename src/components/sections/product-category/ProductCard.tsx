import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  title: string;
  description: string;
  image: string;
  badges?: string[];
  href?: string;
};

export default function ProductCard({
  title,
  description,
  image,
  badges,
  href = "#",
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-stretch overflow-hidden rounded-md bg-white p-6 text-center shadow-[0_18px_40px_rgba(2,6,23,0.04)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full p-4">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 20vw"
          className="object-contain"
        />
      </div>

      <h3 className="mt-6 text-[16px] font-semibold text-black">
        {title}
      </h3>

      {badges && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[12px] text-black/60"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <p className="mt-4 flex-1 text-[14px] leading-6 text-black/65">
        {description}
      </p>

      <div className="mt-6">
        <div className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Learn More
        </div>
      </div>
    </Link>
  );
}
