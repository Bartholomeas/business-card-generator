"use client";

import { useRef } from "react";

import { type Company } from "@prisma/client";

import { useGetPreviewScale } from "./hooks/use-get-preview-scale";

import { Button } from "~/components/common";
import { withFlip } from "~/components/special/with-flip/with-flip";
import { FlippableCardHandler } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";

import { type FlipComponentRefProps } from "~/components/special/with-flip/with-flip.types";

import { RotateCcw } from "lucide-react";

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
});

interface CardPreviewProps {
  company: Company | undefined;
}

export const CardPreview = ({ company }: CardPreviewProps) => {
  const ref = useRef<FlipComponentRefProps>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scale } = useGetPreviewScale(cardRef, wrapperRef);

  return (
    <div ref={wrapperRef} className="flex size-full flex-col items-center justify-center gap-8">
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