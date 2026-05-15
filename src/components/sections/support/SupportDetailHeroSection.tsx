import Image from "next/image";

type SupportDetailHeroSectionProps = {
  title: string;
  subtitle: string;
  image: string;
};

export default function SupportDetailHeroSection({
  title,
  subtitle,
  image,
}: SupportDetailHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#f3f3f3]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-white/92 via-white/70 to-white/15" />
      <div className="relative mx-auto flex min-h-60 max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-md text-center lg:text-left">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-black sm:text-4xl lg:text-[42px]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-black/60 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
