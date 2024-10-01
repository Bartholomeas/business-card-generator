"use client";

import React, { useEffect, useRef, useState } from "react";

import { generateSquares } from "./shuffle-grid.utils";

export const ShuffleGrid = () => {
	const timeoutRef = useRef<NodeJS.Timeout | undefined>();
	const [squares, setSquares] = useState(generateSquares());

	useEffect(() => {
		shuffleSquares();

		return () => timeoutRef && clearTimeout(timeoutRef.current);
	}, []);

	const shuffleSquares = () => {
		setSquares(generateSquares());

		timeoutRef.current = setTimeout(shuffleSquares, 3000);
	};

	return (
		<div className="grid h-[450px] grid-cols-4 grid-rows-4 gap-1">{squares.map(sq => sq)}</div>
	);
};
