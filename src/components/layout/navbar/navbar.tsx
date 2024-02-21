"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { navLinks, routes } from "~/routes/routes";
import { cn } from "~/utils";

import { Logo } from "../../special/logo";
import { NavLink } from "./nav-links";
import { NavSignLinks } from "./nav-sign-links";
import { UserDropdown } from "./user-dropdown";

import { NavMenu } from "./nav-menu";
import { Menu } from "lucide-react";
import { NavLeft } from "./nav-left";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isPublicView = !pathname.includes(routes.panel);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="border-border bg-background fixed z-[999] flex h-[64px] w-full border-b-[1px]">
      <div
        className={cn("mx-auto flex w-full items-center justify-between px-4", {
          container: isPublicView,
        })}
      >
        <NavLeft />
        <NavMenu isOpen={isOpen} />
        <span className="hidden md:block">{session ? <UserDropdown /> : <NavSignLinks />}</span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-textPrimary block text-2xl md:hidden"
          onClick={() => setIsOpen(pv => !pv)}
        >
          <Menu />
        </motion.button>
      </div>
    </nav>
  );
};
