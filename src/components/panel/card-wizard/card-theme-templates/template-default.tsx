"use client";

import React from "react";
import Image from "next/image";

import { useCardStylesContext } from "../card-styles-handler/hooks";
import { cn } from "~/misc/utils/cn";

import { type CardTemplateProps } from "../card-preview";
import { TextEditStylesPopover } from "../edit-styles";

const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-[#1f4e84]";
const bgColor = "bg-white";
const TEXT_STYLE = "text-[8px] font-semibold";

const CardTemlateDefaultFront = ({ className, ...props }: CardTemplateProps) => {
  const { state } = useCardStylesContext();

  return (
    <div
      key={state?.front?.id}
      className={cn(textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
      style={{ ...state?.generalStyles, ...state?.front?.styles }}
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
        <TextEditStylesPopover code="companyName">
          <p className={cn("text-lg font-bold", accentColor)}>
            {state?.defaultTextElements?.companyName?.text}
          </p>
        </TextEditStylesPopover>
        <TextEditStylesPopover code="addressLine2">
          <p className={cn("text-xs", accentColor)}>
            {props.company?.addressLine1} {state?.defaultTextElements?.addressLine2?.text}
          </p>
        </TextEditStylesPopover>
        <TextEditStylesPopover code="city">
          <p className={cn("text-xs", accentColor)}>{state?.defaultTextElements?.city?.text}</p>
        </TextEditStylesPopover>
        <TextEditStylesPopover code="website">
          <p className={cn("text-xs", accentColor)}>{state?.defaultTextElements?.website?.text}</p>
        </TextEditStylesPopover>
      </div>
    </div>
  );
};

const CardTemlateDefaultBack = ({ className, ...props }: CardTemplateProps) => {
  const { state } = useCardStylesContext();

  return (
    <div
      key={state?.back?.id}
      className={cn(
        "flex grow items-center justify-center bg-white p-2",
        textColor,
        fullCardStyles,
        className,
      )}
      style={{
        ...state?.generalStyles,
        ...state?.back?.styles,
      }}
    >
      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{state?.defaultTextElements?.companyName?.text}</p>
      </TextEditStylesPopover>
      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{state?.defaultTextElements?.email?.text}</p>
      </TextEditStylesPopover>
      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{state?.defaultTextElements?.phoneNumber?.text}</p>
      </TextEditStylesPopover>
      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{state?.defaultTextElements?.website?.text}</p>
      </TextEditStylesPopover>
    </div>
  );
};

export const CardTemplateDefault = { front: CardTemlateDefaultFront, back: CardTemlateDefaultBack };
