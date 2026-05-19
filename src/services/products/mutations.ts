import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./api";
import { message } from "antd";

export const useCreateProductMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: (response) => {
      message.success("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to create product");
    },
  });
};

export const useUpdateProductMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: (response, variables) => {
      message.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to update product");
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: () => {
      message.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to delete product");
    },
  });
};

export const useAddRelatedProductMutation = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.addRelatedProduct,
    onSuccess: () => {
      message.success("Related product linked successfully!");
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to link related product");
    },
  });
};

export const useDeleteRelatedProductMutation = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.deleteRelatedProduct,
    onSuccess: () => {
      message.success("Related product removed successfully!");
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to remove related product");
    },
  });
};
