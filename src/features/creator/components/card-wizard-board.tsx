'use client';
import React from "react";

import { Transformer } from "react-konva";

import { CardCreator } from "./card-creator";
import { useStage } from "../hooks/use-stage";

export const CardWizardBoard = () => {
  const { stageRef } = useStage();

  return <div>
    <CardCreator >
      <Transformer
        keepRatio
        boundBoxFunc={(_, newBox) => newBox}
      />
    </CardCreator>
  </div>;
};
