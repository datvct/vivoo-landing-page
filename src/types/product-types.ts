export type ProductItem = {
  title: string;
  description: string;
  image: string;
  linkLabel?: string;
  href?: string;
  category?: string;
  price?: string;
  badges?: string[];
};

export type ProductGridSectionProps = {
  title: string;
  description: string;
  products: ProductItem[];
  showViewAll?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
};

export type ProductDetail = {
  slug: string;
  breadcrumbs: (
    | string
    | { label: string; href?: string }
  )[];
  title: string;
  categoryLabel: string;
  badges: string[];
  description: string;
  features: string[];
  primaryActionLabel: string;
  primaryActionHref: string;
  thumbnails: {
    src: string;
    alt: string;
  }[];
  detail:string
};
