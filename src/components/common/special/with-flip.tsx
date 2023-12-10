import type { ComponentType, HTMLAttributes } from "react";
import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export type FlipVariants = "front" | "back";
export interface WithFlipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: FlipVariants;
  buttonHandle?: boolean;
}

export function withFlip<T extends WithFlipProps = WithFlipProps>(
  Component: ComponentType<T>,
): ComponentType<T> {
  const WithFlipComponent = (props: T) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped((prevState) => !prevState);
    };

    const [rotateXaxis, setRotateXaxis] = useState(0);
    const [rotateYaxis, setRotateYaxis] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

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
        onClick={handleClick}
        transition={spring}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.div
          ref={ref}
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
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: "hidden",
                position: "absolute",
              }}
            >
              <Component
                {...props}
                variant="front"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: "hidden",
                position: "absolute",
              }}
            >
              <Component
                {...props}
                variant="back"
                style={{
                  width: "100%",
                  height: "100%",
                }}
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
