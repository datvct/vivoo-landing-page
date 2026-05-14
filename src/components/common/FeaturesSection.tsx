import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FeaturesSectionProps = {
  title: string;
  description: string;
  image: string;
  features: FeatureItem[];
  sideTitle?: string;
  sideDescription?: string;
};

export default function FeaturesSection({
  title,
  description,
  image,
  features,
  sideTitle = "Powerful security system features",
  sideDescription = "Empower your teams and secure your facilities with Avigilon Unity on-premise and cloud-native solutions.",
}: FeaturesSectionProps) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[24px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/60 sm:mt-5 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="flex justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-112.5 overflow-hidden rounded-sm bg-neutral-100 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="pt-2 lg:pt-6">
            <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-black sm:text-[28px]">
              {sideTitle}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/60 sm:mt-4 sm:text-base sm:leading-7">
              {sideDescription}
            </p>

            <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-7">
              {features.map(
                (feature) => {
                  const Icon =
                    feature.icon;

                  return (
                    <div
                      key={
                        feature.title
                      }
                      className="flex gap-3 sm:gap-4"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-black/80 sm:h-10 sm:w-10">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>

                      <div>
                        <h4 className="text-sm leading-6 font-semibold text-black/85 sm:text-[15px]">
                          {
                            feature.title
                          }
                        </h4>
                        <p className="mt-1 max-w-lg text-sm leading-6 text-black/60 sm:text-[14px] sm:leading-7">
                          {
                            feature.description
                          }
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
