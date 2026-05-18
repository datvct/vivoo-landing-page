import { Tab } from "@/types/solution-types";
import Image from "next/image";
import Link from "next/link";

export default function SolutionCard({
  tab,
}: {
  tab: Tab;
}) {
  return (
    <article
      key={tab.id}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <Image
          src={tab.image}
          alt={tab.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {tab.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
          {tab.text}
        </p>

        <div className="mt-6">
          <Link
            href={
              `/solutions/${tab.slug}` ||
              `/solutions/${tab.id}`
            }
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
