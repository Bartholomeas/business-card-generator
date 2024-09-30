import { Skeleton } from "~/components/common";
import { SingleCommentSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/single-comment";

export const CommentsSectionSkeleton = () => (
  <section className={"flex flex-col gap-2 pt-8"}>
    <Skeleton className="mb-6 h-8 w-2/5 min-w-[120px]" />
    <div className={"flex flex-col gap-3"}>
      {new Array(4).fill(null).map((_: unknown, index) => (
        <SingleCommentSkeleton key={`comment-${index}`} />
      ))}
    </div>
  </section>
);
