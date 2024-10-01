import { cn } from "~/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"animate-pulse rounded-md border-2 border-backgroundBorder bg-backgroundLight ",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
