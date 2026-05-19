import { useMutation, useQueryClient } from "@tanstack/react-query";
import { siteSettingsApi } from "./api";
import { message } from "antd";

export const useUpsertSiteSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      siteSettingsApi.upsertSetting(key, value),
    onSuccess: (_, variables) => {
      message.success(`Settings updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ["site-setting", variables.key] });
      queryClient.invalidateQueries({ queryKey: ["all-site-settings"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to update settings."
      );
    },
  });
};
