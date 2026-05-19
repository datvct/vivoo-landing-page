import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { Media, MediaFilters, MediaListResponseData } from "@/types/types";

export const mediaApi = {
  getMedia: async (
    filters: MediaFilters
  ): Promise<ApiResponse<MediaListResponseData>> => {
    const response = await api.get("/media", { params: filters });
    return response.data;
  },

  uploadMedia: async (file: File): Promise<ApiResponse<Media>> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteMedia: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },
};
