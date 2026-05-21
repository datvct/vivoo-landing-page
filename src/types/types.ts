export type NavItem = {
  key: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

export const APP_LOCALES = [
  { value: "vi", label: "Vietnamese" },
  { value: "en", label: "English" }
];

export type User = {
  id: string;
  email: string;
  displayName?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
  role:
    | "ADMIN"
    | "EDITOR"
    | "VIEWER"
    | string;
  createdAt: string;
  updatedAt?: string;
};

export type UserFormValues = {
  id?: string;
  email: string;
  displayName?: string | null;
  role: string;
  isActive: boolean;
  password?: string;
};

export type ProductCategoryStatus = "draft" | "scheduled" | "published" | "archived";

export type ProductCategory = {
  id: string;
  slug: string;
  locale: string;
  translationGroup: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  thumbnailMediaId?: string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
  heroCtaLabel?: string | null;
  heroCtaHref?: string | null;
  benefitsTitle?: string | null;
  benefitsDescription?: string | null;
  featureTitle?: string | null;
  featureBody?: string | null;
  featureImageUrl?: string | null;
  featureLinkLabel?: string | null;
  featureLinkHref?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
  sortOrder: number;
  status: ProductCategoryStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
};

export type ProductCategoryFilters = {
  page?: number;
  limit?: number;
  search?: string;
  locale?: string;
  status?: ProductCategoryStatus;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export type ProductCategoryFormValues = {
  id?: string;
  slug: string;
  locale?: string;
  translationGroup?: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  thumbnail?: File;
  heroTitle?: string | null;
  heroDescription?: string | null;
  heroCtaLabel?: string | null;
  heroCtaHref?: string | null;
  benefitsTitle?: string | null;
  benefitsDescription?: string | null;
  featureTitle?: string | null;
  featureBody?: string | null;
  featureImageUrl?: string | null;
  featureImage?: File;
  featureLinkLabel?: string | null;
  featureLinkHref?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
  sortOrder?: number;
  status: ProductCategoryStatus;
  publishedAt?: string | null;
};

export type ProductStatus = "draft" | "published";

export type ProductGalleryItem = {
  mediaId: string;
  url: string;
  title?: string | null;
  sortOrder?: number;
};

export type Product = {
  id: string;
  categoryId?: string | null;
  slug: string;
  locale: string;
  translationGroup: string;
  title: string;
  categoryLabel?: string | null;
  thumbnailUrl?: string | null;
  thumbnailMediaId?: string | null;
  badges?: string[];
  description?: string | null;
  contents?: any;
  benefits?: any;
  features?: string[];
  primaryActionLabel?: string | null;
  primaryActionHref?: string | null;
  productGalleryItems?: ProductGalleryItem[];
  video?: string | null;
  sortOrder: number;
  status: ProductStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  category?: any;
  relatedProducts?: any[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
};

export type ProductFilters = {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  locale?: string;
  status?: ProductStatus;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export type ProductFormValues = {
  id?: string;
  slug: string;
  locale?: string;
  translationGroup?: string;
  title: string;
  categoryId?: string | null;
  categoryLabel?: string | null;
  description?: string | null;
  badges?: string[];
  features?: string[];
  contents?: any;
  benefits?: any;
  primaryActionLabel?: string | null;
  primaryActionHref?: string | null;
  sortOrder?: number;
  status: ProductStatus;
  publishedAt?: string | null;
  thumbnail?: any; // For thumbnail upload (File object)
  galleryImages?: any[]; // For gallery upload (File[] array)
  productGalleryItems?: string; // JSON string of old/existing gallery items
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
};

export type SolutionStatus = "draft" | "scheduled" | "published" | "archived";

export type Solution = {
  id: string;
  slug: string;
  locale: string;
  translationGroup: string;
  title: string;
  primaryActionHref?: string | null;
  secondaryActionHref?: string | null;
  content?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
  status: SolutionStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
};

export type SolutionFilters = {
  page?: number;
  limit?: number;
  status?: SolutionStatus;
  search?: string;
  locale?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export type SolutionFormValues = {
  id?: string;
  slug: string;
  locale?: string;
  translationGroup?: string;
  title: string;
  primaryActionHref?: string | null;
  secondaryActionHref?: string | null;
  content?: string | null;
  description?: string | null;
  thumbnail?: any;
  thumbnailUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
  status: SolutionStatus;
  publishedAt?: string | null;
};

export type ServiceStatus = "draft" | "scheduled" | "published" | "archived";

export type Service = {
  id: string;
  slug: string;
  locale: string;
  translationGroup: string;
  title: string;
  primaryActionHref?: string | null;
  secondaryActionHref?: string | null;
  content?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
  status: ServiceStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
};

export type ServiceFilters = {
  page?: number;
  limit?: number;
  status?: ServiceStatus;
  search?: string;
  locale?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
};

export type ServiceFormValues = {
  id?: string;
  slug: string;
  locale?: string;
  translationGroup?: string;
  title: string;
  primaryActionHref?: string | null;
  secondaryActionHref?: string | null;
  content?: string | null;
  description?: string | null;
  thumbnail?: any;
  thumbnailUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoRobots?: string | null;
  status: ServiceStatus;
  publishedAt?: string | null;
};

export type Media = {
  id: string;
  provider: string;
  cloudinaryPublicId: string;
  resourceType: string;
  url: string;
  secureUrl: string;
  folder?: string | null;
  originalFilename?: string | null;
  mimeType?: string | null;
  fileSize?: string | null;
  width?: number | null;
  height?: number | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MediaFilters = {
  page?: number;
  limit?: number;
};

export type MediaListResponseData = {
  items: Media[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export type ContactStatus = "new" | "received" | "processed";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  postal?: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
};

export type ContactFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: ContactStatus;
};

export type ContactListResponseData = {
  items: Contact[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export type CreateContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  postal?: string;
  message: string;
};

export type GeneralFAQ = {
  id: string;
  question: string;
  answer: string;
};

export type GeneralResource = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  type?: string;
};

export type GeneralSettings = {
  siteTitle: string;
  siteDescription: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  supportEmail?: string;
  supportPhone?: string;
  supportAddress?: string;
  businessHours?: string;
  copyrightText?: string;
  footerDescription?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  faqs?: GeneralFAQ[];
  resources?: GeneralResource[];
  
  // Page SEO Settings
  seoHomeTitle?: string;
  seoHomeDescription?: string;
  seoHomeKeywords?: string;
  seoHomeRobots?: string;

  seoSolutionsTitle?: string;
  seoSolutionsDescription?: string;
  seoSolutionsKeywords?: string;
  seoSolutionsRobots?: string;

  seoServicesTitle?: string;
  seoServicesDescription?: string;
  seoServicesKeywords?: string;
  seoServicesRobots?: string;

  seoContactTitle?: string;
  seoContactDescription?: string;
  seoContactKeywords?: string;
  seoContactRobots?: string;
};

export type HeaderSubmenuItem = {
  title: string;
  link: string;
};

export type HeaderMenuItem = {
  label: string;
  link?: string | null;
  submenu: HeaderSubmenuItem[];
};

export type HeaderSettings = {
  menus: HeaderMenuItem[];
};

export type SiteSetting = {
  key: string;
  value: any;
  updatedAt: string;
};

export type HomeBannerSlide = {
  id: string;
  image: string;
  alt: string;
};

export type HomeIndustry = {
  id: string;
  label: string;
  iconName: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export type HomeStory = {
  id: string;
  company: string;
  title: string;
  quote: string;
  author: string;
  image: string;
  logo: string;
};

export type HomeComplianceItem = {
  id: string;
  title: string;
  iconName: string;
};

export type HomeSettings = {
  banners: HomeBannerSlide[];
  trustedTitle: string;
  trustedLogos: string[];
  productsTitle: string;
  productsDescription: string;
  solutionsTitle: string;
  solutionsDescription: string;
  servicesTitle: string;
  servicesDescription: string;
  industriesTitle: string;
  industriesDescription: string;
  industriesList: HomeIndustry[];
  storiesTitle: string;
  storiesDescription: string;
  storiesList: HomeStory[];
  complianceTitle: string;
  complianceDescription: string;
  complianceList: HomeComplianceItem[];
};

export type IndustryItem = {
  id: string;
  label: string;
  iconName: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export type IndustriesSectionProps = {
  title?: string;
  description?: string;
  industries?: IndustryItem[];
};


type StoryItem = {
  id: string | number;
  company: string;
  title: string;
  quote: string;
  author: string;
  image: string;
  logo: string;
};



export type CustomerStoriesSectionProps = {
  title?: string;
  description?: string;
  stories?: StoryItem[];
};


type ComplianceItem = {
  id: string;
  title: string;
  iconName: string;
};

export type ComplianceSectionProps = {
  title?: string;
  description?: string;
  complianceList?: ComplianceItem[];
};