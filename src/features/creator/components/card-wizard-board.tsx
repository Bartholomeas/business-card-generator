"use client";

import React, { useMemo } from "react";

import { Transformer } from "react-konva";

import { CardCreator } from "./card-creator";
import { useSelection, useStage, useTransformer } from "../hooks";
import { initialStageDataList } from "../stage-data-list.mock";
import { renderObjects } from "../utils/render-objects";

export const CardWizardBoard = () => {
	const { stageRef } = useStage();
	const transformer = useTransformer();
	const { onSelectItem } = useSelection(transformer);

	const renderedItems = useMemo(() => {
		return (
			initialStageDataList[0]?.data.map(el => renderObjects(el, transformer, onSelectItem)) ?? null
		);
	}, [initialStageDataList]);

	const _onSelect = () => {};

	return (
		<div>
			<CardCreator onSelect={_onSelect} ref={stageRef}>
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
