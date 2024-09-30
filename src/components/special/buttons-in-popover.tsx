"use client";

import React, { type ChangeEvent, type ReactNode, useId, useRef } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common/popover";
import { Button, type ButtonProps, buttonVariants } from "~/components/common/button";

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
      <PopoverTrigger className={buttonVariants({ variant: "outline" })}>{children}</PopoverTrigger>
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
                icon={btn.icon}
                iconProps={{
                  size: 16,
                }}
              >
                {btn.text}
              </Button>
            );
          })}
        </>
      </PopoverContent>
    </Popover>
  );
};
