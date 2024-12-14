"use client";

import { useCallback, useRef } from "react";

import { type Group } from "konva/lib/Group";
import { type KonvaEventObject, type Node, type NodeConfig } from "konva/lib/Node";
import { type Shape, type ShapeConfig } from "konva/lib/Shape";
import { type Stage } from "konva/lib/Stage";
import { type IRect, type Vector2d } from "konva/lib/types";

import { type ItemHandleActions } from "~/features/creator/board/types/creator-item.types";
import { decimalUpToSeven } from "~/features/creator/board/utils/decimal-up-to-seven";

import type Konva from "konva";

export const useCardCreatorEvents = (onSelect: ItemHandleActions["onSelect"]) => {
  const stageRef = useRef<Stage | null>(null);

  const onSelectEmptyBackground = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (e?.target && e.target?.getType() === "Stage") onSelect(e);
    },
    [onSelect],
  );

  const onMouseDownOnStage = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      onSelectEmptyBackground(e);

      const stage = e.target?.getStage();
      if (!stage) return;

      const selectBox = stage.findOne(".select-box");

      const scaledCurrentMousePos = getScaledMousePosition(stage, e.evt);
      const currentMousePos = stage.getPointerPosition();
      selectBox?.position(scaledCurrentMousePos);

      const isDraggable = Boolean(stageRef?.current?.draggable());
      if (stage.getAllIntersections(currentMousePos).length || isDraggable) {
        console.log(`Selection isnt visible, maybe is draggable: ${isDraggable}`);
        selectBox?.visible(false);
        return;
      }
      selectBox?.visible(true);
    },
    [onSelectEmptyBackground],
  );

  const onMouseMoveOnStage = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.which !== 1) return;

    const stage = e.target?.getStage();
    if (!stage) return;

    const selectBox = stage.findOne(".select-box");
    console.log("Selection box visibility:", selectBox?.visible());
    if (!selectBox?.visible()) return;

    const currentMousePos = getScaledMousePosition(stage, e.evt);
    const origin = selectBox.position();
    const size = selectBox.size();
    const adjustedRectInfo = getOriginFromTwoPoints(origin, currentMousePos, size);

    selectBox.position({
      x: adjustedRectInfo.x,
      y: adjustedRectInfo.y,
    });
    selectBox.size({
      width: adjustedRectInfo.width,
      height: adjustedRectInfo.height,
    });

    selectBox.getStage()?.batchDraw();
  };

  const onMouseUpOnStage = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return;

      const selectBox = stage.findOne(".select-box");
      selectBox?.visible(false);

      const itemsInBoundary = getItemsInBoundary(stage, selectBox);

      const overlapItems: (Node<NodeConfig> | Shape<ShapeConfig> | Group | null)[] = itemsInBoundary
        ? itemsInBoundary
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .map(_item =>
            (_item &&
              "attrs" in _item &&
              "data-item-type" in _item.attrs &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              _item.attrs["data-item-type"]) === "frame"
              ? (_item?.getParent()?.getChildren() ?? [])
              : _item,
          )
          .flat()
          .filter(_item => _item?.className !== "Label")
        : [];

      selectBox?.visible(false);
      selectBox?.position({
        x: 0,
        y: 0,
      });
      selectBox?.size({
        width: 0,
        height: 0,
      });
      selectBox?.getLayer()?.batchDraw();
      if (overlapItems?.length) {
        onSelect(undefined, overlapItems as Node<NodeConfig>[]);
      }
    },
    [onSelect],
  );

  return {
    onMouseDownOnStage,
    onMouseMoveOnStage,
    onMouseUpOnStage,
  };
};
const getScaledMousePosition = (stage: Konva.Stage, e: MouseEvent | DragEvent) => {
  stage.setPointersPositions(e);
  const stageOrigin = stage.getAbsolutePosition();
  const mousePosition = stage.getPointerPosition();

  if (mousePosition)
    return {
      x: decimalUpToSeven(mousePosition.x - stageOrigin.x) / stage.scaleX(),
      y: decimalUpToSeven(mousePosition.y - stageOrigin.y) / stage.scaleY(),
    };

  return { x: 0, y: 0 };
};

const getOriginFromTwoPoints = (
  p1: Vector2d,
  p2: Vector2d,
  size: { width: number; height: number; },
): IRect => {
  const result: IRect = {
    x: p1.x,
    y: p1.y,
    width: size.width,
    height: size.height,
  };

  result.width = p2.x - p1.x;
  result.height = p2.y - p1.y;

  return result;
};

const getItemsInBoundary = (stage: Konva.Stage, targetItem: Konva.Node | undefined) => {
  if (!targetItem) return [];
  const stageLayer = stage.getLayer() ?? undefined;
  const boundary = targetItem.getClientRect({ relativeTo: stageLayer });

  return targetItem
    .getLayer()
    ?.getChildren((item: Konva.Node) => {
      if (item.name() === "select-box") return false;
      const itemBoundary = item.getClientRect({ relativeTo: stageLayer });

      return (
        boundary.x <= itemBoundary.x &&
        boundary.y <= itemBoundary.y &&
        boundary.x + boundary.width >= itemBoundary.x + itemBoundary.width &&
        boundary.y + boundary.height >= itemBoundary.y + itemBoundary.height
      );
    })
    .map(item => {
      if (item.name() === "label-group") {
        return (item as Konva.Group).findOne(".label-target") ?? null;
      }
      return item;
    })
    .filter(Boolean);
};

