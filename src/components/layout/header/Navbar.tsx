"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const defaultMenus = [
  {
    label: "Products",
    submenu: [
      {
        title: "ViVoo Camera",
        link: "/product-category/camera",
      },
      {
        title: "ViVoo ODM",
        link: "/product-category/odm",
      },
    ],
  },
  {
    label: "Solutions",
    submenu: [
      {
        title: "Automotive dealership",
        link: "/solutions/automotive-dealerships",
      },
      {
        title: "Construction",
        link: "/solutions/construction",
      },
      {
        title: "Education",
        link: "/solutions/education",
      },
    ],
    link: "/solutions",
  },
  {
    label: "Services",
    submenu: [
      {
        title: "Service 1",
        link: "/services/service-1",
      },
      {
        title: "Service 2",
        link: "/services/service-2",
      },
    ],
    link: "/services",
  },
];

type NavbarProps = {
  menus?: any[];
};

export default function Navbar({ menus = [] }: NavbarProps) {
  const [hoveredMenu, setHoveredMenu] =
    useState<string | null>(null);
  const router = useRouter();

  const activeMenus = menus && menus.length > 0 ? menus : defaultMenus;

  return (
    <nav className="hidden gap-8 lg:flex">
      {activeMenus.map((item) => (
        <div
          key={item.label}
          className="group relative"
          onMouseEnter={() =>
            setHoveredMenu(item.label)
          }
          onMouseLeave={() =>
            setHoveredMenu(null)
          }
        >
          {/* Main Menu Item */}
          <button
            onClick={() => {
              if (item.link) {
                router.push(item.link);
              }
            }}
            className="flex cursor-pointer items-center gap-1 py-6 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
          >
            {item.label}
            {item.submenu && item.submenu.length > 0 && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  hoveredMenu ===
                  item.label
                    ? "rotate-180"
                    : ""
                }`}
              />
            )}
          </button>

          {/* Dropdown Menu */}
          {item.submenu && item.submenu.length > 0 && (
            <div
              className={`absolute left-0 mt-0 w-56 origin-top transform rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 ${
                hoveredMenu === item.label
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              {/* Arrow pointer */}
              <div className="absolute -top-2 left-4 h-4 w-4 rotate-45 transform border-t border-l border-gray-100 bg-white" />

              {/* Submenu items */}
              <ul className="pt-3 pb-3">
                {item.submenu.map(
                  (subitem: any, index: number) => (
                    <li key={index}>
                      <Link
                        href={
                          subitem?.link ??
                          "#"
                        }
                        className="block px-4 py-2.5 text-sm text-gray-700 transition-colors duration-150 first:pt-4 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subitem?.title ??
                          ""}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Hover line indicator */}
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
              hoveredMenu === item.label
                ? "w-full"
                : "w-0"
            }`}
          />
        </div>
      ))}
    </nav>
  );
}
