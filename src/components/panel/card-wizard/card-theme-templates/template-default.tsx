"use client";

import React, { useRef } from "react";

import Image from "next/image";

import { useMediaQuery } from "~/hooks/useMediaQuery";
import { type DecorationElement, useCardStylesStore } from "~/stores/card";
import { cn } from "~/utils";

import { type CardTemplateProps } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";

import { TextEditStyles } from "../edit-styles";


const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-[#1f4e84]";
const bgColor = "bg-white";
const TEXT_STYLE = cn("text-[8px] font-semibold", accentColor);

const CardTemlateDefaultFront = ({ className }: CardTemplateProps) => {
  const { front, generalStyles, decorationElements, addDecoration, updateDecoration } = useCardStylesStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef<{ id: string; startX: number; startY: number } | null>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const data = e.dataTransfer.getData("decoration");
    if (!data) return;

    const decoration = JSON.parse(data) as DecorationElement;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 14 - (decoration.width / 2);
    const y = e.clientY - rect.top - 14 - (decoration.height / 2);

    addDecoration({
      ...decoration,
      positionX: x,
      positionY: y,
    } as Omit<DecorationElement, "id">);
  };

  const handleDecorationDragStart = (e: React.DragEvent, decoration: DecorationElement) => {
    if (isMobile) return;
    
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    
    dragRef.current = {
      id: decoration.id,
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
    };

    // Make element visually draggable but keep original in place
    target.style.opacity = '0.6';
    e.dataTransfer.setDragImage(target, dragRef.current.startX, dragRef.current.startY);
  };

  const handleDecorationDragEnd = (e: React.DragEvent, decoration: DecorationElement) => {
    if (!dragRef.current || dragRef.current.id !== decoration.id) return;

    const target = e.currentTarget as HTMLDivElement;
    const parentRect = decorationRef.current?.getBoundingClientRect();
    
    if (parentRect) {
      const x = e.clientX - parentRect.left - dragRef.current.startX;
      const y = e.clientY - parentRect.top - dragRef.current.startY;

      // Only update position on drag end
      updateDecoration(decoration.id, {
        positionX: x,
        positionY: y,
      });
    }

    // Reset visual state
    target.style.opacity = '1';
    dragRef.current = null;
  };

  return (
    <div
      key={front?.id}
      className={cn('relative', textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
      style={{ ...generalStyles, ...front?.styles }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="absolute inset-y-0 left-0 z-0 flex h-full w-1/3 flex-col gap-2 py-3 pl-3 pr-2">
        <span className=" aspect-square w-full rounded-bl-sm rounded-br-[40%] rounded-tl-[40%] rounded-tr-sm bg-primary-400" />
        <div className="flex w-full gap-2">
          <span className="aspect-square w-1/2 self-end rounded-l-sm rounded-r-[40%] bg-primary-700" />
          <span className="aspect-square w-1/2 self-end rounded-l-sm rounded-br-sm rounded-tr-[100%] bg-primary-500" />
        </div>
      </div>

      <div ref={decorationRef} className="absolute inset-0 z-20 pointer-events-auto">
        {decorationElements.map((decoration) => (
          <div
            key={decoration.id}
            className="absolute touch-manipulation cursor-move"
            draggable={!isMobile}
            onDragStart={(e) => handleDecorationDragStart(e, decoration)}
            onDragEnd={(e) => handleDecorationDragEnd(e, decoration)}
            style={{
              position: 'absolute',
              left: `${decoration.positionX}px`,
              top: `${decoration.positionY}px`,
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
              transform: `scale(${decoration.scaleX}, ${decoration.scaleY}) rotate(${decoration.rotation ?? 0}deg)`,
              opacity: decoration.opacity,
              zIndex: decoration.zIndex,
              touchAction: 'none',
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
          </div>
        ))}
      </div>

      <div className="relative z-10 flex grow flex-col items-center justify-start p-2 pointer-events-none">
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
