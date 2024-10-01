"use client";

import { useState } from "react";

export const useFlipState = () => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = () => {
		setIsFlipped(prevState => !prevState);
	};

	return { isFlipped, handleFlip };
};
