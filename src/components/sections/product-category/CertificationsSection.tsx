import Image from "next/image";

export default function CertificationsSection() {
  const logos = [
    {
      src: "/images/logo-onvif.png",
      alt: "ONVIF",
    },
    {
      src: "/images/logo-fips.png",
      alt: "FIPS",
    },
    {
      src: "/images/logo-safety.png",
      alt: "SAFETY",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-lg font-semibold text-black sm:text-[28px]">
            Compliance and
            certifications
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-black/60">
            The high performance,
            security and quality of
            Avigilon dome cameras is
            backed by a number of
            industry-leading
            certifications and
            standards.
          </p>
        </div>

        <div className="mt-10">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-8 py-8">
            {logos.map((l) => (
              <div
                key={l.alt}
                className="flex w-1/2 items-center justify-center sm:w-1/4"
              >
                <div className="mx-auto text-center">
                  <div className="relative mx-auto h-12 w-full">
                    <Image
                      src={l.src}
                      alt={l.alt}
                      fill
                      sizes="120px"
                      className="object-contain grayscale"
                    />
                  </div>
                  <div className="mt-3 text-xs font-semibold text-black">
                    {l.alt} Comformant
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
