"use client";

import React from "react";

import { useCardStylesStore } from "~/stores/card";

import { type TextElementCodes } from "~/server/api/routers/user";

import { TextEditTrigger } from "./text-edit-trigger";


interface TextEditStylesDesktopProps {
	code?: TextElementCodes;
	className?: string;
}

export const TextEditStylesDesktop = ({ code, className }: TextEditStylesDesktopProps) => {
	const { setChosenElement } = useCardStylesStore();

	return <TextEditTrigger handleClick={setChosenElement} code={code} className={className} />;
};
