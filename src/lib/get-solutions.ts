
export interface GetSolutionOptions {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export async function getSolutions(
  options: GetSolutionOptions = {}
) {
  const {
    limit = 6,
    page = 1,
    search,
    status = "published",
  } = options;

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  queryParams.append("limit", String(limit));

  if (status) {
    queryParams.append("status", status);
  }
  if (search) {
    queryParams.append("search", search);
  }

  try {
    const res = await fetch(`${backendUrl}/solutions?${queryParams.toString()}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.items || [];
    }
  } catch (error) {
    // Ignore and fallback
  }
  return [];
}

export async function getSolutionBySlug(slug: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  try {
    const res = await fetch(`${backendUrl}/solutions/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data || null;
    }
  } catch (error) {
    // Ignore and fallback
  }
  return null;
}