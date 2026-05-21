import { useQuery } from "@tanstack/react-query";
import { siteSettingsApi } from "./api";

export const useSiteSettingQuery = (key: string, locale?: string, siteCode?: string) => {
  return useQuery({
    queryKey: ["site-setting", key, locale, siteCode],
    queryFn: () => siteSettingsApi.getSetting(key, locale, siteCode),
    retry: false, // Don't retry since 404 is expected if not set
  });
};

export const useAllSiteSettingsQuery = (locale?: string, siteCode?: string) => {
  return useQuery({
    queryKey: ["all-site-settings", locale, siteCode],
    queryFn: () => siteSettingsApi.getAllSettings(locale, siteCode),
  });
};
