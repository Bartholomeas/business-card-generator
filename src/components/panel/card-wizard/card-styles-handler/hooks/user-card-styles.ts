"use client";

import { useReducer } from "react";

import { type CardStylesReducerState, type ReducerActions } from "./types";
import { type BusinessCard } from "~/server/api/routers/card";
import { mapDefaultTextsToObjects } from "../utils";

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
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  theme: "templateDefault",
  generalStyles: {},
  defaultTextElements: undefined,
  qrLink: null,
};

export const useCardStyles = (card: BusinessCard | undefined) => {
  const defaultTextElements = mapDefaultTextsToObjects(card?.defaultTextElements);

  const [state, dispatch] = useReducer(reducer, {
    front: card?.front ?? initialState.front,
    back: card?.back ?? initialState.back,
    theme: initialState.theme,
    generalStyles: card?.generalStyles ?? initialState.generalStyles,
    defaultTextElements: defaultTextElements ?? initialState.defaultTextElements,
    qrLink: card?.qrLink ?? initialState.qrLink,
  });

  return { state, dispatch };
};
