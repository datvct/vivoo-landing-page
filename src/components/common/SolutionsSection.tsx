"use client";

import React, { useRef, useState } from "react";
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

const styles = `text-black h-12 w-12`

const tabs: Tab[] = [
  {
    id: "video",
    title: "Video security",
    heading: "Better visibility, smarter detection",
    text:
      "Avigilon video security systems integrate cameras, AI analytics, sensors and access control on an intuitive management platform.",
    bullets: [
      {
        icon: <NetworkUserIcon className={styles} />,
        text: "Unified software with leading analytics"
      },
      {
        icon: <PeopleGroupMeetingIcon className={styles} />,
        text: "AI alerts & insights for faster action"
      },
      {
        icon: <MotionTrackingIcon className={styles} />,
        text: "Easy to use & integrates all your tools"
      }
    ],
    image: "/images/image1.avif",
  },
  {
    id: "cameras",
    title: "Security cameras",
    heading: "High-resolution imaging",
    text:
      "Our range of cameras deliver exceptional image clarity for identification and evidence capture.",
    bullets: [
      {
        icon: <RadarIcon className={styles} />,
        text: "4K and multi-sensor cameras"
      },
      {
        icon: <BrainNetworkIcon className={styles} />,
        text: "Low-light performance"
      },
      {
        icon: <SecurityUpdatesIcon className={styles} />,
        text: "Durable for outdoors"
      }
    ],
    image: "/images/image1.avif",
  },
  {
    id: "access",
    title: "Access control",
    heading: "Secure, centralized access",
    text:
      "Control who goes where and when with simple yet powerful access management tools.",
    bullets: [{
      icon: <ShieldSecurityIcon className={styles} />,
      text: "Centralized access management"
    },
    {
      icon: <NotificationSecurityIcon className={styles} />,
      text: "Mobile credentials & touchless options"
    },
    {
      icon: <CyberProtectionIcon className={styles} />,
      text: "Integrates with video & sensors"
    }],
    image: "/images/camera-1.avif",
  },
  {
    id: "sensors",
    title: "Smart sensors",
    heading: "Intelligent perimeter sensing",
    text:
      "Sensor networks detect environmental changes and suspicious events to trigger faster responses.",
    bullets: [
      {
        icon: <AlertMonitorIcon className={styles} />,
        text: "Motion & entry sensors"
      },
      {
        icon: <DashboardGridIcon className={styles} />,
        text: "Environmental monitoring"
      },
      {
        icon: <SmartLockWifiIcon className={styles} />,
        text: "Easy integration"
      }
    ],
    image: "/images/camera-2.avif",
  },
];

export default function SolutionsSection() {
  const [active, setActive] = useState<string>(tabs[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  const handleTabChange = (tabId: string) => {
    if (tabId === active) {
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsAnimating(true);
    setActive(tabId);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsAnimating(false);
    });
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="mb-5 text-center text-3xl font-semibold text-black">
          Your complete security suite
        </h2>
        <p className="mb-10 text-center text-sm text-gray-500">
          The Avigilon security suite provides a complete portfolio of end-to-end
          video security products and services, powered by intelligence.
        </p>

        <div className="my-4 flex items-center justify-center gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`rounded-full px-10 py-5 text-lg cursor-pointer font-semibold transition-shadow ${active === t.id
                ? "bg-blue-700 text-white shadow-lg"
                : "bg-white border border-gray-200 text-gray-700 hover:shadow-md"
                }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="max-w-295 px-9 py-14">
          <div className="grid grid-cols-12 items-center gap-8">
            <div
              key={activeTab.id}
              className={`col-span-6 transition-all duration-500 ease-out ${isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
            >
              <h3 className="mb-4 text-2xl font-semibold text-black">
                {activeTab.heading}
              </h3>
              <p className="mb-6 text-sm text-gray-600">{activeTab.text}</p>

              <ul className="mb-6 flex flex-col gap-4 items-start">
                {activeTab.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-4">
                    {b.icon}
                    <span className="text-sm text-gray-700">{b.text}</span>
                  </li>
                ))}
              </ul>

              <Link className="pl-16 inline-block text-sm font-medium text-blue-600" href="#">
                See video solutions →
              </Link>
            </div>

            <div
              key={`${activeTab.id}-image`}
              className={`col-span-6 flex justify-center transition-all duration-500 ease-out ${isAnimating ? "opacity-0 translate-y-6 delay-75" : "opacity-100 translate-y-0"}`}
            >
              <div className="relative aspect-square w-full max-w-130 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={activeTab.image}
                  alt={activeTab.heading}
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
