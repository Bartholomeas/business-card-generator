import { type HTMLAttributes } from "react";

export interface FlipComponentRefProps {
  handleFlip: () => void;
}

export type FlipVariants = "front" | "back";
export interface WithFlipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: FlipVariants;
}

export interface ConfigOptions {
  buttonHandle?: boolean;
  scaleOnHover?: boolean;
  withRotation?: boolean;
}
