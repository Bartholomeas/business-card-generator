import { type ComponentProps } from "react";
import { type Company } from "@prisma/client";

import { cn } from "~/misc/utils/cn";

import { type BusinessCard } from "~/server/api/routers/user/requests";
import { type WithFlipProps } from "~/components/common/special/with-flip/types";

const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

interface CardFrontOrBackProps extends WithFlipProps {
  card?: BusinessCard;
  company?: Company;
  className?: ComponentProps<"div">["className"];
}

export const FlippableCardHandler = ({
  variant = "front",
  ...props
}: CardFrontOrBackProps) => {
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
  return (
    <div className={cn("", textColor, bgColor, fullCardStyles, className)}>
      {/* <div className="h-[50px] w-[50px] bg-pink-400"></div> */}
      <p className={cn("text-[14px] font-semibold", accentColor)}>
        {props.company?.companyName}
      </p>
      <div className="flex flex-col">
        <p className="text-[8px]">{props.company?.email}</p>
        <p className="text-[8px]">{props.company?.phoneNumber}</p>
        <p className="text-[8px]">
          {props.company?.addressLine1}, {props.company?.addressLine2}
        </p>
        <p className="text-[8px]">NIP: {props.company?.nip}</p>
        <p className="text-[8px]">REGON: {props.company?.regon}</p>
        <p className="text-[8px]">
          {props.company?.postalCode} {props.company?.state}
        </p>
      </div>
      {/* <p className="text-[14px]">{props.company?.companyName}</p>
      <p className="text-[14px]">{props.company?.city}</p>
      <p className="text-[14px]">{props.company?.email}</p>
      <p className="text-[14px]">{props.company?.nip}</p>
      <p className="text-[14px]">{props.company?.regon}</p>
      <p className="text-[14px]">{props.company?.state}</p>
      <p className="text-[14px]">{props.company?.postalCode}</p> */}
    </div>
  );
};

const CardBackContent = ({ className, ...props }: CardFrontOrBackProps) => {
  return (
    <div className={cn("bg-rose-500", fullCardStyles, className)}>
      <div className="h-[50px] w-[50px] bg-pink-400"></div>
      <p className="text-[14px]">{props.company?.country}</p>
      <p className="text-[14px]">{props.company?.addressLine1}</p>
      <p className="text-[14px]">{props.company?.addressLine2}</p>
      <p className="text-[14px]">{props.company?.phoneNumber}</p>
    </div>
  );
};
