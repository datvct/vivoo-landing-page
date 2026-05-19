import { useQuery } from "@tanstack/react-query";
import { productCategoriesApi } from "./api";
import { ProductCategoryFilters } from "@/types/types";

export const useProductCategoriesQuery = (filters: ProductCategoryFilters) => {
  return useQuery({
    queryKey: [
      "product-categories",
      filters.page,
      filters.limit,
      filters.search,
      filters.status,
      filters.sortBy,
      filters.sortOrder,
    ],
    queryFn: () => productCategoriesApi.getCategories(filters),
  });
};

export const useProductCategoryQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["product-category", id],
    queryFn: () => productCategoriesApi.getCategoryById(id),
    enabled: enabled && Boolean(id),
  });
};

export const useProductCategoryBySlugQuery = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: ["product-category-slug", slug],
    queryFn: () => productCategoriesApi.getCategoryBySlug(slug),
    enabled: enabled && Boolean(slug),
  });
};
