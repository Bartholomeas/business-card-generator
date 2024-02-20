import { type ReactNode } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { menuLinkArrowVariants, menuLinkVariants } from "./navbar.animations";

import { ArrowRight, type LucideIcon } from "lucide-react";

const MotionLink = motion(Link);

interface NavLink {
  text: string;
  href: string;
}

export const NavLink = ({ text, href }: NavLink) => {
  return (
    <Link
      href={href}
      rel="nofollow"
      className="hidden h-[30px] overflow-hidden text-sm font-medium md:block"
    >
      <NavFlippableText>{text}</NavFlippableText>
    </Link>
  );
};

interface NavMenuLink extends NavLink {
  icon?: LucideIcon;
}

export const NavMenuLink = ({ text, href, icon: Icon }: NavMenuLink) => {
  return (
    <MotionLink
      variants={menuLinkVariants}
      rel="nofollow"
      href={href}
      className="flex h-[30px] items-start gap-2 overflow-hidden text-lg font-medium"
    >
      <motion.span variants={menuLinkArrowVariants}>
        {Icon ? <Icon /> : <ArrowRight className="h-[30px] text-textPrimary" />}
      </motion.span>
      <NavFlippableText>{text}</NavFlippableText>
    </MotionLink>
  );
};

export const NavFlippableText = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div whileHover={{ y: -30 }}>
      <span className="flex h-[30px] items-center text-textSecondary">{children}</span>
      <span className="flex h-[30px] items-center font-bold text-textPrimary">{children}</span>
    </motion.div>
  );
};
