import React from "react";

import { type KonvaEventObject } from "konva/lib/Node";
import { Circle, Rect } from "react-konva";

import { TextItem, type TextItemProps } from "~/features/creator/components/elements/text-item";
import { type TransformerRes } from "~/features/creator/hooks";

import { type StageData } from "../stores/card-items-store/card-items-store.types";
import Konva from "konva";

export const renderObjects = (
	item: StageData,
	transformer: TransformerRes,
	onSelectItem: (e?: KonvaEventObject<MouseEvent>, itemList?: Konva.Node[]) => void,
) => {
	// console.log("alekazda", item.attrs);

	switch (item.attrs?.["data-item-type"]) {
		case "text":
			return (
				<TextItem
					key={`textItem-${item.id}`}
					transformer={transformer}
					onSelect={onSelectItem}
					data={item as TextItemProps["data"]}
				/>
			);
		case "frame":
			return <Rect {...item.attrs} fill={"#F0F0F0"} stroke="#000000" strokeWidth={2} />;
		case "image":
			return <Rect {...item.attrs} fill="#C0C0C0" stroke="#000000" strokeWidth={1} />;
		case "line":
			return <Rect {...item.attrs} fill="transparent" stroke="#000000" strokeWidth={2} />;
		default:
			return <Circle x={50} y={50} width={100} height={100} fill="purple" draggable />;
	}
};
