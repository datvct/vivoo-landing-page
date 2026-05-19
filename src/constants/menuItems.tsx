import { NavItem } from "@/types/types";
import {
  LayoutDashboard,
  Settings2,
  FileText,
  Image as ImageIcon,
  User,
  UserCircle,
  Blocks,
  BriefcaseBusiness,
  FolderClosed,
  Box,
  MonitorCog,
  Home,
  Contact,
} from "lucide-react";

export const defaultItems: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: (
      <LayoutDashboard className="h-5 w-5" />
    ),
  },
  {
    key: "users",
    label: "Users",
    href: "/admin/users",
    icon: (
      <UserCircle className="h-5 w-5" />
    ),
  },
  {
    key: "solutions",
    label: "Solutions",
    href: "/admin/solutions",
    icon: (
      <Blocks className="h-5 w-5" />
    ),
  },
  {
    key: "services",
    label: "Services",
    href: "/admin/services",
    icon: (
      <BriefcaseBusiness className="h-5 w-5" />
    ),
  },
  {
    key: "product-categories",
    label: "Product Categories",
    href: "/admin/product-categories",
    icon: (
      <FolderClosed className="h-5 w-5" />
    ),
  },
  {
    key: "product",
    label: "Product",
    href: "/admin/product",
    icon: <Box className="h-5 w-5" />,
  },
  {
    key: "contact",
    label: "Contact",
    href: "/admin/contact",
    icon: (
      <Contact className="h-5 w-5" />
    ),
  },
  {
    key: "media",
    label: "Media",
    href: "/admin/media",
    icon: (
      <ImageIcon className="h-5 w-5" />
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: (
      <MonitorCog className="h-5 w-5" />
    ),
    children: [
      {
        key: "general",
        label: "General",
        href: "/admin/settings/general",
      },
      {
        key: "home",
        label: "Setting Home",
        href: "/admin/settings/home",
      },
      {
        key: "menu",
        label: "Setting Menu",
        href: "/admin/settings/menu",
      },
    ],
  },
];
