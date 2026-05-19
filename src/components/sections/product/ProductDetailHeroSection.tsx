"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  FileText,
  HelpCircle,
  Play,
} from "lucide-react";
import {
  useMemo,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Breadcrumb from "@/components/common/Breadcrumb";

type Thumbnail = {
  src: string;
  alt: string;
};

type ProductDetailHeroSectionProps = {
  breadcrumbs: (
    | string
    | { label: string; href?: string }
  )[];
  title: string;
  categoryLabel: string;
  badges: string[];
  description: string;
  features: string[];
  primaryActionLabel: string;
  primaryActionHref: string;
  thumbnails: Thumbnail[];
  deviceInfo?: ReactNode;
};


export default function ProductDetailHeroSection({
  breadcrumbs,
  title,
  categoryLabel,
  badges,
  description,
  features,
  primaryActionLabel,
  primaryActionHref,
  thumbnails,
  deviceInfo,
}: ProductDetailHeroSectionProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);
  const [
    isImageEntered,
    setIsImageEntered,
  ] = useState(true);

  const totalSlides = thumbnails.length;

  const activateSlide = (
    index: number
  ) => {
    setIsImageEntered(false);
    setActiveIndex(index);
  };

  const goToPreviousSlide = () => {
    setIsImageEntered(false);
    setActiveIndex(
      (currentIndex: number) =>
        currentIndex === 0
          ? totalSlides - 1
          : currentIndex - 1
    );
  };

  const goToNextSlide = () => {
    setIsImageEntered(false);
    setActiveIndex(
      (currentIndex: number) =>
        currentIndex === totalSlides - 1
          ? 0
          : currentIndex + 1
    );
  };

  const activeThumbnail = useMemo(
    () =>
      thumbnails[activeIndex] ??
      thumbnails[0],
    [activeIndex, thumbnails]
  );

  useEffect(() => {
    const frameId =
      window.requestAnimationFrame(
        () => {
          setIsImageEntered(true);
        }
      );

    return () => {
      window.cancelAnimationFrame(
        frameId
      );
    };
  }, [activeIndex]);

  // normalize breadcrumb items (accept either string or {label, href})
  const normalized = breadcrumbs.map(
    (b) =>
      typeof b === "string"
        ? { label: b }
        : b
  );

  const itemsForBreadcrumb =
    normalized.slice(0, -1);
  const currentCrumb =
    normalized[normalized.length - 1];

  return (
    <section className="bg-white py-5 text-black sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Breadcrumb
          items={itemsForBreadcrumb}
          currentLabel={
            currentCrumb?.label ?? title
          }
        />

        <div className="mt-5 grid gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:items-start">
          <div>
            <div className="rounded-xl border border-black/10 bg-[#fafafa] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-white">
                <Image
                  src={
                    activeThumbnail.src
                  }
                  alt={
                    activeThumbnail.alt
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className={`object-contain p-3 transition-all duration-500 ease-out sm:p-4 ${isImageEntered ? "blur-0 scale-100 opacity-100" : "scale-95 opacity-0 blur-sm"}`}
                />

                {totalSlides > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={
                        goToPreviousSlide
                      }
                      aria-label="Previous slide"
                      className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full border border-black/10 bg-white/90 p-1.5 text-black shadow-sm transition hover:bg-white sm:left-4 sm:p-2"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={
                        goToNextSlide
                      }
                      aria-label="Next slide"
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full border border-black/10 bg-white/90 p-1.5 text-black shadow-sm transition hover:bg-white sm:right-4 sm:p-2"
                    >
                      <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 sm:mt-5 sm:gap-4">
              {thumbnails.map(
                (thumbnail, index) => {
                  const isActive =
                    index ===
                    activeIndex;

                  return (
                    <button
                      key={
                        thumbnail.alt
                      }
                      type="button"
                      onClick={() =>
                        activateSlide(
                          index
                        )
                      }
                      className={`relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-md border bg-white transition sm:h-16 sm:w-16 ${isActive ? "border-black/35 ring-1 ring-black/20" : "border-black/10 hover:border-black/20"}`}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <Image
                        src={
                          thumbnail.src
                        }
                        alt={
                          thumbnail.alt
                        }
                        fill
                        sizes="64px"
                        className="object-contain p-0.5 sm:p-1"
                      />
                    </button>
                  );
                }
              )}

              <button
                type="button"
                className="hidden h-12 min-w-28 flex-none items-center justify-center gap-2 rounded-md border border-black/10 bg-black/5 px-3 text-sm font-medium text-black/70 transition hover:bg-black/10 sm:flex sm:h-16 sm:min-w-40 sm:px-4"
                onClick={goToNextSlide}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/30 bg-white sm:h-7 sm:w-7">
                  <Play className="h-3 w-3 fill-black text-black sm:h-4 sm:w-4" />
                </span>
                <span className="text-xs whitespace-nowrap sm:text-sm">
                  Watch Video
                </span>
              </button>
            </div>

            {deviceInfo && (
              <div className="mt-5 rounded-xl border border-black/10 bg-[#fafafa] p-4 text-sm leading-6 text-black/75 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:mt-6 sm:p-5" dangerouslySetInnerHTML={{__html:deviceInfo}}/>
            )}
          </div>

          <div className="pt-1 text-center lg:pl-4 lg:text-left">
            <p className="text-xs text-black/45 sm:text-sm">
              {categoryLabel}
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border px-3 py-1.5 text-xs shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition sm:px-4 sm:py-2 sm:text-sm"
                  style={{
                    borderColor: badge
                      .toLowerCase()
                      .includes("alta")
                      ? "#c9ce6f"
                      : "#87b0e8",
                    color: "#444",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/65 sm:mt-8 sm:text-[18px] sm:leading-8 lg:mx-0">
              {description}
            </p>

            <ul className="mt-6 space-y-3 text-left sm:mt-8 sm:space-y-4 lg:text-left">
              {features.map(
                (feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-black/70 sm:text-[16px] sm:leading-7"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-black/75 sm:mt-1 sm:h-5 sm:w-5" />
                    <span>
                      {feature}
                    </span>
                  </li>
                )
              )}
            </ul>

            <div className="mt-6 flex justify-center sm:mt-8 lg:justify-start">
              <Link
                href={primaryActionHref}
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/85 sm:h-12 sm:px-8"
              >
                {primaryActionLabel}
              </Link>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
