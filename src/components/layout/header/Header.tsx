"use client";

import Link from "next/link";
import Navbar, {
  menus,
} from "./Navbar";
import {
  CircleHelp,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] =
    useState(false);
  const [showDrawer, setShowDrawer] =
    useState(false);

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
          <Link href="/">
            <Image
              src="/svgs/logo.svg"
              alt="Logo"
              width={120}
              height={80}
            />
          </Link>

          <Navbar />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/contact"
              className="bg-blue cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Contact
            </Link>

            <Link href="/support">
              <CircleHelp
                size={18}
                color="black"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-black lg:hidden"
            aria-label="Open menu"
            onClick={openDrawer}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
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
              <Link href="/">
                <Image
                  src="/svgs/logo.svg"
                  alt="Logo"
                  width={110}
                  height={60}
                />
              </Link>
              <button
                type="button"
                className="p-2"
                aria-label="Close menu"
                onClick={closeDrawer}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-4 py-6">
              {menus.map((group) => (
                <div
                  key={group.label}
                  className="mb-6"
                >
                  <div className="mb-3 text-sm font-semibold text-black">
                    {group.label}
                  </div>
                  <div className="space-y-1">
                    {group.submenu.map(
                      (s) => (
                        <Link
                          key={s.title}
                          href={
                            s.link ??
                            "#"
                          }
                          className="block rounded-md px-3 py-2 text-sm text-black/80 hover:bg-black/5"
                          onClick={
                            closeDrawer
                          }
                        >
                          {s.title}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <Link
                  href="/contact"
                  className="block w-full rounded-md bg-black px-4 py-2 text-center text-sm font-semibold text-white"
                  onClick={closeDrawer}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
