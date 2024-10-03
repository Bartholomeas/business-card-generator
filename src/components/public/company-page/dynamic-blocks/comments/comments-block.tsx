import { Suspense } from "react";

import dynamic from "next/dynamic";

import { CommentsSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/comments-section-skeleton";

const CommentsSection = dynamic(() => import("~/components/public/company-page/dynamic-blocks/comments/comments-section").then(mod => mod.CommentsSection), { loading: () => <CommentsSectionSkeleton /> });

interface CommentsBlockProps {
  id: string | undefined;
}

export const CommentsBlock = ({ id }: CommentsBlockProps) => (
  <Suspense key={id} fallback={<CommentsSectionSkeleton />}>
    <CommentsSection id={id} />
  </Suspense>
);
