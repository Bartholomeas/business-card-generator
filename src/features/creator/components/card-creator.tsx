'use client';

import React, { useCallback, useState, useRef, useEffect, type ReactNode, forwardRef } from "react";

import { type KonvaEventObject } from "konva/lib/Node";
import { Stage, Layer, Rect, Circle } from 'react-konva';

import { useCardCreatorEvents } from "../hooks/use-card-creator-events";
import { useCardItemsStore } from "../stores/card-items-store";
import { renderObjects } from "../utils/render-objects";

import type Konva from "konva";

interface CardCreatorProps {
  children: ReactNode;
}

export const CardCreator = forwardRef<Konva.Stage, CardCreatorProps>(({ children }, stageRef) => {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  // const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { stageItems } = useCardItemsStore();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setStageSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  const { onMouseDownOnStage,
    onMouseMoveOnStage,
    onMouseUpOnStage } = useCardCreatorEvents();

  const handleDragStart = useCallback((e: KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    console.log('Drag start:', id);
  }, []);

  const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    console.log('Drag end:', id);
  }, []);

  // const zoomOnWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
  //   e.evt.preventDefault();
  //   const stage = stageRef.current;
  //   if (!stage) return;

  //   const oldScale = stage.scaleX();
  //   const { x: pointerX, y: pointerY } = stage.getPointerPosition() || { x: 0, y: 0 };
  //   const mousePointTo = {
  //     x: (pointerX - stage.x()) / oldScale,
  //     y: (pointerY - stage.y()) / oldScale,
  //   };
  //   const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;

  //   stage.scale({ x: newScale, y: newScale });

  //   const newPos = {
  //     x: pointerX - mousePointTo.x * newScale,
  //     y: pointerY - mousePointTo.y * newScale,
  //   };
  //   stage.position(newPos);
  //   stage.batchDraw();
  // }, []);

  return (
    <div ref={containerRef} className="size-[500px] bg-background-400">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        draggable={false}
        onMouseDown={onMouseDownOnStage}
        onMouseUp={onMouseMoveOnStage}
        onMouseMove={onMouseUpOnStage}
        className="absolute left-0 top-0"
      >
        {stageItems?.length > 0 ? stageItems.map(renderObjects) : null}
        <Layer>
          {children}
          <Rect
            name="select-box"
            x={0}
            y={0}
            width={0}
            height={0}
            fill="skyblue"
            opacity={0.4}
            visible={false}
          />
        </Layer>
      </Stage>
    </div>
  );
});

CardCreator.displayName = 'CardCreator';