export type BannerSlide = {
  id: number;
  image: string;
  alt: string;
};

export type Industry = {
  id: string;
  label: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export type Story = {
  id: number;
  company: string;
  title: string;
  quote: string;
  author: string;
  image: string;
  logo: string;
};

export type ComplianceItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
};
