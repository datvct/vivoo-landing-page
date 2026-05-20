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

  createCategory: async (payload: Record<string, unknown>): Promise<ApiResponse<ProductCategory>> => {
    let data: FormData | Record<string, unknown> = payload;
    let headers = {};

    const needsFormData =
      payload.thumbnail instanceof File || payload.featureImage instanceof File;

    if (needsFormData) {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        if (val !== undefined && val !== null) {
          if (val instanceof File || val instanceof Blob) {
            formData.append(key, val);
          } else {
            formData.append(key, String(val));
          }
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
    payload: Record<string, unknown>;
  }): Promise<ApiResponse<ProductCategory>> => {
    let data: FormData | Record<string, unknown> = payload;
    let headers = {};

    const needsFormData =
      payload.thumbnail instanceof File || payload.featureImage instanceof File;

    if (needsFormData) {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        if (val !== undefined && val !== null) {
          if (val instanceof File || val instanceof Blob) {
            formData.append(key, val);
          } else {
            formData.append(key, String(val));
          }
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
