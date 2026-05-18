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
    <section className="bg-white py-6 text-black sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:mt-4 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.04)]"
            >
              <div
                className={`h-2 w-full ${card.accentClassName}`}
              />

              <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
                <h3 className="text-[22px] font-normal tracking-[-0.02em] text-black sm:text-[30px]">
                  {card.title}
                </h3>

                <p className="mt-2 text-base leading-6 font-semibold text-black sm:mt-3 sm:text-[18px] sm:leading-7">
                  {card.subtitle}
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:mt-4 sm:text-[15px] sm:leading-7">
                  {card.description}
                </p>

                <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                  {card.bullets.map(
                    (bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-6 text-black/70 sm:text-[15px] sm:leading-7"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-black/45 sm:mt-1 sm:h-5 sm:w-5" />
                        <span>
                          {bullet}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                <div className="relative aspect-4/3 overflow-hidden rounded-md bg-[#f5f7fa] ring-1 ring-black/5">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-contain p-3 sm:p-4"
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
