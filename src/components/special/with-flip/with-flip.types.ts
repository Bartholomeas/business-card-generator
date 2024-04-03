import { type HTMLAttributes, type RefObject } from "react";

export interface FlipComponentRefProps {
  handleFlip: () => void;
  parentRef: RefObject<HTMLDivElement>;
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
