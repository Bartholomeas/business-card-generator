"use client";

import { type ComponentProps } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const backlightVariants = cva(
  `mask-image: radial-gradient(circle, transparent 33%, black 33%); 
      animation: maskSlide 10s infinite linear; absolute inset-auto z-0 -translate-y-[6rem] rounded-full
      bg-gradient-to-r opacity-50 blur-3xl`,
  {
    variants: {
      size: {
        lg: "h-64 w-64",
        md: "h-48 w-48",
        sm: "h-32 w-32",
      },
      color: {
        default: "bg-primary-500 from-transparent via-transparent to-primary-900",
        white: "bg-white from-transparent via-transparent to-white",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "default",
    },
  },
);

type RotationType = "default" | "reversed";
const animations: Record<RotationType, ComponentProps<typeof motion.span>["animate"]> = {
  default: {
    x: [0, 100, 100, 0, -100, -100, 0],
    y: [0, 50, 100, 150, 100, 50, 0],
    rotate: [0, 360],
  },
  reversed: {
    x: [0, -100, -180, 0, 140, 190, 0],
    y: [0, -20, -80, -130, -170, -50, 0],
    rotate: [360, 0],
  },
};
const DEFAULT_TRANSITION: ComponentProps<typeof motion.div>["transition"] = {
  repeat: Infinity,
  repeatType: "loop",
  bounce: 1,
  delay: 0.3,
  duration: 16,
  ease: "easeInOut",
};

interface BacklightProps extends VariantProps<typeof backlightVariants> {
  rotate?: RotationType;
  transition?: ComponentProps<typeof motion.div>["transition"];
  className?: string;
}

export const Backlight = ({
  size = "lg",
  color,
  rotate = "default",
  transition,
  className,
}: BacklightProps) => {
  return (
    <motion.span
      initial={{ x: 0, y: 0 }}
      animate={animations[rotate]}
      transition={{ ...DEFAULT_TRANSITION, ...transition }}
      className={backlightVariants({ size, color, className })}
    ></motion.span>
  );
};