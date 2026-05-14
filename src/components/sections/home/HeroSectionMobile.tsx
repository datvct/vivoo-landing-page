"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

type SlideType = {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  duration: number;
  type: "video" | "image";
  video?: string;
  image?: string;
  tab: string;
};

const slides: SlideType[] = [
  {
    id: 1,
    title:
      "Scalable security. Leading analytics.",
    description:
      "Easy-to-use integrated solutions for faster responses and future-proof protection.",
    buttonText:
      "2026 PHYSICAL SECURITY GUIDE",
    duration: 12000,
    type: "video",
    video: "/videos/hero-1.mp4",
    tab: "Discover Avigilon",
  },

  {
    id: 2,
    title: "Unlock smarter security",
    description:
      "Advanced AI-powered monitoring helps businesses improve safety and operational efficiency.",
    buttonText: "EXPLORE AI",
    duration: 8000,
    type: "video",
    video: "/videos/hero-2.mp4",
    tab: "Unlock smarter security",
  },

  {
    id: 3,
    title: "See farther. Move faster.",
    description:
      "The H6A PTZ camera gives you real-time control and long-range detail.",
    buttonText: "VIEW PRODUCT",
    duration: 9000,
    type: "video",
    video: "/videos/hero-3.mp4",
    tab: "Our newest camera",
  },

  {
    id: 4,
    title:
      "Secure, compliant visitor access",
    description:
      "Transform visitor access with faster check-ins and complete guest oversight.",
    buttonText: "EXPLORE VISITOR",
    duration: 10000,
    type: "image",
    image: "/images/image1.avif",
    tab: "Try Visitor for free",
  },
];

