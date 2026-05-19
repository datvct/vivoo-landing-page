import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { Service, ServiceFilters } from "@/types/types";

export type ServiceListResponseData = {
  items: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const servicesApi = {
  getServices: async (
    filters: ServiceFilters
  ): Promise<ApiResponse<ServiceListResponseData>> => {
    const response = await api.get("/services", { params: filters });
    return response.data;
  },

  getServiceById: async (id: string): Promise<ApiResponse<Service>> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  getServiceBySlug: async (slug: string): Promise<ApiResponse<Service>> => {
    const response = await api.get(`/services/slug/${slug}`);
    return response.data;
  },

  createService: async (payload: any): Promise<ApiResponse<Service>> => {
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

    const response = await api.post("/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateService: async ({
    id,
    payload,
  }: {
    id: string;
    payload: any;
  }): Promise<ApiResponse<Service>> => {
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

    const response = await api.patch(`/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteService: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};
