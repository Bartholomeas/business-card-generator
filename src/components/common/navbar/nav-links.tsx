import { type ReactNode } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { menuLinkArrowVariants, menuLinkVariants } from "./motion";

import { ArrowRight } from "lucide-react";

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
      className="hidden h-[30px] overflow-hidden font-medium lg:block"
    >
      <NavFlippableText>{text}</NavFlippableText>
    </Link>
  );
};

export const NavMenuLink = ({ text, href }: NavLink) => {
  return (
    <MotionLink
      variants={menuLinkVariants}
      rel="nofollow"
      href={href}
      className="flex h-[30px] items-start gap-2 overflow-hidden text-lg font-medium"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <ArrowRight className="text-textPrimary h-[30px]" />
      </motion.span>
      <NavFlippableText>{text}</NavFlippableText>
    </MotionLink>
  );
};

export const NavFlippableText = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div whileHover={{ y: -30 }}>
      <span className="text-textSecondary flex h-[30px] items-center">
        {children}
      </span>
      <span className="text-textPrimary flex h-[30px] items-center font-bold">
        {children}
      </span>
    </motion.div>
  );
};
