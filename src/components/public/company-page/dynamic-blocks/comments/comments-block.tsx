import { Suspense } from "react";
import { CommentsSection } from "~/components/public/company-page/dynamic-blocks/comments/comments-section";
import { CommentsSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/comments-section-skeleton";

interface CommentsBlockProps {
  id: string | undefined;
}

export const CommentsBlock = ({ id }: CommentsBlockProps) => (
  <Suspense key={id} fallback={<CommentsSectionSkeleton />}>
    <CommentsSection id={id} />
  </Suspense>
);