export default function HeroSectionMobile() {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const [progress, setProgress] =
    useState(0);

  const intervalRef =
    useRef<NodeJS.Timeout | null>(null);

  // const videoRef =
  //   useRef<HTMLVideoElement | null>(
  //     null
  //   );

  const [entering, setEntering] =
    useState(false);

  const activeSlide =
    slides[currentSlide];

  const isEvenSlide =
    currentSlide % 2 === 1;

  const nextSlide = () => {
    setProgress(0);

    setCurrentSlide((prev) =>
      prev === slides.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevSlide = () => {
    setProgress(0);

    setCurrentSlide((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setProgress(0);
    setCurrentSlide(index);
  };

  // AUTO SLIDE
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(
        intervalRef.current
      );
    }

    const duration =
      activeSlide.duration;

    const start = Date.now();

    intervalRef.current = setInterval(
      () => {
        const elapsed =
          Date.now() - start;

        const percent =
          (elapsed / duration) * 100;

        setProgress(percent);

        if (elapsed >= duration) {
          nextSlide();
        }
      },
      100
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        );
      }
    };
  }, [activeSlide.duration]);

  // useEffect(() => {
  //   const playVideo = async () => {
  //     try {
  //       if (videoRef.current) {
  //         videoRef.current.currentTime = 0;

  //         await videoRef.current.play();
  //       }
  //     } catch (error) {
  //       console.log(
  //         "Video autoplay prevented:",
  //         error
  //       );
  //     }
  //   };

  //   playVideo();
  // }, [currentSlide]);

  // ENTER ANIMATION
  useEffect(() => {
    const raf = requestAnimationFrame(
      () => setEntering(true)
    );

    const t = setTimeout(
      () => setEntering(false),
      800
    );

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [currentSlide]);

  return (
    <section className="relative bg-[#f4f4f4] lg:h-212.5">
      {/* DESKTOP BACKGROUND */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        {activeSlide.type ===
        "video" ? (
          <video
            key={`desktop-bg-${activeSlide.video}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source
              src={activeSlide.video}
              type="video/mp4"
            />
          </video>
        ) : (
          <Image
            src={
              activeSlide.image ?? ""
            }
            alt={activeSlide.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* DESKTOP OVERLAY (left-side gradient to fade background under text) */}
      <div className="hidden lg:absolute lg:inset-y-0 lg:left-0 lg:z-10 lg:block lg:w-[42%] lg:bg-linear-to-r lg:from-white/95 lg:via-white/75 lg:to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-6 lg:h-full lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-0">
        {/* LEFT CONTENT */}
        <div
          className={`w-full pb-8 lg:max-w-1/2 lg:pb-0 ${
            entering
              ? "animate-slide-up"
              : ""
          }`}
        >
          <h1 className="mb-4 text-[42px] leading-[1.05] font-bold tracking-[-1px] text-black sm:text-5xl lg:mb-8 lg:text-[76px] lg:leading-20.5 lg:tracking-[-2px]">
            {activeSlide.title}
          </h1>

          <p className="mb-6 max-w-xl text-[17px] leading-7 text-black/80 sm:text-lg lg:mb-10 lg:text-[24px] lg:leading-10">
            {activeSlide.description}
          </p>

          <button className="rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 lg:px-10 lg:py-5">
            {activeSlide.buttonText}
          </button>
        </div>

        {/* MOBILE MEDIA */}
        <div className="relative block w-full lg:hidden">
          <div
            className={`relative aspect-16/10 overflow-hidden rounded-2xl ${
              entering
                ? "animate-slide-up"
                : ""
            }`}
          >
            {activeSlide.type ===
            "video" ? (
              <video
                key={`mobile-${activeSlide.video}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              >
                <source
                  src={
                    activeSlide.video
                  }
                  type="video/mp4"
                />
              </video>
            ) : (
              <Image
                src={
                  activeSlide.image ??
                  ""
                }
                alt={activeSlide.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {/* MOBILE DOTS */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  goToSlide(index)
                }
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-black"
                    : "bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP RIGHT MEDIA */}
        {isEvenSlide && (
          <div className="z-0 hidden w-full items-center justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-1/2 lg:px-8">
            <div
              className={`relative aspect-video w-[88%] max-w-[840px] overflow-hidden rounded-[32px] shadow-2xl ring-1 ring-white/10 ${
                entering
                  ? "animate-slide-up"
                  : ""
              }`}
            >
              {activeSlide.type ===
              "video" ? (
                <video
                  key={`desktop-right-${activeSlide.video}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                >
                  <source
                    src={
                      activeSlide.video
                    }
                    type="video/mp4"
                  />
                </video>
              ) : (
                <Image
                  src={
                    activeSlide.image ??
                    ""
                  }
                  alt={
                    activeSlide.title
                  }
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        )}

        {/* DESKTOP ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-5 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:bg-white lg:flex"
          aria-label="Previous slide"
        >
          <ArrowLeft
            size={26}
            color="black"
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-5 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:bg-white lg:flex"
          aria-label="Next slide"
        >
          <ArrowRight
            size={26}
            color="black"
          />
        </button>
      </div>

      {/* DESKTOP TABS */}
      <div className="absolute bottom-12 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-10 lg:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() =>
              goToSlide(index)
            }
            className="group flex min-w-[180px] cursor-pointer flex-col items-center"
          >
            <span
              className={`mb-3 text-lg font-semibold whitespace-nowrap transition ${
                currentSlide === index
                  ? "text-black"
                  : "text-black/45"
              }`}
            >
              {slide.tab}
            </span>

            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-black/10">
              {currentSlide ===
                index && (
                <div
                  className="absolute top-0 left-0 h-full bg-black transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

const styles = `
@keyframes slideUp {
  from {
    transform: translateY(24px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 700ms cubic-bezier(.22,.9,.3,1) both;
}
`;

if (typeof window !== "undefined") {
  const id = "hero-section-animations";

  if (!document.getElementById(id)) {
    const s =
      document.createElement("style");

    s.id = id;
    s.innerHTML = styles;

    document.head.appendChild(s);
  }
}
