"use client";

import { TextEditStylesMobile, type TextEditStylesMobileProps } from "./text-edit-styles-mobile";
import { TextEditStylesDesktop } from "./text-edit-styles-desktop";
import { useMediaQuery } from "~/hooks/useMediaQuery";

type TextEditStylesProps = TextEditStylesMobileProps;

export const TextEditStyles = ({ code, className, ...props }: TextEditStylesProps) => {
  const matches = useMediaQuery("(min-width: 992px)");
  return matches ? (
    <TextEditStylesDesktop code={code} className={className} {...props} />
  ) : (
    <TextEditStylesMobile code={code} className={className} {...props} />
  );
};