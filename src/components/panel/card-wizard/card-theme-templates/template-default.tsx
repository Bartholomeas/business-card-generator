"use client";

import React from "react";

import Image from "next/image";

import { type CardTemplateProps } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";

import { TextEditStyles } from "../edit-styles";

import { useCardStylesStore } from "~/stores/card";
import { cn } from "~/utils";

const fullCardStyles = "h-full w-full p-[14px] flex flex-col gap-2 rounded";

const textColor = "text-black";
const accentColor = "text-[#1f4e84]";
const bgColor = "bg-white";
const TEXT_STYLE = cn("text-[8px] font-semibold", accentColor);

const CardTemlateDefaultFront = ({ className }: CardTemplateProps) => {
	const { front, generalStyles } = useCardStylesStore();

	return (
		<div
			key={front?.id}
			className={cn(textColor, bgColor, fullCardStyles, className, "overflow-hidden")}
			style={{ ...generalStyles, ...front?.styles }}
		>
			<div
				className="flex grow flex-col items-center justify-center bg-[#8ed800] p-2"
				style={{
					backgroundImage: 'url("/svg/cross-bg.svg")',
					backgroundRepeat: "repeat",
					backgroundOrigin: "border-box",
					backgroundSize: "24px",
					backgroundPosition: "center",
				}}
			>
				<Image
					src="/logo.svg"
					height={48}
					width={48}
					alt="Logo firmy"
					className="h-[36px] w-auto object-contain"
				/>
				<TextEditStyles code="companyName" className={cn("text-lg font-bold", accentColor)} />

				<TextEditStyles code="addressLine1" className={cn("text-xs", accentColor)} />
				<TextEditStyles code="addressLine2" className={cn("text-xs", accentColor)} />

				<TextEditStyles code="city" className={cn("text-xs", accentColor)} />

				<TextEditStyles code="ownerName" className={cn("text-xs", accentColor)} />
			</div>
		</div>
	);
};

const CardTemlateDefaultBack = ({ className }: CardTemplateProps) => {
	const { back, generalStyles } = useCardStylesStore();

	return (
		<div
			key={back?.id}
			className={cn(
				"flex grow items-center justify-center bg-white p-2",
				textColor,
				fullCardStyles,
				className,
			)}
			style={{
				...generalStyles,
				...back?.styles,
			}}
		>
			<TextEditStyles code="email" className={TEXT_STYLE} />
			<TextEditStyles label="Tel: " code="phoneNumber" className={TEXT_STYLE} />
			<TextEditStyles label="NIP: " code="nip" className={TEXT_STYLE} />
			<TextEditStyles label="REGON: " code="regon" className={TEXT_STYLE} />
			<TextEditStyles code="postalCode" className={TEXT_STYLE} />
			<TextEditStyles code="website" className={TEXT_STYLE} />
		</div>
	);
};

export const CardTemplateDefault = { front: CardTemlateDefaultFront, back: CardTemlateDefaultBack };
