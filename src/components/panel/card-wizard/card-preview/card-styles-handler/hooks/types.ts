import { type BusinessCard } from "~/server/api/routers/user/requests";

export interface CardStylesReducerState {
  generalStyles: BusinessCard["generalStyles"];
  front: BusinessCard["front"];
  back: BusinessCard["back"];
  qrLink?: BusinessCard["qrLink"];
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
