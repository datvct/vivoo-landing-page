import Image from "next/image";

type SupportWeekendSectionProps = {
  title: string;
  description: string;
  image: string;
};

export default function SupportWeekendSection({
  title,
  description,
  image,
}: SupportWeekendSectionProps) {
  return (
    <section className="bg-[#f7f7f7] py-12">
      <div className="mx-auto grid max-w-4xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-[30px]">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
            {description}
          </p>
        </div>

        <div className="relative min-h-48 overflow-hidden bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
