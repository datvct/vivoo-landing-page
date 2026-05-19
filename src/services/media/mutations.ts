import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaApi } from "./api";
import { message } from "antd";

export const useUploadMediaMutation = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.uploadMedia,
    onSuccess: (response) => {
      message.success("File uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["media-list"] });
      onSuccess?.(response.data);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to upload file");
    },
  });
};

export const useDeleteMediaMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.deleteMedia,
    onSuccess: () => {
      message.success("File deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["media-list"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to delete file");
    },
  });
};
