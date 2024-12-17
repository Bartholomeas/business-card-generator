import { type Node, type NodeConfig } from "konva/lib/Node";

import { type useTransformer } from "./use-transformer";
import { useCardItemsStore } from "../stores/card-items-store";

export const useHotkeyFunc = () => {
	const {
		removeItem,
		// createItem, updateItem
	} = useCardItemsStore();

	const deleteItems = (
		selectedItems: Node<NodeConfig>[],
		setSelectedItems: (value: React.SetStateAction<Node<NodeConfig>[]>) => void,
		transformerRef: ReturnType<typeof useTransformer>["transformerRef"],
	) => {
		setSelectedItems([]);
		transformerRef.current?.nodes([]);
		removeItem(selectedItems.map(item => item.id()));
	};

	return { deleteItems };
};
