"use client";

import React from "react";


import { useCardStylesStore } from "~/stores/card";
import { cn } from "~/utils";

import { type CardTemplateDefaultProps } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";

const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-accent";
const bgColor = "bg-white";

const CardTemlateFuturaFront = ({ className, ...props }: CardTemplateDefaultProps) => {
  const { front, generalStyles } = useCardStylesStore();

  const TEXT_STYLE = "text-[8px] font-semibold";

  return (
    <div
      key={front?.id}
      className={cn(textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
      style={{ ...generalStyles, ...front?.styles }}
    >
      <p className={cn("text-[18px] font-semibold", accentColor)}>{props.company?.companyName}</p>
      <div className="flex flex-col">
        {front?.textElements?.map(el => (
          <p key={el.id} className={TEXT_STYLE}>
            {el.text}
          </p>
        ))}
        <p className={TEXT_STYLE}>{props.company?.email}</p>
        <p className={TEXT_STYLE}>{props.company?.phoneNumber}</p>
        <p className={TEXT_STYLE}>
          {props.company?.addressLine1}, {props.company?.addressLine2}
        </p>
        <p className={TEXT_STYLE}>NIP: {props.company?.nip}</p>
        <p className={TEXT_STYLE}>REGON: {props.company?.regon}</p>
        <p className={TEXT_STYLE}>
          {props.company?.postalCode} {props.company?.state}
        </p>
      </div>
    </div>
  );
};

const CardTemlateDefaultBack = ({ className, ...props }: CardTemplateDefaultProps) => {
  const { back, generalStyles } = useCardStylesStore();

  return (
    <div
      key={back?.id}
      className={cn("bg-rose-200", fullCardStyles, className)}
      style={{ ...generalStyles, ...back?.styles }}
    >
      <div className="size-[50px]"></div>
      {back?.textElements?.map(el => (
        <p key={el.id} className="text-[8px]">
          {el.text}
        </p>
      ))}
      <p className="text-[14px]">{props.company?.country}</p>
      <p className="text-[14px]">{props.company?.addressLine1}</p>
      <p className="text-[14px]">{props.company?.addressLine2}</p>
      <p className="text-[14px]">{props.company?.phoneNumber}</p>
    </div>
  );
};

export const CardTemplateFutura = { front: CardTemlateFuturaFront, back: CardTemlateDefaultBack };
