import type { ProductCategory } from "@/types/types";
import type { Locale } from "@/i18n/config";

function getBackendUrl() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  return apiBase.replace("/api", "");
}

export async function getCategoryBySlug(
  slug: string,
  locale?: Locale
): Promise<ProductCategory | null> {
  const backendUrl = getBackendUrl();
  const query = locale ? `?locale=${encodeURIComponent(locale)}` : "";

  try {
    const res = await fetch(
      `${backendUrl}/product-categories/slug/${encodeURIComponent(slug)}${query}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (res.ok) {
      const result = await res.json();
      return result?.data ?? null;
    }
  } catch {
    // Ignore and fallback
  }

  return null;
}

//viết giúp tôi getProductCategories giúp tôi 

export interface GetProductCategoriesOptions {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  search?: string;
  locale?: Locale;
}

export async function getProductCategories(options: GetProductCategoriesOptions = {}): Promise<ProductCategory[]> {
  const {
    page = 1,
    limit = 10,
    status = "published",
    sortBy = "sortOrder",
    sortOrder = "ASC",
    search,
    locale,
  } = options;

  const backendUrl = getBackendUrl();
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  queryParams.append("limit", String(limit));

  if (status) queryParams.append("status", status);
  if (sortBy) queryParams.append("sortBy", sortBy);
  if (sortOrder) queryParams.append("sortOrder", sortOrder);
  if (search) queryParams.append("search", search);
  if (locale) queryParams.append("locale", locale);

  try {
    const res = await fetch(`${backendUrl}/product-categories?${queryParams.toString()}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.items || [];
    }
  } catch (error) {
    // Ignore
  }
  return [];
}