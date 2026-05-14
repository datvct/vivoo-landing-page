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
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-[30px] font-medium tracking-[-0.02em] text-black sm:text-[36px]">
                        {title}
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/60 sm:text-base">
                        {description}
                    </p>
                </div>

                <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
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
                        <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-black sm:text-[28px]">
                            {sideTitle}
                        </h3>
                        <p className="mt-4 max-w-xl text-[15px] leading-7 text-black/60 sm:text-base">
                            {sideDescription}
                        </p>

                        <div className="mt-8 space-y-7">
                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div key={feature.title} className="flex gap-4">
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-black/80">
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <div>
                                            <h4 className="text-[15px] font-semibold leading-6 text-black/85">
                                                {feature.title}
                                            </h4>
                                            <p className="mt-1 max-w-lg text-[14px] leading-7 text-black/60">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
