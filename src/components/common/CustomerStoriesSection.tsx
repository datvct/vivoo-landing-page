"use client";

import {
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CustomerStoriesSectionProps } from "@/types/types";

export default function CustomerStoriesSection({
  title = "Our customer stories",
  description = "Hear how Avigilon's security solutions have enabled organizations globally to help keep their people, properties and assets safe and secure.",
  stories = [],
}: CustomerStoriesSectionProps) {
  const activeStories = stories && stories.length > 0 ? stories : [];

  const [activeIndex, setActiveIndex] =
    useState(0);
  const [isAnimating, setIsAnimating] =
    useState(false);
  const [direction, setDirection] =
    useState<1 | -1>(1);
  const animationFrameRef = useRef<
    number | null
  >(null);

  const activeStory =
    activeStories[activeIndex];

  const setStory = (
    nextIndex: number
  ) => {
    if (nextIndex === activeIndex) {
      return;
    }

    setDirection(
      nextIndex > activeIndex ? 1 : -1
    );

    if (animationFrameRef.current) {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    }

    setIsAnimating(true);
    setActiveIndex(nextIndex);

    animationFrameRef.current =
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
  };

  const goNext = () => {
    setStory(
      activeIndex === activeStories.length - 1
        ? 0
        : activeIndex + 1
    );
  };

  const goPrev = () => {
    setStory(
      activeIndex === 0
        ? activeStories.length - 1
        : activeIndex - 1
    );
  };

  if (!activeStory) return null;

  return (
    <section className="bg-[#FCFCFC] py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-black sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/65 sm:text-[15px]">
            {description}
          </p>
        </div>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-6 sm:mt-12 lg:flex-row lg:gap-10">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous story"
            className="hidden h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm transition hover:border-black/20 hover:text-black lg:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
            <div
              key={`${activeStory.id}-image`}
              className={`relative aspect-4/3 overflow-hidden rounded-lg bg-neutral-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-all duration-500 ease-out lg:rounded-xs ${isAnimating ? `${direction === 1 ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0"}` : "translate-x-0 opacity-100"}`}
            >
              <Image
                src={activeStory.image || "/images/image1.avif"}
                alt={activeStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover"
                priority
              />
            </div>

            <div
              key={activeStory.id}
              className={`flex flex-col justify-center transition-all duration-500 ease-out ${isAnimating ? `${direction === 1 ? "-translate-x-8 opacity-0 delay-75" : "translate-x-8 opacity-0 delay-75"}` : "translate-x-0 opacity-100"}`}
            >
              <h3 className="text-lg font-semibold text-black sm:text-[22px]">
                {activeStory.title}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/70 sm:text-[15px]">
                “{activeStory.quote}”
              </p>

              <p className="mt-5 max-w-xl text-sm leading-6 font-semibold text-black/80 sm:text-[15px]">
                - {activeStory.author}
              </p>

              {/* <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-blue-600 transition hover:text-blue-700"
              >
                Read this case study
                <ChevronRight className="h-4 w-4" />
              </Link> */}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next story"
            className="hidden h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm transition hover:border-black/20 hover:text-black lg:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {activeStories.map(
            (story, index) => {
              const isActive =
                index === activeIndex;

              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() =>
                    setStory(index)
                  }
                  aria-label={`Go to ${story.company}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-2.5 bg-black" : "w-2.5 bg-black/20 hover:bg-black/35"}`}
                />
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
