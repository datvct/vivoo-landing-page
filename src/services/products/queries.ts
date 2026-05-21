import { useQuery } from "@tanstack/react-query";
import { productsApi } from "./api";
import { ProductFilters } from "@/types/types";

export const useAdminProductsQuery = (filters: ProductFilters) => {
  return useQuery({
    queryKey: [
      "products-admin",
      filters.page,
      filters.limit,
      filters.search,
      filters.status,
      filters.locale,
      filters.categoryId,
      filters.sortBy,
      filters.sortOrder,
    ],
    queryFn: () => productsApi.getProductsAdmin(filters),
  });
};

export const useProductQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProductById(id),
    enabled: enabled && Boolean(id),
  });
};
