"use client";
import React from "react";

import { Trash2 } from "lucide-react";

import { cn } from "~/utils";

interface SelectionOverlayProps {
  width: number;
  height: number;
  onDragStart?: (e: React.MouseEvent | React.DragEvent) => void;
  onDelete?: () => void;
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
  showControls = {
    delete: true,
    resize: false,
    rotate: false
  },
  className
}: SelectionOverlayProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 border-2 border-blue-500 cursor-move",
        "before:absolute before:-left-1 before:-top-1 before:h-3 before:w-3 before:bg-white before:border before:border-blue-500",
        "after:absolute after:-right-1 after:-bottom-1 after:h-3 after:w-3 after:bg-white after:border after:border-blue-500",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
      draggable
      onDragStart={onDragStart}
    >
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