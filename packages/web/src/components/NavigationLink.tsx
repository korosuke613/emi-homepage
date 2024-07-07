"use client";

import type { pathnames } from "@/config";
import { Link } from "@/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import type { ComponentProps } from "react";

export default function NavigationLink<
  Pathname extends keyof typeof pathnames,
>({ href, ...rest }: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link aria-current={isActive ? "page" : undefined} href={href} {...rest} />
  );
}
