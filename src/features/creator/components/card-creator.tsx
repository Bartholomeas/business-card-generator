"use client";

import React, { forwardRef, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { type KonvaEventObject } from "konva/lib/Node";
import { Circle, Layer, Rect, Stage } from "react-konva";

import { useCardCreatorEvents } from "../hooks/use-card-creator-events";

import type Konva from "konva";

interface CardCreatorProps {
	children: ReactNode;
}

export const CardCreator = forwardRef<Konva.Stage, CardCreatorProps>(({ children }, stageRef) => {
	const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const { width, height } = containerRef.current.getBoundingClientRect();
				setStageSize({ width, height });
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const { onMouseDownOnStage, onMouseMoveOnStage, onMouseUpOnStage } = useCardCreatorEvents();

	const handleDragStart = useCallback((e: KonvaEventObject<DragEvent>) => {
		const id = e.target.id();
		console.log("Drag start:", id);
	}, []);

	const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
		const id = e.target.id();
		console.log("Drag end:", id);
	}, []);

	return (
		<div ref={containerRef} className="h-[600px] w-screen bg-background-400">
			<Stage
				ref={stageRef}
				width={stageSize.width}
				height={stageSize.height}
				draggable={false}
				onMouseDown={onMouseDownOnStage}
				onMouseUp={onMouseMoveOnStage}
				onMouseMove={onMouseUpOnStage}
			>
				<Layer>
					{children}
					<Rect
						name="select-box"
						x={0}
						y={0}
						width={0}
						height={0}
						fill="skyblue"
						opacity={0.5}
						visible={false}
						draggable
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					/>
					<Circle
						x={50}
						y={50}
						width={100}
						height={100}
						fill="skyblue"
						draggable
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					/>
				</Layer>
			</Stage>
		</div>
	);
});

CardCreator.displayName = "CardCreator";
