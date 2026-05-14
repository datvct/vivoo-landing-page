import SolutionHeroMedia from "@/components/common/HeroMedia";
import SolutionHeroText from "@/components/common/HeroText";

type SolutionHeroSectionProps = {
  title: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
};
export default function SolutionHeroSection({
  title,
  description,
  image,
  primaryCta,
  secondaryCta,
}: SolutionHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#f6f6f6]">
      <div className="relative mx-auto flex h-121.25 max-w-7xl items-center px-6 py-16 lg:px-10">
        <div className="relative z-20 w-full lg:w-1/2">
          <SolutionHeroText
            title={title}
            description={description}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
          />
        </div>
      </div>

      <div className="relative z-10 h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55vw]">
        <SolutionHeroMedia
          image={image}
          title={title}
        />
      </div>
    </section>
  );
}
