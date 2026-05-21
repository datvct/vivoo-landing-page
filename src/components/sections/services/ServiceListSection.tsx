"use client";

import ServiceCard from "./ServiceCard";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/navigation";

type ServiceListSectionProps = {
  title?: string;
  description?: string;
  services?: any[];
  locale?: Locale;
};

export default function ServiceListSection({
  title = "Service Groups",
  description = "Explore our grouped services — each designed to solve specific security challenges and scale with your business.",
  services = [],
  locale,
}: ServiceListSectionProps) {
  const activeServices =
    services && services.length > 0
      ? services.map((s: { id: string; slug: string; title: string; description?: string; thumbnailUrl?: string }) => ({
        id: s.id,
        title: s.title,
        description: s.description || "",
        image: s.thumbnailUrl || "/images/image1.avif",
        slug: s.slug,
        detailHref: localizedPath(`/services/${s.slug}`, locale),
      }))
      : [];

  return (
    <section className="bg-gray-50 py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {activeServices.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href={localizedPath("/services", locale)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b76ff] px-10 py-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b76ff] focus-visible:ring-offset-2"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
