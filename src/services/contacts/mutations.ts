import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi } from "./api";
import { message } from "antd";

import { ContactStatus } from "@/types/types";

export const useCreateContactMutation = (onSuccess?: (data: any) => void) => {
  return useMutation({
    mutationFn: contactsApi.createContact,
    onSuccess: (response) => {
      message.success("Thank you! Your message has been sent successfully.");
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to submit contact form. Please try again."
      );
    },
  });
};

export const useUpdateContactStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      contactsApi.updateContactStatus(id, status),
    onSuccess: () => {
      message.success("Contact status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["contacts-admin"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to update contact status."
      );
    },
  });
};

export const useDeleteContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactsApi.deleteContact,
    onSuccess: () => {
      message.success("Contact entry deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["contacts-admin"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to delete contact entry."
      );
    },
  });
};
