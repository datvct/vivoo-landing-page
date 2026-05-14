"use client";

import {
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type GuideCard = {
  title: string;
  description: string;
  image: string;
  linkLabel: string;
};

type GuideTab = {
  id: string;
  label: string;
  cards: GuideCard[];
};

const tabs: GuideTab[] = [
  {
    id: "buyers-guides",
    label: "Buyer's guides",
    cards: [
      {
        title:
          "How to choose the right business security cameras",
        description:
          "Compare commercial video surveillance components, camera types and management systems to protect your site.",
        image: "/images/image1.avif",
        linkLabel: "Read more",
      },
      {
        title:
          "Finding the best door access control system",
        description:
          "Explore top features and system types to help you make the right investment.",
        image: "/images/camera-1.avif",
        linkLabel: "Read more",
      },
      {
        title:
          "The benefits of touchless access control",
        description:
          "Learn how a touchless entry solution can streamline your building’s security.",
        image: "/images/camera-2.avif",
        linkLabel: "Read more",
      },
    ],
  },
  {
    id: "checklists",
    label: "Checklists",
    cards: [
      {
        title:
          "Security camera buying checklist",
        description:
          "Use this checklist to compare performance, storage, and deployment needs before choosing cameras.",
        image: "/images/camera-1.avif",
        linkLabel: "Read more",
      },
      {
        title:
          "Access control rollout checklist",
        description:
          "Plan credentials, permissions, and hardware readiness with a step-by-step deployment checklist.",
        image: "/images/image1.avif",
        linkLabel: "Read more",
      },
      {
        title:
          "Visitor management readiness checklist",
        description:
          "Prepare your front desk, policy flow, and security handoff before going live.",
        image: "/images/camera-2.avif",
        linkLabel: "Read more",
      },
    ],
  },
  {
    id: "industry-insights",
    label: "Industry insights",
    cards: [
      {
        title:
          "Retail security trends for 2026",
        description:
          "See what retail teams are prioritizing to improve safety and store visibility.",
        image: "/images/image1.avif",
        linkLabel: "Read more",
      },
      {
        title:
          "Education security planning essentials",
        description:
          "Learn how schools and campuses are balancing access, visibility, and response speed.",
        image: "/images/camera-1.avif",
        linkLabel: "Read more",
      },
      {
        title:
          "How smart access improves operations",
        description:
          "Explore the operational impact of touchless and centrally managed access control.",
        image: "/images/camera-2.avif",
        linkLabel: "Read more",
      },
    ],
  },
];

export default function DiscoverMoreSection() {
  const [activeTabId, setActiveTabId] =
    useState(tabs[0].id);
  const [isAnimating, setIsAnimating] =
    useState(false);
  const animationFrameRef = useRef<
    number | null
  >(null);

  const activeTab =
    tabs.find(
      (tab) => tab.id === activeTabId
    ) ?? tabs[0];

  const handleTabChange = (
    tabId: string
  ) => {
    if (tabId === activeTabId) {
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    }

    setIsAnimating(true);
    setActiveTabId(tabId);

    animationFrameRef.current =
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
  };

  return (
    <section className="bg-[#f7f7f7] py-14 sm:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-medium tracking-[-0.02em] text-black sm:text-[30px] lg:text-[34px]">
            Discover more Avigilon
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/65 sm:mt-5 sm:text-[15px] sm:leading-7">
            Stay one step ahead with
            valuable guides, helpful
            checklists and industry
            trends.
          </p>
        </div>

        <div className="mt-8 border-b border-black/10 sm:mt-12">
          <div className="mx-auto flex max-w-4xl items-end justify-center gap-3 px-2 sm:gap-6 lg:gap-10">
            {tabs.map((tab) => {
              const isActive =
                tab.id === activeTabId;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    handleTabChange(
                      tab.id
                    )
                  }
                  className={`relative cursor-pointer pb-4 text-xs font-semibold whitespace-nowrap transition-colors duration-200 sm:pb-5 sm:text-base lg:text-[20px] lg:text-[22px] ${isActive ? "text-black" : "text-black/55 hover:text-black"}`}
                >
                  {tab.label}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-0.5 origin-center transition-all duration-300 ${isActive ? "scale-x-100 bg-blue-600" : "scale-x-0 bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={activeTab.id}
          className={`mt-8 transition-all duration-500 ease-out sm:mt-10 ${isAnimating ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"}`}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {activeTab.cards.map(
              (card) => (
                <article
                  key={card.title}
                  className="flex flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-4 py-5 text-center sm:px-6 sm:py-6">
                    <h3 className="mx-auto max-w-sm text-base leading-6 font-semibold text-black sm:text-lg sm:leading-7 lg:text-[18px]">
                      {card.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-black/65 sm:mt-4 sm:text-[15px] sm:leading-7">
                      {card.description}
                    </p>

                    <Link
                      href="#"
                      className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 sm:mt-6 sm:text-[15px]"
                    >
                      {card.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>

          <div className="mt-10 text-center sm:mt-12">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 sm:text-[15px]"
            >
              View all guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
