import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { SiteSetting } from "@/types/types";

export const siteSettingsApi = {
  getSetting: async (key: string): Promise<ApiResponse<SiteSetting>> => {
    const response = await api.get(`/site-settings/${key}`);
    return response.data;
  },

  getAllSettings: async (): Promise<ApiResponse<SiteSetting[]>> => {
    const response = await api.get("/site-settings");
    return response.data;
  },

  upsertSetting: async (
    key: string,
    value: any
  ): Promise<ApiResponse<SiteSetting>> => {
    const response = await api.put(`/site-settings/${key}`, { value });
    return response.data;
  },

  deleteSetting: async (key: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/site-settings/${key}`);
    return response.data;
  },
};
