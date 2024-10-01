"use client";

import React, { useEffect, useRef } from "react";

import { useFormContext } from "react-hook-form";

interface AutosubmitProps {
	time?: number;
}

export const Autosubmit = ({ time = 400 }: AutosubmitProps) => {
	const {
		watch,
		formState: { isValid, isValidating },
	} = useFormContext();

	const buttonRef = useRef<HTMLButtonElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		const subscription = watch(() => {
			clearTimeout(timeoutRef?.current);

			if (isValid && !isValidating) {
				timeoutRef.current = setTimeout(() => {
					buttonRef?.current?.click();
				}, time);
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [isValid, isValidating, time]);

	return (
		<button ref={buttonRef} type="submit" className="sr-only" aria-label="Submit form button" />
	);
};
