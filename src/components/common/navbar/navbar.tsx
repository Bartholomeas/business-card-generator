"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";

import { routes } from "~/misc/routes";

import { NavSignLinks } from "./nav-sign-links";
import { NavLink, NavMenuLink } from "./nav-links";

import { menuVariants } from "./motion";

import { Menu } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed flex h-16 w-full border-b-[1px] border-border bg-background">
        <div className="container mx-auto flex w-full items-center justify-between px-4">
          <NavLeft />
          <NavMenu isOpen={isOpen} />
          <span className="hidden lg:block">
            <NavSignLinks />
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-textPrimary block text-2xl lg:hidden"
            onClick={() => setIsOpen((pv) => !pv)}
          >
            <Menu />
          </motion.button>
        </div>
      </nav>
    </>
  );
};

const Logo = () => {
  return (
    <Link href={routes.home}>
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.svg"}
          alt="Logo"
          height={20}
          width={20}
          className="object-contain"
        />
        <p className="text-textPrimary font-bold">Kwirk</p>
      </div>
    </Link>
  );
};

const NavLeft = () => {
  return (
    <div className="flex items-center gap-6">
      <Logo />
      {navLinks.map((link) => (
        <NavLink
          key={`${link.text}-${link.href}`}
          text={link.text}
          href={link.href}
        />
      ))}
    </div>
  );
};

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute left-0 right-0 top-full flex origin-top flex-col gap-4 border-y-[1px] border-y-border bg-background p-4 pt-8 shadow-lg"
    >
      {navLinks.map((link) => (
        <NavMenuLink
          key={`${link.text}-${link.href}`}
          text={link.text}
          href={link.href}
        />
      ))}

      <NavSignLinks inMenu />
    </motion.div>
  );
};

const navLinks = [
  {
    text: "Kreator",
    href: routes.home,
  },
  {
    text: "O nas",
    href: routes.home,
  },
  {
    text: "Cennik",
    href: routes.home,
  },
];
