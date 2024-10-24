'use client';
import React from "react";

import { Transformer } from "react-konva";

import { CardCreator } from "./card-creator";
import { useStage, useTransformer } from "../hooks";


export const CardWizardBoard = () => {
  const { stageRef } = useStage();
  const { transformerRef, onTransformEnd } = useTransformer();

  return <div>
    <CardCreator
      ref={stageRef}>
      <Transformer
        ref={transformerRef}
        keepRatio
        shouldOverdrawWholeArea
        boundBoxFunc={(_, newBox) => newBox}
        onTransformEnd={onTransformEnd}
      />
    </CardCreator>
  </div>;
};
