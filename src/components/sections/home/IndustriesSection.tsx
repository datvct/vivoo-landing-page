"use client";

import {
  useRef,
  useState,
} from "react";

import Image from "next/image";
import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Server,
} from "lucide-react";

type Industry = {
  id: string;
  label: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

const industries: Industry[] = [
  {
    id: "commercial",
    label: "Commercial Real Estate",
    icon: (
      <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/image1.avif",
    imageAlt:
      "Commercial real estate security camera view",
    imagePosition: "center center",
  },
  {
    id: "data-centers",
    label: "Data Centers",
    icon: (
      <Server className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/camera-1.avif",
    imageAlt:
      "Data center security camera view",
    imagePosition: "center top",
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/camera-2.avif",
    imageAlt:
      "Education campus security view",
    imagePosition: "center center",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: (
      <BriefcaseBusiness className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/image1.avif",
    imageAlt:
      "Enterprise security monitoring image",
    imagePosition: "center top",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: (
      <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/camera-1.avif",
    imageAlt:
      "Healthcare facility security image",
    imagePosition: "center center",
  },
  {
    id: "law-enforcement",
    label: "Law Enforcement",
    icon: (
      <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/camera-2.avif",
    imageAlt:
      "Law enforcement security image",
    imagePosition: "center top",
  },
  {
    id: "government",
    label: "Government",
    icon: (
      <Landmark className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/image1.avif",
    imageAlt:
      "Government building security image",
    imagePosition: "center center",
  },
  {
    id: "aviation",
    label: "Aviation",
    icon: (
      <Plane className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/camera-1.avif",
    imageAlt: "Aviation security image",
    imagePosition: "center center",
  },
  {
    id: "retail",
    label: "Retail",
    icon: (
      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/camera-2.avif",
    imageAlt: "Retail security image",
    imagePosition: "center center",
  },
  {
    id: "banking",
    label: "Banking & Finance",
    icon: (
      <Banknote className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    ),
    image: "/images/image1.avif",
    imageAlt:
      "Banking and finance security image",
    imagePosition: "center center",
  },
];

export default function IndustriesSection() {
  const [
    activeIndustryId,
    setActiveIndustryId,
  ] = useState(industries[0].id);
  const [
    imageVisible,
    setImageVisible,
  ] = useState(true);
  const hoverTimerRef = useRef<
    number | null
  >(null);

  const activeIndustry =
    industries.find(
      (industry) =>
        industry.id === activeIndustryId
    ) ?? industries[0];

  const handleActivateIndustry = (
    id: string
  ) => {
    if (hoverTimerRef.current) {
      window.clearTimeout(
        hoverTimerRef.current
      );
    }

    setImageVisible(false);

    hoverTimerRef.current =
      window.setTimeout(() => {
        setActiveIndustryId(id);
        requestAnimationFrame(() =>
          setImageVisible(true)
        );
      }, 80);
  };

  return (
    <section className="bg-[#fcfcfc] py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl text-center">
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-black sm:text-3xl md:text-4xl lg:text-5xl">
            Security for every site,
            everywhere
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-black/65 sm:mt-4 sm:text-sm sm:leading-7 md:mt-5 md:text-base lg:text-lg">
            See how people and
            organizations around the
            world are better protected
            with Avigilon&apos;s
            end-to-end video security
            and access control
            solutions.
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-1 items-center gap-6 sm:mt-10 sm:gap-8 md:mt-12 md:gap-9 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-4/3 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:max-w-sm sm:rounded-lg md:max-w-2xl lg:max-w-190 lg:rounded-lg">
              <div
                className={`absolute inset-0 transition-all duration-500 ease-out ${imageVisible ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"}`}
              >
                <Image
                  key={
                    activeIndustry.id
                  }
                  src={
                    activeIndustry.image
                  }
                  alt={
                    activeIndustry.imageAlt
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  style={{
                    objectPosition:
                      activeIndustry.imagePosition,
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-x-10 lg:gap-y-6">
              {industries.map(
                (industry) => {
                  const isActive =
                    industry.id ===
                    activeIndustryId;

                  return (
                    <button
                      key={industry.id}
                      type="button"
                      onMouseEnter={() =>
                        handleActivateIndustry(
                          industry.id
                        )
                      }
                      onFocus={() =>
                        handleActivateIndustry(
                          industry.id
                        )
                      }
                      onClick={() =>
                        handleActivateIndustry(
                          industry.id
                        )
                      }
                      className="group flex cursor-pointer items-center gap-2 text-left transition-transform duration-200 outline-none hover:-translate-y-0.5 sm:gap-3 lg:gap-4"
                      aria-pressed={
                        isActive
                      }
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 sm:h-10 sm:w-10 sm:rounded-lg lg:h-11 lg:w-11 lg:rounded-xl ${isActive ? "border-blue-500 bg-blue-50 text-blue-600" : "border-black/15 bg-white text-black/80 group-hover:border-blue-300 group-hover:text-blue-600"}`}
                      >
                        {industry.icon}
                      </span>

                      <span
                        className={`text-xs leading-5 font-semibold transition-colors duration-200 sm:text-sm sm:leading-6 md:text-[15px] ${isActive ? "text-blue-600" : "text-black/90 group-hover:text-blue-600"}`}
                      >
                        {industry.label}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
