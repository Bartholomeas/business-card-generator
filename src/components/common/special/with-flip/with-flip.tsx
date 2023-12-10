"use client";
import type { ComponentType, MouseEvent } from "react";
import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { motion, useSpring } from "framer-motion";

import { cn } from "~/misc/utils/cn";

import {
  type WithFlipProps,
  type ConfigOptions,
  type FlipComponentRefProps,
} from "./types";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export function withFlip<T extends WithFlipProps = WithFlipProps>(
  Component: ComponentType<T>,
  {
    buttonHandle = false,
    scaleOnHover = false,
    withRotation = false,
  }: ConfigOptions,
) {
  const FlippableWrapper = React.forwardRef<FlipComponentRefProps, T>(
    (props: T, ref) => {
      const [isFlipped, setIsFlipped] = useState(false);

      const handleFlip = () => {
        setIsFlipped((prevState) => !prevState);
      };

      const [rotateXaxis, setRotateXaxis] = useState(0);
      const [rotateYaxis, setRotateYaxis] = useState(0);
      const parentRef = useRef<HTMLDivElement>(null);

      const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (withRotation) {
          const element = parentRef.current;

          const elementRect = element?.getBoundingClientRect();
          const elementWidth = elementRect?.width;
          const elementHeight = elementRect?.height;
          const elementCenterX = elementWidth ? elementWidth / 2 : 0;
          const elementCenterY = elementHeight ? elementHeight / 2 : 0;

          const mouseX = event.clientY - (elementRect?.y ?? 0) - elementCenterY;
          const mouseY = event.clientX - (elementRect?.x ?? 0) - elementCenterX;

          const degreeX = (mouseX / (elementWidth ?? 1)) * 20;
          const degreeY = (mouseY / (elementHeight ?? 1)) * 20;

          setRotateXaxis(degreeX);
          setRotateYaxis(degreeY);
        }
      };

      const handleMouseEnd = () => {
        setRotateXaxis(0);
        setRotateYaxis(0);
      };

      const dx = useSpring(0, spring);
      const dy = useSpring(0, spring);

      useEffect(() => {
        dx.set(-rotateXaxis);
        dy.set(rotateYaxis);
      }, [rotateXaxis, rotateYaxis]);

      useImperativeHandle(ref, () => ({ handleFlip }));

      return (
        <motion.div
          onClick={buttonHandle ? undefined : () => handleFlip()}
          transition={spring}
          className="h-full w-full"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            ref={parentRef}
            whileHover={{ scale: scaleOnHover ? 1.1 : 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseEnd}
            transition={spring}
            style={{
              width: "100%",
              height: "100%",
              rotateX: dx,
              rotateY: dy,
            }}
          >
            <div
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
                width: "100%",
                height: "100%",
              }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? -180 : 0 }}
                transition={spring}
                style={{
                  // position: "absolute",
                  // backfaceVisibility: "hidden",
                  // width: "100%",
                  // height: "100%",
                  zIndex: isFlipped ? 0 : 1,
                }}
                className="backface-hidden absolute h-full w-full"
              >
                <Component
                  {...props}
                  variant="front"
                  className={cn(props.className)}
                />
              </motion.div>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: isFlipped ? 0 : 180 }}
                transition={spring}
                style={{
                  // position: "absolute",
                  // backfaceVisibility: "hidden",
                  // width: "100%",
                  // height: "100%",
                  zIndex: isFlipped ? 1 : 0,
                }}
                className="backface-hidden absolute h-full w-full"
              >
                <Component
                  {...props}
                  variant="back"
                  className={cn(props.className)}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      );
    },
  );
  FlippableWrapper.displayName = "FlippableWrapper";

  return FlippableWrapper;
}
