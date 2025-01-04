/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React from "react";

import Image from "next/image";

import { useCardStylesStore } from "~/stores/card";
import { cn } from "~/utils";

import { type CardTemplateDefaultProps } from "../card-preview/flippable-card-handler";
import { TextEditStyles } from "../edit-styles";
import { DecorationLayer } from "../edit-styles/decorations/decoration-layer";


const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-[#1f4e84]";
const bgColor = "bg-white";
const TEXT_STYLE = cn("text-[8px] font-semibold", accentColor);

interface CardTemplateProps extends CardTemplateDefaultProps {
  // variant?: CardSide;
}

export const CardTemplateDefaultFront = (props: CardTemplateProps) => {
  const { front, generalStyles } = useCardStylesStore();
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.decoration-item')) {
    }
  };

  return (
    <div
      key={front?.id}
      className={cn('relative', textColor, bgColor, fullCardStyles, props.className, "overflow-hidden")}
      style={{ ...generalStyles, ...front?.styles }}
    >
      <div className="absolute inset-y-0 left-0 z-0 flex h-full w-1/3 flex-col gap-2 py-3 pl-3 pr-2">
        <span className=" aspect-square w-full rounded-bl-sm rounded-br-[40%] rounded-tl-[40%] rounded-tr-sm bg-primary-400" />
        <div className="flex w-full gap-2">
          <span className="aspect-square w-1/2 self-end rounded-l-sm rounded-r-[40%] bg-primary-700" />
          <span className="aspect-square w-1/2 self-end rounded-l-sm rounded-br-sm rounded-tr-[100%] bg-primary-500" />
        </div>
      </div>

      <DecorationLayer onBackgroundClick={handleBackgroundClick} side="front" />

      <div className="relative z-10 flex grow flex-col items-center justify-start p-2">
        <Image
          src="/logo.svg"
          height={48}
          width={48}
          alt="Logo firmy"
          className="pointer-events-none h-[36px] w-auto object-contain"
        />

        <div className="contents">
          <div className="relative hover:z-50">
            <TextEditStyles code="companyName" className={cn("text-lg font-bold", accentColor)} />
          </div>
          <div className="relative hover:z-50">
            <TextEditStyles code="addressLine1" className={cn("text-xs", accentColor)} />
          </div>
          <div className="relative hover:z-50">
            <TextEditStyles code="addressLine2" className={cn("text-xs", accentColor)} />
          </div>
          <div className="relative hover:z-50">
            <TextEditStyles code="city" className={cn("text-xs", accentColor)} />
          </div>
          <div className="relative hover:z-50">
            <TextEditStyles code="ownerName" className={cn("text-xs", accentColor)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardTemplateDefaultBack = (props: CardTemplateDefaultProps) => {
  const { back, generalStyles } = useCardStylesStore();

  return (
    <div
      key={back?.id}
      className={cn(
        "flex grow items-center justify-center bg-white p-2 relative overflow-hidden",
        textColor,
        fullCardStyles,
        props.className,
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
      <DecorationLayer side="back" />
    </div>
  );
};

export const CardTemplateDefault = { front: CardTemplateDefaultFront, back: CardTemplateDefaultBack };
