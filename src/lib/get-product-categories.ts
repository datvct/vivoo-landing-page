import type { ProductCategory } from "@/types/types";

function getBackendUrl() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  return apiBase.replace("/api", "");
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  const backendUrl = getBackendUrl();

  try {
    const res = await fetch(`${backendUrl}/product-categories/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const result = await res.json();
      return result?.data ?? null;
    }
  } catch {
    // Ignore and fallback
  }

  return null;
}
