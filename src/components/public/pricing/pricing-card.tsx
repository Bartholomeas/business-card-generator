"use client";

import React, { type ReactNode } from "react";

import { type ClassValue } from "clsx";
import { motion } from "framer-motion";

import { cn } from "~/utils";

import { PricingOptionBenefit, type PricingOptionBenefitProps } from "./pricing-option-benefit";


interface PricingCardProps {
	tier: string;
	price: string;
	bestFor: string;
	CTA: ReactNode;
	benefits: PricingOptionBenefitProps[];
	className?: ClassValue;
}

export const PricingCard = ({
	tier,
	price,
	bestFor,
	CTA,
	benefits,
	className,
}: PricingCardProps) => {
	return (
		<motion.div
			initial={{
				filter: "blur(2px)",
			}}
			whileInView={{
				filter: "blur(0px)",
			}}
			transition={{
				duration: 0.5,
				ease: "easeInOut",
				delay: 0.25,
			}}
			className={cn(
				"relative h-full w-full overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-br from-backgroundCard to-background p-6",
				className,
			)}
		>
			<div className="flex flex-col items-center border-b border-zinc-700 pb-6">
				<span className="mb-6 inline-block text-foreground">{tier}</span>
				<span className="mb-3 inline-block text-4xl font-medium ">{price}</span>
				<span className="bg-gradient-to-br from-zinc-200 to-zinc-500 bg-clip-text text-center text-transparent">
					{bestFor}
				</span>
			</div>

			<div className="space-y-4 py-9">
				{benefits.map((b, i) => (
					<PricingOptionBenefit {...b} key={`pricingOptionBenefit-${i}-${b.text}`} />
				))}
			</div>

			{CTA}
		</motion.div>
	);
};
