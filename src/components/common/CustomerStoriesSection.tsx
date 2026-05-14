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

type Story = {
  id: number;
  company: string;
  title: string;
  quote: string;
  author: string;
  image: string;
  logo: string;
};

const stories: Story[] = [
  {
    id: 1,
    company: "City of Kelowna",
    title: "City of Kelowna",
    quote:
      "Avigilon Unity helps us quickly respond to incidents. Our response time was 15 minutes. Now it’s just four minutes. That’s the difference that can help save lives.",
    author:
      "Alan Budde, Security and Business Continuity Manager at City of Kelowna",
    image: "/images/image1.avif",
    logo: "/svgs/logo.svg",
  },
  {
    id: 2,
    company: "Retail Hub",
    title: "Retail Hub",
    quote:
      "We reduced blind spots across our stores and improved visibility into every customer-facing area with one system.",
    author:
      "Operations Director, Retail Hub",
    image: "/images/camera-1.avif",
    logo: "/svgs/logo.svg",
  },
  {
    id: 3,
    company: "University Campus",
    title: "University Campus",
    quote:
      "The new workflow gives our team faster verification, easier collaboration, and a cleaner incident review process.",
    author:
      "Campus Safety Lead, University Campus",
    image: "/images/camera-2.avif",
    logo: "/svgs/logo.svg",
  },
  {
    id: 4,
    company: "Airport Operations",
    title: "Airport Operations",
    quote:
      "We can now coordinate security teams across multiple terminals without losing context during busy periods.",
    author:
      "Security Manager, Airport Operations",
    image: "/images/image1.avif",
    logo: "/svgs/logo.svg",
  },
  {
    id: 5,
    company: "Healthcare Network",
    title: "Healthcare Network",
    quote:
      "The platform helps us monitor sensitive areas more consistently while keeping day-to-day operations simple.",
    author:
      "Facilities Director, Healthcare Network",
    image: "/images/camera-1.avif",
    logo: "/svgs/logo.svg",
  },
];

export default function CustomerStoriesSection() {
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
    stories[activeIndex];

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
      activeIndex === stories.length - 1
        ? 0
        : activeIndex + 1
    );
  };

  const goPrev = () => {
    setStory(
      activeIndex === 0
        ? stories.length - 1
        : activeIndex - 1
    );
  };

  return (
    <section className="bg-[#FCFCFC] py-8 sm:py-12 lg:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-black sm:text-[30px]">
            Our customer stories
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/65 sm:text-[15px]">
            Hear how Avigilon&apos;s
            security solutions have
            enabled organizations
            globally to help keep their
            people, properties and
            assets safe and secure.
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
                src={activeStory.image}
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
              {/* <div className="mb-5 flex items-center gap-3 text-black/75">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-black/10">
                  <Image
                    src={
                      activeStory.logo
                    }
                    alt="Company logo"
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-sm leading-5 font-medium">
                  {activeStory.company}
                </span>
              </div> */}

              <h3 className="text-lg font-semibold text-black sm:text-[22px]">
                {activeStory.title}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-black/70 sm:text-[15px]">
                “{activeStory.quote}”
              </p>

              <p className="mt-5 max-w-xl text-sm leading-6 font-semibold text-black/80 sm:text-[15px]">
                - {activeStory.author}
              </p>

              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-blue-600 transition hover:text-blue-700"
              >
                Read this case study
                <ChevronRight className="h-4 w-4" />
              </Link>
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
          {stories.map(
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
