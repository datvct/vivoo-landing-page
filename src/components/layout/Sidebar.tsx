"use client";

import type { MenuProps } from "antd";
import {
  Dropdown,
  Layout,
  Menu,
  Modal,
} from "antd";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import Image from "next/image";
import {
  useMemo,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavItem } from "@/types/types";
import { defaultItems } from "@/constants/menuItems";

const { Sider } = Layout;

const findActiveMenu = (
  menu: NavItem[],
  currentPath: string
): {
  selectedKey: string;
  openKeys: string[];
} => {
  let bestMatch: {
    selectedKey: string;
    openKeys: string[];
    hrefLength: number;
  } | null = null;

  const traverse = (items: NavItem[], parentKeys: string[] = []) => {
    for (const item of items) {
      const nextParentKeys = item.children
        ? [...parentKeys, item.key]
        : parentKeys;

      if (item.href) {
        const isExact = currentPath === item.href;
        const isSubRoute = currentPath.startsWith(`${item.href}/`);

        if (isExact || isSubRoute) {
          const hrefLength = item.href.length;
          if (!bestMatch || hrefLength > bestMatch.hrefLength) {
            bestMatch = {
              selectedKey: item.key,
              openKeys: parentKeys,
              hrefLength,
            };
          }
        }
      }

      if (item.children?.length) {
        traverse(item.children, nextParentKeys);
      }
    }
  };

  traverse(menu);

  if (bestMatch) {
    return {
      selectedKey: (bestMatch as any).selectedKey,
      openKeys: (bestMatch as any).openKeys,
    };
  }

  return {
    selectedKey: "dashboard",
    openKeys: [],
  };
};

const transformMenuItems = (
  menu: NavItem[]
): MenuProps["items"] =>
  menu.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    children: item.children?.length
      ? transformMenuItems(
        item.children
      )
      : undefined,
  }));

const findMenuItemByKey = (
  menu: NavItem[],
  key: string
): NavItem | undefined => {
  for (const item of menu) {
    if (item.key === key) return item;
    if (item.children?.length) {
      const child = findMenuItemByKey(
        item.children,
        key
      );
      if (child) return child;
    }
  }
  return undefined;
};

export default function Sidebar({
  items = defaultItems,
}: {
  items?: NavItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] =
    useState(false);
  const [
    isLangModalVisible,
    setIsLangModalVisible,
  ] = useState(false);

  const selectedAndOpen = useMemo(
    () =>
      findActiveMenu(items, pathname),
    [items, pathname]
  );

  const menuItems = useMemo(
    () => transformMenuItems(items),
    [items]
  );


  const handleMenuClick: MenuProps["onClick"] =
    ({ key }) => {
      const target = findMenuItemByKey(
        items,
        key
      );

      if (target?.href) {
        router.push(target.href);
      }
    };

  return (
    <>
      <Sider
        className="border-r border-gray-200 bg-[#f5f6f9]!"
        width={230}
        collapsed={isCollapsed}
        collapsedWidth={80}
      >
        <div
          className="absolute top-12 -right-2 z-50 cursor-pointer rounded-full bg-blue-500 p-1 text-white transition-all duration-200 hover:scale-110"
          onClick={() =>
            setIsCollapsed(
              (prev) => !prev
            )
          }
        >
          {isCollapsed ? (
            <ChevronRight
              size={16}
              color="white"
            />
          ) : (
            <ChevronLeft
              size={16}
              color="white"
            />
          )}
        </div>

        <div className="flex h-full flex-1 flex-col border-[0.5px] border-gray-200 bg-white shadow-md shadow-gray-200">
          <div className="sticky top-0 z-10 bg-white shadow-sm shadow-gray-200">
            <div className="relative flex w-full flex-row items-center justify-center px-4 py-3">
              <Image
                src={
                  isCollapsed
                    ? "/images/logo-vivoo.png"
                    : "/svgs/logo.svg"
                }
                alt="Logo"
                width={40}
                height={40}
                className={`h-10 w-full cursor-pointer object-cover transition-all duration-200 ${isCollapsed
                  ? "w-10! translate-x-0 rounded-full"
                  : "-translate-x-3"
                  }`}
                onClick={() =>
                  router.push("/admin")
                }
              />
              {/* <div
                className={`ml-3 cursor-pointer text-center text-xl font-semibold text-[#141414d1] transition-all duration-150 ${
                  isCollapsed
                    ? "absolute translate-x-10 opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
                onClick={() =>
                  router.push("/admin")
                }
              >
                Admin VIVOO
              </div> */}
            </div>
            <hr className="border-t border-[#8c8c8c48]" />
          </div>

          <Menu
            key={pathname}
            theme="light"
            mode="inline"
            inlineCollapsed={
              isCollapsed
            }
            selectedKeys={[
              selectedAndOpen.selectedKey,
            ]}
            defaultOpenKeys={
              isCollapsed
                ? []
                : selectedAndOpen.openKeys
            }
            items={menuItems}
            onClick={handleMenuClick}
            className="flex-1 border-e-0 p-2!"
          />

        </div>
      </Sider>

      <Modal
        title="Change language"
        open={isLangModalVisible}
        footer={null}
        onCancel={() =>
          setIsLangModalVisible(false)
        }
      >
        <div className="flex items-center justify-around gap-4">
          <button
            type="button"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() =>
              setIsLangModalVisible(
                false
              )
            }
          >
            Vietnamese
          </button>
          <button
            type="button"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() =>
              setIsLangModalVisible(
                false
              )
            }
          >
            English
          </button>
        </div>
      </Modal>
    </>
  );
}
