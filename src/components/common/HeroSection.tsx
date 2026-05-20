import Breadcrumb from "@/components/common/Breadcrumb";
import SolutionHeroMedia from "@/components/common/HeroMedia";
import SolutionHeroText from "@/components/common/HeroText";
import { SolutionHeroSectionProps } from "@/types/solution-types";

export default function SolutionHeroSection({
  title,
  description,
  image,
  primaryCta,
  secondaryCta,
  primaryActionHref,
  secondaryActionHref,
  breadcrumbs = [],
}: SolutionHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#f6f6f6]">
      <div className="relative mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <Breadcrumb
          items={breadcrumbs}
        // currentLabel={title}
        />
      </div>
      <div className="relative mx-auto flex h-121.25 max-w-7xl items-center px-4 py-8 sm:px-10 sm:py-16">
        <div className="relative z-20 w-full lg:w-1/2">
          <SolutionHeroText
            title={title}
            description={description}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            primaryActionHref={primaryActionHref}
            secondaryActionHref={secondaryActionHref}
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
