"use client";

import React from "react";
import Image from "next/image";

import { useCardStylesContext } from "../card-styles-handler/hooks";
import { cn } from "~/misc/utils/cn";

import { type CardTemplateProps } from "../card-preview";
import { TextEditStylesPopover } from "../edit-styles";
import { Icon } from "~/components/common/special";

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
        <p className={cn("text-lg font-bold", accentColor)}>{props.company?.companyName}</p>
        <p className={cn("text-xs", accentColor)}>
          {props.company?.addressLine1} {props.company?.addressLine2}
        </p>

        <p className={cn("text-xs", accentColor)}>{props.company?.city}</p>
        <p className={cn("text-xs", accentColor)}>{props.company?.website}</p>
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
      {/* {state?.back.textElements?.map(el => (
        <p key={el.id} className="text-[8px]">
          {el.text}
        </p>
      ))} */}

      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{props.company?.email}</p>
      </TextEditStylesPopover>

      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{props.company?.addressLine1}</p>
      </TextEditStylesPopover>
      <TextEditStylesPopover>
        <p className={TEXT_STYLE}>{props.company?.addressLine2}</p>
      </TextEditStylesPopover>
      {/* <p className={TEXT_STYLE}>{props.company?.city}</p> */}
      <p className={TEXT_STYLE}>{props.company?.website}</p>
      {/* <p className={TEXT_STYLE}>{props.company?.phoneNumber}</p> */}
    </div>
  );
};

export const CardTemplateDefault = { front: CardTemlateDefaultFront, back: CardTemlateDefaultBack };
