import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/utils/seo";
import { getGeneralSettings } from "@/lib/get-settings";
import { getSolutions } from "@/lib/get-solutions";
import { resolvePageLocale } from "@/i18n/get-locale";
import { localizedPath } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = await resolvePageLocale(params);
  const settings = await getGeneralSettings(locale);

  const title = settings?.seoSolutionsTitle || "Solutions";
  const description =
    settings?.seoSolutionsDescription ||
    "Explore our integrated portfolio of video security products and services powered by intelligence and built for scale.";

  const keywords = settings?.seoSolutionsKeywords
    ? settings.seoSolutionsKeywords.split(",").map((k: string) => k.trim())
    : ["solutions", "security", "integration", "avigilon"];

  const noIndex = settings?.seoSolutionsRobots
    ? settings.seoSolutionsRobots.toLowerCase().includes("noindex")
    : false;

  return constructMetadata({
    title,
    description,
    canonicalUrl: localizedPath("/solutions", locale),
    keywords,
    noIndex,
    faviconUrl: settings?.faviconUrl,
  });
}

export default async function SolutionsListPage({ params }: PageParams) {
  const locale = await resolvePageLocale(params);
  const solutions = await getSolutions({ limit: 100, status: "published", locale });

  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Solutions</h1>
          <p className="mt-3 text-base text-gray-600">
            Explore our solutions. Each card highlights the core capability and includes a direct link
            to learn more.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {solutions.map((s: { id: string; slug: string; title: string; description?: string; thumbnailUrl?: string }, idx: number) => {
            const imageUrl = s.thumbnailUrl || "/images/image1.avif";
            const href = localizedPath(`/solutions/${s.slug}`, locale);

            return (
              <article
                key={s.id}
                className="group overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <Image src={imageUrl} alt={s.title} fill className="object-cover" />

                  <div className="pointer-events-none absolute right-4 bottom-4 select-none">
                    <span className="text-5xl font-extrabold text-white/18 sm:text-6xl">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="px-8 py-8">
                  <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-3 text-base text-gray-600 line-clamp-3">{s.description || ""}</p>

                  <div className="mt-6">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 rounded-md bg-[#0b76ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6]"
                    >
                      Learn more
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
