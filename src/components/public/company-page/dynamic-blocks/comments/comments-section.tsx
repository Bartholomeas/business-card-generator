import { Suspense } from "react";

import { api } from "~/trpc/server";

import { Heading } from "~/components/common";
import {
  SingleComment,
  SingleCommentSkeleton,
} from "~/components/public/company-page/dynamic-blocks/comments/comment";

interface CommentsSectionProps {
  id: string | undefined;
}

export const CommentsSection = async ({ id }: CommentsSectionProps) => {
  const section = await api.company.getCommentsSection.query({ id });
  const items = section?.items ?? undefined;

  if (!items) return null;
  return (
    <section className={"flex flex-col gap-2 pt-8"}>
      {section?.title ? (
        <Heading size={"h2"} className={"mb-4"}>
          {section?.title}
        </Heading>
      ) : null}
      <div className={"flex flex-col gap-3"}>
        {items
          ? items.map(comment => (
              <Suspense key={comment?.id} fallback={<SingleCommentSkeleton />}>
                <SingleComment comment={comment} />
              </Suspense>
            ))
          : null}
      </div>
    </section>
  );
};