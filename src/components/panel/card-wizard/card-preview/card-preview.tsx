/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import {
  type WithFlipProps,
  withFlip,
} from "~/components/common/special/with-flip";

const CardPreviewHandler = ({
  variant = "front",
  handleFlip,
  ...props
}: WithFlipProps) => {
  console.log(handleFlip);

  return (
    <div className="flex aspect-cardOne w-full flex-col gap-8">
      <div {...props} className="h-full w-full bg-rose-500">
        TO JEST {variant}
      </div>

      <button
        onClick={handleFlip ? () => handleFlip() : () => null}
        type="button"
      >
        OBROC TO OK OK?
      </button>
    </div>
  );
};

const FlippedCard = withFlip(CardPreviewHandler, true);

export const CardPreview = () => {
  return <FlippedCard />;
};
