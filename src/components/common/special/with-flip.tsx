"use client";
import type { ComponentType, HTMLAttributes } from "react";
import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

import { cn } from "~/misc/utils/cn";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export type FlipVariants = "front" | "back";
export interface WithFlipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: FlipVariants;
  handleFlip?: () => void;
}

export function withFlip<T extends WithFlipProps = WithFlipProps>(
  Component: ComponentType<T>,
  buttonHandle = false,
): ComponentType<T> {
  const WithFlipComponent = (props: T) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
      setIsFlipped((prevState) => !prevState);
    };

    const [rotateXaxis, setRotateXaxis] = useState(0);
    const [rotateYaxis, setRotateYaxis] = useState(0);
    const parentRef = useRef<HTMLDivElement>(null);

    // const handleMouseMove = (event) => {
    //   const element = ref.current;
    //   const elementRect = element?.getBoundingClientRect();
    //   const elementWidth = elementRect?.width;
    //   const elementHeight = elementRect?.height;
    //   const elementCenterX = elementWidth ? elementWidth / 2 : 0;
    //   const elementCenterY = elementHeight ? elementHeight / 2 : 0;
    //   const mouseX = event.clientY - elementRect.y - elementCenterY;
    //   const mouseY = event.clientX - elementRect.x - elementCenterX;
    //   const degreeX = (mouseX / elementWidth) * 20;
    //   const degreeY = (mouseY / elementHeight) * 20;
    //   setRotateXaxis(degreeX);
    //   setRotateYaxis(degreeY);
    // };

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

    return (
      <motion.div
        onClick={buttonHandle ? undefined : () => handleFlip()}
        transition={spring}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.div
          ref={parentRef}
          whileHover={{ scale: 1.1 }}
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
                position: "absolute",
                backfaceVisibility: "hidden",
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 0 : 1,
              }}
            >
              <Component
                {...props}
                variant="front"
                // handleFlip={buttonHandle ? () => handleFlip() : undefined}
                className={cn("h-full w-full", props.className)}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                position: "absolute",
                backfaceVisibility: "hidden",
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 1 : 0,
              }}
            >
              <Component
                {...props}
                variant="back"
                // handleFlip={buttonHandle ? () => handleFlip() : undefined}
                className={cn("h-full w-full", props.className)}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  WithFlipComponent.displayName = "WithFlipComponent";

  return WithFlipComponent;
}
