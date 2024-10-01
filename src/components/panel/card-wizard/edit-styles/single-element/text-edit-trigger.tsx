"use client";

import React, { type ButtonHTMLAttributes, forwardRef } from "react";

import { type TextElementCodes } from "~/server/api/routers/user";

import { useCardStylesStore } from "~/stores/card";
import { cn, mapFontFamilyCodeToValue, parseObjectNullsToUndefined } from "~/utils";

interface TextEditTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "content"> {
	content?: React.ReactNode;
	code?: TextElementCodes;
	handleClick?: (id: string | undefined) => void;
}

/**
 * Renders a button that triggers the text editing functionality.
 *
 * @example - Default
 * ```tsx
 * <TextEditTrigger content="Hello, World!" code="companyName" className="text-rose-500" />
 * ```
 * @example - With shadcn Popover
 *
 * ```tsx
 <PopoverTrigger asChild key={id}>
 <TextEditTrigger code={code} content={label} />
 </PopoverTrigger>
 * ```
 */
export const TextEditTrigger = forwardRef<HTMLButtonElement, TextEditTriggerProps>(
	({ content, code, className, handleClick, ...props }, ref) => {
		const { getChosenElement, getTextElementByCode } = useCardStylesStore();
		const {
			id,
			text,
			fontSize,
			color,
			fontFamily,
			fontWeight,
			isHidden,
			letterSpacing,
			lineHeight,
			// positionX,
			// positionY,
			textAlign,
			textDecoration,
			zIndex,
		} = getTextElementByCode(code);
		const { id: choosenId } = getChosenElement() ?? {};
		const isActive = id === choosenId;

		if (!text || isHidden) return null;
		return (
			<button
				className={cn(
					"relative w-full rounded-sm border-2 border-transparent after:absolute after:content-[''] hover:border-slate-200",
					className,
					{ "border-slate-200": isActive },
				)}
				ref={ref}
				{...props}
				onClick={e => {
					props.onClick?.(e);
					handleClick?.(id);
				}}
			>
				<p
					style={parseObjectNullsToUndefined({
						fontSize: fontSize ?? undefined,
						color: color ?? undefined,
						fontFamily: mapFontFamilyCodeToValue(fontFamily),
						// fontStyle: "normal",
						fontWeight,
						letterSpacing: letterSpacing ?? undefined,
						lineHeight: lineHeight ?? undefined,
						textAlign,
						textDecoration: textDecoration ?? undefined,
						zIndex: zIndex ?? undefined,
					})}
					className={cn({
						hidden: isHidden,
						// positionX,
						// positionY,
					})}
				>
					{content ?? null}
					{text}
				</p>
			</button>
		);
	},
);

TextEditTrigger.displayName = "TextEditTrigger";
