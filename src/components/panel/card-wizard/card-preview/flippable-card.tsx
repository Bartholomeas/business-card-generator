import { type ComponentProps } from "react";
import { type BusinessCard, type Company } from "@prisma/client";
import { type WithFlipProps } from "~/components/common/special/with-flip/types";
import { cn } from "~/misc/utils/cn";

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

const CardFrontContent = ({ className, ...props }: CardFrontOrBackProps) => {
  return (
    <div className={cn("bg-blue-500 ", fullCardStyles, className)}>
      <div className="h-[50px] w-[50px] bg-pink-400"></div>
      <p className="text-[14px]">{props.company?.companyName}</p>
      <p className="text-[14px]">{props.company?.city}</p>
      <p className="text-[14px]">{props.company?.email}</p>
      <p className="text-[14px]">{props.company?.nip}</p>
      <p className="text-[14px]">{props.company?.regon}</p>
      <p className="text-[14px]">{props.company?.state}</p>
      <p className="text-[14px]">{props.company?.postalCode}</p>
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
