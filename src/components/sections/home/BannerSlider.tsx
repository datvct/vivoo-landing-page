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
import { useSiteSettingQuery } from "@/services/site-settings/queries";
import { HomeSettings } from "@/types/types";


type BannerSliderProps = {
  fullWidth?: boolean;
  slides?: any[];
};

export default function BannerSlider({
  fullWidth = false,
  slides,
}: BannerSliderProps) {
  const { data: settingData } = useSiteSettingQuery("home");
  const homeSettings = (settingData?.data?.value || {}) as Partial<HomeSettings>;
  const banners = slides && slides.length > 0
    ? slides
    : (homeSettings.banners && homeSettings.banners.length > 0
      ? homeSettings.banners
      : []);

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === banners.length - 1
          ? 0
          : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [banners.length]);

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
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="relative min-w-full"
              >
                <div className="relative h-56 sm:h-112.5">
                  <Image
                    src={banner.image || "/images/product.avif"}
                    alt={banner.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    className="object-cover"
                    priority={
                      index === 0
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {banners.length > 1 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
