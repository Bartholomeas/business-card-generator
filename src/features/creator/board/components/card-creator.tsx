"use client";

import React, { forwardRef, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { Layer, Rect, Stage } from "react-konva";

import { useCardCreatorEvents } from "~/features/creator/board/hooks";
import { type ItemHandleActions } from "~/features/creator/board/types/creator-item.types";

import type Konva from "konva";

interface CardCreatorProps {
  children: ReactNode;
  onSelect: ItemHandleActions["onSelect"];
}

export const CardCreator = forwardRef<Konva.Stage, CardCreatorProps>(
  ({ children, onSelect }, stageRef) => {
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const { onMouseDownOnStage, onMouseMoveOnStage, onMouseUpOnStage } =
      useCardCreatorEvents(onSelect);

    const updateSize = useCallback(() => {
      console.log("updateSize");
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setStageSize({ width, height });
      }
    }, [containerRef]);

    // infinite loop bcs of onSelect
    useEffect(() => {
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, [updateSize]);

    return (
      <div ref={containerRef} className="h-[600px] w-full bg-background-400">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          draggable={false}
          onMouseDown={onMouseDownOnStage}
          onMouseUp={onMouseMoveOnStage}
          onMouseMove={onMouseUpOnStage}
        >
          <Layer>
            {children}
            <Rect
              name="select-box"
              x={0}
              y={0}
              width={100}
              height={100}
              fill="skyblue"
              opacity={0.4}
              visible={false}
              draggable
            />
          </Layer>
        </Stage>
      </div>
    );
  },
);

CardCreator.displayName = "CardCreator";
