import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productCategoriesApi } from "./api";
import { message } from "antd";

export const useCreateCategoryMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productCategoriesApi.createCategory,
    onSuccess: (res) => {
      message.success(res.message || "Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to create category!");
    },
  });
};

export const useUpdateCategoryMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productCategoriesApi.updateCategory,
    onSuccess: (res) => {
      message.success(res.message || "Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to update category!");
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productCategoriesApi.deleteCategory,
    onSuccess: (res) => {
      message.success(res.message || "Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to delete category!");
    },
  });
};
