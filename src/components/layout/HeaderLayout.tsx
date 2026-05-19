"use client";

import {
  Badge,
  Dropdown,
  Layout,
  Tooltip,
  type MenuProps,
} from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import {
  LogOut,
  LockKeyhole,
  RefreshCw,
  UserPen,
  Wifi,
  WifiOff,
  CircleUserRound,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/auth/api";

const { Header } = Layout;

type HeaderLayoutProps = {
  userName?: string;
  roleLabel?: string;
  isConnected?: boolean;
  showRealtimeStatus?: boolean;
  onRefresh?: () => void;
  onProfile?: () => void;
  onChangePassword?: () => void;
  onLogout?: () => void;
};

export default function HeaderLayout({
  userName = "Admin",
  roleLabel = "Administrator",
  isConnected = false,
  showRealtimeStatus = false,
  onRefresh,
  onProfile,
  onChangePassword,
  onLogout,
}: HeaderLayoutProps) {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    enabled: !user && typeof window !== "undefined",
  });

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      return;
    }

    router.refresh();
  };

  const accountItems: MenuProps["items"] =
    useMemo(
      () => [
        {
          key: "profile",
          icon: <UserPen size={18} />,
          label: <span>Profile</span>,
          onClick: () => {
            if (onProfile) {
              onProfile();
              return;
            }

            router.push(
              "/admin/profile"
            );
          },
        },
        {
          key: "change-password",
          icon: (
            <LockKeyhole size={18} />
          ),
          label: (
            <span>Change password</span>
          ),
          onClick: () => {
            if (onChangePassword) {
              onChangePassword();
              return;
            }

            router.push(
              "/admin/change-password"
            );
          },
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: (
            <LogOut
              size={18}
              className="text-red-500"
            />
          ),
          label: (
            <span className="text-red-500">
              Logout
            </span>
          ),
          onClick: () => {
            if (onLogout) {
              onLogout();
              return;
            }

            logout();
          },
        },
      ],
      [
        onChangePassword,
        onLogout,
        onProfile,
        router,
        logout,
      ]
    );

  const displayName = user?.displayName || userName;
  const roleName = user?.role || roleLabel;

  return (
    <Header className="sticky top-0 z-20 min-h-16 bg-white px-5 shadow-sm">
      <div className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
        <div></div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {showRealtimeStatus ? (
              <Tooltip
                title={
                  isConnected
                    ? "Connected - realtime enabled"
                    : "Disconnected"
                }
                placement="bottom"
              >
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5">
                  {isConnected ? (
                    <>
                      <Badge
                        status="processing"
                        color="green"
                      />
                      <Wifi className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">
                        Realtime
                      </span>
                    </>
                  ) : (
                    <>
                      <Badge status="default" />
                      <WifiOff className="h-4 w-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">
                        Offline
                      </span>
                    </>
                  )}
                </div>
              </Tooltip>
            ) : null}

            <Tooltip
              title="Refresh"
              placement="bottom"
            >
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-lg p-2 transition-all hover:bg-gray-100"
                aria-label="Refresh page"
              >
                <RefreshCw className="h-5 w-5 text-gray-600 hover:text-blue-500" />
              </button>
            </Tooltip>

            <Dropdown
              menu={{
                items: accountItems,
              }}
              placement="bottomRight"
              arrow
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-2 py-1 transition-all hover:bg-gray-100"
              >
                <CircleUserRound className="h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {roleName}
                  </div>
                </div>
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
}
