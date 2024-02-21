"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/utils";

import { buttonVariants } from "~/components/common/button";

interface Props {
  items: { title: string; href: string }[];
}

export const SettingsSideNav = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
