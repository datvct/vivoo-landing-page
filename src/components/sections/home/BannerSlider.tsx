"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { BannerSlide } from "@/types/home-types";

const banners: BannerSlide[] = [
  {
    id: 1,
    image: "/images/image1.avif",
    alt: "Vivoo banner quảng cáo 1",
  },
  {
    id: 2,
    image: "/images/product.avif",
    alt: "Vivoo banner quảng cáo 2",
  },
  {
    id: 3,
    image: "/images/camera-1.avif",
    alt: "Vivoo banner quảng cáo 3",
  },
  {
    id: 4,
    image: "/images/camera-2.avif",
    alt: "Vivoo banner quảng cáo 4",
  },
];

type BannerSliderProps = {
  fullWidth?: boolean;
};

export default function BannerSlider({
  fullWidth = false,
}: BannerSliderProps) {
  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1
          ? 0
          : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const containerClass = fullWidth
    ? "w-full"
    : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10";

  return (
    <section className="py-6 sm:py-8">
      <div className={containerClass}>
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-2xl shadow-sky-950/10">
          <div
            className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="relative min-w-full"
              >
                <div className="relative h-56 sm:h-112.5">
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    className="object-cover"
                    priority={
                      banner.id === 1
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrent((prev) =>
                prev === 0
                  ? banners.length - 1
                  : prev - 1
              )
            }
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Banner trước"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrent((prev) =>
                prev ===
                banners.length - 1
                  ? 0
                  : prev + 1
              )
            }
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Banner tiếp theo"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
