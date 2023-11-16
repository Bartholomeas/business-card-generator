import React, { useRef, type ReactNode } from "react";
import { type LabelProps } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { type LucideIcon } from "lucide-react";

interface ButtonElement extends ButtonProps {
  text: string;
  icon?: LucideIcon;
  onClick: () => void;
}

interface ButtonFileElement extends LabelProps {
  text: string;
  icon?: LucideIcon;
  isFile: boolean;
  htmlFor: string;
}

interface Props {
  children: ReactNode | string;
  buttons: (ButtonElement | ButtonFileElement)[];
}

export const ButtonsInPopover = ({ children, buttons }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "default" })}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <input type="file" className="hidden" />
        {buttons.map((btn, i) =>
          "isFile" in btn ? (
            <Label
              className={
                (buttonVariants({ variant: "ghost" }),
                "flex w-full cursor-pointer flex-row flex-nowrap items-center justify-start gap-2 pl-2")
              }
              key={`${btn.text}-${i}`}
              htmlFor={btn.htmlFor}
            >
              {btn.icon ? <btn.icon /> : null}
              {btn.text}
            </Label>
          ) : (
            <Button
              key={`${btn.text}-${i}`}
              className="flex w-full flex-row flex-nowrap items-center justify-start gap-2 pl-2"
              variant="ghost"
              {...btn}
            >
              {btn.icon ? <btn.icon /> : null}
              {btn.text}
            </Button>
          ),
        )}
      </PopoverContent>
    </Popover>
  );
};
