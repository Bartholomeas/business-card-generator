"use client";

import { useRef } from "react";

import { type Company } from "@prisma/client";
import { RotateCcw } from "lucide-react";

import { Button } from "~/components/common";
import { FlippableCardHandler } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";
import { withFlip } from "~/components/special/with-flip/with-flip";
import { type FlipComponentRefProps } from "~/components/special/with-flip/with-flip.types";

import { useGetPreviewScale } from "./hooks/use-get-preview-scale";

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
});

interface CardPreviewProps {
  company: Company | undefined;
}

export const 
CardPreview = ({ company }: CardPreviewProps) => {
  const ref = useRef<FlipComponentRefProps>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scale } = useGetPreviewScale(cardRef, wrapperRef);

  return (
    <div ref={wrapperRef} className="flex size-full flex-col items-center justify-center gap-8 bg-background-300">
      <div
        ref={cardRef}
        className="cardOneSize flex aspect-cardOne items-center justify-center"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <FlippableCard ref={ref} company={company} className="cardOneSize" />
      </div>

      <Button
        onClick={() => {
          ref.current?.handleFlip();
        }}
        type="button"
        variant={"outline"}
        className="absolute bottom-4 right-4 content-end self-end"
        icon={RotateCcw}
      >
        Obróć kartę
      </Button>
    </div>
  );
};
