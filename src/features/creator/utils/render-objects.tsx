import React from "react";

import { Rect } from "react-konva";

import { IconItem } from "~/features/creator/components/items/icon-item";
import { ImageItem } from "~/features/creator/components/items/image-item";
import { LineItem } from "~/features/creator/components/items/line-item/line-item";
import { ShapeItem } from "~/features/creator/components/items/shape-item";
import { TextItem } from "~/features/creator/components/items/text-item";
import { type TransformerRes } from "~/features/creator/hooks";
import { type ItemHandleActions } from "~/features/creator/types/creator-item.types";

import { type StageData } from "../stores/card-items-store/card-items-store.types";

export const renderObjects = (
	item: StageData,
	transformer: TransformerRes,
	onSelectItem: ItemHandleActions["onSelect"],
) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	switch (item.attrs?.["data-item-type"]) {
		case "text":
			return (
				<TextItem
					key={`textItem-${item.id}`}
					transformer={transformer}
					onSelect={onSelectItem}
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
					onSelect={onSelectItem}
					transformer={transformer}
				/>
			);
		case "line":
			return (
				<LineItem
					key={`lineItem-${item.id}`}
					data={item}
					transformer={transformer}
					onSelect={onSelectItem}
				/>
			);
		case "shape":
			return (
				<ShapeItem
					key={`shapeItem-${item.id}`}
					data={item}
					transformer={transformer}
					onSelect={onSelectItem}
				/>
			);
		case "icon":
			return (
				<IconItem
					key={`icon-${item.id}`}
					data={item}
					transformer={transformer}
					onSelect={onSelectItem}
				/>
			);
		default:
			return null;
	}
};
