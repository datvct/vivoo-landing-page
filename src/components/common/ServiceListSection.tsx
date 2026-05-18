"use client";

import { Service } from "@/types/service-types";
import ServiceCard from "./ServiceCard";
import Link from "next/link";

const services: Service[] = [
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

export default function ServiceListSection() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Service Groups
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Explore our grouped services
            — each designed to solve
            specific security challenges
            and scale with your
            business.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
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
