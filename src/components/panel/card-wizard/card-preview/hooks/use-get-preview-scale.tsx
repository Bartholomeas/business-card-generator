"use client";

import { type RefObject, useEffect, useState } from "react";

export const PADDING = 8;

export const useGetPreviewScale = <T extends HTMLDivElement, K extends HTMLDivElement>(
	refOne?: RefObject<T>,
	refTwo?: RefObject<K>,
) => {
	const [scale, setScale] = useState(1);

	const calculateScale = () => {
		const cardElement = refOne?.current;
		const parentElement = refTwo?.current;

		if (!cardElement || !parentElement) return;

		const cardElementWidth = cardElement.offsetWidth;
		const cardElementHeight = cardElement.offsetHeight;

		const parentElementWidth = parentElement.offsetWidth;
		const parentElementHeight = parentElement.offsetHeight;

		const scaleX = (parentElementWidth - 2 * PADDING) / cardElementWidth;
		const scaleY = (parentElementHeight - 2 * PADDING) / cardElementHeight;

		setScale(Math.min(scaleX, scaleY));
	};

	useEffect(() => {
		calculateScale();

		window.addEventListener("resize", calculateScale);
		return () => window.removeEventListener("resize", calculateScale);
	}, []);

	return {
		scale,
		calculateScale,
	};
};
