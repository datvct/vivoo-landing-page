import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "./api";
import { message } from "antd";

export const useCreateUserMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (res) => {
      message.success(res.message || "User created successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      message.error(error.response?.message|| "Failed to create user!");
    },
  });
};

export const useUpdateUserMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (res) => {
      message.success(res.message || "User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      message.error(error.response?.message|| "Failed to update user!");
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (res) => {
      message.success(res.message || "User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      message.error(error.response?.message|| "Failed to delete user!");
    },
  });
};
