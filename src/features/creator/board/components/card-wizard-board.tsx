"use client";

import React, { useCallback, useMemo } from "react";

import dynamic from "next/dynamic";

import { useHotkeys } from "react-hotkeys-hook";
import { Transformer } from "react-konva";

import { renderObjects } from "~/features/creator/board/utils/render-objects";

import { useSelection } from "../../context/selection.context";
import { useStage } from "../hooks";
import { useHotkeyFunc } from "../hooks/useHotkeyFunc";
import { useCardItemsStore } from "../stores/card-items-store";

const CardCreator = dynamic(() => import("./card-creator").then(mod => mod.CardCreator));

export const CardWizardBoard = () => {
  const { stageRef } = useStage();

  const { onSelectItem,
    transformer,
    selectedItems,
    setSelectedItems } = useSelection();
  const { stageItems } = useCardItemsStore();

  const { deleteItems } = useHotkeyFunc();

  useHotkeys(
    "backspace",
    (e) => {
      e.preventDefault();
      deleteItems(selectedItems, setSelectedItems, transformer.transformerRef);
    },
    { enabled: Boolean(selectedItems.length) },
    [selectedItems, transformer.transformerRef.current],
  );

  const renderedItems = useMemo(() => {
    return (
      stageItems?.map(el => renderObjects(el, transformer, onSelectItem)) ?? null
    );
  }, [onSelectItem, stageItems, transformer]);

  const onSelectMock = useCallback(() => {
    console.log("onSelectMock");
  }, []);

  return (
    <div>
      <CardCreator onSelect={onSelectMock} ref={stageRef}>
        {renderedItems}
        <Transformer
          ref={transformer?.transformerRef}
          keepRatio
          shouldOverdrawWholeArea
          boundBoxFunc={(_, newBox) => newBox}
          onTransformEnd={transformer?.onTransformEnd}
        />
      </CardCreator>
    </div>
  );
};
