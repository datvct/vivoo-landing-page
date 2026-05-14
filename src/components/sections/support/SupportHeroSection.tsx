type SupportHeroSectionProps = {
    title: string;
    description: string;
};

export default function SupportHeroSection({ title, description }: SupportHeroSectionProps) {
    return (
        <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-black sm:text-4xl lg:text-[44px]">
                {title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
                {description}
            </p>
        </div>
    );
}
