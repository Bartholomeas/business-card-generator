"use client";

import { type ComponentProps } from "react";
import { type Company } from "@prisma/client";

import { cn } from "~/misc/utils/cn";

import { useCardStylesContext } from "../card-styles-handler/hooks";

import { type WithFlipProps } from "~/components/common/special";
import { type BusinessCard } from "~/server/api/routers/card";

const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

interface CardFrontOrBackProps extends WithFlipProps {
  card?: BusinessCard;
  company?: Company;
  className?: ComponentProps<"div">["className"];
}

export const FlippableCardHandler = ({ variant = "front", ...props }: CardFrontOrBackProps) => {
  switch (variant) {
    case "front":
      return <CardFrontContent {...props} />;
    case "back":
      return <CardBackContent {...props} />;
    default:
      return <CardFrontContent {...props} />;
  }
};

const textColor = "text-black";
const accentColor = "text-accent";
const bgColor = "bg-white";

const CardFrontContent = ({ className, ...props }: CardFrontOrBackProps) => {
  const { state } = useCardStylesContext();

  const TEXT_STYLE = "text-[8px] font-semibold";

  return (
    <div
      key={state?.front?.id}
      className={cn(textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
      style={{ ...state?.generalStyles, ...state?.front?.styles }}
    >
      <p className={cn("text-[18px] font-semibold", accentColor)}>{props.company?.companyName}</p>
      <div className="flex flex-col">
        {state?.front.textElements?.map(el => (
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
  // return (
  //   <div
  //     key={state?.front?.id}
  //     className={cn(textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
  //     style={{ ...state?.generalStyles, ...state?.front?.styles }}
  //   >
  //     <p className={cn("text-[18px] font-semibold", accentColor)}>{props.company?.companyName}</p>
  //     <div className="flex flex-col">
  //       {state?.front.textElements?.map(el => (
  //         <p key={el.id} className={TEXT_STYLE}>
  //           {el.text}
  //         </p>
  //       ))}
  //       <p className={TEXT_STYLE}>{props.company?.email}</p>
  //       <p className={TEXT_STYLE}>{props.company?.phoneNumber}</p>
  //       <p className={TEXT_STYLE}>
  //         {props.company?.addressLine1}, {props.company?.addressLine2}
  //       </p>
  //       <p className={TEXT_STYLE}>NIP: {props.company?.nip}</p>
  //       <p className={TEXT_STYLE}>REGON: {props.company?.regon}</p>
  //       <p className={TEXT_STYLE}>
  //         {props.company?.postalCode} {props.company?.state}
  //       </p>
  //     </div>
  //   </div>
  // );
};

const CardBackContent = ({ className, ...props }: CardFrontOrBackProps) => {
  const { state } = useCardStylesContext();

  return (
    <div
      key={state?.back?.id}
      className={cn("bg-rose-500", fullCardStyles, className)}
      style={{ ...state?.generalStyles, ...state?.back?.styles }}
    >
      <div className="h-[50px] w-[50px]"></div>
      {state?.back.textElements?.map(el => (
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
