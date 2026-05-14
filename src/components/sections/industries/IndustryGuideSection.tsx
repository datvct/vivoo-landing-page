import Image from "next/image";
import Link from "next/link";

type IndustryGuideSectionProps = {
    title: string;
    description: string;
    image: string;
    buttonLabel: string;
};

export default function IndustryGuideSection({
    title,
    description,
    image,
    buttonLabel,
}: IndustryGuideSectionProps) {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16 lg:px-10">
                <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
                    <div className="relative h-105 w-full max-w-140">
                        <div className="absolute left-4 top-10 h-75 w-55 -rotate-12 overflow-hidden rounded-lg bg-white shadow-[0_20px_45px_rgba(15,23,42,0.18)] ring-1 ring-black/5">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="(max-width: 1024px) 60vw, 220px"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute left-35 top-0 h-87.5 w-65 overflow-hidden rounded-2xl bg-[#2f2f2f] shadow-[0_24px_60px_rgba(15,23,42,0.22)] ring-1 ring-black/10">
                            <div className="absolute inset-4 overflow-hidden rounded-xl bg-white">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 1024px) 70vw, 260px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 lg:pl-4">
                    <div className="max-w-xl">
                        <h2 className="text-[30px] font-medium tracking-[-0.02em] text-black sm:text-[36px] lg:text-[40px]">
                            {title}
                        </h2>
                        <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 sm:text-base">
                            {description}
                        </p>

                        <Link
                            href="#"
                            className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-black/40 bg-white px-6 text-sm font-semibold text-black transition hover:border-black/60 hover:bg-black/5"
                        >
                            {buttonLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}