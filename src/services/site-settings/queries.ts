import { useQuery } from "@tanstack/react-query";
import { siteSettingsApi } from "./api";

export const useSiteSettingQuery = (key: string) => {
  return useQuery({
    queryKey: ["site-setting", key],
    queryFn: () => siteSettingsApi.getSetting(key),
    retry: false, // Don't retry since 404 is expected if not set
  });
};

export const useAllSiteSettingsQuery = () => {
  return useQuery({
    queryKey: ["all-site-settings"],
    queryFn: () => siteSettingsApi.getAllSettings(),
  });
};
