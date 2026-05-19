import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { Solution, SolutionFilters } from "@/types/types";

export type SolutionListResponseData = {
  items: Solution[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const solutionsApi = {
  getSolutions: async (
    filters: SolutionFilters
  ): Promise<ApiResponse<SolutionListResponseData>> => {
    const response = await api.get("/solutions", { params: filters });
    return response.data;
  },

  getSolutionById: async (id: string): Promise<ApiResponse<Solution>> => {
    const response = await api.get(`/solutions/${id}`);
    return response.data;
  },

  getSolutionBySlug: async (slug: string): Promise<ApiResponse<Solution>> => {
    const response = await api.get(`/solutions/slug/${slug}`);
    return response.data;
  },

  createSolution: async (payload: any): Promise<ApiResponse<Solution>> => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val !== undefined && val !== null) {
        if (key === "thumbnail" && val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, val.toString());
        }
      }
    });

    const response = await api.post("/solutions", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateSolution: async ({
    id,
    payload,
  }: {
    id: string;
    payload: any;
  }): Promise<ApiResponse<Solution>> => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val !== undefined && val !== null) {
        if (key === "thumbnail" && val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, val.toString());
        }
      }
    });

    const response = await api.patch(`/solutions/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteSolution: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/solutions/${id}`);
    return response.data;
  },
};
