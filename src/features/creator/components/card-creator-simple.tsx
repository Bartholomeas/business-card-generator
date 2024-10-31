'use client';

import React, { useCallback, useState, useRef } from "react";

import { type KonvaEventObject } from "konva/lib/Node";
import { Stage, Layer, Rect } from 'react-konva';


export const CardCreator = () => {
  const stageRef = useRef<any>(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectBox, setSelectBox] = useState({ x: 0, y: 0, width: 0, height: 0, visible: false });

  const zoomOnWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const oldScale = scale.x;

    const pointer = stageRef.current?.getPointerPosition();
    const mousePointTo = {
      x: (pointer?.x - position.x) / oldScale,
      y: (pointer?.y - position.y) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? 1 : -1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale({ x: newScale, y: newScale });
    setPosition({
      x: pointer?.x - mousePointTo.x * newScale,
      y: pointer?.y - mousePointTo.y * newScale,
    });
  }, [scale, position]);

  const onMouseDown = useCallback((e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectBox({
        ...selectBox,
        x: e.evt.clientX,
        y: e.evt.clientY,
        visible: true,
      });
    }
  }, [selectBox]);

  const onMouseMove = useCallback((e: KonvaEventObject<MouseEvent>) => {
    if (selectBox.visible) {
      setSelectBox({
        ...selectBox,
        width: e.evt.clientX - selectBox.x,
        height: e.evt.clientY - selectBox.y,
      });
    } else if (isDragging) {
      setPosition({
        x: e.evt.clientX,
        y: e.evt.clientY,
      });
    }
  }, [selectBox, isDragging]);

  const onMouseUp = useCallback(() => {
    setSelectBox({ ...selectBox, visible: false });
    setIsDragging(false);
  }, [selectBox]);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onWheel={zoomOnWheel}
      scaleX={scale.x}
      scaleY={scale.y}
      x={position.x}
      y={position.y}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <Layer>
        {/* Add your editable items here */}
        <Rect
          x={100}
          y={100}
          width={100}
          height={100}
          fill="red"
          draggable
        />
        <Rect
          x={selectBox.x}
          y={selectBox.y}
          width={selectBox.width}
          height={selectBox.height}
          fill="rgba(0, 0, 255, 0.3)"
          visible={selectBox.visible}
        />
      </Layer>
    </Stage>
  );
};
