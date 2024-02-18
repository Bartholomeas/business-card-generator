import { type TextElementsHidden } from "~/components/panel/card-wizard/edit-styles/helpers";
import { type MappedDefaultTextElements } from "~/misc/utils/misc";
import { type BusinessCard, type BusinessCardThemeCodes } from "~/server/api/routers/card";
import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

export interface CardStylesStoreState {
  generalStyles: BusinessCard["generalStyles"] | undefined;
  defaultTextElements: MappedDefaultTextElements | undefined;
  front: BusinessCard["front"] | undefined;
  back: BusinessCard["back"] | undefined;
  qrLink?: BusinessCard["qrLink"];
  theme?: BusinessCardThemeCodes;
}

export interface CardStylesActions {
  getTextElementByCode: (code: TextElementCodes | undefined) => TextElement;
  toggleTextElementHide: (data: TextElementsHidden) => void;
}

export type CardStylesStore = CardStylesActions & CardStylesStoreState;

export const DefaultTextElement: Partial<TextElement> = {
  id: undefined,
  text: undefined,

  code: undefined,

  positionX: undefined,
  positionY: undefined,

  color: undefined,

  fontSize: undefined,
  fontFamily: undefined,
  fontWeight: undefined,
  fontStyle: undefined,

  textDecoration: undefined,
  textAlign: undefined,
  lineHeight: undefined,
  letterSpacing: undefined,

  isHidden: true,

  zIndex: undefined,
};

export const defaultInitState: CardStylesStoreState = {
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  theme: "templateDefault",
  generalStyles: {},
  defaultTextElements: undefined,
  qrLink: null,
};
