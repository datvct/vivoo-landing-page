import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { ProductCategory, ProductCategoryFilters } from "@/types/types";

export type ProductCategoryListResponseData = {
  items: ProductCategory[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export const productCategoriesApi = {
  getCategories: async (
    filters: ProductCategoryFilters
  ): Promise<ApiResponse<ProductCategoryListResponseData>> => {
    const response = await api.get("/product-categories", { params: filters });
    return response.data;
  },

  getCategoryById: async (id: string): Promise<ApiResponse<ProductCategory>> => {
    const response = await api.get(`/product-categories/${id}`);
    return response.data;
  },

  getCategoryBySlug: async (slug: string): Promise<ApiResponse<ProductCategory>> => {
    const response = await api.get(`/product-categories/slug/${slug}`);
    return response.data;
  },

  createCategory: async (payload: any): Promise<ApiResponse<ProductCategory>> => {
    let data = payload;
    let headers = {};

    // Check if there is a file for upload
    if (payload.thumbnail instanceof File) {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        if (val !== undefined && val !== null) {
          formData.append(key, val);
        }
      });
      data = formData;
      headers = { "Content-Type": "multipart/form-data" };
    }

    const response = await api.post("/product-categories", data, { headers });
    return response.data;
  },

  updateCategory: async ({
    id,
    payload,
  }: {
    id: string;
    payload: any;
  }): Promise<ApiResponse<ProductCategory>> => {
    let data = payload;
    let headers = {};

    if (payload.thumbnail instanceof File) {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        if (val !== undefined && val !== null) {
          formData.append(key, val);
        }
      });
      data = formData;
      headers = { "Content-Type": "multipart/form-data" };
    }

    const response = await api.patch(`/product-categories/${id}`, data, { headers });
    return response.data;
  },

  deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/product-categories/${id}`);
    return response.data;
  },
};
