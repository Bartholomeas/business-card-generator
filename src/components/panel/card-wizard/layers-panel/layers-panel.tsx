"use client";

import { useState } from "react";

import { ImageIcon, Layers, Text } from "lucide-react";

import { useCardStylesStore } from "~/stores/card";

import { Button } from "~/components/common";

export const LayersPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { front, back, decorationElements } = useCardStylesStore();
  const currentSide = "front"; // TODO: Get this from flip context

  const layers = [
    ...(currentSide === "front" ? front?.textElements ?? [] : back?.textElements ?? [])
      .map(text => ({
        id: text.id,
        type: "TEXT" as const,
        name: text.text || "Text Element",
        zIndex: text.zIndex,
      })),
    ...decorationElements
      .filter(dec => dec.side === currentSide)
      .map(dec => ({
        id: dec.id,
        type: "ICON" as const,
        name: "Icon",
        zIndex: dec.zIndex,
      })),
  ].sort((a, b) => (b.zIndex ?? 0) - (a.zIndex ?? 0));

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full bg-background shadow-md"
        >
          <Layers className="size-6" />
        </Button>

        {isExpanded && (
          <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg border bg-background p-2 shadow-lg">
            <div className="mb-2 border-b px-2 pb-2 text-sm font-medium">Warstwy</div>
            <div className="space-y-1">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted"
                >
                  {layer.type === "TEXT" ? (
                    <Text className="size-4" />
                  ) : (
                    <ImageIcon className="size-4" />
                  )}
                  <span className="truncate text-sm">{layer.name}</span>
                </div>
              ))}
              {layers.length === 0 && (
                <div className="px-2 py-1 text-sm text-muted-foreground">
                  No layers
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 