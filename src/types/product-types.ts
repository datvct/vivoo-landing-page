export type ProductItem = {
  title: string;
  description: string;
  image: string;
  linkLabel: string;
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
