import { type ComponentProps, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "~/utils";

interface SlideInContainerProps {
  children?: ReactNode;
  className?: ComponentProps<"div">["className"];
}

export const SlideInContainer = ({ children, className }: SlideInContainerProps) => (
  <motion.div
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className={cn(
      "bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent",
      className,
    )}
  >
    {children}
  </motion.div>
);