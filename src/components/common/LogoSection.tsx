import Image from "next/image";

type LogoSectionProps = {
  title?: string;
  logos?: string[];
};

const defaultLogos = [
  "/images/logo-epcb.png",
  "/images/logo-vivoo.png",
  "/images/logo-epcb.png",
  "/images/logo-vivoo.png",
  "/images/logo-epcb.png",
];

export default function LogoSection({
  title = "Trusted by 100,000+ organizations globally",
  logos = defaultLogos,
}: LogoSectionProps) {
  const activeLogos = logos && logos.length > 0 ? logos : defaultLogos;

  return (
    <section className="flex flex-col gap-5 bg-[#FCFCFC] py-6 sm:py-10 lg:py-12">
      <h2 className="px-4 text-center text-lg font-semibold text-black sm:text-3xl">
        {title}
      </h2>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 text-black sm:gap-8 md:gap-12 lg:gap-20">
        {activeLogos.map((logo, index) => (
          <Image
            key={index}
            src={logo || "/images/logo-vivoo.png"}
            alt="Trusted company logo"
            width={80}
            height={40}
            className="h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-15 lg:w-30"
          />
        ))}
      </div>
    </section>
  );
}
