"use client";

import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const backlightVariants = cva(
  `mask-image: radial-gradient(circle, transparent 33%, black 33%); 
      animation: maskSlide 10s infinite linear; absolute inset-auto z-0 -translate-y-[6rem] rounded-full bg-primary-500
      bg-gradient-to-r from-transparent via-transparent to-primary-900 opacity-50 blur-3xl`,
  {
    variants: {
      size: {
        default: "h-64 w-64",
      },
      // style: {
      //   light:
      //     "bg-gradient-to-r from-transparent via-white to-transparent opacity-50 blur-lg filter",
      // },
    },
    defaultVariants: {
      size: "default",
      // style: "light",
    },
  },
);

interface BacklightProps extends VariantProps<typeof backlightVariants> {
  className?: string;
}

export const Backlight = ({ size = "default", className }: BacklightProps) => {
  return (
    <motion.span
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, 100, 100, 0, -100, -100, 0],
        y: [0, 50, 100, 150, 100, 50, 0],
        rotate: [0, 360],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        bounce: 1,
        delay: 0.3,
        duration: 16,
        ease: "easeInOut",
      }}
      className={backlightVariants({ size, className })}
    ></motion.span>
  );
};