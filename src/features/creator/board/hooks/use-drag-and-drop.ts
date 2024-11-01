"use client";

import { type MutableRefObject } from "react";

import type Konva from "konva";

export const useDragAndDrop = (stageRef: MutableRefObject<Konva.Stage | null>) => {
	const onDragMoveFrame = () => {
		console.log(stageRef);
	};
	const onDragEndFrame = () => {};
	const checkIsInFrame = () => {};

	return {
		onDragMoveFrame,
		onDragEndFrame,
		checkIsInFrame,
	};
};
