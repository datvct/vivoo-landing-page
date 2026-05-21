import { MetadataRoute } from "next";
import { getProducts } from "@/lib/get-products";
import { getServices } from "@/lib/get-services";
import { getSolutions } from "@/lib/get-solutions";
import { getProductCategories } from "@/lib/get-product-categories";
import { LOCALES } from "@/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.vivoo.com.vn";

  const staticRoutes = [
    "",
    "/products",
    "/services",
    "/solutions",
    "/contact",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Static routes for all locales
  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  // Fetch dynamic content
  try {
    for (const locale of LOCALES) {
      const [products, services, solutions, categories] = await Promise.all([
        getProducts({ limit: 100, page: 1, status: 'published', locale }),
        getServices({ limit: 100, page: 1, status: 'published', locale }),
        getSolutions({ limit: 100, page: 1, status: 'published', locale }),
        getProductCategories({ limit: 100, page: 1, status: 'published', locale }),
      ]);

      // Helper to generate locale-based dynamic routes
      const addDynamicRoutes = (items: any[], path: string, priority = 0.6) => {
        items?.forEach((item) => {
          if (item?.slug) {
            sitemap.push({
              url: `${baseUrl}/${locale}/${path}/${item.slug}`,
              lastModified: new Date(item.updatedAt || Date.now()),
              changeFrequency: "weekly",
              priority,
            });
          }
        });
      };

      addDynamicRoutes(products, "product", 0.7);
      addDynamicRoutes(services, "services", 0.6);
      addDynamicRoutes(solutions, "solutions", 0.7);
      addDynamicRoutes(categories, "product-category", 0.7);
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return sitemap;
}
