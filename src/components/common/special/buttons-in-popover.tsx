"use client";

import React, { useRef, type ReactNode, type ChangeEvent, useId } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common/ui/popover";
import { Button, buttonVariants, type ButtonProps } from "~/components/common/ui/button";

import { type LucideIcon } from "lucide-react";

export interface ButtonElement extends ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: LucideIcon;
  uploadFile?: boolean;
}

interface Props {
  buttons: ButtonElement[];
  children: ReactNode | string;
  onFileChange?: (evennt: ChangeEvent<HTMLInputElement>) => void;
}

export const ButtonsInPopover = ({ buttons, onFileChange, children }: Props) => {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "default" })}>{children}</PopoverTrigger>
      <PopoverContent className="p-2">
        <>
          <input type="file" className="hidden" ref={fileInputRef} onChange={onFileChange} />
          {buttons.map(({ uploadFile, ...btn }) => {
            return (
              <Button
                key={`${btn.text}-${id}`}
                className="flex w-full flex-row flex-nowrap items-center justify-start gap-2 pl-2"
                variant="ghost"
                {...btn}
                onClick={() => {
                  btn.onClick?.();
                  if (uploadFile) fileInputRef.current?.click();
                }}
              >
                {btn.icon ? <btn.icon /> : null}
                {btn.text}
              </Button>
            );
          })}
        </>
      </PopoverContent>
    </Popover>
  );
};
