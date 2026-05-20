import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import {
  Product,
  ProductFilters,
} from "@/types/types";

export type ProductListResponseData = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const productsApi = {
  getProductsPublic: async (
    filters: ProductFilters
  ): Promise<
    ApiResponse<ProductListResponseData>
  > => {
    const response = await api.get(
      "/products",
      { params: filters }
    );
    return response.data;
  },

  getProductsAdmin: async (
    filters: ProductFilters
  ): Promise<
    ApiResponse<ProductListResponseData>
  > => {
    const response = await api.get(
      "/products/all",
      { params: filters }
    );
    return response.data;
  },

  getProductById: async (
    id: string
  ): Promise<ApiResponse<Product>> => {
    const response = await api.get(
      `/products/${id}`
    );
    return response.data;
  },

  createProduct: async (
    payload: any
  ): Promise<ApiResponse<Product>> => {
    const formData = new FormData();
    Object.keys(payload).forEach(
      (key) => {
        const val = payload[key];
        if (
          val !== undefined &&
          val !== null
        ) {
          if (
            (key === "thumbnail" ||
              key === "video") &&
            val instanceof File
          ) {
            formData.append(key, val);
          } else if (
            (key === "galleryImages" ||
              key ===
                "benefitImages") &&
            Array.isArray(val)
          ) {
            val.forEach((file: any) => {
              if (
                file instanceof File
              ) {
                formData.append(
                  key,
                  file
                );
              }
            });
          } else if (
            key ===
              "galleryImageMediaIds" &&
            Array.isArray(val)
          ) {
            formData.append(
              key,
              JSON.stringify(val)
            );
          } else if (
            key === "badges" ||
            key === "features"
          ) {
            formData.append(
              key,
              JSON.stringify(val)
            );
          } else if (
            key ===
              "productGalleryItems" &&
            typeof val !== "string"
          ) {
            formData.append(
              key,
              JSON.stringify(val)
            );
          } else {
            formData.append(
              key,
              val.toString()
            );
          }
        }
      }
    );

    const response = await api.post(
      "/products",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  updateProduct: async ({
    id,
    payload,
  }: {
    id: string;
    payload: any;
  }): Promise<ApiResponse<Product>> => {
    const formData = new FormData();
    Object.keys(payload).forEach(
      (key) => {
        const val = payload[key];
        if (
          val !== undefined &&
          val !== null
        ) {
          if (
            (key === "thumbnail" ||
              key === "video") &&
            val instanceof File
          ) {
            formData.append(key, val);
          } else if (
            (key === "galleryImages" ||
              key ===
                "benefitImages") &&
            Array.isArray(val)
          ) {
            val.forEach((file: any) => {
              if (
                file instanceof File
              ) {
                formData.append(
                  key,
                  file
                );
              }
            });
          } else if (
            key ===
              "galleryImageMediaIds" &&
            Array.isArray(val)
          ) {
            formData.append(
              key,
              JSON.stringify(val)
            );
          } else if (
            key === "badges" ||
            key === "features"
          ) {
            formData.append(
              key,
              JSON.stringify(val)
            );
          } else if (
            key ===
              "productGalleryItems" &&
            typeof val !== "string"
          ) {
            formData.append(
              key,
              JSON.stringify(val)
            );
          } else {
            formData.append(
              key,
              val.toString()
            );
          }
        }
      }
    );

    const response = await api.patch(
      `/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteProduct: async (
    id: string
  ): Promise<ApiResponse<void>> => {
    const response = await api.delete(
      `/products/${id}`
    );
    return response.data;
  },

  addRelatedProduct: async ({
    id,
    relatedId,
    sortOrder = 0,
  }: {
    id: string;
    relatedId: string;
    sortOrder?: number;
  }): Promise<ApiResponse<any>> => {
    const response = await api.post(
      `/products/${id}/related/${relatedId}`,
      {
        sortOrder,
      }
    );
    return response.data;
  },

  deleteRelatedProduct: async ({
    id,
    relatedId,
  }: {
    id: string;
    relatedId: string;
  }): Promise<ApiResponse<void>> => {
    const response = await api.delete(
      `/products/${id}/related/${relatedId}`
    );
    return response.data;
  },
};
