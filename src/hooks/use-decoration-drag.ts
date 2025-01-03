"use client";

import { useRef, useState } from "react";

import { type DecorationElement } from "~/stores/card";

interface UseDecorationDragProps {
	isMobile: boolean;
	scale: number;
	onUpdate: (id: string, updates: Partial<DecorationElement>) => void;
}

export const useDecorationDrag = ({ isMobile, scale, onUpdate }: UseDecorationDragProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const [selectedDecoration, setSelectedDecoration] = useState<string | null>(null);
	const touchTimeoutRef = useRef<NodeJS.Timeout>();
	const touchPositionRef = useRef<{ x: number; y: number } | null>(null);
	const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

	const startDragging = (decoration: DecorationElement, x: number, y: number) => {
		const positionRef = isMobile ? touchPositionRef : mousePositionRef;
		positionRef.current = { x, y };
		setSelectedDecoration(decoration.id);
		setIsDragging(true);
	};

	const handleMove = (decoration: DecorationElement, clientX: number, clientY: number) => {
		const positionRef = isMobile ? touchPositionRef : mousePositionRef;
		if (!isDragging || !positionRef.current) return;

		const deltaX = (clientX - positionRef.current.x) / scale;
		const deltaY = (clientY - positionRef.current.y) / scale;

		onUpdate(decoration.id, {
			positionX: decoration.positionX + deltaX,
			positionY: decoration.positionY + deltaY,
		});

		positionRef.current = { x: clientX, y: clientY };
	};

	const handleMouseDown = (e: React.MouseEvent, decoration: DecorationElement) => {
		if (isMobile) {
			const startX = e.clientX;
			const startY = e.clientY;

			touchTimeoutRef.current = setTimeout(() => {
				startDragging(decoration, startX, startY);
			}, 500);
		} else {
			startDragging(decoration, e.clientX, e.clientY);
		}
	};

	const handleMouseUp = () => {
		if (touchTimeoutRef.current) {
			clearTimeout(touchTimeoutRef.current);
		}
		setIsDragging(false);
		mousePositionRef.current = null;
	};

	const handleTouchStart = (e: React.TouchEvent, decoration: DecorationElement) => {
		const touch = e.touches[0];
		if (!touch) return;
		touchPositionRef.current = { x: touch.clientX, y: touch.clientY };

		touchTimeoutRef.current = setTimeout(() => {
			startDragging(decoration, touch.clientX, touch.clientY);
		}, 500);
	};

	const handleTouchMove = (e: React.TouchEvent, decoration: DecorationElement) => {
		const touch = e.touches[0];
		if (!touch) return;
		handleMove(decoration, touch.clientX, touch.clientY);
	};

	const handleTouchEnd = () => {
		if (!isMobile) return;
		if (touchTimeoutRef.current) {
			clearTimeout(touchTimeoutRef.current);
		}
		setIsDragging(false);
		touchPositionRef.current = null;
	};

	return {
		isDragging,
		selectedDecoration,
		setSelectedDecoration,
		handlers: {
			handleMouseDown,
			handleMouseUp,
			handleTouchStart,
			handleTouchMove,
			handleTouchEnd,
			handleMove,
		},
	};
};
