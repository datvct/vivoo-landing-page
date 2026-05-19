import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { LoginResponseData, User } from "@/types/auth";

export const authApi = {
  login: async (payload: {
    email: string;
    password: string;
  }): Promise<ApiResponse<LoginResponseData>> => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};
