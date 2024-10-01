"use client";

import React from "react";

import { InputSlider } from "~/components/form/input-slider";

import { ChooseTheme } from "./choose-theme";

import { api } from "~/providers/trpc-provider";


export const PersonalizeColors = () => {
	const { data: themes } = api.card.getCardThemes.useQuery();

	return (
		<div className="flex flex-col gap-4">
			<InputSlider defaultValue={[0.46]} />
			<InputSlider defaultValue={[0.56]} />
			<InputSlider defaultValue={[0.66]} />
			<ChooseTheme themes={themes} />
		</div>
	);
};
