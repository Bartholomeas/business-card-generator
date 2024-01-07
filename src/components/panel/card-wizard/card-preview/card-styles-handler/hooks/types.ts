import { type BusinessCard } from "~/server/api/routers/user/requests";

export interface ReducerState {
  generalStyles: BusinessCard["generalStyles"];
  front: Omit<BusinessCard["front"], "id">;
  back: Omit<BusinessCard["back"], "id">;
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
