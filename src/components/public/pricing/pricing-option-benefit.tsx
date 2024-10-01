import { CheckIcon, XIcon } from "lucide-react";

import { Text } from "~/components/common";

export interface PricingOptionBenefitProps {
	text: string;
	checked: boolean;
}
export const PricingOptionBenefit = ({ text, checked }: PricingOptionBenefitProps) => {
	return (
		<div className="flex items-center gap-3">
			{checked ? (
				<Text
					as="span"
					className="grid size-5 place-content-center rounded-full bg-primary-300 text-sm text-zinc-50"
				>
					<CheckIcon className="text-background" />
				</Text>
			) : (
				<Text
					as="span"
					className="grid size-5 place-content-center rounded-full bg-zinc-800 text-sm text-zinc-400"
				>
					<XIcon />
				</Text>
			)}
			<span className="text-sm text-zinc-300">{text}</span>
		</div>
	);
};
