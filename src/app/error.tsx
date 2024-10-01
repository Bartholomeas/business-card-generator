"use client"; // Error components must be Client Components

import { useEffect } from "react";

import { ErrorCard } from "~/components/special/error-card";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="relative mt-[-74px] flex h-screen items-center justify-center bg-background">
			<ErrorCard errorCode={500} errorMessage={error.message} onClick={reset} />
		</div>
	);
}
