import React from "react";

import Image from "next/image";

import { type DecorationElement } from "~/stores/card";
import { cn } from "~/utils";

import { SelectionOverlay } from "./selection-overlay";

export type DragDirection = 'nw' | 'ne' | 'sw' | 'se';

interface DraggableDecorationProps {
  decoration: DecorationElement;
  isSelected: boolean;
  isDragging: boolean;
  isMobile: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
  onClick: () => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onScale: (direction: DragDirection, e: React.MouseEvent | React.TouchEvent) => void;
}

export const DraggableDecoration = ({
  decoration,
  isSelected,
  isDragging,
  isMobile,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
  onClick,
  onDelete,
  onDragStart,
  onScale,
}: DraggableDecorationProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        "decoration-item absolute touch-manipulation pointer-events-auto",
        isSelected && "z-40",
        !isSelected && "z-25",
        isDragging && isSelected && isMobile && "opacity-70"
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      style={{
        position: 'absolute',
        left: `${decoration.positionX}px`,
        top: `${decoration.positionY}px`,
        width: `${decoration.width}px`,
        height: `${decoration.height}px`,
        transform: `scale(${decoration.scaleX}, ${decoration.scaleY}) rotate(${decoration.rotation ?? 0}deg)`,
        opacity: decoration.opacity,
        zIndex: decoration.zIndex,
        touchAction: isDragging && isSelected ? 'none' : 'manipulation',
        userSelect: 'none',
        padding: '8px',
        margin: '-8px',
      }}
    >
      <Image
        src={decoration.src}
        alt="Decoration"
        width={decoration.width}
        height={decoration.height}
        className="select-none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
      />
      {isSelected && (
        <SelectionOverlay
          width={decoration.width}
          height={decoration.height}
          onDragStart={(e) => {
            if ('dataTransfer' in e) {
              onDragStart(e);
            }
          }}
          onDelete={onDelete}
          onScale={onScale}
          showControls={{
            delete: true,
            resize: true,
            rotate: false
          }}
        />
      )}
    </div>
  );
}; 