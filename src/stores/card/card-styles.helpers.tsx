import { type MappedDefaultTextElements } from "~/utils/misc";

import { type BusinessCard, type BusinessCardThemeCodes } from "~/server/api/routers/card";
import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

import { type TextElementsHidden } from "~/components/panel/card-wizard/edit-styles/helpers";
import { type CardSide } from "~/components/special/with-flip/hooks/use-flip-state";

export type DecorationElementType = "ICON";

export interface DecorationElement {
  id: string;
  type: DecorationElementType;
  src: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  rotation?: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  zIndex: number;
  side: CardSide;
}

export interface CardStylesStoreState {
  generalStyles: BusinessCard["generalStyles"] | undefined;
  defaultTextElements: MappedDefaultTextElements | undefined;
  front: BusinessCard["front"] | undefined;
  back: BusinessCard["back"] | undefined;
  theme?: BusinessCardThemeCodes;
  qrLink?: BusinessCard["qrLink"];
  chosenElement?: TextElement | undefined;
  isDirty?: boolean;
  decorationElements: DecorationElement[];
}

export interface CardStylesActions {
  getChosenElement: () => TextElement | undefined;
  getTextElementByCode: (code: TextElementCodes | undefined) => TextElement;
  getIsDirty: () => boolean;
  setStateClear: () => void;
  changeTextElement: (textEl: Partial<TextElement>) => void;
  setChosenElement: (id: string | undefined) => void;
  toggleTextElementHide: (data: TextElementsHidden) => void;
  addDecoration: (decoration: Omit<DecorationElement, "id">) => void;
  updateDecoration: (id: string, updates: Partial<DecorationElement>) => void;
  removeDecoration: (id: string) => void;
}

export const DefaultTextElement: Partial<TextElement> = {
  id: undefined,
  text: undefined,

  code: undefined,

  // positionX: undefined,
  // positionY: undefined,

  color: "#333",

  fontSize: 16,
  fontFamily: "Roboto",
  fontWeight: "normal",
  // fontStyle: ,

  textDecoration: "default",
  textAlign: "left",
  lineHeight: 1.2,
  letterSpacing: 1,

  isHidden: false,

  zIndex: 1,
};

export const defaultInitState: CardStylesStoreState = {
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  theme: "templateDefault",
  generalStyles: {},
  defaultTextElements: undefined,
  qrLink: null,
  chosenElement: undefined,
  isDirty: false,
  decorationElements: [],
};
