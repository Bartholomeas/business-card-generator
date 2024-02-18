"use client";

import React from "react";
import Image from "next/image";

import { cn } from "~/misc/utils/cn";
import { useCardStylesStore } from "~/stores/card";

import { TextEditStylesPopover } from "../edit-styles";
import { type CardTemplateProps } from "../card-preview";

const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-[#1f4e84]";
const bgColor = "bg-white";
const TEXT_STYLE = "text-[8px] font-semibold";

const CardTemlateDefaultFront = ({ className }: CardTemplateProps) => {
  const { front, generalStyles } = useCardStylesStore();

  return (
    <div
      key={front?.id}
      className={cn(textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
      style={{ ...generalStyles, ...front?.styles }}
    >
      <div
        className="flex grow flex-col items-center justify-center bg-[#cad7f9] p-2"
        style={{
          backgroundImage: 'url("/svg/cross-bg.svg")',
          backgroundRepeat: "repeat",
          backgroundOrigin: "border-box",
          backgroundSize: "24px",
          backgroundPosition: "center",
        }}
      >
        <Image
          src="/logo.svg"
          height={48}
          width={48}
          alt="Logo firmy"
          className="h-[36px] w-auto object-contain"
        />
        <TextEditStylesPopover
          code="companyName"
          className={cn("text-lg font-bold", accentColor)}
        />

        <div className="flex">
          <TextEditStylesPopover code="addressLine1" className={cn("text-xs", accentColor)} />
          <TextEditStylesPopover code="addressLine2" className={cn("text-xs", accentColor)} />
        </div>

        <TextEditStylesPopover code="city" className={cn("text-xs", accentColor)} />

        <TextEditStylesPopover code="website" className={cn("text-xs", accentColor)} />
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
        "flex grow items-center justify-center bg-white p-2",
        textColor,
        fullCardStyles,
        className,
      )}
      style={{
        ...generalStyles,
        ...back?.styles,
      }}
    >
      <TextEditStylesPopover code="companyName" className={TEXT_STYLE} />
      <TextEditStylesPopover code="email" className={TEXT_STYLE} />
      <TextEditStylesPopover code="phoneNumber" className={TEXT_STYLE} />
      <TextEditStylesPopover code="website" className={TEXT_STYLE} />
    </div>
  );
};

export const CardTemplateDefault = { front: CardTemlateDefaultFront, back: CardTemlateDefaultBack };
