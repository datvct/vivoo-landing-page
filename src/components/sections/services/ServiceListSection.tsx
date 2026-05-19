"use client";

import { Service } from "@/types/service-types";
import ServiceCard from "./ServiceCard";
import Link from "next/link";

const defaultServices: Service[] = [
  {
    id: "video",
    title: "Video Security",
    description:
      "AI-powered surveillance and analytics for 24/7 monitoring.",
    image: "/images/image1.avif",
    slug: "/solutions/video-security",
  },
  {
    id: "access",
    title: "Access Control",
    description:
      "Centralized access management with mobile and touchless options.",
    image: "/images/camera-1.avif",
    slug: "/solutions/access-control",
  },
  {
    id: "sensors",
    title: "Smart Sensors",
    description:
      "Perimeter and environmental sensors that trigger intelligent alerts.",
    image: "/images/camera-2.avif",
    slug: "/solutions/sensors",
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description:
      "Actionable insights from aggregated sensor and video data.",
    image: "/images/product.avif",
    slug: "/solutions/analytics",
  },
];

type ServiceListSectionProps = {
  title?: string;
  description?: string;
  services?: any[];
};

export default function ServiceListSection({
  title = "Service Groups",
  description = "Explore our grouped services — each designed to solve specific security challenges and scale with your business.",
  services = [],
}: ServiceListSectionProps) {
  const activeServices = services && services.length > 0
    ? services.map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description || "",
        image: s.thumbnailUrl || "/images/image1.avif",
        slug: `/services/${s.slug}`,
      }))
    : defaultServices;

  return (
    <section className="bg-gray-50 py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-base text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {activeServices.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b76ff] px-10 py-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b76ff] focus-visible:ring-offset-2"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
