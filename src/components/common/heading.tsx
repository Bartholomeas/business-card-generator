import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const headingVariants = cva("", {
  variants: {
    type: {
      // Heading sizes
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
    },
    size: {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
    },
    color: {
      "neutral-900": "text-neutral-900",
      "neutral-700": "text-neutral-700",
      "neutral-600": "text-neutral-600",
      "neutral-500": "text-neutral-500",
      "neutral-100": "text-neutral-100",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      right: "text-right",
      center: "text-center",
      justify: "text-justify",
    },
  },

  defaultVariants: {
    type: "h2",
    weight: "semibold",
    color: "neutral-900",
    align: "left",
  },
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: React.ReactNode;
  className?: string;
}

// Size property just changes size visually, heading property is handling semantic heading tag
export const Heading = ({
  type,
  weight,
  color,
  size,
  align,
  className,
  children,
}: HeadingProps) => {
  const Component = type ?? "h2";
  return (
    <Component className={headingVariants({ type: size ?? type, weight, color, align, className })}>
      {children}
    </Component>
  );
};
