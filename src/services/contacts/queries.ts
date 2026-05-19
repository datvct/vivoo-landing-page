import { useQuery } from "@tanstack/react-query";
import { contactsApi } from "./api";
import { ContactFilters } from "@/types/types";

export const useAdminContactsQuery = (filters: ContactFilters) => {
  return useQuery({
    queryKey: [
      "contacts-admin",
      filters.page,
      filters.limit,
      filters.search,
      filters.status,
    ],
    queryFn: () => contactsApi.getContacts(filters),
  });
};

export const useContactQuery = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => contactsApi.getContactById(id),
    enabled: enabled && Boolean(id),
  });
};
