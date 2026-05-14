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

const quickLinks = [
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
];

export default function Footer() {
  return (
    <>
      <ContactSection />
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                src="/svgs/logo-bg-black.svg"
                alt="Avigilon Vietnam Logo"
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
                  href="#"
                  aria-label="Facebook"
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <FaFacebook className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <FaLinkedin className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="Youtube"
                  className="rounded-full border border-white/20 p-2 text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <FaYoutube className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-base font-semibold">
                Quick Links
              </h5>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map(
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
                Solutions
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
                    Tầng 3, Tòa Hpcons
                    Building, 2/13A Bạch
                    Đằng, Phường Tân Sơn
                    Hòa, Hồ Chí Minh
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-white/85" />
                  <Link
                    href="tel:+842812345678"
                    className="transition hover:text-white"
                  >
                    (+84) 123456789
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white/85" />
                  <Link
                    href="mailto:sales@avigilon.vn"
                    className="transition hover:text-white"
                  >
                    contact@gmail.com
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 shrink-0 text-white/85" />
                  <span>
                    Mon - Sat: 08:00 -
                    5:30
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>
              ©{" "}
              {new Date().getFullYear()}{" "}
              Avigilon Vietnam. All
              rights reserved.
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
