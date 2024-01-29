"use client";

import { type MouseEvent, useState } from "react";

export const useHandleMouseMove = (ref: React.RefObject<HTMLDivElement>) => {
  const [rotateXaxis, setRotateXaxis] = useState(0);
  const [rotateYaxis, setRotateYaxis] = useState(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;

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
  };

  const handleMouseEnd = () => {
    setRotateXaxis(0);
    setRotateYaxis(0);
  };

  return {
    rotateXaxis,
    rotateYaxis,
    setRotateXaxis,
    setRotateYaxis,
    handleMouseEnd,
    handleMouseMove,
  };
};
