"use client";

import { Suspense, useMemo } from "react";

import dynamic from "next/dynamic";

import { api } from "~/providers/trpc-provider";

import { Heading, Separator, Text } from "~/components/common";
import { AddCommentForm } from "~/components/public/company-page/dynamic-blocks/comments/add-comment-form";
import { CommentsSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/comments-section-skeleton";
import { SingleCommentSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/single-comment";

const SingleComment = dynamic(() => import("~/components/public/company-page/dynamic-blocks/comments/single-comment").then(mod => mod.SingleComment));

interface CommentsSectionProps {
  id: string | undefined;
}

export const CommentsSection = ({ id }: CommentsSectionProps) => {
  const { data: section, isLoading: isSectionLoading } = api.company.getCommentsSection.useQuery({ id });
  const { data: user } = api.user.getProfile.useQuery();
  const items = useMemo(() => section?.items ?? undefined, [section?.items]);

  const userDetailsIds = useMemo(() => items?.map(item => item.userDetailsId) ?? [], [items]);

  const { data: userBadges, isLoading: isUserBadgesLoading } = api.user.getUsersBadges.useQuery({ userDetailsIds: userDetailsIds }, {
    enabled: userDetailsIds.length > 0,
  });

  const isLoading = isSectionLoading || isUserBadgesLoading;

  if (isSectionLoading) return <CommentsSectionSkeleton />;

  return (
    <section className={"flex flex-col gap-2 pt-8"}>
      {section?.title ? (
        <Heading size={"h2"} className={"mb-4"}>
          {section?.title}
        </Heading>
      ) : null}
      <AddCommentForm commentsSectionId={section?.id} />
      <Separator className={"my-6"} />
      <div className={"mt-4 flex flex-col gap-6"}>
        {items && items.length > 0 ? (
          items.map((comment, index) => (
            <Suspense key={comment?.id} fallback={<SingleCommentSkeleton />}>
              {isLoading ? (
                <SingleCommentSkeleton />
              ) : (
                <SingleComment
                  key={comment?.id}
                  comment={comment}
                  index={index + 1}
                  isEditable={comment?.userDetailsId === user?.userDetailsId}
                  userBadge={userBadges?.[comment.userDetailsId]}
                />
              )}
            </Suspense>
          ))
        ) : (
          <Text>Brak komentarzy...</Text>
        )}
      </div>
    </section>
  );
};
