'use client';

import { useRef } from "react";

import type Konva from "konva";

export const STAGE_POSITION = "stagePosition";
export const STAGE_SCALE = "stageScale";

export const useStage = () => {
  const stageRef = useRef<Konva.Stage | null>(null);

  const setStageRef = (stage: Konva.Stage) => {
    stageRef.current = stage;
  };

  return { stageRef, setStageRef };
};
