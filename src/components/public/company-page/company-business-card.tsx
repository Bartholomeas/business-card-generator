"use client";

import { useRef } from "react";

import { cn } from "~/utils";

import type { Company } from "~/server/api/routers/company";

import { FlippableCardHandler } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";
import { useGetPreviewScale } from "~/components/panel/card-wizard/card-preview/hooks/use-get-preview-scale";
import { withFlip } from "~/components/special/with-flip/with-flip";
import type { FlipComponentRefProps } from "~/components/special/with-flip/with-flip.types";


const FlippableCard = withFlip(FlippableCardHandler, {
  // buttonHandle: true,
  withRotation: true,
  scaleOnHover: false,
});

interface CompanyBusinessCardProps {
  company: Company | undefined;
  className?: string;
}

export const CompanyBusinessCard = ({ company, className }: CompanyBusinessCardProps) => {
  const ref = useRef<FlipComponentRefProps>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scale } = useGetPreviewScale(cardRef, wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "flex h-full min-h-[30vh] w-full flex-col items-center justify-center gap-8",
        className,
      )}
    >
      <div
        ref={cardRef}
        className="cardOneSize flex aspect-cardOne items-center justify-center"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <FlippableCard ref={ref} company={company} className="cardOneSize pointer-events-none" />
        {/*<FlippableCard ref={ref} company={company} className="cardOneSize pointer-events-none" />*/}
        {/*<ActionIcon*/}
        {/*  variant="ghost"*/}
        {/*  onClick={() => {*/}
        {/*    ref.current?.handleFlip();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <RotateCcw />*/}
        {/*</ActionIcon>*/}
      </div>
    </div>
  );
};
