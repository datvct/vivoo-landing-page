import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { SiteSetting } from "@/types/types";

export const siteSettingsApi = {
  getSetting: async (key: string, locale?: string, siteCode?: string): Promise<ApiResponse<SiteSetting>> => {
    const response = await api.get(`/site-settings/${key}`, { params: { locale, siteCode } });
    return response.data;
  },

  getAllSettings: async (locale?: string, siteCode?: string): Promise<ApiResponse<SiteSetting[]>> => {
    const response = await api.get("/site-settings", { params: { locale, siteCode } });
    return response.data;
  },

  upsertSetting: async (
    key: string,
    value: any,
    locale?: string,
    siteCode?: string
  ): Promise<ApiResponse<SiteSetting>> => {
    const response = await api.put(`/site-settings/${key}`, { value, locale, siteCode });
    return response.data;
  },

  deleteSetting: async (key: string, locale?: string, siteCode?: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/site-settings/${key}`, { params: { locale, siteCode } });
    return response.data;
  },
};
