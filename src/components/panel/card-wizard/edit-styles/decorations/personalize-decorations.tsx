"use client";
import React from "react";

import Image from "next/image";

import { ScrollArea } from "~/components/common";

export const PersonalizeDecorations = () => {
  const handleDragStart = (e: React.DragEvent, imageUrl: string) => {
    e.dataTransfer.setData("decoration", JSON.stringify({
      type: "decoration",
      src: imageUrl,
      width: 100,
      height: 100,
    }));
  };

  return (
    <>
      <ScrollArea>
        <div className="mt-8 grid grid-cols-2 justify-items-center gap-3">
          {new Array(10).fill(null).map((_, i) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, "/images/sticker.png")}
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
