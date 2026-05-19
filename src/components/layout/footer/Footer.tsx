"use client";
import Link from "next/link";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import ContactSection from "@/components/common/ContactSection";
import { usePathname } from "next/navigation";
import { useSiteSettingQuery } from "@/services/site-settings/queries";
import { GeneralSettings } from "@/types/types";

const product = [
  {
    label: "ViVoo Camera",
    href: "/product-category/camera",
  },
  {
    label: "ViVoo ODM",
    href: "/product-category/odm",
  },
];

const solutionLinks = [
  {
    label: "Automotive dealership",
    href: "/solutions/automotive-dealerships",
  },
  {
    label: "Construction",
    href: "/solutions/construction",
  },
  {
    label: "Education",
    href: "/solutions/education",
  },
  {
    label: "Service 1",
    href: "/services/service-1",
  },
  {
    label: "Service 2",
    href: "/services/service-2",
  },
];

export default function Footer() {
  const pathName = usePathname();
  const { data: settingData } = useSiteSettingQuery("general");
  const settings = (settingData?.data?.value || {}) as Partial<GeneralSettings>;

  const logoDark = settings.logoDarkUrl || "/svgs/logo-bg-black.svg";
  const copyrightText = settings.copyrightText || "Avigilon Vietnam. All rights reserved.";
  const facebookLink = settings.facebookUrl || "#";
  const linkedinLink = settings.linkedinUrl || "#";
  const youtubeLink = settings.youtubeUrl || "#";
  const addressVal = settings.supportAddress || "Tầng 3, Tòa Hpcons Building, 2/13A Bạch Đằng, Phường Tân Sơn Hòa, Hồ Chí Minh";
  const phoneVal = settings.supportPhone || "(+84) 123456789";
  const emailVal = settings.supportEmail || "contact@gmail.com";
  const hoursVal = settings.businessHours || "Mon - Sat: 08:00 - 5:30";

  return (
    <>
      {pathName !== "/contact" && (
        <ContactSection />
      )}
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                src={logoDark}
                alt="Logo"
                width={120}
                height={80}
                className="mb-6"
              />
              <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">
                End-to-end video
                security and access
                control solutions to
                help your team protect
                what matters most.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={facebookLink}
                  aria-label="Facebook"
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <FaFacebook className="h-4 w-4" />
                </Link>
                <Link
                  href={linkedinLink}
                  aria-label="LinkedIn"
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <FaLinkedin className="h-4 w-4" />
                </Link>
                <Link
                  href={youtubeLink}
                  aria-label="Youtube"
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <FaYoutube className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-base font-semibold">
                Products
              </h5>
              <ul className="mt-4 space-y-2.5">
                {product.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-base font-semibold">
                Solutions & Services
              </h5>
              <ul className="mt-4 space-y-2.5">
                {solutionLinks.map(
                  (item) => (
                    <li
                      key={item.label}
                    >
                      <Link
                        href={item.href}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h5 className="text-base font-semibold">
                Contact Us
              </h5>
              <ul className="mt-4 space-y-4 text-sm text-white/75">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/85" />
                  <span>
                    {addressVal}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-white/85" />
                  <Link
                    href={`tel:${phoneVal.replace(/\s+/g, "")}`}
                    className="transition hover:text-white"
                  >
                    {phoneVal}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white/85" />
                  <Link
                    href={`mailto:${emailVal}`}
                    className="transition hover:text-white"
                  >
                    {emailVal}
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 shrink-0 text-white/85" />
                  <span>
                    {hoursVal}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>
              ©{" "}
              {new Date().getFullYear()}{" "}
              {copyrightText}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="transition hover:text-white/80"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="transition hover:text-white/80"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="transition hover:text-white/80"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
