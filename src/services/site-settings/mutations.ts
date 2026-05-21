import { useMutation, useQueryClient } from "@tanstack/react-query";
import { siteSettingsApi } from "./api";
import { message } from "antd";
import { getErrorMessage } from "@/utils/error";

export const useUpsertSiteSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value, locale, siteCode }: { key: string; value: any; locale?: string; siteCode?: string }) =>
      siteSettingsApi.upsertSetting(key, value, locale, siteCode),
    onSuccess: (_, variables) => {
      message.success(`Settings updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ["site-setting", variables.key, variables.locale, variables.siteCode] });
      queryClient.invalidateQueries({ queryKey: ["all-site-settings", variables.locale, variables.siteCode] });
    },
    onError: (error: any) => {
      message.error(
        getErrorMessage(error, "Failed to update settings.")
      );
    },
  });
};
