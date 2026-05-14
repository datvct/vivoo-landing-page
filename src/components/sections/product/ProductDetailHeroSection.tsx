"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  FileText,
  HelpCircle,
  HomeIcon,
  Play,
} from "lucide-react";
import {
  useMemo,
  useEffect,
  useState,
} from "react";

type Thumbnail = {
  src: string;
  alt: string;
};

type DetailLink = {
  label: string;
  href: string;
  icon: "datasheet" | "support";
};

type ProductDetailHeroSectionProps = {
  breadcrumbs: string[];
  title: string;
  categoryLabel: string;
  badges: string[];
  description: string;
  features: string[];
  primaryActionLabel: string;
  primaryActionHref: string;
  thumbnails: Thumbnail[];
  detailLinks: DetailLink[];
};

function DetailLinkIcon({
  icon,
}: {
  icon: DetailLink["icon"];
}) {
  if (icon === "datasheet") {
    return (
      <FileText className="h-5 w-5 text-black" />
    );
  }

  return (
    <HelpCircle className="h-5 w-5 text-black" />
  );
}

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
  detailLinks,
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

  return (
    <section className="bg-white py-6 text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-black/40 sm:text-sm"
        >
          <span className="inline-flex items-center justify-center rounded-full p-1">
            <HomeIcon className="h-3.5 w-3.5" />
          </span>
          {breadcrumbs.map(
            (crumb, index) => (
              <span
                key={crumb}
                className="inline-flex items-center gap-2"
              >
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-black/25" />
                )}
                <span
                  className={
                    index ===
                    breadcrumbs.length -
                      1
                      ? "text-black/75"
                      : "text-black/35"
                  }
                >
                  {crumb}
                </span>
              </span>
            )
          )}
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:items-start">
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
                  className={`object-contain p-4 transition-all duration-500 ease-out ${isImageEntered ? "blur-0 scale-100 opacity-100" : "scale-[0.97] opacity-0 blur-[2px]"}`}
                />

                {totalSlides > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={
                        goToPreviousSlide
                      }
                      aria-label="Previous slide"
                      className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full border border-black/10 bg-white/90 p-2 text-black shadow-sm transition hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={
                        goToNextSlide
                      }
                      aria-label="Next slide"
                      className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full border border-black/10 bg-white/90 p-2 text-black shadow-sm transition hover:bg-white"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
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
                      className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border bg-white transition ${isActive ? "border-black/35 ring-1 ring-black/20" : "border-black/10 hover:border-black/20"}`}
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
                        className="object-contain p-1.5"
                      />
                    </button>
                  );
                }
              )}

              <button
                type="button"
                className="flex h-16 min-w-40 items-center justify-center gap-2 rounded-md border border-black/10 bg-black/5 px-4 text-sm font-medium text-black/70 transition hover:bg-black/10"
                onClick={goToNextSlide}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/30 bg-white">
                  <Play className="h-4 w-4 fill-black text-black" />
                </span>
                Watch Video
              </button>
            </div>
          </div>

          <div className="pt-1 lg:pl-4">
            <p className="text-sm text-black/45">
              {categoryLabel}
            </p>
            <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.03em] text-black sm:text-[38px] lg:text-[44px]">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border px-4 py-2 text-sm shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition"
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

            <p className="mt-8 max-w-xl text-[18px] leading-8 text-black/65">
              {description}
            </p>

            <ul className="mt-8 space-y-4">
              {features.map(
                (feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[16px] leading-7 text-black/70"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-black/75" />
                    <span>
                      {feature}
                    </span>
                  </li>
                )
              )}
            </ul>

            <div className="mt-8">
              <Link
                href={primaryActionHref}
                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-white transition hover:bg-black/85"
              >
                {primaryActionLabel}
              </Link>
            </div>

            <div className="mt-10 border-t border-black/15 pt-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {detailLinks.map(
                  (link, index) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-black/70 transition hover:bg-black/5 ${index < detailLinks.length - 1 ? "sm:border-r sm:border-black/10" : ""}`}
                    >
                      <span className="flex h-10 w-10 items-center justify-center bg-white">
                        <DetailLinkIcon
                          icon={
                            link.icon
                          }
                        />
                      </span>
                      <span className="text-sm font-medium text-black/65">
                        {link.label}
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
