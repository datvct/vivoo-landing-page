import Image from "next/image";

export default function LogoSection() {
  return (
    <section className="flex flex-col gap-5 bg-[#FCFCFC] py-8 sm:py-10 lg:py-12">
      <h2 className="px-4 text-center text-lg font-semibold text-black sm:text-xl md:text-2xl">
        Trusted by 100,000+
        organizations globally
      </h2>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 text-black sm:gap-8 md:gap-12 lg:gap-20">
        <Image
          src="/images/logo-epcb.png"
          alt="EPCB logo"
          width={80}
          height={40}
          className="h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-15 lg:w-30"
        />
        <Image
          src="/images/logo-vivoo.png"
          alt="VIVOO logo"
          width={80}
          height={40}
          className="h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-15 lg:w-30"
        />
        <Image
          src="/images/logo-epcb.png"
          alt="EPCB logo"
          width={80}
          height={40}
          className="h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-15 lg:w-30"
        />
        <Image
          src="/images/logo-vivoo.png"
          alt="VIVOO logo"
          width={80}
          height={40}
          className="h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-15 lg:w-30"
        />
        <Image
          src="/images/logo-epcb.png"
          alt="EPCB logo"
          width={80}
          height={40}
          className="h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24 lg:h-15 lg:w-30"
        />
      </div>
    </section>
  );
}
