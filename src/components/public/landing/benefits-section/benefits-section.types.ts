import { type StaticImageData } from "next/image";

export interface BenefitCard {
	title: string;
	description: string;
	src: string | StaticImageData;
	colorClassName: `bg-${string}`;
}
