"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

import { singleItemFadeIn } from "~/misc/styles/animations";

import type { Comment } from "~/server/api/routers/company";
import type { UserBadge } from "~/server/api/routers/user";

import { Avatar, AvatarFallback, AvatarImage, Skeleton, Text } from "~/components/common";
import { DeleteCommentDialog } from "~/components/public/company-page/dynamic-blocks/comments/delete-comment-dialog";


interface SingleCommentProps {
  comment: Comment;
  index?: number;
  isEditable?: boolean;
  userBadge?: Partial<UserBadge>;
}

export const SingleComment = ({ comment, index = 1, isEditable = false, userBadge }: SingleCommentProps) => {
  const isCommentEdited = new Date(comment?.updatedAt) > new Date(comment?.createdAt);

  return (
    <motion.div {...singleItemFadeIn(index)} className={"flex items-start gap-4"}>
      <Avatar className="size-12">
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
    <Skeleton className={"size-12 rounded-full"}></Skeleton>
    <div className={"flex w-full flex-col gap-1"}>
      <Skeleton className={"h-3 w-[96px] rounded-full"}></Skeleton>
      <Skeleton className={"h-2 w-[120px] rounded-full"}></Skeleton>
      <div className={"mt-2 flex flex-col gap-1"}>
        <Skeleton className={"h-3 w-[90%] rounded-full"}></Skeleton>
        <Skeleton className={"h-3 w-1/4 min-w-[64px] rounded-full"}></Skeleton>
      </div>
    </div>
  </div>
);
