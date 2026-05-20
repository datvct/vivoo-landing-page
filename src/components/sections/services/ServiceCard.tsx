import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  service,
}: {
  service: any;
}) {
  const imageUrl = service.image || service.thumbnailUrl || "/images/image1.avif";
  const slug = service.slug || "";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <h3 className="text-base font-semibold text-gray-900 sm:text-[20px]">
          {service.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
          {service.description || ""}
        </p>

        <div className="mt-6">
          <Link
            href={slug.startsWith("/") ? slug : `/services/${slug}`}
            className="inline-flex items-center gap-2 rounded-md bg-[#0b76ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6]"
          >
            Learn more
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
