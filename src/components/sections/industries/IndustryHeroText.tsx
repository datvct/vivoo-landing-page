import Link from "next/link";

type IndustryHeroTextProps = {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
};

export default function IndustryHeroText({
    title,
    description,
    primaryCta,
    secondaryCta,
}: IndustryHeroTextProps) {
    return (
        <div className="max-w-xl">
            <h1 className="text-[42px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[56px] lg:text-[64px]">
                {title}
            </h1>

            <p className="mt-6 max-w-lg text-[16px] leading-8 text-black/65 sm:text-[18px]">
                {description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                    href="#"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-black/85"
                >
                    {primaryCta}
                </Link>
                <Link
                    href="#"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-black/40 bg-white px-7 text-sm font-semibold text-black transition hover:border-black/60 hover:bg-black/5"
                >
                    {secondaryCta}
                </Link>
            </div>
        </div>
    );
}