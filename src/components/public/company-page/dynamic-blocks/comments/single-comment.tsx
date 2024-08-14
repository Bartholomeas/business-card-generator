"use client";

import { motion } from "framer-motion";

import { api } from "~/providers/trpc-provider";
import { singleItemFadeIn } from "~/misc/styles/animations";

import { Avatar, AvatarFallback, AvatarImage, Skeleton, Text } from "~/components/common";
import { DeleteCommentDialog } from "~/components/public/company-page/dynamic-blocks/comments/delete-comment-dialog";
import type { Comment } from "~/server/api/routers/company";

import { User } from "lucide-react";

interface SingleCommentProps {
  comment: Comment;
  index?: number;
  isEditable?: boolean;
}

export const SingleComment = ({ comment, index = 1, isEditable = false }: SingleCommentProps) => {
  const { data: userBadge, isLoading } = api.user.getUserBadge.useQuery({
    userDetailsId: comment?.userDetailsId,
  });
  const isCommentEdited = new Date(comment?.updatedAt) > new Date(comment?.createdAt);

  if (isLoading) return <SingleCommentSkeleton />;
  return (
    <motion.div {...singleItemFadeIn(index)} className={"flex items-start gap-4"}>
      <Avatar className="h-12 w-12">
        <AvatarImage src={userBadge?.avatar?.url} alt={`Awatar użytkownika ${userBadge?.name}`} />
        <AvatarFallback className="flex items-center justify-center">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex w-full items-start justify-between"}>
          <div className={"flex flex-col"}>
            <Text weight={"semibold"} size={"sm"}>
              {userBadge?.name}
            </Text>
            <div className={"flex items-center gap-4"}>
              <Text size={"xs"} color={"secondary"}>
                {comment?.createdAt}
              </Text>
              {isCommentEdited ? (
                <Text size={"xs"} color={"secondary"}>
                  Edytowano: {comment?.updatedAt}
                </Text>
              ) : null}
            </div>
          </div>
          {isEditable ? <DeleteCommentDialog commentId={comment?.id} /> : null}
        </div>
        <Text>{comment?.content}</Text>
      </div>
    </motion.div>
  );
};

export const SingleCommentSkeleton = () => (
  <div className={"flex w-full items-start gap-4"}>
    <Skeleton className={"h-12 w-12 rounded-full"}></Skeleton>
    <div className={"flex w-full flex-col gap-1"}>
      <Skeleton className={"h-3 w-[96px] rounded-full"}></Skeleton>
      <Skeleton className={"h-2 w-[120px] rounded-full"}></Skeleton>
      <div className={"mt-2 flex flex-col gap-1"}>
        <Skeleton className={"h-3 w-[90%] rounded-full"}></Skeleton>
        <Skeleton className={"h-3 w-[25%] min-w-[64px] rounded-full"}></Skeleton>
      </div>
    </div>
  </div>
);
