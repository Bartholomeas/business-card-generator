"use client";

import React, { useMemo } from "react";

import { Transformer } from "react-konva";

import { renderObjects } from "~/features/creator/board/utils/render-objects";

import { CardCreator } from "./card-creator";
import { useSelection, useStage, useTransformer } from "../hooks";
import { initialStageDataList } from "../stage-data-list.mock";

export const CardWizardBoard = () => {
	const { stageRef } = useStage();
	const transformer = useTransformer();
	const { onSelectItem } = useSelection(transformer);

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
