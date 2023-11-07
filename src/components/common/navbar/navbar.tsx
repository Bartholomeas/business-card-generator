"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { handler } from "tailwindcss-animate";
import { navLinks, routes, sidebarLinks } from "~/misc/routes";

import { NavSignLinks } from "./nav-sign-links";
import { NavLink, NavMenuLink } from "./nav-links";
import { UserDropdown } from "./user-dropdown";
import { Logo } from "../special/logo";

import { menuVariants } from "./animations";

import { Menu } from "lucide-react";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="fixed z-[999] flex h-16 w-full border-b-[1px] border-border bg-background">
        <div className="container mx-auto flex w-full items-center justify-between px-4">
          <NavLeft />
          <NavMenu isOpen={isOpen} />
          <span className="hidden lg:block">
            {session ? <UserDropdown session={session} /> : <NavSignLinks />}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block text-2xl text-textPrimary lg:hidden"
            onClick={() => setIsOpen((pv) => !pv)}
          >
            <Menu />
          </motion.button>
        </div>
      </nav>
    </>
  );
};

const NavLeft = () => {
  const pathname = usePathname();
  const isPanel = pathname.includes(routes.panel);

  return (
    <div className="flex items-center gap-6">
      <Logo withLink withText />
      {isPanel
        ? null
        : navLinks.map((link) => (
            <NavLink
              key={`${link.label}-${link.href}`}
              text={link.label}
              href={link.href}
            />
          ))}
    </div>
  );
};

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isPanel = pathname.includes(routes.panel);

  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute inset-x-0 top-full flex origin-top flex-col gap-4 border-y-[1px] border-y-border bg-background p-4 pt-8 shadow-lg"
    >
      {isPanel
        ? sidebarLinks.map((link) => (
            <NavMenuLink
              key={`${link.label}-${link.href}`}
              text={link.label}
              href={link.href}
              icon={link.icon}
            />
          ))
        : navLinks.map((link) => (
            <NavMenuLink
              key={`${link.label}-${link.href}`}
              text={link.label}
              href={link.href}
            />
          ))}

      {session ? <UserDropdown session={session} /> : <NavSignLinks inMenu />}
    </motion.div>
  );
};
