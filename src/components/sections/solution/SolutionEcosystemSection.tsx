"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";

type EcosystemStep = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  active?: boolean;
};

type SolutionEcosystemSectionProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonLabel: string;
  buttonHref?: string;
  steps: EcosystemStep[];
};

export default function SolutionEcosystemSection({
  title,
  description,
  image,
  imageAlt,
  buttonLabel,
  buttonHref = "#",
  steps,
}: SolutionEcosystemSectionProps) {
  const initialActiveIndex =
    useMemo(() => {
      const foundIndex =
        steps.findIndex(
          (step) => step.active
        );
      return foundIndex >= 0
        ? foundIndex
        : 0;
    }, [steps]);

  const [activeIndex, setActiveIndex] =
    useState(initialActiveIndex);
  const activeStep =
    steps[activeIndex] ?? steps[0];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[24px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:mt-5 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="space-y-4 sm:space-y-6">
            {steps.map(
              (step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  className={`rounded-sm px-4 py-3 text-left transition sm:px-5 sm:py-4 ${
                    index ===
                    activeIndex
                      ? "border-l-2 border-blue-600 bg-[#f6f8fb]"
                      : "border-l-2 border-transparent bg-transparent"
                  }`}
                >
                  <h3
                    className={`text-left text-[16px] leading-6 font-semibold sm:text-[18px] sm:leading-7 ${index === activeIndex ? "text-blue-700" : "text-black"}`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-left text-sm leading-6 text-black/60 sm:mt-2 sm:text-[15px]">
                    {step.description}
                  </p>
                </button>
              )
            )}
          </div>

          <div className="flex justify-center lg:justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 shadow-[0_26px_60px_rgba(15,23,42,0.14)] ring-1 ring-black/10">
                <Image
                  src={
                    activeStep?.image ??
                    image
                  }
                  alt={
                    activeStep?.imageAlt ??
                    imageAlt
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:mt-14">
          <Link
            href={buttonHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/85 sm:h-12 sm:px-7"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
