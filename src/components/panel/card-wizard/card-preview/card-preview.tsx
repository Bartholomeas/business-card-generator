"use client";

import { useRef } from "react";

import { withFlip } from "~/components/common/special/with-flip/with-flip";
import { Button } from "~/components/ui";
import { FlippableCardHandler } from "./flippable-card";

import { type FlipComponentRefProps } from "~/components/common/special/with-flip/types";

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
});

export const CardPreview = () => {
  const ref = useRef<FlipComponentRefProps>(null);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="relative aspect-cardOne w-full overflow-visible">
        <FlippableCard ref={ref} />
      </div>
      <Button
        onClick={() => ref.current?.handleFlip()}
        type="button"
        className="content-end self-end"
      >
        OBROC TO OK OK?
      </Button>
    </div>
  );
};
