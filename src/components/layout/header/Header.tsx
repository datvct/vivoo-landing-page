"use client";

import LocaleLink from "@/components/common/LocaleLink";
import Navbar from "./Navbar";
import {
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSiteSettingQuery } from "@/services/site-settings/queries";
import { GeneralSettings } from "@/types/types";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";

export default function Header() {
  const { locale, t } = useLocale();
  const [open, setOpen] =
    useState(false);
  const [showDrawer, setShowDrawer] =
    useState(false);

  const { data: generalData } = useSiteSettingQuery("general", locale);
  const generalValue = (generalData?.data?.value || {}) as Partial<GeneralSettings>;
  const logoUrl = generalValue.logoUrl || "/svgs/logo.svg";

  const { data: headerData } = useSiteSettingQuery("header", locale);
  const customMenus = headerData?.data?.value?.menus || [];
  const activeMenus = customMenus.length > 0 ? customMenus : [];

  const openDrawer = () => {
    setShowDrawer(true);
    requestAnimationFrame(() =>
      setOpen(true)
    );
  };

  const closeDrawer = () => {
    setOpen(false);
    setTimeout(
      () => setShowDrawer(false),
      300
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <LocaleLink href="/">
            <Image
              src={logoUrl}
              alt="Logo"
              width={120}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </LocaleLink>

          <Navbar menus={customMenus} />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />

          <div className="hidden items-center gap-6 lg:flex">
            <LocaleLink
              href="/contact"
              className="bg-blue cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              {t("nav.contact")}
            </LocaleLink>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-black lg:hidden"
            aria-label={t("nav.openMenu")}
            onClick={openDrawer}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
            onClick={closeDrawer}
          />

          <div
            className={`absolute top-0 right-0 bottom-0 z-50 w-full max-w-xs transform bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <LocaleLink href="/">
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={110}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
              </LocaleLink>
              <button
                type="button"
                className="p-2"
                aria-label={t("nav.closeMenu")}
                onClick={closeDrawer}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-4 py-6 max-h-[calc(100vh-80px)] overflow-y-auto">
              {activeMenus.map((group: { label: string; link?: string; submenu?: { title: string; link?: string }[] }) => (
                <div
                  key={group.label}
                  className="mb-6"
                >
                  <div className="mb-3 text-sm font-semibold text-black">
                    {group.link ? (
                      <LocaleLink href={group.link} onClick={closeDrawer} className="hover:text-blue-600">
                        {group.label}
                      </LocaleLink>
                    ) : (
                      group.label
                    )}
                  </div>
                  {group.submenu && group.submenu.length > 0 && (
                    <div className="space-y-1 pl-2 border-l border-slate-100">
                      {group.submenu.map(
                        (s) => (
                          <LocaleLink
                            key={s.title}
                            href={s.link ?? "#"}
                            className="block rounded-md px-3 py-2 text-sm text-black/80 hover:bg-black/5"
                            onClick={closeDrawer}
                          >
                            {s.title}
                          </LocaleLink>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-4">
                <LanguageSwitcher />
                <LocaleLink
                  href="/contact"
                  className="block w-full rounded-md bg-black px-4 py-2 text-center text-sm font-semibold text-white"
                  onClick={closeDrawer}
                >
                  {t("nav.contact")}
                </LocaleLink>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
