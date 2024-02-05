"use client";

import { useReducer } from "react";

import { type CardStylesReducerState, type ReducerActions } from "./types";
import { type BusinessCard } from "~/server/api/routers/card";

const reducer = (state: CardStylesReducerState, action: ReducerActions) => {
  switch (action.type) {
    case "add_style":
      return state;
    case "update_style":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialState: CardStylesReducerState = {
  generalStyles: {},
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  qrLink: null,
  theme: "templateDefault",
};

export const useCardStyles = (card: BusinessCard | undefined) => {
  const [state, dispatch] = useReducer(reducer, {
    front: card?.front ?? initialState.front,
    back: card?.back ?? initialState.back,
    generalStyles: card?.generalStyles ?? initialState.generalStyles,
    qrLink: card?.qrLink ?? initialState.qrLink,
    theme: initialState.theme,
  });

  return { state, dispatch };
};
