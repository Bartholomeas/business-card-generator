"use client";

import { useState } from "react";
import { type SliderProps } from "@radix-ui/react-slider";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/common/ui/hover-card";
import { Label } from "~/components/common/form/label";
import { Slider } from "~/components/common/ui/slider";

interface InputSliderProps {
  defaultValue: SliderProps["defaultValue"];
}

export function InputSlider({ defaultValue }: InputSliderProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperature</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="temperature"
              max={1}
              defaultValue={value}
              step={0.1}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm" side="left">
          Controls randomness: lowering results in less random completions. As the temperature
          approaches zero, the model will become deterministic and repetitive.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
