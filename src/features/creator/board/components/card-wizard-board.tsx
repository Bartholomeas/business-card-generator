"use client";

import React, { useMemo } from "react";

import { Transformer } from "react-konva";

import { renderObjects } from "~/features/creator/board/utils/render-objects";

import { CardCreator } from "./card-creator";
import { useSelection } from "../../context/selection.context";
import { useStage } from "../hooks";
import { initialStageDataList } from "../stage-data-list.mock";

export const CardWizardBoard = () => {
  const { stageRef } = useStage();

  const { onSelectItem, transformer } = useSelection();

  const renderedItems = useMemo(() => {
    return (
      initialStageDataList[0]?.data.map(el => renderObjects(el, transformer, onSelectItem)) ?? null
    );
  }, [initialStageDataList]);

  return (
    <div>
      <CardCreator onSelect={onSelectItem} ref={stageRef}>
        {renderedItems}
        <Transformer
          ref={transformer.transformerRef}
          keepRatio
          shouldOverdrawWholeArea
          boundBoxFunc={(_, newBox) => newBox}
          onTransformEnd={transformer.onTransformEnd}
        />
      </CardCreator>
    </div>
  );
};
