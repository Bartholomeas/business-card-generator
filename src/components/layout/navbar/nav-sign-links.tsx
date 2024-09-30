import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { routes } from "~/routes/routes";
import { cn } from "~/utils";

import { menuLinkVariants } from "./navbar.animations";
import { buttonVariants } from "~/components/common";

interface Props {
  inMenu?: boolean;
}

export const NavSignLinks = ({ inMenu = false }: Props) => {
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
          className={buttonVariants({
            variant: "ghost",
            className: "whitespace-nowrap",
          })}
        >
          Zaloguj się
        </motion.button>
      </Link>
      <Link href={routes.signUp}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={buttonVariants({
            className: "whitespace-nowrap",
          })}
        >
          Dołącz
        </motion.button>
      </Link>
    </motion.div>
  );
};
