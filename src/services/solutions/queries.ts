import { useQuery } from "@tanstack/react-query";
import { solutionsApi } from "./api";
import { SolutionFilters } from "@/types/types";

export const useAdminSolutionsQuery = (filters: SolutionFilters) => {
  return useQuery({
    queryKey: [
      "solutions-admin",
      filters.page,
      filters.limit,
      filters.search,
      filters.status,
      filters.locale,
      filters.sortBy,
      filters.sortOrder,
    ],
    queryFn: () => solutionsApi.getSolutions(filters),
  });
};

export const useSolutionQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["solution", id],
    queryFn: () => solutionsApi.getSolutionById(id),
    enabled: enabled && Boolean(id),
  });
};
