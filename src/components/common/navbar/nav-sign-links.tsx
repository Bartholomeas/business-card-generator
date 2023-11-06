import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { routes } from "~/misc/routes";
import { cn } from "~/misc/lib/utils";

import { menuLinkVariants } from "./animations";

interface Props {
  inMenu?: boolean;
}

export const NavSignLinks = ({ inMenu = false }: Props) => {
  const signButtonClasses = `
    px-4 py-2
    rounded-xl
    font-medium
    whitespace-nowrap
    `;

  return (
    <motion.div
      variants={menuLinkVariants}
      className={cn("flex items-center gap-2", {
        "justify-between border-t-[1px] border-t-border pt-4": inMenu,
      })}
    >
      <Link href={routes.login}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(signButtonClasses, "text-textPrimary")}
        >
          Zaloguj się
        </motion.button>
      </Link>
      <Link href={routes.signUp}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(signButtonClasses, "bg-textPrimary text-background")}
        >
          Dołącz
        </motion.button>
      </Link>
    </motion.div>
  );
};
