"use client";
import React from "react";

import Image from "next/image";

import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useCardStylesStore } from "~/stores/card";
import { cn } from "~/utils";

import { ScrollArea } from "~/components/common";


export const PersonalizeDecorations = () => {
  const { addDecoration } = useCardStylesStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDragStart = (e: React.DragEvent, imageUrl: string) => {
    e.dataTransfer.setData("decoration", JSON.stringify({
      type: "ICON",
      src: imageUrl,
      width: 100,
      height: 100,
      positionX: 0,
      positionY: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 0,
    }));
  };

  const handleClick = (imageUrl: string) => {
    // On mobile, add decoration to the center of the card
    addDecoration({
      type: "ICON",
      src: imageUrl,
      width: 100,
      height: 100,
      positionX: 150, // Center X (assuming card width is 400px)
      positionY: 200, // Center Y (assuming card height is 500px)
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      zIndex: 0,
    });
  };

  return (
    <ScrollArea>
      <div className="mt-8 grid grid-cols-2 justify-items-center gap-3">
        {new Array(10).fill(null).map((_, i) => (
          <div
            role="button"
            tabIndex={0}
            key={i}
            draggable={!isMobile}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick("/images/sticker.png");
              }
            }}
            onDragStart={isMobile ? undefined : (e) => handleDragStart(e, "/images/sticker.png")}
            onClick={isMobile ? () => {
              handleClick("/images/sticker.png");
            } : undefined}
            className={cn(
              "group relative aspect-square w-full cursor-pointer rounded-lg bg-muted",
              isMobile && "active:opacity-70"
            )}
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
  );
};
