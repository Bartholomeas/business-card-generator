"use client";

import { Suspense, useMemo } from "react";

import { api } from "~/providers/trpc-provider";

import { Heading, Separator } from "~/components/common";
import { AddCommentForm } from "~/components/public/company-page/dynamic-blocks/comments/add-comment-form";
import { CommentsSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/comments/comments-section-skeleton";
import {
	SingleComment,
	SingleCommentSkeleton,
} from "~/components/public/company-page/dynamic-blocks/comments/single-comment";


interface CommentsSectionProps {
	id: string | undefined;
}

export const CommentsSection = ({ id }: CommentsSectionProps) => {
	const { data: section, isLoading } = api.company.getCommentsSection.useQuery({ id });
	const { data: user } = api.user.getProfile.useQuery();
	const items = useMemo(() => section?.items ?? undefined, [section?.items]);

	if (isLoading) return <CommentsSectionSkeleton key={id} />;
	if (!items) return null;
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
				{items
					? items.map((comment, index) => (
							<Suspense key={comment?.id} fallback={<SingleCommentSkeleton />}>
								<SingleComment
									key={comment?.id}
									comment={comment}
									index={index + 1}
									isEditable={comment?.userDetailsId === user?.userDetailsId}
								/>
							</Suspense>
						))
					: null}
			</div>
		</section>
	);
};
