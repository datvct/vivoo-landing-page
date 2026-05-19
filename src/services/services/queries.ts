import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "./api";
import { ServiceFilters } from "@/types/types";

export const useAdminServicesQuery = (filters: ServiceFilters) => {
  return useQuery({
    queryKey: [
      "services-admin",
      filters.page,
      filters.limit,
      filters.search,
      filters.status,
      filters.sortBy,
      filters.sortOrder,
    ],
    queryFn: () => servicesApi.getServices(filters),
  });
};

export const useServiceQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => servicesApi.getServiceById(id),
    enabled: enabled && Boolean(id),
  });
};
