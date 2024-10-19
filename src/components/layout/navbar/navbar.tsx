"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

import { routes } from "~/routes/routes";
import { cn } from "~/utils";

import { NavLeft } from "./nav-left";
import { NavMenu } from "./nav-menu";
import { NavSignLinks } from "./nav-sign-links";
import { UserDropdown } from "./user-dropdown";


export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isPublicView = !pathname?.includes(routes.panel);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavOpen = () => setIsOpen(pv => !pv);
  return (
    <nav className="fixed z-[999] flex h-[64px] w-full border-b-2 border-b-backgroundBorder bg-background">
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
          className="block text-2xl text-textPrimary md:hidden"
          onClick={toggleNavOpen}
        >
          <Menu />
        </motion.button>
      </div>
    </nav>
  );
};
