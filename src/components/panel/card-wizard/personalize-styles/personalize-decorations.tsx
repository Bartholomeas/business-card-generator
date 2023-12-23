import React from "react";
import Image from "next/image";
import { ScrollArea } from "~/components/ui";

export const PersonalizeDecorations = () => {
  return (
    <>
      <ScrollArea>
        <div className="mt-8 grid grid-cols-2 justify-items-center gap-3">
          {new Array(10).fill(null).map((_, i) => (
            <div
              draggable
              className="group relative aspect-square w-full cursor-pointer rounded-lg bg-muted"
              key={i}
            >
              <Image
                fill
                sizes="5"
                className="p-2 transition-transform group-hover:scale-110"
                src={"/images/sticker.png"}
                alt="Sticker"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};
