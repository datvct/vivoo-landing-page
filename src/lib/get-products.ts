import type { Locale } from "@/i18n/config";

export interface GetProductsOptions {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  categoryId?: string;
  search?: string;
  locale?: Locale;
}

export async function getProducts(
  options: GetProductsOptions = {}
) {
  const {
    page = 1,
    limit = 10,
    status = "published",
    sortBy = "sortOrder",
    sortOrder = "ASC",
    categoryId,
    search,
    locale,
  } = options;

  const apiBase =
    process.env
      .NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8080/api";
  const backendUrl = apiBase.replace(
    "/api",
    ""
  );

  const queryParams =
    new URLSearchParams();
  queryParams.append(
    "page",
    String(page)
  );
  queryParams.append(
    "limit",
    String(limit)
  );

  if (status) {
    queryParams.append(
      "status",
      status
    );
  }
  if (sortBy) {
    queryParams.append(
      "sortBy",
      sortBy
    );
  }
  if (sortOrder) {
    queryParams.append(
      "sortOrder",
      sortOrder
    );
  }
  if (categoryId) {
    queryParams.append(
      "categoryId",
      categoryId
    );
  }
  if (search) {
    queryParams.append(
      "search",
      search
    );
  }
  if (locale) {
    queryParams.append(
      "locale",
      locale
    );
  }

  try {
    const res = await fetch(
      `${backendUrl}/products?${queryParams.toString()}`,
      {
        next: { revalidate: 60 * 10 },
      }
    );
    if (res.ok) {
      const result = await res.json();
      return result?.data?.items || [];
    }
  } catch (error) {
    // Ignore
  }
  return [];
}

export async function getProductBySlug(
  slug: string,
  locale?: Locale
) {
  const apiBase =
    process.env
      .NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8080/api";
  const backendUrl = apiBase.replace(
    "/api",
    ""
  );
  const query = locale
    ? `?locale=${encodeURIComponent(locale)}`
    : "";

  try {
    const res = await fetch(
      `${backendUrl}/products/slug/${encodeURIComponent(slug)}${query}`,
      {
        next: { revalidate: 60 * 10 },
      }
    );

    if (res.ok) {
      const result = await res.json();
      return result?.data ?? null;
    }
  } catch (error) {
    // Ignore
  }
  return null;
}
