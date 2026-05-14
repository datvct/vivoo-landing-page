import IndustryHeroMedia from "./IndustryHeroMedia";
import IndustryHeroText from "./IndustryHeroText";

type IndustryHeroSectionProps = {
    title: string;
    description: string;
    image: string;
    primaryCta: string;
    secondaryCta: string;
};
export default function IndustryHeroSection({
    title,
    description,
    image,
    primaryCta,
    secondaryCta,
}: IndustryHeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-[#f6f6f6]">
            {/* Container cho nội dung - Luôn căn giữa 1280px */}
            <div className="relative mx-auto max-w-7xl px-6 py-16 h-121.25 lg:px-10 flex items-center">
                <div className="relative z-20 w-full lg:w-1/2">
                    <IndustryHeroText
                        title={title}
                        description={description}
                        primaryCta={primaryCta}
                        secondaryCta={secondaryCta}
                    />
                </div>
            </div>

            <div className="relative h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55vw] z-10">
                <IndustryHeroMedia image={image} title={title} />
            </div>
        </section>
    );
}