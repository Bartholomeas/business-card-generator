"use client";

import { createContext, useRef } from "react";

import { type BusinessCard, type Company } from "@prisma/client";

import { useGetPreviewScale } from "./hooks/useGetPreviewScale";

import { withFlip } from "~/components/common/special/with-flip/with-flip";
import { Button } from "~/components/ui";

import { FlippableCardHandler } from "./flippable-card";

import { type FlipComponentRefProps } from "~/components/common/special/with-flip/types";

interface CardContextProps {
  scale: number;
}

export const CardContext = createContext<CardContextProps>({
  scale: 1,
});

const FlippableCard = withFlip(FlippableCardHandler, {
  buttonHandle: true,
});

interface Props {
  company: Company | undefined;
  card: BusinessCard | undefined;
}

export const CardPreview = ({ company, card }: Props) => {
  const ref = useRef<FlipComponentRefProps>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scale } = useGetPreviewScale(cardRef, wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="flex h-full w-full flex-col items-center justify-center gap-8 bg-lime-500 p-6"
    >
      <div
        ref={cardRef}
        className="cardOneSize flex aspect-cardOne items-center justify-center bg-rose-700"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <FlippableCard
          ref={ref}
          card={card}
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
