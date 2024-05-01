import { Skeleton } from "~/components/common";

export const CommentsSectionSkeleton = () => (
  <div className="flex flex-col">
    <Skeleton className="mb-6 h-8 w-[30%] min-w-[120px]" />
    {new Array(4).fill(null).map((_: unknown, index) => (
      <div key={`faq-skeleton-${index}`} className={"flex flex-col"}>
        <div className="my-5 flex w-full items-center justify-between">
          <Skeleton className="h-4 w-[50%] min-w-[260px]" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-[1px] w-full border-0" />
      </div>
    ))}
  </div>
);