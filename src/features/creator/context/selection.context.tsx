"use client";

import { createContext, type Dispatch, type SetStateAction, useCallback, useContext, useState, type ReactNode } from "react";

import { type NodeConfig, type KonvaEventObject, type Node } from "konva/lib/Node";

import { type ItemHandleActions } from "~/features/creator/board/types/creator-item.types";

import { useTransformer } from "../board/hooks";

import type Konva from "konva";

interface SelectionContextType {
  selectedItems: Konva.Node[];
  transformer: ReturnType<typeof useTransformer>;
  setSelectedItems: Dispatch<SetStateAction<Node<NodeConfig>[]>>;
  // setSelectedItems: (items: Konva.Node[]) => void;
  onSelectItem: ItemHandleActions["onSelect"];
  clearSelection: () => void;
  setTransformerConfig: (config: Konva.Transformer) => void;
}

const SelectionContext = createContext<SelectionContextType | null>(null);

export const SelectionProvider = ({ children }: { children: ReactNode; }) => {
  const [selectedItems, setSelectedItems] = useState<Konva.Node[]>([]);

  const { transformerRef, setTransformerConfig, onTransformEnd } = useTransformer();

  // const onSelectItem: ItemHandleActions["onSelect"] = useCallback(
  const onSelectItem: ItemHandleActions["onSelect"] =
    (e?: KonvaEventObject<MouseEvent>, itemsList?: Node[]) => {
      if (!transformerRef?.current) return;

      if (itemsList) {
        transformerRef.current?.nodes(itemsList);
        setTransformerConfig(transformerRef.current);
        setSelectedItems(itemsList);
        return;
      }

      if (!e) return;

      if (e?.target?.getType() === "Stage") {
        transformerRef.current?.nodes([]);
        setTransformerConfig(transformerRef.current);
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

      transformerRef.current?.nodes(newItemsList);
      setTransformerConfig(transformerRef.current);
      setSelectedItems(newItemsList);
    };


  const clearSelection = useCallback(() => {
    if (transformerRef?.current) {
      transformerRef.current?.nodes([]);
      setTransformerConfig(transformerRef.current);
    }
    setSelectedItems([]);
  }, [setTransformerConfig, transformerRef]);

  return (
    <SelectionContext.Provider
      value={{
        selectedItems,
        transformer: { transformerRef, setTransformerConfig, onTransformEnd },
        setSelectedItems,
        onSelectItem,
        clearSelection,
        setTransformerConfig,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within SelectionProvider");
  }
  return context;
};