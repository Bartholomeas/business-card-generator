import React from "react";

import { Circle, Rect } from "react-konva";

import { TextItem } from "~/features/creator/components/elements/text-item";
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
			return <Rect {...item.attrs} fill="#C0C0C0" stroke="#000000" strokeWidth={1} />;
		case "line":
			return <Rect {...item.attrs} fill="transparent" stroke="#000000" strokeWidth={2} />;
		default:
			return <Circle x={50} y={50} width={100} height={100} fill="purple" draggable />;
	}
};
