'use client';

import { useRef } from "react";

import { type KonvaEventObject } from "konva/lib/Node";

import type Konva from "konva";

export const useTransformer = () => {
  const transformerRef = useRef<Konva.Transformer>(null);

  const onTransformEnd = (e: KonvaEventObject<Event>) => {
    console.log('Transform end:', e.target.id());
  };
  return {
    transformerRef,
    onTransformEnd
  };
};
