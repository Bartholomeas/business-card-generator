"use client";

import { useRef } from "react";

import { type Company } from "@prisma/client";

import { useGetPreviewScale } from "./hooks/useGetPreviewScale";

import { Button } from "~/components/common/ui";

import { FlippableCardHandler } from "./flippable-card";

import {
  type FlipComponentRefProps,
  withFlip,
} from "~/components/common/special";

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
  scaleOnHover: true,
});

interface Props {
  company: Company | undefined;
}

export const CardPreview = ({ company }: Props) => {
  const ref = useRef<FlipComponentRefProps>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scale } = useGetPreviewScale(cardRef, wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="flex h-full w-full flex-col items-center justify-center gap-8"
    >
      <div
        ref={cardRef}
        className="cardOneSize flex aspect-cardOne items-center justify-center"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <FlippableCard
          ref={ref}
          // card={card}
          company={company}
          className="cardOneSize"
        />
      </div>

      <Button
        onClick={() => {
          ref.current?.handleFlip();
        }}
        type="button"
        className="absolute bottom-8 right-8 content-end self-end"
      >
        OBROC TO OK OK?
      </Button>
    </div>
  );
};
