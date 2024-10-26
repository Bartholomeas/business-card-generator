"use client";
import React, { useMemo } from "react";

import { Transformer } from "react-konva";

import { CardCreator } from "./card-creator";
import { useStage, useTransformer } from "../hooks";
import { initialStageDataList } from "../stage-data-list.mock";
import { renderObjects } from "../utils/render-objects";
import { useSelection } from "~/features/creator/hooks/use-selection";

export const CardWizardBoard = () => {
	const { stageRef } = useStage();
	const { transformerRef, onTransformEnd, setTransformerConfig } = useTransformer();
	const { onSelectItem } = useSelection({ transformerRef, onTransformEnd, setTransformerConfig });

	const renderedItems = useMemo(() => {
		return (
			initialStageDataList[0]?.data.map(el => renderObjects(el, transformerRef, onSelectItem)) ??
			null
		);
	}, [initialStageDataList]);
	console.log("Toso initowe: ", renderedItems);

	return (
		<div>
			<CardCreator ref={stageRef}>
				{renderedItems}
				<Transformer
					ref={transformerRef}
					keepRatio
					shouldOverdrawWholeArea
					boundBoxFunc={(_, newBox) => newBox}
					onTransformEnd={onTransformEnd}
				/>
			</CardCreator>
		</div>
	);
};
