import Link from "next/link";
import type { SupportResourceCard } from "../../../types/support-detail-types";

type SupportResourcesSectionProps = {
  title: string;
  description: string;
  callToActionLabel: string;
  cards: SupportResourceCard[];
};

const toneClasses: Record<
  SupportResourceCard["tone"],
  string
> = {
  blue: "bg-[#2f66c7] text-white",
  dark: "bg-[#1f4c95] text-white",
  gray: "bg-[#5f5f60] text-white",
};

export default function SupportResourcesSection({
  title,
  description,
  callToActionLabel,
  cards,
}: SupportResourcesSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-[30px]">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-black/60 sm:text-base">
          {description}{" "}
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-700"
          >
            {callToActionLabel}
          </Link>
          .
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl overflow-hidden bg-[#111] p-8 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
        <div className="flex min-h-62.5 flex-col justify-end rounded-sm bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.25))] p-6 text-center">
          <div className="mx-auto max-w-xl">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">
              Resources
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Find what you need faster
              through our online
              self-service community,
              where you can access
              technical resources,
              troubleshooting guides and
              more.
            </p>
            <button className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-xs font-semibold tracking-[0.08em] text-black uppercase transition hover:bg-white/90">
              Visit the support
              community
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 grid max-w-7xl gap-0 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`min-h-50 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] md:p-5 ${toneClasses[card.tone]}`}
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em]">
              {card.title}
            </h3>
            <p className="mt-2 text-[11px] leading-5 opacity-90">
              {card.description}
            </p>
            <button className="mt-4 inline-flex h-8 items-center justify-center rounded-full border border-white/70 px-4 text-[10px] font-semibold tracking-[0.08em] uppercase transition hover:bg-white hover:text-black">
              {card.buttonLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
