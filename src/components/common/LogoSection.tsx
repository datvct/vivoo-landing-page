import Image from "next/image";

export default function LogoSection() {
  return (
    <section className="flex flex-col gap-5 bg-[#FCFCFC] py-12">
      <h2 className="text-center text-2xl font-semibold text-black">
        Trusted by 100,000+
        organizations globally
      </h2>
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-20 text-black">
        <Image
          src="/images/logo-epcb.png"
          alt="EPCB logo"
          width={120}
          height={60}
        />
        <Image
          src="/images/logo-vivoo.png"
          alt="EPCB logo"
          width={120}
          height={60}
        />
        <Image
          src="/images/logo-epcb.png"
          alt="EPCB logo"
          width={120}
          height={60}
        />
        <Image
          src="/images/logo-vivoo.png"
          alt="EPCB logo"
          width={120}
          height={60}
        />
        <Image
          src="/images/logo-epcb.png"
          alt="EPCB logo"
          width={120}
          height={60}
        />
      </div>
    </section>
  );
}
