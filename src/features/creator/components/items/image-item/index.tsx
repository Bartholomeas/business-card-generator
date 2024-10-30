"use client";

import { type ComponentProps, useMemo, useRef, useState } from "react";

import Konva from "konva";
import { type Filter } from "konva/lib/Node";
import { Image as KonvaImage } from "react-konva";

import { useStage } from "~/features/creator/hooks";
import { useDragAndDrop } from "~/features/creator/hooks/use-drag-and-drop";

import type { DefaultCreatorItemProps } from "~/features/creator/components/items/creator-items.types";

export const filterMap: Record<string, Filter> = {
	Brighten: Konva.Filters.Brighten,
	Grayscale: Konva.Filters.Grayscale,
};

type ImageItemProps = DefaultCreatorItemProps<Omit<ComponentProps<typeof KonvaImage>, "image">>;

export const ImageItem = ({ data, onSelect }: ImageItemProps) => {
	const { attrs } = data;

	const imageRef = useRef<Konva.Image>(null);
	const [imageSrc] = useState<CanvasImageSource>(new Image());

	const stage = useStage();

	const { onDragMoveFrame, onDragEndFrame } = useDragAndDrop(stage?.stageRef);

	const filters: Filter[] = useMemo(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (attrs?.filters) {
			return [Konva.Filters.Brighten];
		}
		return (attrs?.filters as string[]).map(
			(filterName: string) => filterMap[filterName] ?? Konva.Filters.Brighten,
		);
	}, [attrs?.filters]);

	if (!imageSrc) return null;
	return (
		<KonvaImage
			id={data.id}
			ref={imageRef}
			image={imageSrc}
			name={"label-target"}
			data-item-type={"image"}
			data-frame-type={"image"}
			fill={attrs?.fill ?? "transparent"}
			filters={filters ?? [Konva.Filters.Brighten]}
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
