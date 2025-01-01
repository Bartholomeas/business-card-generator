"use client";

import React from "react";

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
  const { front, generalStyles, decorationElements, addDecoration } = useCardStylesStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDrop = (e: React.DragEvent) => {
    if (isMobile) return; // Disable drop on mobile

    e.preventDefault();
    const data = e.dataTransfer.getData("decoration");
    if (!data) return;

    const decoration = JSON.parse(data) as DecorationElement;
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate center position
    const x = e.clientX - rect.left - 14 - (decoration.width / 2);
    const y = e.clientY - rect.top - 14 - (decoration.height / 2);

    addDecoration({
      ...decoration,
      positionX: x,
      positionY: y,
    } as Omit<DecorationElement, "id">);
  };

  const handleDecorationClick = (decoration: DecorationElement) => {
    console.log("HANDLE DECOR CLICK: ", decoration.id);
    // if (!isMobile) return;

    // // On mobile, clicking a decoration could open a simple modal/popover
    // // with basic controls (delete, move up/down/left/right)
    // // For now, let's just implement delete on double tap
    // if (window.confirm('Remove this decoration?')) {
    //   removeDecoration(decoration.id);
    // }
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

      <div className="absolute inset-0">
        {decorationElements.map((decoration) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            key={decoration.id}
            className="absolute touch-manipulation"
            onClick={() => handleDecorationClick(decoration)}
            style={{
              position: 'absolute',
              left: 0, top: 0,
              // left: `${decoration.positionX}px`,
              // top: `${decoration.positionY}px`,
              width: `${decoration.width}px`,
              height: `${decoration.height}px`,
              transform: `scale(${decoration.scaleX}, ${decoration.scaleY}) rotate(${decoration.rotation ?? 0}deg)`,
              opacity: decoration.opacity,
              zIndex: decoration.zIndex,
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
                objectFit: 'contain'
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex grow flex-col items-center justify-start p-2">
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
