"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const menus = [
  {
    label: "Products",
    submenu: [
      {
        title: "Video Security",
        link: "#"
      },
      {
        title: "Access Control",
        link: "#"
      },
      {
        title: "Sensors & Alarms",
        link: "#"
      },
      {
        title: "Operations & Intelligence",
        link: "#"
      }
    ],
  },
  {
    label: "Industries",
    submenu: [
      {
        title: "Video Security",
        link: "/industries/video-security"
      },
      {
        title: "Access Control",
        link: "/industries/access-control"
      },
      {
        title: "Sensors & Alarms",
        link: "#"
      },
      {
        title: "Operations & Intelligence",
        link: "#"
      }
    ],
  },
  {
    label: "Customer Stories",
    submenu: [{
      title: "Video Security",
      link: "#"
    },
    {
      title: "Access Control",
      link: "#"
    },
    {
      title: "Sensors & Alarms",
      link: "#"
    },
    {
      title: "Operations & Intelligence",
    }],
  },
  {
    label: "Resources",
    submenu: [
      {
        title: "Documentation",
        link: "#"
      },
      {
        title: "Blog",
        link: "/blog"
      },
      {
        title: "Webinars",
        link: "#"
      },
      {
        title: "Support Center",
        link: "/support"
      },
      {
        title: "API Reference",
        link: "#"
      }
    ],
  },
  {
    label: "Partners",
    submenu: [{
      title: "Video Security",
      link: "#"
    },
    {
      title: "Access Control",
      link: "#"
    },
    {
      title: "Sensors & Alarms",
      link: "#"
    },
    {
      title: "Operations & Intelligence",
      link: "#"
    },
    {
      title: "Become a Partner",
      link: "#"
    }],
  },
];

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <nav className="hidden gap-8 lg:flex">
      {menus.map((item) => (
        <div
          key={item.label}
          className="relative group"
          onMouseEnter={() => setHoveredMenu(item.label)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          {/* Main Menu Item */}
          <button className="flex items-center cursor-pointer gap-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 py-6">
            {item.label}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${hoveredMenu === item.label ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 transform origin-top transition-all duration-300 ${hoveredMenu === item.label
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
              }`}
          >
            {/* Arrow pointer */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45" />

            {/* Submenu items */}
            <ul className="pt-3 pb-3">
              {item.submenu.map((subitem, index) => (
                <li key={index}>
                  <Link
                    href={subitem?.link
                      ?? "#"
                    }
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150 first:pt-4"
                  >
                    {subitem?.title ?? ""}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hover line indicator */}
          < div
            className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${hoveredMenu === item.label ? "w-full" : "w-0"
              }`}
          />
        </div>
      ))
      }
    </nav >
  );
}
