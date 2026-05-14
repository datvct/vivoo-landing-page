import Image from "next/image";
import Link from "next/link";

type Props = {
  title?: string;
  intro?: string;
  imageSrc?: string;
  heading?: string;
  paragraphs?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ProductBenefitsSection({
  title = "Key benefits of Avigilon’s dome cameras",
  intro = "Whether you're protecting a large retail store or a small meeting room, obtain the level of image detail you need to safeguard your facility with our robust range of dome security CCTV camera systems.",
  imageSrc = "/images/camera-2.avif",
  heading = "Compact, yet powerful",
  paragraphs = [
    "When you need discreet monitoring solutions, a dome camera offers the perfect option. Its compact shape blends in easily with surroundings, while its modular design easily snaps into various mounting adapters for quick and easy installations.",
    "Packed with powerful AI-enabled features to help you respond faster to critical events. Effortlessly monitor areas of interest and obtain superior situational awareness with the wide field of view that dome cameras bring.",
  ],
  ctaLabel = "Get a demo",
  ctaHref = "#",
}: Props) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sm:text-[28px} text-lg font-medium text-black">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-black/60">
            {intro}
          </p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-140">
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={imageSrc}
                alt="benefit image"
                fill
                sizes="(min-width:1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mx-auto max-w-xl lg:pr-8">
            <h3 className="text-base font-semibold text-black">
              {heading}
            </h3>
            <div className="mt-4 space-y-4 text-sm text-black/70">
              {paragraphs.map(
                (p, i) => (
                  <p key={i}>{p}</p>
                )
              )}
            </div>
            <div className="mt-6">
              <Link
                href={ctaHref}
                className="text-sm font-semibold text-blue-600"
              >
                {ctaLabel}{" "}
                <span aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
