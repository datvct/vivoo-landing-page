type BlogHeroSectionProps = {
    title: string;
};

export default function BlogHeroSection({ title }: BlogHeroSectionProps) {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px]">
                {title}
            </h1>
        </div>
    );
}
