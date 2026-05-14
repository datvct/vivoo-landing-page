"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";
import {
  Camera,
  Mic,
  ShieldCheck,
  SunMedium,
  type LucideIcon,
} from "lucide-react";

type InsightItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  iconKey:
    | "shield"
    | "mic"
    | "camera"
    | "sun";
};

type ProductInsightsSectionProps = {
  title: string;
  description: string;
  items: InsightItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ProductInsightsSection({
  title,
  description,
  items,
  ctaLabel = "GET PRICING",
  ctaHref = "#",
}: ProductInsightsSectionProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);
  const [
    isImageVisible,
    setIsImageVisible,
  ] = useState(true);

  const activeItem = useMemo(
    () =>
      items[activeIndex] ?? items[0],
    [activeIndex, items]
  );

  const getIcon = (
    iconKey: InsightItem["iconKey"]
  ): LucideIcon => {
    switch (iconKey) {
      case "mic":
        return Mic;
      case "camera":
        return Camera;
      case "sun":
        return SunMedium;
      case "shield":
      default:
        return ShieldCheck;
    }
  };

  const handleSelectItem = (
    index: number
  ) => {
    setIsImageVisible(false);
    setActiveIndex(index);
  };

  return (
    <section className="bg-[#f6f6f6] py-20 text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/60 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <div className="space-y-8">
            {items.map(
              (item, index) => {
                const Icon = getIcon(
                  item.iconKey
                );
                const isActive =
                  index === activeIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() =>
                      handleSelectItem(
                        index
                      )
                    }
                    className={`flex w-full items-start gap-4 rounded-sm px-5 py-5 text-left transition ${isActive ? "bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-black/5" : "hover:bg-white/70"}`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center ${isActive ? "text-blue-600" : "text-black/80"}`}
                    >
                      <Icon className="h-7 w-7" />
                    </span>

                    <span className="min-w-0">
                      <span
                        className={`block text-[16px] leading-6 font-semibold ${isActive ? "text-blue-600" : "text-black"}`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-3 block max-w-xl text-[15px] leading-7 text-black/60">
                        {
                          item.description
                        }
                      </span>
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-130 overflow-hidden rounded-sm bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
              <div className="relative aspect-square w-full">
                <Image
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={
                    activeItem.imageAlt
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  onLoadingComplete={() =>
                    setIsImageVisible(
                      true
                    )
                  }
                  className={`object-contain p-6 transition-all duration-500 ease-out ${isImageVisible ? "blur-0 translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-[0.98] opacity-0 blur-[2px]"}`}
                />
              </div>
            </div>

            <div className="mt-12 flex justify-center lg:w-full lg:justify-start">
              <Link
                href={ctaHref}
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/70 bg-white px-7 text-sm font-semibold text-black transition hover:bg-black/5"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
