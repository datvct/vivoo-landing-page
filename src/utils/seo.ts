import type { Metadata } from "next";

export const DEFAULT_FAVICON = `https://res.cloudinary.com/dmgkdkvxl/image/upload/v1779241777/vivoo/favicon.ico`
export const DEFAULT_IMAGE = `https://res.cloudinary.com/dmgkdkvxl/image/upload/v1778901591/vivoo/image-default.svg`

export interface ConstructMetadataProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string | string[];
  noIndex?: boolean;
  author?: string;
  siteName?: string;
  faviconUrl?: string;
  iconsShortcut?: string;
}

export function constructMetadata({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  keywords,
  noIndex = false,
  author = "VIVOO",
  siteName = "VIVOO",
  faviconUrl,
  iconsShortcut = DEFAULT_FAVICON,
}: ConstructMetadataProps = {}): Metadata {
  const defaultTitle = "VIVOO - Advanced Security Solutions";
  const defaultDescription = "VIVOO provides state-of-the-art security, cloud and integration services.";
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vivoo.vn";

  const finalTitle = title ? title : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || "security, cloud services, system integration, VIVOO";

  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  const absoluteCanonicalUrl = canonicalUrl
    ? (canonicalUrl.startsWith("http") ? canonicalUrl : `${siteUrl}${canonicalUrl}`)
    : siteUrl;

  const robots = noIndex
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "none" as const,
          "max-snippet": -1,
        },
      }
    : {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
        },
      };

  return {
    title: {
      default: finalTitle,
      template: `%s | ${siteName}`,
    },
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: absoluteCanonicalUrl,
    },
    robots,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: absoluteCanonicalUrl,
      siteName: siteName,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: title || defaultTitle,
        },
      ],
      locale: "vi_VN",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [absoluteOgImage],
      creator: "@vivoo",
    },
    icons: {
      icon: faviconUrl || DEFAULT_FAVICON,
      shortcut: iconsShortcut || DEFAULT_FAVICON,
      apple: DEFAULT_FAVICON,
    },
  };
}
