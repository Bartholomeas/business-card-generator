
import { Rect } from "react-konva";

import { type StageData } from "../stores/card-items-store/card-items-store.types";

export const renderObjects = (item: StageData) => {
  switch (item.attrs['data-item-type']) {
    case "frame":
      return <Rect
        {...item.attrs}
        fill={"#F0F0F0"}
        stroke="#000000"
        strokeWidth={2}
      />;
    case "image":
      return <Rect
        {...item.attrs}
        fill="#C0C0C0"
        stroke="#000000"
        strokeWidth={1}
      />;
    case "line":
      return <Rect
        {...item.attrs}
        fill="transparent"
        stroke="#000000"
        strokeWidth={2}
      />;
    default: return null;
  };
};
