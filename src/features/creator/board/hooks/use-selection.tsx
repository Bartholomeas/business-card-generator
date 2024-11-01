"use client";

import { useCallback, useState } from "react";

import { type KonvaEventObject, type Node } from "konva/lib/Node";

import { type TransformerRes } from "~/features/creator/board/hooks/use-transformer";
import { type ItemHandleActions } from "~/features/creator/board/types/creator-item.types";

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

			let newItemsList: Konva.Node[] = [];
			const targetItem =
				e?.target?.name() === "label-text"
					? e?.target?.getParent()?.getParent()?.findOne(".label-target")
					: e?.target;

			if (!e?.evt?.shiftKey) newItemsList = [targetItem as Konva.Node];
			else if (selectedItems?.find(item => item.id() === targetItem?.id()))
				newItemsList = selectedItems?.filter(item => item.id() !== targetItem?.id());
			else newItemsList = [...selectedItems, targetItem as Konva.Node];

			transformerRes?.transformerRef?.current?.nodes(newItemsList);
			transformerRes?.setTransformerConfig(transformerRes?.transformerRef?.current);
			setSelectedItems(newItemsList);
		},
		[selectedItems, transformerRes],
	);

	const clearSelection = () => {
		if (transformerRes?.transformerRef?.current) {
			transformerRes?.transformerRef?.current?.nodes([]);
			transformerRes?.setTransformerConfig(transformerRes?.transformerRef?.current);
		}
		setSelectedItems([]);
	};

	return {
		selectedItems,
		setSelectedItems,
		onSelectItem,
		clearSelection,
	};
};
