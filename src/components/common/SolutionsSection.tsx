import Link from "next/link";
import SolutionCard from "./SolutionCard";
import { Tab } from "@/types/solution-types";

const tabs: Tab[] = [
  {
    id: "video",
    title: "Video security",
    slug: "video-security",
    text: "Avigilon video security systems integrate cameras, AI analytics, sensors and access control on an intuitive management platform.",
    image: "/images/image1.avif",
  },
  {
    id: "cameras",
    title: "Security cameras",
    slug: "security-cameras",
    text: "Our range of cameras deliver exceptional image clarity for identification and evidence capture.",
    image: "/images/image1.avif",
  },
  {
    id: "access",
    title: "Access control",
    slug: "access-control",
    text: "Control who goes where and when with simple yet powerful access management tools.",
    image: "/images/camera-1.avif",
  },
  {
    id: "sensors",
    title: "Smart sensors",
    slug: "smart-sensors",
    text: "Sensor networks detect environmental changes and suspicious events to trigger faster responses.",
    image: "/images/camera-2.avif",
  },
];

export default function SolutionsSection() {
  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Solutions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            The Avigilon security suite
            offers an integrated
            portfolio of video security
            products and services
            powered by intelligence and
            built for scale.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {tabs.map((t) => (
            <SolutionCard
              key={t.id}
              tab={t}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b76ff] px-10 py-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#095bd6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b76ff] focus-visible:ring-offset-2"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
