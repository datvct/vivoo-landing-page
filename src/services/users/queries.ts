import { useQuery } from "@tanstack/react-query";
import { userApi, UserFilters } from "./api";

export const useUsersQuery = (filters: UserFilters) => {
  return useQuery({
    queryKey: ["users", filters.page, filters.limit, filters.email, filters.role, filters.isActive],
    queryFn: () => userApi.getUsers(filters),
  });
};

export const useUserQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
    enabled: enabled && Boolean(id),
  });
};
