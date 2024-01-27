"use client";

import { useReducer } from "react";

import { type BusinessCard } from "~/server/api/routers/user/requests";
import { type CardStylesReducerState, type ReducerActions } from "./types";

const reducer = (state: CardStylesReducerState, action: ReducerActions) => {
  switch (action.type) {
    case "add_style":
      return state;
    case "update_style":
      return state;
    default:
      return state;
  }
};

const initialState: CardStylesReducerState = {
  generalStyles: {},
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  qrLink: null,
};

export const useCardStyles = (card: BusinessCard | undefined) => {
  const [state, dispatch] = useReducer(reducer, {
    front: card?.front ?? initialState.front,
    back: card?.back ?? initialState.back,
    generalStyles: card?.generalStyles ?? initialState.generalStyles,
    qrLink: card?.qrLink ?? initialState.qrLink,
  });

  return { state, dispatch };
};
