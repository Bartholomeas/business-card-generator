'use client';

import { useRef } from "react";

import { type KonvaEventObject } from "konva/lib/Node";

import { transformerConfig, type TransformerConfigKey } from "../config";
import { useCardItemsStore } from "../stores/card-items-store";
import { type StageData } from "../stores/card-items-store/card-items-store.types";


import type Konva from "konva";

export const useTransformer = () => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const { updateItem } = useCardItemsStore(); // useItem
  // const {updateItem} = useItem()

  const onTransformEnd = (e: KonvaEventObject<Event>) => {
    const attrsFunc = (): StageData => ({
      ...e.target.attrs,
      updatedAt: Date.now()
    } as StageData);
    updateItem(e.target.id(), attrsFunc);

    e.target.getStage()?.batchDraw();
  };

  const setTransformerConfig = (transformer: Konva.Transformer) => {
    let nodeStatus: TransformerConfigKey = 'default';

    if (transformer.nodes().length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      nodeStatus = transformer.getNode().attrs['data-item-type'] as TransformerConfigKey;
    }


    if (transformerConfig[nodeStatus])

      for (const [field, value] of Object.entries(transformerConfig[nodeStatus])) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        transformer.attrs[field] = value;
      }
    transformer.update();
  };

  return {
    transformerRef,
    onTransformEnd,
    setTransformerConfig
  };
};

