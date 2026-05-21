"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/contexts/LocaleContext";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/** Next.js Link with automatic `/en` or `/vi` prefix. */
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { lp } = useLocale();
  return <Link href={lp(href)} {...props} />;
}
