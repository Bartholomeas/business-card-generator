"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/utils";

import { buttonVariants } from "~/components/common/button";


interface Props {
  items: { title: string; href: string; }[];
}

export const SettingsSideNav = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="relative w-full bg-background lg:flex-col lg:space-x-0 lg:space-y-1">
      <div className="sticky top-20 flex w-full gap-2 lg:flex-col">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: cn("justify-start", {
                  "bg-primary-gradient": pathname === item.href,
                }),
              }),
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};
