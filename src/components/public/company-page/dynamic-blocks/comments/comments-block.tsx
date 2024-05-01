import { Suspense } from "react";
import { CommentsSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/comments-section-skeleton";
import { CommentsSection } from "~/components/public/company-page/dynamic-blocks/comments/comments-section";

interface CommentsBlockProps {
  id: string | undefined;
}

export const CommentsBlock = ({ id }: CommentsBlockProps) => (
  <Suspense key={id} fallback={<CommentsSectionSkeleton />}>
    <CommentsSection id={id} />
  </Suspense>
);