"use client";

import { useRef } from "react";

import { type Company } from "@prisma/client";

import { useGetPreviewScale } from "./hooks/use-get-preview-scale";

import { Button } from "~/components/common";
import { FlippableCardHandler } from "./flippable-card-handler";
import { withFlip } from "~/components/special/with-flip/with-flip";
import { type FlipComponentRefProps } from "~/components/special/with-flip/with-flip.types";

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
});

interface Props {
  company: Company | undefined;
}

export const CardPreview = ({ company }: Props) => {
  const ref = useRef<FlipComponentRefProps>(null);

  // const { mutate, isLoading } = api.card.updateGeneralStyles.useMutation();

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scale } = useGetPreviewScale(cardRef, wrapperRef);

  return (
    <div ref={wrapperRef} className="flex h-full w-full flex-col items-center justify-center gap-8">
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
        className="absolute bottom-4 right-4 content-end self-end"
      >
        Flip the card
      </Button>
    </div>
  );
};
