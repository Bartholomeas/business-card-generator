import React, { useCallback, useRef } from "react";

import { type KonvaEventObject } from "konva/lib/Node";
import { Text as KonvaText } from "react-konva";

import { type DefaultCreatorItemProps } from "~/features/creator/components/items/creator-items.types";
import { getTextValueWidth } from "~/features/creator/components/items/text-item/text-item.utils";
import { useCardItemsStore } from "~/features/creator/stores/card-items-store";

import type Konva from "konva";

const TEXT_AREA_ID = "current_text_editor";

export interface TextItemKind {
	"data-item-type": string;
	id: string;
	name: string;
	text: string;
	width: number;
	height: number;
	fontSize: number;
	fontFamily: string;
}

export type TextItemProps = DefaultCreatorItemProps;

export const TextItem = ({ data, transformer, onSelect }: TextItemProps) => {
	const attrs = data?.attrs;

	const textRef = useRef<Konva.Text>(null);
	const { updateItem } = useCardItemsStore();

	const removeTextarea = (textarea: HTMLTextAreaElement) => {
		window.removeEventListener("click", e => handleOutsideClick(e, textarea));
		const stage = textRef.current?.getStage();

		textRef.current?.show();
		transformer?.transformerRef?.current?.show();

		if (textRef?.current?.id())
			updateItem(textRef.current.id(), () =>
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				({
					...textRef.current?.attrs,
					width:
						textarea.getBoundingClientRect().width / stage!.scaleY() / textRef.current!.scaleY(),
					height: textarea.value.split("\n").length * textRef.current!.fontSize() * 1.2,
					updatedAt: Date.now(),
				}),
			);

		textarea.parentNode?.removeChild(textarea);
	};

	const handleOutsideClick = (e: MouseEvent, textarea: HTMLTextAreaElement) => {
		if (e.target !== textarea) {
			textRef.current?.text(textarea.value);
			removeTextarea(textarea);
		}
	};

	const onEditStart = () => {
		if (!textRef?.current) {
			console.error("textRef is null");
			return;
		}

		textRef?.current.hide();
		transformer?.transformerRef?.current?.hide(); // maybe transformer should be visible when editing text content?

		const textPosition = textRef?.current?.getAbsolutePosition();
		const stage = textRef?.current?.getStage();
		const container = stage?.container().getBoundingClientRect() ?? { x: 0, y: 0 };
		const areaPosition = {
			x: container.x + textPosition.x,
			y: container.y + textPosition.y,
		};

		const textarea = document.createElement("textarea");
		document.body.appendChild(textarea);

		textarea.id = TEXT_AREA_ID;
		textarea.innerHTML = textRef?.current?.text();
		textarea.style.zIndex = "100";
		textarea.style.position = "absolute";
		textarea.style.top = `${areaPosition.y}px`;
		textarea.style.left = `${areaPosition.x}px`;
		textarea.style.fontSize = `${textRef?.current?.fontSize()}px`;
		textarea.style.width = getTextValueWidth(textarea.value, textRef?.current?.fontSize() ?? 0);

		textarea.style.height = `${textRef?.current.height() + textRef.current.padding() * 2 + 5}px`;
		textarea.style.border = "none";
		textarea.style.padding = "0px";
		textarea.style.margin = "0px";
		textarea.style.overflow = "hidden";
		textarea.style.outline = "none";
		textarea.style.resize = "none";
		textarea.style.lineHeight = textRef?.current.lineHeight().toString();
		textarea.style.fontFamily = textRef?.current.fontFamily().toString();
		textarea.style.transformOrigin = "left top";
		textarea.style.textAlign = textRef.current.align();
		textarea.style.color = textRef.current.fill() as string;

		const rotation = textRef.current.rotation();
		let transform = "";
		if (rotation) transform += `rotateZ(${rotation}deg)`;

		const paddingX = 0;
		transform += `translateY(-${paddingX}px)`;

		textarea.style.transform = transform;

		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight + 3}px`;

		textarea.focus();

		const setTextareaWidth = (): void => {
			let newWidth = getTextValueWidth(textarea.value, textRef?.current?.fontSize() ?? 0);

			const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
			if (isSafari || isFirefox) newWidth = String(Math.ceil(+newWidth));

			textarea.style.width = `${newWidth}px`;
		};

		textarea.addEventListener("input", () => {
			textarea.style.width = getTextValueWidth(textarea.value, textRef?.current?.fontSize() ?? 0);
		});

		textarea.addEventListener("keydown", e => {
			// 	On enter (without shift) hide
			if (e.keyCode === 13 && !e.shiftKey) {
				textRef.current?.text(textarea.value);
				removeTextarea(textarea);
			}
			// 	on ESC dont set value
			if (e.keyCode === 27) removeTextarea(textarea);

			setTextareaWidth();
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight + (textRef.current?.fontSize() ?? 16)}px`;
		});

		setTimeout(() => {
			window.addEventListener("click", e => handleOutsideClick(e, textarea));
		});
	};

	const onDragMoveFrame = useCallback((e: KonvaEventObject<DragEvent>) => {
		e.target.getLayer()?.batchDraw();
	}, []);

	const onDragEndFrame = useCallback(
		(e: KonvaEventObject<DragEvent>) => {
			e.evt.preventDefault();
			e.evt.stopPropagation();

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			updateItem(e.target.id(), () => e.target?.attrs);
			e.target.getLayer()?.batchDraw();
		},
		[data],
	);

	const onClickText = (e: KonvaEventObject<MouseEvent>) => {
		if (e.evt.detail === 1) {
			setTimeout(() => {
				if (document?.getElementById(TEXT_AREA_ID)) return;
				onSelect(e);
			}, 200);
			return;
		}
		onEditStart();
	};

	return (
		<KonvaText
			{...attrs} //fontFamily, sizes etc
			ref={textRef}
			onDragMove={onDragMoveFrame}
			onDragEnd={onDragEndFrame}
			onClick={onClickText}
		/>
	);
};
