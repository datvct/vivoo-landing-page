export interface GetProductsOptions {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  categoryId?: string;
  search?: string;
}

export async function getProducts(options: GetProductsOptions = {}) {
  const {
    page = 1,
    limit = 10,
    status = "published",
    sortBy = "sortOrder",
    sortOrder = "ASC",
    categoryId,
    search,
  } = options;

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  queryParams.append("limit", String(limit));
  
  if (status) {
    queryParams.append("status", status);
  }
  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }
  if (sortOrder) {
    queryParams.append("sortOrder", sortOrder);
  }
  if (categoryId) {
    queryParams.append("categoryId", categoryId);
  }
  if (search) {
    queryParams.append("search", search);
  }

  try {
    const res = await fetch(`${backendUrl}/products?${queryParams.toString()}`, {
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

export async function getProductBySlug(slug: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  try {
    const res = await fetch(`${backendUrl}/products/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const result = await res.json();
      return result?.data ?? null;
    }
  } catch (error) {
    // Ignore
  }
  return null;
}
