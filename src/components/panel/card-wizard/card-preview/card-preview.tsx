/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useRef } from "react";
import {
  type WithFlipProps,
  withFlip,
  type FlipComponentRefProps,
} from "~/components/common/special/with-flip";
import { Button } from "~/components/ui";

const CardPreviewHandler = ({ variant = "front", ...props }: WithFlipProps) => {
  return (
    <div {...props} className="aspect-cardOne bg-rose-500">
      TO JEST {variant}
    </div>
  );
};

const FlippableCard = withFlip(CardPreviewHandler, {
  buttonHandle: true,
});

export const CardPreview = () => {
  const ref = useRef<FlipComponentRefProps>(null);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="relative aspect-cardOne w-full overflow-visible">
        <FlippableCard ref={ref} />
      </div>
      <Button onClick={() => ref.current?.handleFlip()} type="button">
        OBROC TO OK OK?
      </Button>
    </div>
  );
};
