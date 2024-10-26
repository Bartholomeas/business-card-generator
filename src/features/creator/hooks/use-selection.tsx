"use client";

import { useState } from "react";

import { type KonvaEventObject, type Node, type NodeConfig } from "konva/lib/Node";

import { type TransformerRes } from "~/features/creator/hooks/use-transformer";

import type Konva from "konva";

export const useSelection = (transformerRes: TransformerRes) => {
	const [selectedItems, setSelectedItems] = useState<Konva.Node[]>([]);

	const onSelectItem = (e: KonvaEventObject<MouseEvent>, itemsList: Node<NodeConfig>[]) => {
		if (!transformerRes?.transformerRef?.current) return;

		if (itemsList) {
			transformerRes.transformerRef?.current?.nodes(itemsList);
		}
	};

	return { onSelectItem };
};
