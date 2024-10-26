import React, { useCallback, useRef } from "react";

import { type KonvaEventObject } from "konva/lib/Node";
import { Text as KonvaText } from "react-konva";

import { type OverrideItemProps } from "~/features/creator/types/creator-item.types";

import { type TransformerRes } from "../../hooks";
import { useCardItemsStore } from "../../stores/card-items-store";
import { type StageData } from "../../stores/card-items-store/card-items-store.types";

import type Konva from "konva";

export interface TextItemKind {
	"data-item-type": string;
	id: string;
	name: string;
	text: string;
	width: number;
	height: number;
	fontSize: number;
	fontFamily: string;
}

export type TextItemProps = OverrideItemProps<{
	data: StageData<Konva.Text>;
	transformer: TransformerRes;
	e?: DragEvent;
}>;

export const TextItem = ({ data, e, transformer, onSelect }: TextItemProps) => {
	const textRef = useRef<Konva.Text>(null);
	const { updateItem } = useCardItemsStore();

	const attrs = data?.attrs;

	const onEditStart = () => {
		// ...
	};

	const onDragMoveFrame = useCallback((e: KonvaEventObject<DragEvent>) => {
		e.target.getLayer()?.batchDraw();
	}, []);

	const onDragEndFrame = useCallback((e: KonvaEventObject<DragEvent>) => {
		e.evt.preventDefault();
		e.evt.stopPropagation();

		updateItem(e.target.id(), () => ({ ...e.target?.attrs }) as StageData["attrs"]);
		e.target.getLayer()?.batchDraw();
	}, []);

	const onClickText = (e: KonvaEventObject<MouseEvent>) => {
		console.log(e);
		onSelect(e);
	};

	console.log("FIFARAFA::::", attrs);
	return (
		<KonvaText
			{...attrs} //fontFamily, sizes etc
			ref={textRef}
			onDragMove={onDragMoveFrame}
			onDragEnd={onDragEndFrame}
			onClick={onClickText}
		/>
	);
};
