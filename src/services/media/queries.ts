import { useQuery } from "@tanstack/react-query";
import { mediaApi } from "./api";
import { MediaFilters } from "@/types/types";

export const useMediaListQuery = (filters: MediaFilters) => {
  return useQuery({
    queryKey: ["media-list", filters.page, filters.limit],
    queryFn: () => mediaApi.getMedia(filters),
  });
};
