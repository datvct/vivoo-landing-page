import { useMutation } from "@tanstack/react-query";
import { authApi } from "./api";
import { useAuthStore } from "@/stores/useAuthStore";
import { setTokens } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { message } from "antd";

export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      // Lưu token vào cookie
      setTokens(response.data.accessToken, response.data.refreshToken);

      // Lưu thông tin user vào Zustand
      setUser(response.data.user);

      message.success(response.message || "Login successfully!");

      // Chuyển hướng tới trang admin
      router.push("/admin");
    },
    onError: (error: any) => {
      message.error(error.response?.message|| "Login failed, please try again!");
    },
  });
};
