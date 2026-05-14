import Link from "next/link";
import type { SupportContactCard } from "../../../types/support-detail-types";

type SupportContactSectionProps = {
  title: string;
  description: string;
  cards: SupportContactCard[];
};

export default function SupportContactSection({
  title,
  description,
  cards,
}: SupportContactSectionProps) {
  return (
    <section className="bg-[#f7f7f7] py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-[30px]">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-6 text-black/55 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-7xl gap-3 md:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex min-h-60 flex-col items-center justify-between bg-white px-4 py-5 text-center shadow-[0_12px_28px_rgba(15,23,42,0.08)] ring-1 ring-black/5"
            >
              <div>
                <div className="text-2xl">
                  {card.icon}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-black">
                  {card.title}
                </h3>
                <p className="mt-2 text-[12px] leading-5 text-black/55">
                  {card.description}
                </p>
              </div>
              <Link
                href="#"
                className="mt-4 inline-flex h-8 items-center justify-center rounded-full bg-black px-4 text-[10px] font-semibold tracking-[0.08em] text-white uppercase transition hover:bg-black/85"
              >
                {card.buttonLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
