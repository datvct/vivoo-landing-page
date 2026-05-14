"use client";

import React, {
  useRef,
  useState,
} from "react";
import Image from "next/image";
import PeopleGroupMeetingIcon from "@/components/icons/PeopleGroupMeetingIcon";
import MotionTrackingIcon from "@/components/icons/MotionTrackingIcon";
import NetworkUserIcon from "@/components/icons/LayerIcon";
import Link from "next/link";
import RadarIcon from "@/components/icons/RadarIcon";
import BrainNetworkIcon from "@/components/icons/BrainNetworkIcon";
import SecurityUpdatesIcon from "@/components/icons/SecurityUpdatesIcon";
import ShieldSecurityIcon from "@/components/icons/ShieldSecurityIcon";
import NotificationSecurityIcon from "@/components/icons/NotificationSecurityIcon";
import CyberProtectionIcon from "@/components/icons/CyberProtectionIcon";
import AlertMonitorIcon from "@/components/icons/AlertMonitorIcon";
import DashboardGridIcon from "@/components/icons/DashboardGridIcon";
import SmartLockWifiIcon from "@/components/icons/SmartLockWifiIcon";

type Tab = {
  id: string;
  title: string;
  heading: string;
  text: string;
  bullets: {
    icon: React.ReactNode;
    text: string;
  }[];
  image: string;
};

const styles = `text-black h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12`;

const tabs: Tab[] = [
  {
    id: "video",
    title: "Video security",
    heading:
      "Better visibility, smarter detection",
    text: "Avigilon video security systems integrate cameras, AI analytics, sensors and access control on an intuitive management platform.",
    bullets: [
      {
        icon: (
          <NetworkUserIcon
            className={styles}
          />
        ),
        text: "Unified software with leading analytics",
      },
      {
        icon: (
          <PeopleGroupMeetingIcon
            className={styles}
          />
        ),
        text: "AI alerts & insights for faster action",
      },
      {
        icon: (
          <MotionTrackingIcon
            className={styles}
          />
        ),
        text: "Easy to use & integrates all your tools",
      },
    ],
    image: "/images/image1.avif",
  },
  {
    id: "cameras",
    title: "Security cameras",
    heading: "High-resolution imaging",
    text: "Our range of cameras deliver exceptional image clarity for identification and evidence capture.",
    bullets: [
      {
        icon: (
          <RadarIcon
            className={styles}
          />
        ),
        text: "4K and multi-sensor cameras",
      },
      {
        icon: (
          <BrainNetworkIcon
            className={styles}
          />
        ),
        text: "Low-light performance",
      },
      {
        icon: (
          <SecurityUpdatesIcon
            className={styles}
          />
        ),
        text: "Durable for outdoors",
      },
    ],
    image: "/images/image1.avif",
  },
  {
    id: "access",
    title: "Access control",
    heading:
      "Secure, centralized access",
    text: "Control who goes where and when with simple yet powerful access management tools.",
    bullets: [
      {
        icon: (
          <ShieldSecurityIcon
            className={styles}
          />
        ),
        text: "Centralized access management",
      },
      {
        icon: (
          <NotificationSecurityIcon
            className={styles}
          />
        ),
        text: "Mobile credentials & touchless options",
      },
      {
        icon: (
          <CyberProtectionIcon
            className={styles}
          />
        ),
        text: "Integrates with video & sensors",
      },
    ],
    image: "/images/camera-1.avif",
  },
  {
    id: "sensors",
    title: "Smart sensors",
    heading:
      "Intelligent perimeter sensing",
    text: "Sensor networks detect environmental changes and suspicious events to trigger faster responses.",
    bullets: [
      {
        icon: (
          <AlertMonitorIcon
            className={styles}
          />
        ),
        text: "Motion & entry sensors",
      },
      {
        icon: (
          <DashboardGridIcon
            className={styles}
          />
        ),
        text: "Environmental monitoring",
      },
      {
        icon: (
          <SmartLockWifiIcon
            className={styles}
          />
        ),
        text: "Easy integration",
      },
    ],
    image: "/images/camera-2.avif",
  },
];

export default function SolutionsSection() {
  const [active, setActive] =
    useState<string>(tabs[0].id);
  const [isAnimating, setIsAnimating] =
    useState(false);
  const animationFrameRef = useRef<
    number | null
  >(null);

  const activeTab =
    tabs.find((t) => t.id === active) ??
    tabs[0];

  const handleTabChange = (
    tabId: string
  ) => {
    if (tabId === active) {
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(
        animationFrameRef.current
      );
    }

    setIsAnimating(true);
    setActive(tabId);

    animationFrameRef.current =
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
  };

  return (
    <section className="bg-white py-8 sm:py-12 md:py-20">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 md:px-0">
        <h2 className="mb-3 text-center text-xl font-semibold text-black sm:mb-4 sm:text-2xl md:mb-5 md:text-3xl">
          Your complete security suite
        </h2>
        <p className="mb-6 max-w-2xl text-center text-xs text-gray-500 sm:mb-8 sm:text-sm md:mb-10">
          The Avigilon security suite
          provides a complete portfolio
          of end-to-end video security
          products and services, powered
          by intelligence.
        </p>

        <div className="my-3 flex flex-wrap items-center justify-center gap-2 sm:my-4 sm:gap-3 md:my-5 md:gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() =>
                handleTabChange(t.id)
              }
              className={`cursor-pointer rounded-full px-3 py-2 text-xs font-semibold whitespace-nowrap transition-shadow sm:px-5 sm:py-3 sm:text-sm md:px-10 md:py-5 md:text-lg ${
                active === t.id
                  ? "bg-blue-700 text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 hover:shadow-md"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="w-full max-w-295 px-4 py-8 sm:px-6 sm:py-10 md:px-9 md:py-14">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-7 md:grid-cols-12 md:gap-8">
            <div
              key={activeTab.id}
              className={`col-span-1 transition-all duration-500 ease-out md:col-span-6 ${isAnimating ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
            >
              <h3 className="mb-2 text-lg font-semibold text-black sm:mb-3 sm:text-xl md:mb-4 md:text-2xl">
                {activeTab.heading}
              </h3>
              <p className="mb-4 text-xs text-gray-600 sm:mb-5 sm:text-sm md:mb-6">
                {activeTab.text}
              </p>

              <ul className="mb-4 flex flex-col items-start gap-3 sm:mb-5 sm:gap-4 md:mb-6">
                {activeTab.bullets.map(
                  (b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 sm:gap-4"
                    >
                      {b.icon}
                      <span className="text-xs text-gray-700 sm:text-sm">
                        {b.text}
                      </span>
                    </li>
                  )
                )}
              </ul>

              <Link
                className="inline-block pl-0 text-xs font-medium text-blue-600 sm:pl-8 sm:text-sm md:pl-16"
                href="#"
              >
                See video solutions →
              </Link>
            </div>

            <div
              key={`${activeTab.id}-image`}
              className={`col-span-1 flex justify-center transition-all duration-500 ease-out md:col-span-6 ${isAnimating ? "translate-y-6 opacity-0 delay-75" : "translate-y-0 opacity-100"}`}
            >
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl shadow-lg sm:max-w-sm sm:rounded-2xl md:max-w-130">
                <Image
                  src={activeTab.image}
                  alt={
                    activeTab.heading
                  }
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  width={520}
                  height={520}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
