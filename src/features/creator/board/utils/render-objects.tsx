/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";

import { Rect } from "react-konva";

import { type TransformerRes } from "src/features/creator/board/hooks";

import { IconItem } from "~/features/creator/board/components/items/icon-item";
import { ImageItem } from "~/features/creator/board/components/items/image-item";
import { LineItem } from "~/features/creator/board/components/items/line-item/line-item";
import { ShapeItem } from "~/features/creator/board/components/items/shape-item";
import { TextItem } from "~/features/creator/board/components/items/text-item";
import { type ItemHandleActions } from "~/features/creator/board/types/creator-item.types";

import { type StageData } from "../stores/card-items-store/card-items-store.types";

export const renderObjects = (
  item: StageData,
  transformer: TransformerRes,
  onSelect: ItemHandleActions["onSelect"],
) => {
  switch (item.attrs?.["data-item-type"]) {
    case "text":
      return (
        <TextItem
          key={`textItem-${item.id}`}
          transformer={transformer}
          onSelect={onSelect}
          data={item}
        />
      );
    case "frame":
      return <Rect {...item.attrs} fill={"#F0F0F0"} stroke="#000000" strokeWidth={2} />;
    case "image":
      return (
        <ImageItem
          key={`imageItem-${item.id}`}
          data={item}
          onSelect={onSelect}
          transformer={transformer}
        />
      );
    case "line":
      return (
        <LineItem
          key={`lineItem-${item.id}`}
          data={item}
          transformer={transformer}
          onSelect={onSelect}
        />
      );
    case "shape":
      return (
        <ShapeItem
          key={`shapeItem-${item.id}`}
          data={item}
          transformer={transformer}
          onSelect={onSelect}
        />
      );
    case "icon":
      return (
        <IconItem
          key={`icon-${item.id}`}
          data={item}
          transformer={transformer}
          onSelect={onSelect}
        />
      );
    default:
      return null;
  }
};
