import { useMutation, useQueryClient } from "@tanstack/react-query";
import { solutionsApi } from "./api";
import { message } from "antd";

export const useCreateSolutionMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: solutionsApi.createSolution,
    onSuccess: (response) => {
      message.success("Solution created successfully!");
      queryClient.invalidateQueries({ queryKey: ["solutions-admin"] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to create solution");
    },
  });
};

export const useUpdateSolutionMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: solutionsApi.updateSolution,
    onSuccess: (response, variables) => {
      message.success("Solution updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["solutions-admin"] });
      queryClient.invalidateQueries({ queryKey: ["solution", variables.id] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to update solution");
    },
  });
};

export const useDeleteSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: solutionsApi.deleteSolution,
    onSuccess: () => {
      message.success("Solution deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["solutions-admin"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to delete solution");
    },
  });
};
