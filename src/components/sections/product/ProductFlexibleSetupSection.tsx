import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

type FlexibleSetupCard = {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  accentClassName: string;
};

type ProductFlexibleSetupSectionProps =
  {
    title: string;
    description: string;
    cards: FlexibleSetupCard[];
  };

export default function ProductFlexibleSetupSection({
  title,
  description,
  cards,
}: ProductFlexibleSetupSectionProps) {
  return (
    <section className="bg-white py-20 text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-black/60 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.04)]"
            >
              <div
                className={`h-2 w-full ${card.accentClassName}`}
              />

              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <h3 className="text-[26px] font-normal tracking-[-0.02em] text-black sm:text-[30px]">
                  {card.title}
                </h3>

                <p className="mt-3 text-[18px] leading-7 font-semibold text-black">
                  {card.subtitle}
                </p>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-black/60">
                  {card.description}
                </p>

                <ul className="mt-6 space-y-4">
                  {card.bullets.map(
                    (bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-[15px] leading-7 text-black/70"
                      >
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-black/45" />
                        <span>
                          {bullet}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <div className="relative aspect-4/3 overflow-hidden rounded-md bg-[#f5f7fa] ring-1 ring-black/5">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
