import Link from "next/link";
import SolutionCard from "./SolutionCard";
import { Tab } from "@/types/solution-types";
import { getSolutions } from "@/lib/get-solutions";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/navigation";

type SolutionsSectionProps = {
  title?: string;
  description?: string;
  locale?: Locale;
};

export default async function SolutionsSection({
  title = "Solutions",
  description = "The Avigilon security suite offers an integrated portfolio of video security products and services powered by intelligence and built for scale.",
  locale,
}: SolutionsSectionProps) {
  const dbSolutions = await getSolutions({
    page: 1,
    limit: 6,
    status: "published",
    locale,
  });

  const activeTabs: Tab[] = dbSolutions.length > 0
    ? dbSolutions.map((s: any) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      text: s.description || "",
      image: s.thumbnailUrl || "/images/image1.avif"
    }))
    : [];

  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {activeTabs.map((t) => (
            <SolutionCard
              key={t.id}
              tab={t}
              detailHref={localizedPath(`/solutions/${t.slug}`, locale)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={localizedPath("/solutions", locale)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b76ff] px-10 py-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b76ff] focus-visible:ring-offset-2"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
