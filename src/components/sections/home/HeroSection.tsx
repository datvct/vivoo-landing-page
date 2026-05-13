"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
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
    title: "Scalable security. Leading analytics.",
    description:
      "Easy-to-use integrated solutions for faster responses and future-proof protection.",
    buttonText: "2026 PHYSICAL SECURITY GUIDE",
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
    title: "Secure, compliant visitor access",
    description:
      "Transform visitor access with faster check-ins and complete guest oversight.",
    buttonText: "EXPLORE VISITOR",
    duration: 10000,
    type: "image",
    image: "/images/image1.avif",
    tab: "Try Visitor for free",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [entering, setEntering] = useState(false);

  const activeSlide = slides[currentSlide];
  const isEvenSlide = currentSlide % 2 === 1;

  const nextSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setProgress(0);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const duration = activeSlide.duration;
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = (elapsed / duration) * 100;

      setProgress(percent);

      if (elapsed >= duration) {
        nextSlide();
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeSlide.duration]);

  // VIDEO PLAY
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play();
    }
  }, [currentSlide]);

  // play enter animation on slide change
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntering(true));
    const t = setTimeout(() => setEntering(false), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [currentSlide]);

  return (
    <section className="relative h-212.5 overflow-hidden bg-[#f4f4f4]">
      {!isEvenSlide && (
        <div className="absolute inset-0 z-0">
          {activeSlide.type === "video" ? (
            <video
              ref={videoRef}
              key={activeSlide.video}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={activeSlide.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={activeSlide.image ?? ""}
              alt={activeSlide.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      )}

      <div className="absolute inset-0 z-10 w-[40%] bg-linear-to-r from-white/95 via-white/60 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full gap-10 max-w-7xl items-center px-10">
        <div className={`max-w-1/2 ${entering ? "animate-slide-up" : ""}`}>
          <h1 className="mb-8 text-[76px] font-bold leading-20.5 tracking-[-2px] text-black">
            {activeSlide.title}
          </h1>

          <p className="mb-10 text-[24px] leading-10 text-black/80">
            {activeSlide.description}
          </p>

          <button className="rounded-full bg-black px-10 py-5 text-sm font-semibold text-white transition hover:bg-neutral-800">
            {activeSlide.buttonText}
          </button>
        </div>
        {isEvenSlide && (
          <div className="absolute inset-y-0 right-0 w-1/2 z-0 flex items-center justify-center px-8">
            <div className={`relative w-[88%] max-w-210 aspect-video overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 ${entering ? "animate-slide-up" : ""}`}>
              {activeSlide.type === "video" ? (
                <video
                  ref={videoRef}
                  key={activeSlide.video}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={activeSlide.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={activeSlide.image ?? ""}
                  alt={activeSlide.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}

            </div>
          </div>
        )}
        <button
          onClick={prevSlide}
          className="absolute cursor-pointer -left-10 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:bg-white"
        >
          <ArrowLeft size={28} color="black" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute cursor-pointer -right-10 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:bg-white"
        >
          <ArrowRight size={28} color="black" />
        </button>
      </div>



      <div className="absolute bottom-12.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="group flex min-w-45 flex-col cursor-pointer items-center"
          >
            {/* TITLE */}
            <span
              className={`mb-3 text-lg group-hover:text-black font-semibold whitespace-nowrap transition ${currentSlide === index
                ? "text-black"
                : "text-black/50"
                }`}
            >
              {slide.tab}
            </span>

            {/* LINE */}
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-black/10 group-hover:bg-black">
              {currentSlide === index && (
                <div
                  className="absolute left-0 top-0 h-full bg-black transition-all duration-100"
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
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slideUp 600ms cubic-bezier(.22,.9,.3,1) both;
}
`;

// attach styles to document (simple and local)
if (typeof window !== "undefined") {
  const id = "hero-section-animations";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.innerHTML = styles;
    document.head.appendChild(s);
  }
}