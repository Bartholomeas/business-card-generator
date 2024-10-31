"use client";

import React, { useCallback, useRef } from "react";

import { type Context } from "konva/lib/Context";
import { type KonvaEventObject } from "konva/lib/Node";
import { type Shape as ShapeType, type ShapeConfig } from "konva/lib/Shape";
import { Group, Shape } from "react-konva";

import {
	isBezierCurve,
	isLine,
	isQuadraticCurve,
	type PossibleLinePoints,
} from "~/features/creator/components/items/shape-item/line-item.utils";
import { useCardItemsStore } from "~/features/creator/stores/card-items-store";

import type Konva from "konva";
import type { DefaultCreatorItemProps } from "~/features/creator/components/items/creator-items.types";

type LineItemProps = DefaultCreatorItemProps<
	Omit<Konva.Shape, "sceneFunc" | "name" | "data-item-type" | "id">
>;

export const LineItem = ({ data, onSelect }: LineItemProps) => {
	const { attrs } = data;
	const { points } = attrs as unknown as { points: PossibleLinePoints };

	const { updateItem } = useCardItemsStore();

	const lineRef = useRef<Konva.Shape | null>(null);

	const draw = (ctx: Context, shape: ShapeType<ShapeConfig>) => {
		ctx.beginPath();
		ctx.moveTo(points[0], points[1]);
		if (isLine(points)) ctx.lineTo(points[2], points[3]);
		else if (isQuadraticCurve(points))
			ctx.quadraticCurveTo(points[2], points[3], points[4], points[5]);
		else if (isBezierCurve(points))
			ctx.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);
		else console.warn("Invalid points array length");

		shape.strokeWidth(4);
		ctx.fillStrokeShape(shape);
	};

	const onDragMoveFrame = useCallback((e: KonvaEventObject<DragEvent>) => {
		e.target.getLayer()?.batchDraw();
	}, []);

	const onDragEndFrame = useCallback(
		(e: KonvaEventObject<DragEvent>) => {
			e.evt.preventDefault();
			e.evt.stopPropagation();

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			updateItem(e.target.id(), () => e.target.attrs);

			e.target.getLayer()?.batchDraw();
		},
		[data],
	);

	return (
		<Group>
			<Shape
				id={data.id}
				ref={lineRef}
				sceneFunc={draw}
				name={"label-target"}
				data-item-type={"line"}
				onClick={onSelect}
				{...(attrs as object)}
				draggable
				onDragMove={onDragMoveFrame}
				onDragEnd={onDragEndFrame}
			/>
		</Group>
	);
};
