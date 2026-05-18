export type Tab = {
  id: string;
  title: string;
  text: string;
  image: string;
  slug?: string;
};

export type SolutionHeroSectionProps = {
  title: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
};

export type SolutionHeroTextProps = {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};
