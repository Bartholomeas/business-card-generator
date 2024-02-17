import { type BusinessCard, type BusinessCardThemeCodes } from "~/server/api/routers/card";
import { type MappedDefaultTextElements } from "../utils";

export interface CardStylesReducerState {
  generalStyles: BusinessCard["generalStyles"] | undefined;
  defaultTextElements: MappedDefaultTextElements | undefined;
  front: BusinessCard["front"] | undefined;
  back: BusinessCard["back"] | undefined;
  qrLink?: BusinessCard["qrLink"];
  theme?: BusinessCardThemeCodes;
}
interface AddStyle {
  type: "add_style";
  payload: { text: string };
}

interface UpdateStyle {
  type: "update_style";
  payload: { text: string };
}

interface UpdateStyle {
  type: "update_style";
  payload: { text: string };
}

export type ReducerActions = AddStyle | UpdateStyle;
