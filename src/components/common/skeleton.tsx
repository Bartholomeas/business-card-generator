import { cn } from "~/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-backgroundBorder animate-pulse rounded-md border-2 bg-backgroundLight ",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };