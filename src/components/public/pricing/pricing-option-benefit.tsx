import { CheckIcon, XIcon } from "lucide-react";

import { cn } from "~/utils";

import { Text } from "~/components/common";

export interface PricingOptionBenefitProps {
  text: string;
  checked: boolean;
}
export const PricingOptionBenefit = ({ text, checked }: PricingOptionBenefitProps) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <Text
          as="span"
          className="grid size-5 place-content-center rounded-full bg-primary-300 text-sm text-background"
        >
          <CheckIcon className="text-background" />
        </Text>
      ) : (
        <Text
          as="span"
          className="grid size-5 place-content-center rounded-full bg-background-400 text-sm text-foreground"
        >
          <XIcon />
        </Text>
      )}
      <span className={cn('text-sm', {
        // 'text-foreground': checked,
        'text-foreground-light': !checked,
      })}>{text}</span>
    </div>
  );
};
