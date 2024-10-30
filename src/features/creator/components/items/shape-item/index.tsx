import { type RefObject, useRef } from "react";

import { Rect, RegularPolygon } from "react-konva";

import type Konva from "konva";
import type { DefaultCreatorItemProps } from "~/features/creator/components/items/creator-items.types";

type ShapeItemProps = DefaultCreatorItemProps<Konva.Rect>;

export const ShapeItem = ({ data, onSelect }: ShapeItemProps) => {
	const attrs = data?.attrs;
	console.log("Fifka::::", attrs);

	const shapeRef = useRef<Konva.RegularPolygon | Konva.Rect>(null);
	// TODO: implement useDragAndDrop
	// const stage = useStage();

	const onDragMoveFrame = () => {};
	const onDragEndFrame = () => {};

	if (attrs?.sides === 4)
		return (
			<Rect
				ref={shapeRef as RefObject<Konva.Rect>}
				onClick={onSelect}
				// There maybe should be height and width with sqrt of radius*2, idk
				{...((attrs as Konva.Rect["attrs"]) ?? {})}
				draggable
				onDragMove={onDragMoveFrame}
				onDragEnd={onDragEndFrame}
			/>
		);

	return (
		<RegularPolygon
			ref={shapeRef as RefObject<Konva.RegularPolygon>}
			onClick={onSelect}
			{...((attrs as Konva.RegularPolygon["attrs"]) ?? {})}
			draggable
			onDragMove={onDragMoveFrame}
			onDragEnd={onDragEndFrame}
		/>
	);
};
