"use client";

import { useCallback, useState } from "react";

import { type KonvaEventObject, type Node } from "konva/lib/Node";

import { type TransformerRes } from "~/features/creator/hooks/use-transformer";
import { type ItemHandleActions } from "~/features/creator/types/creator-item.types";

import type Konva from "konva";

export const useSelection = (transformerRes: TransformerRes) => {
	const [selectedItems, setSelectedItems] = useState<Konva.Node[]>([]);

	const onSelectItem: ItemHandleActions["onSelect"] = useCallback(
		(e?: KonvaEventObject<MouseEvent>, itemsList?: Node[]) => {
			if (!transformerRes?.transformerRef?.current) return;

			if (itemsList) {
				transformerRes.transformerRef?.current?.nodes(itemsList);
				transformerRes?.setTransformerConfig(transformerRes?.transformerRef?.current);
				setSelectedItems(itemsList);
				return;
			}

			if (!e) return;

			if (e?.target?.getType() === "Stage") {
				transformerRes?.transformerRef?.current?.nodes([]);
				transformerRes?.setTransformerConfig(transformerRes?.transformerRef?.current);
				setSelectedItems([]);
				return;
			}

			let newitemList: Konva.Node[] = [];
			const targetItem =
				e?.target?.name() === "label-text"
					? e?.target?.getParent()?.getParent()?.findOne(".label-target")
					: e?.target;
		},
		[transformerRes.transformerRef],
	);

	return { onSelectItem };
};
