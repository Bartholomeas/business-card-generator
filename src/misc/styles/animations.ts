import { type ComponentProps } from "react";
import { type motion } from "framer-motion";

export const singleItemFadeIn = (index = 1): ComponentProps<typeof motion.div> => ({
  initial: {
    y: 50,
    opacity: 0,
  },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: {
    delay: 0.05 * index,
    duration: 0.25,
    ease: "easeOut",
  },
});