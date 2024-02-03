import { type BusinessCard, type BusinessCardThemeCodes } from "~/server/api/routers/card";

export interface CardStylesReducerState {
  generalStyles: BusinessCard["generalStyles"];
  front: BusinessCard["front"];
  back: BusinessCard["back"];
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

export type ReducerActions = AddStyle | UpdateStyle;
