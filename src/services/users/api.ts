import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { User } from "@/types/types";

export type UserFilters = {
  page?: number;
  limit?: number;
  role?: string;
  email?: string;
  isActive?: boolean;
};

export type UserListResponseData = {
  items: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

export const userApi = {
  getUsers: async (filters: UserFilters): Promise<ApiResponse<UserListResponseData>> => {
    const response = await api.get("/users", { params: filters });
    return response.data;
  },
  createUser: async (payload: any): Promise<ApiResponse<User>> => {
    const response = await api.post("/users", payload);
    return response.data;
  },
  updateUser: async ({ id, payload }: { id: string; payload: any }): Promise<ApiResponse<User>> => {
    const response = await api.patch(`/users/${id}`, payload);
    return response.data;
  },
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
