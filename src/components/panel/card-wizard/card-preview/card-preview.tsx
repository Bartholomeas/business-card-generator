"use client";

import { useRef } from "react";

import { type Company } from "@prisma/client";

import { api } from "~/trpc/react";
import { useGetPreviewScale } from "./hooks/useGetPreviewScale";

import { Button } from "~/components/common/ui";

import { FlippableCardHandler } from "./flippable-card-handler";

import { type FlipComponentRefProps, withFlip } from "~/components/common/special";

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
});

interface Props {
  company: Company | undefined;
}

export const CardPreview = ({ company }: Props) => {
  const ref = useRef<FlipComponentRefProps>(null);

  const { data, mutate, isLoading } = api.card.updateGeneralStyles.useMutation();

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
      <Button
        onClick={() => {
          console.log({ data });
          mutate({
            fontSize: 12,
          });
        }}
        type="button"
        isLoading={isLoading}
        className="absolute bottom-16 right-4 content-end self-end"
      >
        klik
      </Button>
    </div>
  );
};
