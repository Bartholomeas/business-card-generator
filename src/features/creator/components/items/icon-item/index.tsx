"use client";

import React, { type ComponentProps, useCallback, useEffect, useRef, useState } from "react";

import Konva from "konva";
import { type KonvaEventObject } from "konva/lib/Node";
import { Image as KonvaImage } from "react-konva";

import { type DefaultCreatorItemProps } from "~/features/creator/components/items/creator-items.types";
import { useCardItemsStore } from "~/features/creator/stores/card-items-store";

type IconItemProps = DefaultCreatorItemProps<Omit<ComponentProps<typeof KonvaImage>, "image">>;

export const IconItem = ({ data, onSelect }: IconItemProps) => {
	const { attrs } = data;

	const imageRef = useRef<Konva.Image>(null);
	const [imageSrc, setImageSrc] = useState<CanvasImageSource | null>(null);
	const { updateItem } = useCardItemsStore();

	const onDragMoveFrame = useCallback(
		(e: KonvaEventObject<DragEvent>) => {
			e.target.getLayer()?.batchDraw();
		},
		[data],
	);
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

	useEffect(() => {
		if (attrs?.icon && typeof attrs.icon === "string")
			Konva.Image.fromURL(`/icons/${attrs.icon}`, (image: Konva.Image) => {
				setImageSrc(image.image()!);
			});
	}, [attrs?.icon]);

	if (!imageSrc) return null;
	return (
		<KonvaImage
			ref={imageRef}
			image={imageSrc}
			id={data.id}
			name={"label-target"}
			data-item-type={"icon"}
			data-frame-type={"icon"}
			fill={"transparent"}
			x={attrs.x}
			y={attrs.y}
			width={attrs.width}
			height={attrs.height}
			scaleX={attrs.scaleX}
			scaleY={attrs.scaleY}
			opacity={attrs?.opacity ?? 1}
			rotation={attrs?.rotation ?? 0}
			draggable
			onClick={onSelect}
			onDragMove={onDragMoveFrame}
			onDragEnd={onDragEndFrame}
		/>
	);
};
