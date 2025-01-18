"use client";

import { useRef } from "react";

import { type Company } from "@prisma/client";
import { RotateCcw } from "lucide-react";

import { Button } from "~/components/common";
import { FlippableCardHandler } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";
import { withFlip } from "~/components/special/with-flip/with-flip";
import { type FlipComponentRefProps } from "~/components/special/with-flip/with-flip.types";

import { useCardItemsStore } from "~/features/creator/board/stores/card-items-store";

import { PreviewScaleContext } from "./context/preview-scale-context";
import { useGetPreviewScale } from "./hooks/use-get-preview-scale";

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
  const { addDecoration } = useCardItemsStore();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("decoration");
    if (!data) return;

    const decoration = JSON.parse(data) as {
      type: string;
      src: string;
      width: number;
      height: number;
    };

    const cardRect = cardRef.current?.getBoundingClientRect();
    if (!cardRect) return;

    const x = (e.clientX - cardRect.left) / scale;
    const y = (e.clientY - cardRect.top) / scale;

    addDecoration({
      type: 'ICON',
      src: decoration.src,
      positionX: x,
      positionY: y,
      width: decoration.width,
      height: decoration.height,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 0,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <PreviewScaleContext.Provider value={{ scale }}>
      <div ref={wrapperRef} className="flex size-full flex-col items-center justify-center gap-8 bg-background-300">
        <div
          ref={cardRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
    </PreviewScaleContext.Provider>

  );
};
