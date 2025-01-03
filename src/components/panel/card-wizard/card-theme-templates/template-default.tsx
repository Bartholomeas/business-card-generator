/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React, { useRef } from "react";

import Image from "next/image";

import { useDecorationDrag } from "~/hooks/use-decoration-drag";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { type DecorationElement, useCardStylesStore } from "~/stores/card";
import { cn } from "~/utils";

import { type CardTemplateProps } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";

import { usePreviewScale } from "../card-preview/context/preview-scale-context";
import { TextEditStyles } from "../edit-styles";
import { DraggableDecoration } from "../edit-styles/decorations/draggable-decoration";


const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-[#1f4e84]";
const bgColor = "bg-white";
const TEXT_STYLE = cn("text-[8px] font-semibold", accentColor);

const CardTemlateDefaultFront = ({ className }: CardTemplateProps) => {
  const { front, generalStyles, decorationElements, addDecoration, updateDecoration, removeDecoration } = useCardStylesStore();
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

  const handleDrop = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const data = e.dataTransfer.getData("decoration");
    if (!data) return;

    const decoration = JSON.parse(data) as DecorationElement;
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left - 14) / scale - (decoration.width / 2);
    const y = (e.clientY - rect.top - 14) / scale - (decoration.height / 2);

    addDecoration({
      ...decoration,
      positionX: x,
      positionY: y,
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

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only deselect if clicking the background, not a decoration
    if ((e.target as HTMLElement).closest('.decoration-item')) return;
    setSelectedDecoration(null);
  };


  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      key={front?.id}
      className={cn('relative', textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
      style={{ ...generalStyles, ...front?.styles }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleBackgroundClick}
    >
      <div className="absolute inset-y-0 left-0 z-0 flex h-full w-1/3 flex-col gap-2 py-3 pl-3 pr-2">
        <span className=" aspect-square w-full rounded-bl-sm rounded-br-[40%] rounded-tl-[40%] rounded-tr-sm bg-primary-400" />
        <div className="flex w-full gap-2">
          <span className="aspect-square w-1/2 self-end rounded-l-sm rounded-r-[40%] bg-primary-700" />
          <span className="aspect-square w-1/2 self-end rounded-l-sm rounded-br-sm rounded-tr-[100%] bg-primary-500" />
        </div>
      </div>

      <div ref={decorationRef} className="pointer-events-auto absolute inset-0 z-20">
        {decorationElements.map((decoration) => (
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
          />
        ))}
      </div>

      <div className="pointer-events-none relative z-10 flex grow flex-col items-center justify-start p-2">
        <Image
          src="/logo.svg"
          height={48}
          width={48}
          alt="Logo firmy"
          className="h-[36px] w-auto object-contain"
        />

        <TextEditStyles code="companyName" className={cn("text-lg font-bold", accentColor)} />

        <TextEditStyles code="addressLine1" className={cn("text-xs", accentColor)} />
        <TextEditStyles code="addressLine2" className={cn("text-xs", accentColor)} />

        <TextEditStyles code="city" className={cn("text-xs", accentColor)} />

        <TextEditStyles code="ownerName" className={cn("text-xs", accentColor)} />
      </div>
    </div>
  );
};

const CardTemlateDefaultBack = ({ className }: CardTemplateProps) => {
  const { back, generalStyles } = useCardStylesStore();

  return (
    <div
      key={back?.id}
      className={cn(
        "flex grow items-center justify-center bg-white p-2 relative overflow-hidden",
        textColor,
        fullCardStyles,
        className,
      )}
      style={{
        ...generalStyles,
        ...back?.styles,
      }}
    >
      <TextEditStyles code="email" className={TEXT_STYLE} />
      <TextEditStyles label="Tel: " code="phoneNumber" className={TEXT_STYLE} />
      <TextEditStyles label="NIP: " code="nip" className={TEXT_STYLE} />
      <TextEditStyles label="REGON: " code="regon" className={TEXT_STYLE} />
      <TextEditStyles code="postalCode" className={TEXT_STYLE} />
      <TextEditStyles code="website" className={TEXT_STYLE} />
    </div>
  );
};

export const CardTemplateDefault = { front: CardTemlateDefaultFront, back: CardTemlateDefaultBack };
