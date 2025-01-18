"use client";
import React from "react";

import { Trash2 } from "lucide-react";

import { cn } from "~/utils";

interface SelectionOverlayProps {
  width: number;
  height: number;
  onDragStart?: (e: React.MouseEvent | React.DragEvent) => void;
  onDelete?: () => void;
  onScale?: (direction: 'nw' | 'ne' | 'sw' | 'se', e: React.MouseEvent | React.TouchEvent) => void;
  showControls?: {
    delete?: boolean;
    resize?: boolean;
    rotate?: boolean;
  };
  className?: string;
}

export const SelectionOverlay = ({
  width,
  height,
  onDragStart,
  onDelete,
  onScale,
  showControls = {
    delete: true,
    resize: true,
    rotate: false
  },
  className
}: SelectionOverlayProps) => {
  const handleScaleStart = (direction: 'nw' | 'ne' | 'sw' | 'se', e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on mobile
    onScale?.(direction, e);
  };

  return (
    <div
      className={cn(
        "absolute inset-0 border-2 border-blue-500 cursor-move",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
      draggable
      onDragStart={onDragStart}
    >
      {showControls.resize && (
        <>
          <div
            role="button"
            tabIndex={0}
            className="absolute -left-1 -top-1 size-3 cursor-nw-resize border border-blue-500 bg-white"
            onMouseDown={(e) => handleScaleStart('nw', e)}
            onTouchStart={(e) => handleScaleStart('nw', e)}
          />
          <div
            role="button"
            tabIndex={0}
            className="absolute -right-1 -top-1 size-3 cursor-ne-resize border border-blue-500 bg-white"
            onMouseDown={(e) => handleScaleStart('ne', e)}
            onTouchStart={(e) => handleScaleStart('ne', e)}
          />
          <div
            role="button"
            tabIndex={0}
            className="absolute -bottom-1 -left-1 size-3 cursor-sw-resize border border-blue-500 bg-white"
            onMouseDown={(e) => handleScaleStart('sw', e)}
            onTouchStart={(e) => handleScaleStart('sw', e)}
          />
          <div
            role="button"
            tabIndex={0}
            className="absolute -bottom-1 -right-1 size-3 cursor-se-resize border border-blue-500 bg-white"
            onMouseDown={(e) => handleScaleStart('se', e)}
            onTouchStart={(e) => handleScaleStart('se', e)}
          />
        </>
      )}

      <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {showControls.delete && onDelete && (
          <button
            onClick={onDelete}
            className="group rounded-md border border-gray-200 bg-white p-1 shadow-md hover:border-red-200 hover:bg-red-50"
          >
            <Trash2 className="size-2 text-gray-600 group-hover:text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
}; 