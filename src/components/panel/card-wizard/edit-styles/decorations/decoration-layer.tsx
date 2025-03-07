"use client";
import React, { useRef } from "react";

import { useDecorationDrag } from "~/hooks/use-decoration-drag";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { type DecorationElement, useCardStylesStore } from "~/stores/card";

import { type CardSide } from "~/components/special/with-flip/hooks/use-flip-state";

import { DraggableDecoration } from "./draggable-decoration";
import { usePreviewScale } from "../../card-preview/context/preview-scale-context";

interface DecorationLayerProps {
  onBackgroundClick?: (e: React.MouseEvent) => void;
  side: CardSide;
}

export const DecorationLayer = ({ onBackgroundClick, side }: DecorationLayerProps) => {
  const { decorationElements, addDecoration, updateDecoration, removeDecoration } = useCardStylesStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const decorationRef = useRef<HTMLDivElement>(null);
  const { scale } = usePreviewScale();

  const {
    isDragging,
    selectedDecoration,
    setSelectedDecoration,
    handlers
  } = useDecorationDrag({
    isMobile,
    scale,
    onUpdate: updateDecoration,
  });

  const handleScaleStart = (direction: 'nw' | 'ne' | 'sw' | 'se', e: React.MouseEvent | React.TouchEvent, decoration: DecorationElement) => {
    e.stopPropagation();

    const startX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    const originalWidth = decoration.width;
    const originalHeight = decoration.height;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0]?.clientX : moveEvent.clientX;
      if (currentX === undefined || startX === undefined) return;
      const deltaX = (currentX - startX) / scale;

      let newWidth = originalWidth;
      let newX = decoration.positionX;

      switch (direction) {
        case 'se':
        case 'ne':
          newWidth = Math.max(20, originalWidth + deltaX);
          break;
        case 'sw':
        case 'nw':
          newWidth = Math.max(20, originalWidth - deltaX);
          newX = decoration.positionX + (originalWidth - newWidth);
          break;
      }

      // Maintain aspect ratio
      const aspectRatio = originalWidth / originalHeight;
      const newHeight = newWidth / aspectRatio;

      // Update Y position for top handles
      let newY = decoration.positionY;
      if (direction === 'ne' || direction === 'nw') {
        newY = decoration.positionY + (originalHeight - newHeight);
      }

      updateDecoration(decoration.id, {
        width: newWidth,
        height: newHeight,
        positionX: newX,
        positionY: newY,
      });
    };

    const handleEnd = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    if ('touches' in e) {
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    } else {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const data = e.dataTransfer.getData("decoration");
    if (!data) return;

    const decoration = JSON.parse(data) as DecorationElement;
    const rect = decorationRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - 14) / scale - (decoration.width / 2);
    const y = (e.clientY - rect.top - 14) / scale - (decoration.height / 2);

    addDecoration({
      ...decoration,
      positionX: x,
      positionY: y,
      side,
    } as Omit<DecorationElement, "id">);
  };

  const handleDecorationDragStart = (e: React.DragEvent, decoration: DecorationElement) => {
    if (isMobile) return;

    const rect = decorationRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    handlers.handleMove(decoration, x, y);
  };

  const handleLayerClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.decoration-item')) {
      setSelectedDecoration(null);
    }
    onBackgroundClick?.(e);
  };

  // Filter decorations for this specific side
  const visibleDecorations = decorationElements.filter(d => d.side === side);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={decorationRef}
      className="absolute inset-0 z-20"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleLayerClick}
      role="button"
      tabIndex={0}
      style={{
        pointerEvents: isDragging || selectedDecoration ? 'auto' : 'none'
      }}
    >
      {visibleDecorations.map((decoration) => (
        <DraggableDecoration
          key={decoration.id}
          decoration={decoration}
          isSelected={selectedDecoration === decoration.id}
          isDragging={isDragging}
          isMobile={isMobile}
          onMouseDown={(e) => handlers.handleMouseDown(e, decoration)}
          onMouseUp={handlers.handleMouseUp}
          onMouseLeave={handlers.handleMouseUp}
          onTouchStart={(e) => handlers.handleTouchStart(e, decoration)}
          onTouchMove={(e) => handlers.handleTouchMove(e, decoration)}
          onTouchEnd={handlers.handleTouchEnd}
          onTouchCancel={handlers.handleTouchEnd}
          onClick={() => !isDragging && setSelectedDecoration(decoration.id)}
          onDelete={() => {
            removeDecoration(decoration.id);
            setSelectedDecoration(null);
          }}
          onDragStart={(e) => {
            e.stopPropagation();
            if ('dataTransfer' in e) {
              handleDecorationDragStart(e, decoration);
            }
          }}
          onScale={(direction, e) => handleScaleStart(direction, e, decoration)}
        />
      ))}
    </div>
  );
}; 