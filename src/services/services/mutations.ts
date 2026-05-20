import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "./api";
import { message } from "antd";
import { getErrorMessage } from "@/utils/error";

export const useCreateServiceMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: servicesApi.createService,
    onSuccess: (response) => {
      message.success("Service created successfully!");
      queryClient.invalidateQueries({ queryKey: ["services-admin"] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(getErrorMessage(error, "Failed to create service"));
    },
  });
};

export const useUpdateServiceMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: servicesApi.updateService,
    onSuccess: (response, variables) => {
      message.success("Service updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["services-admin"] });
      queryClient.invalidateQueries({ queryKey: ["service", variables.id] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(getErrorMessage(error, "Failed to update service"));
    },
  });
};

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: servicesApi.deleteService,
    onSuccess: () => {
      message.success("Service deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["services-admin"] });
    },
    onError: (error: any) => {
      message.error(getErrorMessage(error, "Failed to delete service"));
    },
  });
};
