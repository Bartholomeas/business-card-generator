import { Skeleton } from "~/components/common/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-4 space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
} 