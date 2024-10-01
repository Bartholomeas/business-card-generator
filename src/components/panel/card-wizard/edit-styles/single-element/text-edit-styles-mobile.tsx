"use client";

import React, { Suspense } from "react";

import { useCardStylesStore } from "~/stores/card";

import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common";
import { PersonalizeText } from "~/components/panel/card-wizard/edit-styles/text/personalize-text";

import { TextEditTrigger } from "./text-edit-trigger";


export interface TextEditStylesMobileProps {
	children?: React.ReactNode;
	textEl?: TextElement;
	code?: TextElementCodes;
	label?: React.ReactNode;
	className?: string;
}

export const TextEditStylesMobile = ({ textEl, code, label }: TextEditStylesMobileProps) => {
	const { setChosenElement } = useCardStylesStore();

	const { getTextElementByCode } = useCardStylesStore();
	const { id, text } = getTextElementByCode(code);

	if (!textEl?.text && !text) return null;

	return (
		<Popover>
			<PopoverTrigger asChild key={id}>
				<TextEditTrigger handleClick={setChosenElement} code={code} content={label} />
			</PopoverTrigger>
			<PopoverContent forceMount className="w-80 overflow-y-auto">
				<Suspense key={`suspense-${textEl?.id}-${code}`}>
					<PersonalizeText />
				</Suspense>
			</PopoverContent>
		</Popover>
	);
};
