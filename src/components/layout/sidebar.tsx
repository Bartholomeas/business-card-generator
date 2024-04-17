"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "~/routes/routes";
import { cn } from "~/utils";

import { buttonVariants } from "~/components/common/button";

const isActiveLink = (pathname: string, href: string) => {
  return (
    pathname === href ||
    (pathname.startsWith(href) &&
      (pathname[href.length] === "/" || pathname.length === href.length))
  );
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="mr-0 h-full pb-12 md:col-span-3 lg:col-span-2">
      <div className="flex flex-col gap-2 py-6 pr-2">
        {sidebarLinks.map(link => {
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: cn({ "bg-primary-gradient": isActiveLink(pathname, link.href) }),
                }),
                "mr-2 flex w-full flex-row justify-start gap-2 px-2",
              )}
            >
              <>
                {<link.icon size={20} />}

                {link.label}
              </>
            </Link>
          );
        })}
      </div>
    </div>
  );
};